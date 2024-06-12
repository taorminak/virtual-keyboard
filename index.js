import { getCapsLockEnabled, getLanguage } from "./storage.js";
import {
  createComment,
  createContainerRows,
  createTextarea,
  createKeyboard,
  createKey,
} from "./layout.js";
import { toggleCapslock, toggleLanguage } from "./utils.js";
import { ROWS, ROWS_WITH_RUSSIAN } from "./data.js";

let capsLockEnabled = getCapsLockEnabled();
let isRussian = getLanguage();
let isShiftPressed;

const keyboard = createKeyboard();
const textarea = createTextarea(keyboard);
const containerRows = createContainerRows(keyboard);
createComment(keyboard);

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

function handleClick() {
  toggleLanguage();
  toggleCapslock();
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
  for (let j = 0; j < ROWS[i].length; j++) {
    const key = createKey(["key"], ROWS[i][j]);
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

for (let i = 0; i < ROWS.length; i += 1) {
  const row = createRow(i);
  containerRows.appendChild(row);
}

const keys = document.querySelectorAll(".key");

window.addEventListener("load", () => {
  if (capsLockEnabled) {
    keys.forEach((key) => {
      const uppercaseText = key.textContent.toUpperCase();
      key.textContent = uppercaseText;
    });
  }
});

if (isRussian) {
  for (let i = 0; i < ROWS_WITH_RUSSIAN.length; i += 1) {
    const currentRow = containerRows.children[i];
    for (let j = 0; j < ROWS_WITH_RUSSIAN[i].length; j += 1) {
      currentRow.children[j + 1].textContent = ROWS_WITH_RUSSIAN[i][j];
    }
  }
}

function onPressKey(event) {
  const key = event.target;
  if (key.classList.contains("key")) {
    const value = isShiftPressed
      ? key.textContent.toUpperCase()
      : key.textContent;
    textarea.value += value;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Shift") {
    isShiftPressed = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "Shift") {
    isShiftPressed = false;
  }
});

keys.forEach((key) => key.addEventListener("click", onPressKey));
