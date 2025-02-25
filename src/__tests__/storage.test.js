import {
  saveCapsLockState,
  getCapsLockEnabled,
  saveLanguageState,
  getLanguage,
} from "../storage.js";

describe("Storage Module", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Capslock Storage", () => {
    test("saveCapsLockState updates localStorage", () => {
      saveCapsLockState(true);
      expect(localStorage.getItem("capsLockEnabled")).toBe("true");
      expect(getCapsLockEnabled()).toBe(true);
    });

    test("getCapsLockEnabled retrieves state", () => {
      localStorage.setItem("capsLockEnabled", "true");
      expect(getCapsLockEnabled()).toBe(true);
    });
  });

  describe("Language Storage", () => {
    test("saveLanguageState updates localStorage", () => {
      saveLanguageState(true);
      expect(localStorage.getItem("isRussian")).toBe("true");
      expect(getLanguage()).toBe(true);
    });

    test("getLanguage retrieves state", () => {
      localStorage.setItem("isRussian", "true");
      expect(getLanguage()).toBe(true);
    });
  });
});
