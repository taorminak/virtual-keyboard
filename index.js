var keyboard = {
    keys: [
      { value: "1", fn: function() { /* функция для клавиши 1 */ } },
      { value: "2", fn: function() { /* функция для клавиши 2 */ } }
    ]
  };
  
  function renderKeyboard() {
    var keyboardElement = document.createElement("div");
    keyboardElement.classList.add("keyboard");
    
    keyboard.keys.forEach(function(key) {
      var keyElement = document.createElement("button");
      keyElement.textContent = key.value;
      keyElement.addEventListener("click", key.fn);
      keyboardElement.appendChild(keyElement);
    });
    
    document.body.appendChild(keyboardElement);
  }
  
  renderKeyboard();

