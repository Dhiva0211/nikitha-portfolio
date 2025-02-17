import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const TitleDescHr = dynamic(
  () =>
    import('@/components/common/two-text').then(mod => ({
      default: mod.TitleDescHr,
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

const offerings = [
  { id: 1, name: 'Offering 1' },
  { id: 2, name: 'Offering 2' },
  { id: 3, name: 'Offering 3' },
  { id: 4, name: 'Offering 4' },
  { id: 5, name: 'Offering 5' },
  { id: 6, name: 'Offering 6' },
  { id: 7, name: 'Offering 7' },
  { id: 8, name: 'Offering 8' },
  { id: 9, name: 'Offering 9' },
  { id: 10, name: 'Offering 10' },
];

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
    props: {},
  };
};

const SetUpBasicOfferingFeatures: FC = () => (
  <section className="mt-4 w-full overflow-x-hidden">
    <ShowWindowTitle smallTitle secondTitle="Set up basic offering features" />

    <section className="m-2 grid md:grid-cols-2">
      {offerings.map(offering => (
        <section key={offering.id}>
          <h3 className="m-4 text-center text-xl font-bold">{offering.name}</h3>
          <section className="grid grid-cols-2 place-items-center gap-6">
            <Link
              href={{
                pathname:
                  routes.vendor.inputOfferings.objMachPack
                    .setUpBasicOfferingFeatures.size,
                query: { number: offering.id },
              }}
              className="flex size-24 items-center justify-center rounded-2xl border-4 p-2"
            >
              Size
            </Link>
            <Link
              href={{
                pathname:
                  routes.vendor.inputOfferings.objMachPack
                    .setUpBasicOfferingFeatures.color,
                query: { number: offering.id },
              }}
              className="flex size-24 items-center justify-center rounded-2xl border-4 p-2"
            >
              Color
            </Link>
            <Link
              href={{
                pathname:
                  routes.vendor.inputOfferings.objMachPack
                    .setUpBasicOfferingFeatures.material,
                query: { number: offering.id },
              }}
              className="flex size-24 items-center justify-center rounded-2xl border-4 p-2"
            >
              Material
            </Link>
            <Link
              href={{
                pathname:
                  routes.vendor.inputOfferings.objMachPack
                    .setUpBasicOfferingFeatures.weight,
                query: { number: offering.id },
              }}
              className="flex size-24 items-center justify-center rounded-2xl border-4 p-2"
            >
              Weight
            </Link>
          </section>
        </section>
      ))}
    </section>

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Vendor Use Templates for 3D Customization Presentation to Shoppittos"
    />
    <TitleDescHr
      title="Vendor Boost subscription"
      description="Vendor Scan your Object in 2D and use it for Customization Presentation to Shoppittos"
    />
    <TitleDescHr
      title="Vendor Boost subscription"
      description="Vendor Scan your Object in 3D and use it for Customization Presentation to Shoppittos"
    />

    <CommonLink href={routes.vendor.inputOfferings.objMachPack.default}>
      <span className="py-1 text-xl font-bold">Done</span>
    </CommonLink>
  </section>
);

export default SetUpBasicOfferingFeatures;
export { getServerSideProps };
