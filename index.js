const keyboard = document.createElement('div');
keyboard.classList.add("keyboard");
document.body.appendChild(keyboard);
const textarea = document.createElement('textarea');
textarea.classList.add("textarea");
keyboard.appendChild(textarea);
const containerRows = document.createElement('div');
containerRows.classList.add("container-rows");
keyboard.appendChild(containerRows);
const comment = document.createElement('div');
comment.classList.add("comment");
comment.innerHTML = "Клавиатура создана в операционной системе macOS<br/>Для переключения языка воспользуйтесь комбинацией";
keyboard.appendChild(comment);

const rows = ['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

for (let i = 0; i < rows.length; i++) {
  let row = document.createElement('div');
  row.classList.add('row');
  for (let j = 0; j < rows[i].length; j++) {
    let key = document.createElement('div');
    key.classList.add('key');
    key.textContent = rows[i][j];
    row.appendChild(key);
  }
  
  containerRows.appendChild(row);
}


function onKeyPress(event) {
    const value = event.target.innerHTML;
    console.log(value);
    textarea.value += value;

}

const keys = keyboard.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', onKeyPress));


