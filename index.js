const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
document.body.appendChild(keyboard);
const textarea = document.createElement("textarea");
textarea.classList.add("textarea");
keyboard.appendChild(textarea);
const containerRows = document.createElement("div");
containerRows.classList.add("container-rows");
keyboard.appendChild(containerRows);
const comment = document.createElement("div");
comment.classList.add("comment");
comment.innerHTML =
  "Клавиатура создана в операционной системе macOS<br/>Для переключения языка воспользуйтесь \u{1F310}";
keyboard.appendChild(comment);

const rows = ["1234567890?`", "qwertyuiop+", "asdfghjkl;,-", "zxcvbnm<>/", ""];
const rowsWithRussian = [
  "1234567890?",
  "йцукенгшщзх",
  "фывапролджэё",
  "ячсмитьбю?",
  "",
];


let capsLockEnabled = localStorage.getItem('capsLockEnabled');
console.log(capsLockEnabled)
let isRussian = localStorage.getItem('isRussian');


for (let i = 0; i < rows.length; i++) {
  let row = document.createElement("div");
  row.classList.add("row");

  if (i === 0) {
    let keyEsc = document.createElement("div");
    keyEsc.classList.add("esc", "service-buttons");
    keyEsc.textContent = "esc";
    row.insertBefore(keyEsc, row.firstChild);
  }

  if (i === 1) {
    let keyTab = document.createElement("div");
    keyTab.classList.add("tab", "service-buttons");
    keyTab.textContent = "tab";
    row.insertBefore(keyTab, row.firstChild);

    keyTab.addEventListener("click", addIndent);


  }
  if (i === 2) {
    let keyCapsLock = document.createElement("div");
    keyCapsLock.classList.add("service-buttons", "caps");
    keyCapsLock.textContent = "caps lock";
    row.insertBefore(keyCapsLock, row.firstChild);

    keyCapsLock.addEventListener("click", toggleCapslock);
  }

  if (i === 3) {
    let keyShift = document.createElement("div");
    keyShift.classList.add("service-buttons", "shift");
    keyShift.textContent = "shift";
    row.insertBefore(keyShift, row.firstChild);
  }
  for (let j = 0; j < rows[i].length; j++) {
    let key = document.createElement("div");
    key.classList.add("key");
    key.textContent = rows[i][j];
    row.appendChild(key);
  }

  if (i === 0) {
    let keyDelete = document.createElement("div");
    keyDelete.classList.add("service-buttons", "delete");
    keyDelete.textContent = "delete";
    row.appendChild(keyDelete);

    keyDelete.addEventListener("click", deletePreviousChar);
  }

  if (i === 1) {
    let keyEnter = document.createElement("div");
    keyEnter.classList.add("service-buttons", "enter");
    keyEnter.textContent = "enter";
    row.appendChild(keyEnter);

    keyEnter.addEventListener("click", function() {
      let cursorPosition = textarea.selectionStart;
      let textBeforeCursorPosition = textarea.value.substring(0, cursorPosition);
      let textAfterCursorPosition = textarea.value.substring(cursorPosition, textarea.value.length);
      textarea.value = textBeforeCursorPosition + "\n" + textAfterCursorPosition;
      textarea.selectionStart = cursorPosition + 1;
      textarea.selectionEnd = cursorPosition + 1;
      textarea.focus();
    });
  }

  if (i === 3) {
    let keyShift = document.createElement("div");
    keyShift.classList.add("service-buttons", "shift2");
    keyShift.textContent = "shift";
    row.appendChild(keyShift);
  }

  if (i === 4) {
    let keyFn = document.createElement("div");
    keyFn.classList.add("service-buttons");
    keyFn.textContent = "\u{1F310}";
    row.appendChild(keyFn);

    function handleClick() {
      if (isRussian) {
        for (let i = 0; i < rows.length; i++) {
          let currentRow = containerRows.children[i];
          for (let j = 0; j < rows[i].length; j++) {
            currentRow.children[j + 1].textContent = rows[i][j];
          }
        }
        isRussian = false;
      } else {
        for (let i = 0; i < rowsWithRussian.length; i++) {
          let currentRow = containerRows.children[i];
          for (let j = 0; j < rowsWithRussian[i].length; j++) {
            currentRow.children[j + 1].textContent = rowsWithRussian[i][j];
          }
        }
        isRussian = true;
      }
      localStorage.setItem('isRussian', isRussian);
      if (Boolean(capsLockEnabled) === true) {
        const keys = document.querySelectorAll(".key");
        keys.forEach((key) => {
          key.textContent = key.textContent.toUpperCase();
        });
      }
      else {
        keys.forEach((key) => {
          key.textContent = key.textContent.toLowerCase();
        });
      }
    }

    keyFn.addEventListener("click", handleClick);

    let keyCtrl = document.createElement("div");
    keyCtrl.classList.add("service-buttons", "ctrl");
    keyCtrl.setAttribute("value", " ");
    keyCtrl.textContent = "control";
    row.appendChild(keyCtrl);

    keyCtrl.addEventListener("click", function () {
      textarea.value = "";
    });

    let keyOption1 = document.createElement("div");
    keyOption1.classList.add("service-buttons", "option");
    keyOption1.textContent = "option";
    row.appendChild(keyOption1);

    let keyCmd1 = document.createElement("div");
    keyCmd1.classList.add("service-buttons", "cmd");
    keyCmd1.textContent = "command";
    row.appendChild(keyCmd1);

    let keySpace = document.createElement("div");
    keySpace.classList.add("service-buttons", "space");
    keySpace.textContent = "";
    row.appendChild(keySpace);

    keySpace.addEventListener("click", addSpace);


    let keyCmd2 = document.createElement("div");
    keyCmd2.classList.add("service-buttons", "cmd");
    keyCmd2.textContent = "command";
    row.appendChild(keyCmd2);

    let keyOption2 = document.createElement("div");
    keyOption2.classList.add("service-buttons", "option");
    keyOption2.textContent = "option";
    row.appendChild(keyOption2);

    let keyLeft = document.createElement("div");
    keyLeft.classList.add("service-buttons", "arrow");
    keyLeft.textContent = "←";
    row.appendChild(keyLeft);

    keyLeft.addEventListener("click", addLeft);


    let keyUp = document.createElement("div");
    keyUp.classList.add("service-buttons", "arrow");
    keyUp.textContent = "↑";
    row.appendChild(keyUp);


    keyUp.addEventListener("click", addUp);

    let keyRight = document.createElement("div");
    keyRight.classList.add("service-buttons", "arrow");
    keyRight.textContent = "→";
    row.appendChild(keyRight);

    keyRight.addEventListener("click", addRight);

    let keyDown = document.createElement("div");
    keyDown.classList.add("service-buttons", "arrow");
    keyDown.textContent = "↓";
    row.appendChild(keyDown);

    keyDown.addEventListener("click", addDown);
  }


  window.addEventListener('load', () => {
    if (capsLockEnabled === "true") {
      keys.forEach((key) => {
        key.textContent = key.textContent.toUpperCase();
      })
    }
  
  });
  containerRows.appendChild(row);
}

