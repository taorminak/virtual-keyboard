export const saveCapsLockState = (capsLockEnabled) => {
  localStorage.setItem('capsLockEnabled', capsLockEnabled);
};

export const saveLanguageState = (isRussian) => {
  localStorage.setItem('isRussian', isRussian);
};

export const getCapsLockEnabled = () => {
  const capsLockEnabled = localStorage.getItem('capsLockEnabled');
  return capsLockEnabled;
};

export const getLanguage = () => {
  const isRussian = localStorage.getItem('isRussian');
  return isRussian;
};
