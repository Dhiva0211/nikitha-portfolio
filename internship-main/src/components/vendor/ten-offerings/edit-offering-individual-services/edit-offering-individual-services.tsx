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

interface EditOfferingIndividualServicesProps {
  children: ReactNode;
}

const EditOfferingIndividualServices: FC<
  EditOfferingIndividualServicesProps
> = ({ children }) => {
  const { query } = useRouter();

  return (
    <RenderIf
      condition={hasAProperty(query, 'edit')}
      then={<Component />}
      otherwise={children}
    />
  );
};

export default EditOfferingIndividualServices;
