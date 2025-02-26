import { toggleCapslock, chooseCase } from '../utils.js';
import * as storage from '../storage.js';

jest.mock('../dataKeys.js', () => ({
  ROWS: [
    ['a', 'b'],
    ['c', 'd'],
  ],
  ROWS_EN: [
    ['a', 'b'],
    ['c', 'd'],
  ],
  ROWS_RU: [
    ['а', 'б'],
    ['в', 'г'],
  ],
}));

jest.mock('../storage.js', () => ({
  saveCapsLockState: jest.fn(),
  getCapsLockEnabled: jest.fn(),
  saveLanguageState: jest.fn(),
  getLanguage: jest.fn(),
}));

describe('Utils Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    document.body.innerHTML = `
      <div class="keyboard">
        <div class="container-rows">
          <div class="row">
            <div class="key shift">Shift</div>
            <div class="key">a</div>
            <div class="key">b</div>
          </div>
          <div class="row">
            <div class="key caps">Caps</div>
            <div class="key">c</div>
            <div class="key">d</div>
          </div>
        </div>
      </div>
    `;
  });

  describe('toggleCapslock', () => {
    test('toggles capslock state and updates storage', () => {
      storage.getCapsLockEnabled.mockReturnValue(false);

      toggleCapslock();

      expect(storage.saveCapsLockState).toHaveBeenCalledWith(true);

      storage.getCapsLockEnabled.mockReturnValue(true);

      toggleCapslock();

      expect(storage.saveCapsLockState).toHaveBeenCalledWith(false);
    });
  });

  describe('chooseCase', () => {
    test('updates key text case based on capslock state', () => {
      const keys = document.querySelectorAll('.key');

      chooseCase(true);
      keys.forEach((key) => {
        expect(key.textContent).toBe(key.textContent.toUpperCase());
      });

      chooseCase(false);
      keys.forEach((key) => {
        expect(key.textContent).toBe(key.textContent.toLowerCase());
      });
    });
  });
});
