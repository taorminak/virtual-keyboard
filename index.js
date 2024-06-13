import { getCapsLockEnabled, getLanguage } from './src/storage.js';
import {
  createComment,
  createContainerRows,
  createTextarea,
  createKeyboard,
  createKey,
} from './src/layout.js';
import {
  toggleCapslock,
  toggleLanguage,
  chooseCase,
  addTextToKey,
} from './src/utils.js';
import { ROWS } from './src/dataKeys.js';

window.addEventListener('load', () => {
  const capsLockEnabled = getCapsLockEnabled();
  const isRussian = getLanguage();
  addTextToKey(isRussian);
  chooseCase(capsLockEnabled);
});

let isShiftPressed;

const keyboard = createKeyboard();
const textarea = createTextarea(keyboard);
const containerRows = createContainerRows(keyboard);
createComment(keyboard);

function addText(text) {
  textarea.value += text;
}

function deletePreviousChar() {
  const cursorPosition = textarea.selectionStart;
  if (cursorPosition > 0) {
    const text = textarea.value;
    textarea.value = text.substring(0, cursorPosition - 1) + text.substring(cursorPosition);
    textarea.selectionStart = cursorPosition - 1;
    textarea.selectionEnd = cursorPosition - 1;
  }
}

function addEnter() {
  const cursorPosition = textarea.selectionStart;
  const text = textarea.value;
  const newText = `${text.substring(0, cursorPosition)}\n${text.substring(cursorPosition)}`;

  textarea.value = newText;
  textarea.selectionStart = cursorPosition + 1;
  textarea.selectionEnd = cursorPosition + 1;
  textarea.focus();
}

function createSpecialKeys(i) {
  switch (i) {
    case 0:
      return [
        createKey(['esc', 'service-buttons'], 'esc'),
        createKey(['service-buttons', 'delete'], 'delete', deletePreviousChar),
      ];
    case 1:
      return [
        createKey(['tab', 'service-buttons'], 'tab', () => addText('    ')),
        createKey(['service-buttons', 'enter'], 'enter', addEnter),
      ];
    case 2:
      return [
        createKey(['service-buttons', 'caps'], 'caps lock', () => toggleCapslock(getCapsLockEnabled())),
      ];
    case 3:
      return [
        createKey(['service-buttons', 'shift'], 'shift'),
        createKey(['service-buttons', 'shift2'], 'shift'),
      ];
    case 4:
      return [
        createKey(['service-buttons'], '\u{1F310}', () => toggleLanguage(getLanguage())),
        createKey(['service-buttons', 'ctrl'], 'control', () => { textarea.value = ''; }),
        createKey(['service-buttons', 'option'], 'option'),
        createKey(['service-buttons', 'cmd'], 'command'),
        createKey(['service-buttons', 'space'], '', () => addText(' ')),
        createKey(['service-buttons', 'cmd'], 'command'),
        createKey(['service-buttons', 'option'], 'option'),
        createKey(['service-buttons', 'arrow'], '←', () => addText('←')),
        createKey(['service-buttons', 'arrow'], '↑', () => addText('↑')),
        createKey(['service-buttons', 'arrow'], '→', () => addText('→')),
        createKey(['service-buttons', 'arrow'], '↓', () => addText('↓')),
      ];
    default:
      return [];
  }
}

function addSpecialKey(i, row) {
  const specialKeys = createSpecialKeys(i);
  specialKeys.forEach((key) => {
    if ((i === 0 && key.classList.contains('delete')) || (i === 1 && key.classList.contains('enter')) || (i === 3 && key.classList.contains('shift2')) || (i === 4)) {
      row.appendChild(key);
    } else {
      row.insertBefore(key, row.firstChild);
    }
  });
}

function addRegularKey(i, row) {
  for (let j = 0; j < ROWS[i].length; j += 1) {
    const key = createKey(['key'], ROWS[i][j]);
    row.appendChild(key);
  }
}

function createRow(i) {
  const row = document.createElement('div');
  row.classList.add('row');

  // Add regular keys
  addRegularKey(i, row);

  // Add special keys
  addSpecialKey(i, row);

  return row;
}

for (let i = 0; i < ROWS.length; i += 1) {
  const row = createRow(i);
  containerRows.appendChild(row);
}

const keys = document.querySelectorAll('.key');

function onPressKey(event) {
  const key = event.target;
  if (key.classList.contains('key')) {
    const value = isShiftPressed
      ? key.textContent.toUpperCase()
      : key.textContent;
    addText(value);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = false;
  }
});

keys.forEach((key) => key.addEventListener('click', onPressKey));
