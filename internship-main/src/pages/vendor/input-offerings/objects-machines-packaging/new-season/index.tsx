import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { categoryInputOfferings } from '@/helpers/initial-values';

const EditOfferingObjMachPack = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/new-season/edit-offering-obj-math-pack'
    ).then(mod => ({
      default: mod.EditOfferingObjMachPack,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const GridOrList = dynamic(
  () =>
    import('@/components/vendor/grid-or-list').then(mod => ({
      default: mod.GridOrList,
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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {
      frameColor: user?.BusinessInfo?.businessLayout?.frameColor as string,
      bgColor: user?.BusinessInfo?.businessLayout?.bgColor as string,
    },
  };
};

interface NewSeasonProps {
  readonly frameColor: string;
  readonly bgColor: string;
}

const NewSeason: FC<NewSeasonProps> = ({ bgColor, frameColor }) => {
  const router = useRouter();
  router.query.bgColor = bgColor;
  return (
    <EditOfferingObjMachPack>
      <section
        style={{ backgroundColor: bgColor }}
        className="mx-auto flex size-full flex-col items-center justify-center bg-pale-cyan px-2 py-6 md:px-10"
      >
        <ShowWindowTitle secondTitle="Add new season offering" />
        <Description>
          Click on one of the existing offerings to reserve it to automatically
          switch to the new season offering in the pre-selected date after it
          has been pre-approved. All orders of the previous offering will still
          have to be completed.
        </Description>
        <GridOrList
          frameColor={frameColor}
          href={routes.vendor.inputOfferings.objMachPack.newSeason.default}
        />
        <CommonLink href={routes.vendor.inputOfferings.objMachPack.default}>
          <section className="p-2">Done</section>
        </CommonLink>
      </section>
    </EditOfferingObjMachPack>
  );
};

export default NewSeason;
export { getServerSideProps };
