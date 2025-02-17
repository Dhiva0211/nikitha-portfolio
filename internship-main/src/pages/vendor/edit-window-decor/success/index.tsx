import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const EditWindowDecorSuccess: FC = () => (
  <section className="mt-4 flex min-h-fit flex-col items-center justify-center sm:m-4 md:m-6 lg:m-8 xl:m-10">
    <ShowWindowTitle smallTitle />
    <p className="m-6 mt-2 text-center text-2xl font-bold sm:text-xl md:text-2xl lg:text-3xl xl:mt-10 xl:text-4xl">
      Your Vendor&apos;s Name change has been successfully submitted
    </p>
    <p className="m-6 mt-2 text-center text-xl font-bold sm:text-base md:text-xl lg:text-2xl xl:text-3xl">
      You will receive an email briefly with an update on the approval of your
      Vendor&apos;s Name change.
    </p>
    <p className="m-6 mt-2 text-center sm:text-base md:text-xl lg:text-2xl xl:text-2xl">
      With the approval email you can access your ShopWindow with your changed
      Vendor&apos;s Name!
    </p>
    <CommonLink href={routes.vendor.dashboard}>
      <section className="m-2 p-2">Done</section>
    </CommonLink>
  </section>
);

export default EditWindowDecorSuccess;
