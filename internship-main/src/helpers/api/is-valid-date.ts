const isValidDate = (dateString: string | null): boolean => {
  if (!dateString) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export default isValidDate;
