export const createKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  document.body.appendChild(keyboard);
  return keyboard;
};

export const createTextarea = (keyboard) => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  keyboard.appendChild(textarea);
  return textarea;
};

export const createContainerRows = (keyboard) => {
  const containerRows = document.createElement('div');
  containerRows.classList.add('container-rows');
  keyboard.appendChild(containerRows);
  return containerRows;
};

export const createComment = (keyboard) => {
  const comment = document.createElement('div');
  comment.classList.add('comment');
  comment.innerHTML = 'The keyboard is created in the macOS operating system<br/>To switch the language, use \u{1F310}';
  keyboard.appendChild(comment);
};

export function createKey(classes, textContent, clickHandler) {
  const key = document.createElement('div');
  key.classList.add(...classes);
  key.textContent = textContent;
  if (clickHandler) {
    key.addEventListener('click', clickHandler);
  }
  return key;
}
