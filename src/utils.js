import {
  saveCapsLockState,
  saveLanguageState,
  getCapsLockEnabled,
  getLanguage,
} from './storage.js';
import { ROWS, ROWS_WITH_RUSSIAN } from './dataKeys.js';

export function chooseCase(capsLockEnabled) {
  const keys = document.querySelectorAll('.key');
  keys.forEach((key) => {
    const updatedKey = key;
    let keyText = updatedKey.textContent;
    keyText = capsLockEnabled ? keyText.toUpperCase() : keyText.toLowerCase();
    updatedKey.textContent = keyText;
  });
}

export function toggleCapslock() {
  let capsLockEnabled = getCapsLockEnabled();
  capsLockEnabled = !capsLockEnabled;
  chooseCase(capsLockEnabled);
  saveCapsLockState(capsLockEnabled);
}

export function addTextToKey(isRussian) {
  const targetRows = isRussian ? ROWS_WITH_RUSSIAN : ROWS;
  const containerRows = document.querySelector('.container-rows');
  /* eslint-disable no-plusplus */
  for (let i = 0; i < targetRows.length; i++) {
    const currentRow = containerRows.children[i];
    /* eslint-disable no-plusplus */
    for (let j = 0; j < targetRows[i].length; j++) {
      currentRow.children[j + 1].textContent = targetRows[i][j];
    }
  }
}

export function toggleLanguage() {
  let isRussian = getLanguage();
  isRussian = !isRussian;
  addTextToKey(isRussian);
  saveLanguageState(isRussian);
}
