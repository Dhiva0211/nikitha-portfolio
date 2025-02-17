import { hasAProperty } from '@/helpers/common/objects';
import { RenderIf } from '@/helpers/common/render-conditional';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';

const Component = dynamic(
  () =>
    import('./component').then(mod => ({
      default: mod.default,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface EditOfferingObjMachPackProps {
  children: ReactNode;
}

const EditOfferingObjMachPack: FC<EditOfferingObjMachPackProps> = ({
  children,
}) => {
  const { query } = useRouter();

  return (
    <RenderIf
      condition={hasAProperty(query, 'edit')}
      then={<Component edit={query?.edit} />}
      otherwise={children}
    />
  );
};

export default EditOfferingObjMachPack;
