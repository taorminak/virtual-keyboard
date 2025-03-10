import { ROWS } from '../dataKeys.js';
import * as utils from '../utils.js';
import * as storage from '../storage.js';
import '../../index.js';

jest.mock('../storage.js', () => ({
  getCapsLockEnabled: jest.fn().mockReturnValue(false),
  saveCapsLockState: jest.fn(),
  getLanguage: jest.fn().mockReturnValue(false),
  saveLanguageState: jest.fn(),
}));

jest.mock('../utils.js', () => ({
  toggleLanguage: jest.fn(),
  toggleCapslock: jest.fn(),
  chooseCase: jest.fn(),
  addTextToKey: jest.fn(),
}));

const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

describe('Keyboard Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Keyboard Creation', () => {
    test('keyboard is created with all necessary elements', async () => {
      await wait(1000);

      const keyboard = document.querySelector('.keyboard');
      const container = document.querySelector('.container-rows');
      const rows = container.querySelectorAll('.row');
      const keys = container.querySelectorAll('.key');

      expect(keyboard).toBeTruthy();
      expect(container).toBeTruthy();
      expect(rows.length).toBeGreaterThan(0);
      expect(keys.length).toBeGreaterThan(0);
    });

    test('all rows are created with correct number of keys', () => {
      const rows = document.querySelectorAll('.row');
      expect(rows.length).toBe(ROWS.length);

      rows.forEach((row, i) => {
        const keys = row.querySelectorAll('.key');
        expect(keys.length).toBe(ROWS[i].length);
      });
    });
  });

  describe('Text Input Handling', () => {
    test('keyboard input updates textarea', async () => {
      const textarea = document.querySelector('.textarea');
      textarea.value = '';
      const desiredText = 'n';
      const key = [...document.querySelectorAll('.key')].find(
        (k) => k.textContent === desiredText,
      );
      key.click();

      expect(textarea.value).toBe(desiredText);
    });

    test('shift key modifies character case', () => {
      const textarea = document.querySelector('.textarea');
      textarea.value = '';
      const desiredText = 'a';
      const key = [...document.querySelectorAll('.key')].find(
        (k) => k.textContent === desiredText,
      );

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));
      key.click();

      expect(textarea.value).toBe(desiredText.toUpperCase());
    });

    test('caps lock modifies character case', () => {
      const textarea = document.querySelector('.textarea');
      textarea.value = '';

      const desiredText = 'f';
      const key = [...document.querySelectorAll('.key')].find(
        (k) => k.textContent === desiredText,
      );

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'CapsLock', bubbles: true }),
      );
      storage.getCapsLockEnabled.mockReturnValue(true);
      key.click();
      expect(textarea.value).toBe('F');
    });
  });

  describe('Special Keys', () => {
    test('delete key removes the previous character', () => {
      const textarea = document.querySelector('.textarea');
      textarea.value = 'Hello';

      const deleteKey = document.querySelector('.service-buttons.delete');
      deleteKey.click();

      expect(textarea.value).toBe('Hell');
    });

    test('space key adds a space to textarea', () => {
      const textarea = document.querySelector('.textarea');
      textarea.value = '';
      const spaceKey = document.querySelector('.service-buttons.space');

      spaceKey.click();

      expect(textarea.value).toBe(' ');
    });

    test('enter key creates a new line in textarea', () => {
      const textarea = document.querySelector('.textarea');
      textarea.value = 'Hello world';

      const enterKey = document.querySelector('.service-buttons.enter');
      enterKey.click();

      expect(textarea.value).toBe('Hello world\n');
    });
  });

  describe('Language Toggle', () => {
    test('language toggle switches between Russian and English', () => {
      const languageKey = [...document.querySelectorAll('.service-buttons')].find(
        (k) => k.textContent === '\u{1F310}',
      );
      expect(languageKey).not.toBeNull();

      if (languageKey) {
        languageKey.click();
      }

      expect(utils.toggleLanguage).toHaveBeenCalled();
    });
  });
});
