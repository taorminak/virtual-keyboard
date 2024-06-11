import {
  saveCapsLockState,
  saveLanguageState,
  getCapsLockEnabled,
  getLanguage,
} from "./storage.js";
import {
  createComment,
  createContainerRows,
  createTextarea,
  createKeyboard,
  createKey,
} from "./layout.js";

let capsLockEnabled = getCapsLockEnabled();
let isRussian = getLanguage();

const keyboard = createKeyboard();
const textarea = createTextarea(keyboard);
const containerRows = createContainerRows(keyboard);
createComment(keyboard);

const rows = ["1234567890?`", "qwertyuiop+", "asdfghjkl;,-", "zxcvbnm<>/", ""];
const rowsWithRussian = [
  "1234567890?",
  "йцукенгшщзх",
  "фывапролджэё",
  "ячсмитьбю?",
  "",
];

function addLeft() {
  textarea.value += "←";
}

function addRight() {
  textarea.value += "→";
}

function addUp() {
  textarea.value += "↑";
}

function addDown() {
  textarea.value += "↓";
}

function addSpace() {
  textarea.value += " ";
}

function addIndent() {
  textarea.value += "    ";
}

function deletePreviousChar() {
  const cursorPosition = textarea.selectionStart;
  if (cursorPosition > 0) {
    const text = textarea.value;
    textarea.value =
      text.substring(0, cursorPosition - 1) + text.substring(cursorPosition);
    textarea.selectionStart = cursorPosition - 1;
    textarea.selectionEnd = cursorPosition - 1;
  }
}

function toggleCapslock() {
  keys.forEach((key) => {
    let keyText = key.textContent;
    keyText = !capsLockEnabled ? keyText.toUpperCase() : keyText.toLowerCase();
    key.textContent = keyText;
  });
  capsLockEnabled = !capsLockEnabled;
  saveCapsLockState(capsLockEnabled);
}

function toggleLanguage() {
  const targetRows = isRussian ? rows : rowsWithRussian;
  for (let i = 0; i < targetRows.length; i++) {
    const currentRow = containerRows.children[i];
    for (let j = 0; j < targetRows[i].length; j++) {
      currentRow.children[j + 1].textContent = targetRows[i][j];
    }
  }
  isRussian = !isRussian;
  saveLanguageState(isRussian);
}

function toggleCase() {
  const convertCase = capsLockEnabled
    ? (text) => text.toUpperCase()
    : (text) => text.toLowerCase();
  keys.forEach((key) => {
    const newText = convertCase(key.textContent);
    key.textContent = newText;
  });
}

function handleClick() {
  toggleLanguage();
  toggleCase();
}

function createSpecialKeys(i) {
  switch (i) {
    case 0:
      return [createKey(["esc", "service-buttons"], "esc")];
    case 1:
      return [createKey(["tab", "service-buttons"], "tab", addIndent)];
    case 2:
      return [
        createKey(["service-buttons", "caps"], "caps lock", toggleCapslock),
      ];
    case 3:
      return [createKey(["service-buttons", "shift"], "shift")];
    case 4:
      return [
        createKey(["service-buttons"], "\u{1F310}", handleClick),
        createKey(["service-buttons", "ctrl"], "control", () => {
          textarea.value = "";
        }),
        createKey(["service-buttons", "option"], "option"),
        createKey(["service-buttons", "cmd"], "command"),
        createKey(["service-buttons", "space"], "", addSpace),
        createKey(["service-buttons", "cmd"], "command"),
        createKey(["service-buttons", "option"], "option"),
        createKey(["service-buttons", "arrow"], "←", addLeft),
        createKey(["service-buttons", "arrow"], "↑", addUp),
        createKey(["service-buttons", "arrow"], "→", addRight),
        createKey(["service-buttons", "arrow"], "↓", addDown),
      ];
    default:
      return [];
  }
}

function createRow(i) {
  const row = document.createElement("div");
  row.classList.add("row");

  // Add special keys
  const specialKeys = createSpecialKeys(i);
  specialKeys.forEach((key) => row.appendChild(key));

  // Add regular keys
  for (let j = 0; j < rows[i].length; j++) {
    const key = createKey(["key"], rows[i][j]);
    row.appendChild(key);
  }

  if (i === 0) {
    const keyDelete = createKey(
      ["service-buttons", "delete"],
      "delete",
      deletePreviousChar
    );
    row.appendChild(keyDelete);
  }

  if (i === 1) {
    const keyEnter = createKey(["service-buttons", "enter"], "enter", () => {
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursorPosition = textarea.value.substring(
        0,
        cursorPosition
      );
      const textAfterCursorPosition = textarea.value.substring(
        cursorPosition,
        textarea.value.length
      );
      textarea.value = `${textBeforeCursorPosition}\n${textAfterCursorPosition}`;
      textarea.selectionStart = cursorPosition + 1;
      textarea.selectionEnd = cursorPosition + 1;
      textarea.focus();
    });
    row.appendChild(keyEnter);
  }

  if (i === 3) {
    const keyShift = createKey(["service-buttons", "shift2"], "shift");
    row.appendChild(keyShift);
  }

  return row;
}

for (let i = 0; i < rows.length; i += 1) {
  const row = createRow(i);
  containerRows.appendChild(row);
}

window.addEventListener("load", () => {
  if (capsLockEnabled === "true") {
    keys.forEach((key) => {
      const uppercaseText = key.textContent.toUpperCase();
      key.textContent = uppercaseText;
    });
  }
});

const keys = document.querySelectorAll(".key");

function handleKeyDown(event) {
  if (event.shiftKey && event.target.classList.contains("key")) {
    event.preventDefault();
    textarea.value += event.target.textContent.toUpperCase();
  }
}

document.addEventListener("keydown", handleKeyDown);

if (capsLockEnabled === "true") {
  keys.forEach((key) => {
    key.textContent = key.textContent.toUpperCase();
  });
}

if (isRussian === "true") {
  for (let i = 0; i < rowsWithRussian.length; i += 1) {
    const currentRow = containerRows.children[i];
    for (let j = 0; j < rowsWithRussian[i].length; j += 1) {
      currentRow.children[j + 1].textContent = rowsWithRussian[i][j];
    }
  }
}

document.addEventListener("keydown", (event) => {
  const key = document.querySelectorAll(
    `.key[data-key="${event}"], .service-buttons[data-key="${event}"]`
  );
  if (key) {
    key.forEach((el) => {
      el.click();
      el.classList.add("pressed");
    });
  }
});

function onKeyPress(event) {
  const value = event.target.innerHTML;
  textarea.value += value;
}

keys.forEach((key) => key.addEventListener("click", onKeyPress));
