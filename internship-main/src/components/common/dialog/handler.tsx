import { useEffect, Suspense, FC, ReactNode, JSX } from 'react';
import disableBodyScrollBar from './no-scroll-bar';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { RenderIf } from '@/helpers/common/render-conditional';

interface DialogHandlerProps {
  isOpen: boolean;
  children: ReactNode;
}

const DialogHandler: FC<DialogHandlerProps> = ({
  isOpen,
  children,
}): JSX.Element => {
  useEffect(() => {
    disableBodyScrollBar(isOpen);
  }, [isOpen]);

  return (
    <Suspense fallback={<DotsAnimation />}>
      <RenderIf condition={isOpen} then={children} otherwise={null} />
    </Suspense>
  );
};

export default DialogHandler;
