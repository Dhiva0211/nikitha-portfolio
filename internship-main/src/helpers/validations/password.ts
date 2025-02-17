const passwordSize = 8;
const passwordPattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

const passwordSizeValidation = (password: string | undefined): boolean => {
  if (!password) return false;

  return password.length >= passwordSize;
};

const passwordPatternValidation = (password: string | undefined): boolean => {
  if (!password) return false;

  return new RegExp(passwordPattern).test(password);
};

export { passwordSizeValidation, passwordPatternValidation };
