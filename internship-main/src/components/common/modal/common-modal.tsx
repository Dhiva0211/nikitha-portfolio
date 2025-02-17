import { FC, ReactNode } from 'react';

interface ModalProps {
  readonly modalId: string;
  readonly title: string;
  children: ReactNode;
}

const CommonModal: FC<ModalProps> = ({ modalId, title, children }) => (
  <dialog
    id={modalId}
    className="z-50 flex flex-col items-center rounded-2xl border-4 p-2 text-deep-sapphire"
    open
  >
    <h3 className="mb-4 text-center text-lg font-bold md:text-xl lg:text-2xl">
      {title}
    </h3>

    {children}
  </dialog>
);

export default CommonModal;