const keys = document.querySelectorAll(".key");
const serviceButtons = document.querySelectorAll('.service-buttons');


function addLeft() {
  textarea.value = textarea.value + "←";
} 

function addRight() {
  textarea.value = textarea.value + "→";
}

function addUp() {
  textarea.value = textarea.value + "↑";
}

function addDown() {
  textarea.value = textarea.value + "↓";
}

function handleKeyDown(event) {
  if (event.shiftKey && event.target.classList.contains('key')) {
    event.preventDefault();
    textarea.value += event.target.textContent.toUpperCase();
  }
}

document.addEventListener('keydown', handleKeyDown);

if (capsLockEnabled==="true") {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    key.textContent = key.textContent.toUpperCase();
  })
}

if (isRussian==="true") {
  for (let i = 0; i < rowsWithRussian.length; i++) {
    let currentRow = containerRows.children[i];
    for (let j = 0; j < rowsWithRussian[i].length; j++) {
      currentRow.children[j + 1].textContent = rowsWithRussian[i][j];
    }
  }
}

function deletePreviousChar() {
  let cursorPosition = textarea.selectionStart;
  if (cursorPosition > 0) {
    let text = textarea.value;
    textarea.value = text.substring(0, cursorPosition - 1) + text.substring(cursorPosition);
    textarea.selectionStart = cursorPosition - 1;
    textarea.selectionEnd = cursorPosition - 1;
  }
}


function toggleCapslock() {
  keys.forEach((key) => {
    if (!capsLockEnabled) {
      key.textContent = key.textContent.toUpperCase();
    } else {
      key.textContent = key.textContent.toLowerCase();
    }
  });
  capsLockEnabled = !capsLockEnabled;
  localStorage.setItem('capsLockEnabled', capsLockEnabled);

}

function addSpace() {
  textarea.value = textarea.value + " ";
}

function addIndent() {
  textarea.value = textarea.value + "    ";
}

function onKeyPress(event) {
  const value = event.target.innerHTML;
  textarea.value += value;
}

document.addEventListener("keydown", (event) => {
  const key = document.querySelectorAll(`.key[data-key="${event}"], .service-buttons[data-key="${event}"]`); 
  if(key) {
    key.forEach(el => {el.click();
    el.classList.add("pressed");}
    ); 
    
  }
});


keys.forEach((key) => key.addEventListener("click", onKeyPress));
