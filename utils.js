import {
  saveCapsLockState,
  saveLanguageState,
  getCapsLockEnabled,
  getLanguage,
} from "./storage.js";
import { ROWS, ROWS_WITH_RUSSIAN } from "./data.js";

let capsLockEnabled = getCapsLockEnabled();
let isRussian = getLanguage();

export function toggleCapslock() {
  capsLockEnabled = !capsLockEnabled;
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    let keyText = key.textContent;
    keyText = capsLockEnabled ? keyText.toUpperCase() : keyText.toLowerCase();
    key.textContent = keyText;
  });
  saveCapsLockState(capsLockEnabled);
}

export function toggleLanguage() {
  const targetRows = isRussian ? ROWS : ROWS_WITH_RUSSIAN;
  const containerRows = document.querySelector(".container-rows");
  for (let i = 0; i < targetRows.length; i++) {
    const currentRow = containerRows.children[i];
    for (let j = 0; j < targetRows[i].length; j++) {
      currentRow.children[j + 1].textContent = targetRows[i][j];
    }
  }
  isRussian = !isRussian;
  saveLanguageState(isRussian);
}
