const disableBodyScrollBar = (isOpen: boolean) => {
  if (isOpen) document.body.classList.add('overflow-hidden');

  if (!isOpen) document.body.classList.remove('overflow-hidden');
};

export default disableBodyScrollBar;
