import {
  createKeyboard,
  createTextarea,
  createContainerRows,
  createKey,
} from "../layout.js";

describe("Layout Module", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("createKeyboard creates keyboard element with correct class", () => {
    const keyboard = createKeyboard();
    expect(keyboard.classList.contains("keyboard")).toBe(true);
    expect(document.body.contains(keyboard)).toBe(true);
  });

  test("createTextarea creates textarea with correct attributes", () => {
    const keyboard = createKeyboard();
    const textarea = createTextarea(keyboard);

    expect(textarea.classList.contains("textarea")).toBe(true);
    expect(keyboard.contains(textarea)).toBe(true);
  });

  test("createContainerRows creates container with correct class", () => {
    const keyboard = createKeyboard();
    const container = createContainerRows(keyboard);

    expect(container.classList.contains("container-rows")).toBe(true);
    expect(keyboard.contains(container)).toBe(true);
  });

  test("createKey creates key with correct attributes", () => {
    const classes = ["key", "test-class"];
    const text = "A";
    const clickHandler = jest.fn();

    const key = createKey(classes, text, clickHandler);

    expect(key.classList.contains("key")).toBe(true);
    expect(key.classList.contains("test-class")).toBe(true);
    expect(key.textContent).toBe(text);

    key.click();
    expect(clickHandler).toHaveBeenCalled();
  });
});
