export const saveCapsLockState = (capsLockEnabled) => {
  localStorage.setItem('capsLockEnabled', JSON.stringify(capsLockEnabled));
};

export const saveLanguageState = (isRussian) => {
  localStorage.setItem('isRussian', JSON.stringify(isRussian));
};

export const getCapsLockEnabled = () => {
  const capsLockEnabled = localStorage.getItem('capsLockEnabled');
  return capsLockEnabled === null ? false : JSON.parse(capsLockEnabled);
};

export const getLanguage = () => {
  const isRussian = localStorage.getItem('isRussian');
  return isRussian === null ? false : JSON.parse(isRussian);
};
