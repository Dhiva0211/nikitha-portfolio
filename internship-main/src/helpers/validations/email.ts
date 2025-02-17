const validateEmail = (email: string | undefined): boolean => {
  if (!email) return false;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailPattern.test(email);
};

export { validateEmail };
