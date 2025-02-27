export function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.classList.add(
    'h-screen',
    'w-full',
    'flex-col',
    'justify-center',
    'items-center',
    'bg-black',
    'text-white',
    'keyboard',
  );
  document.body.appendChild(keyboard);
  return keyboard;
}

export function createTextarea(keyboard) {
  const textarea = document.createElement('textarea');
  textarea.classList.add(
    'w-4/5',
    'max-h-[40vh]',
    'min-h-[20vh]',
    'text-[22px]',
    'font-system',
    'rounded-lg',
    'mb-[10px]',
    'resize-none',
    'p-[10px]',
    'my-[10px]',
    'bg-white',
    'text-black',
    'textarea',
  );
  keyboard.appendChild(textarea);
  return textarea;
}

export function createContainerRows(keyboard) {
  const containerRows = document.createElement('div');
  containerRows.classList.add(
    'w-4/5',
    'p-[5px]',
    'my-[10px]',
    'rounded-[10px]',
    'border-2',
    'border-[#f09394]',
    'container-rows',
  );
  keyboard.appendChild(containerRows);
  return containerRows;
}

export function createComment(keyboard) {
  const comment = document.createElement('p');
  comment.innerHTML = 'The keyboard is created in the macOS operating system<br/>To switch the language, use \u{1F310}';
  comment.classList.add(
    'font-system',
    'text-xs',
    'text-white',
    'mt-2.5',
    'md:text-[10px]',
    'sm:text-[8px]',
    'comment',
  );
  keyboard.appendChild(comment);
  return comment;
}

export function createKey(classes, text, clickHandler) {
  const key = document.createElement('div');
  key.classList.add(...classes, 'active:rounded-[15px]', 'active:bg-[#f09394]', 'active:text-white');
  key.textContent = text;
  if (clickHandler) {
    key.addEventListener('click', clickHandler);
  }
  return key;
}
