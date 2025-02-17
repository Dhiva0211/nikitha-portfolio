import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryOrderSetUp } from '@/helpers/initial-values';

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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const options = [
  {
    name: 'Choose Shoppitto License Delivery Method',
    link: routes.underConstruction,
    query: null,
  },
  {
    name: 'Optional Integrate with Digital Shipping Company Software',
    link: routes.underConstruction,
    query: {
      name: 'Optional Integrate with Digital Shipping Company Software',
    },
  },
  {
    name: 'Optional Integrate with Onsite Shipping Company Software',
    link: routes.underConstruction,
    query: {
      name: 'Optional Integrate with Onsite Shipping Company Software',
    },
  },
  {
    name: 'Optional Input Allowed Shipping Destinations Manually',
    link: routes.vendor.orderSetup.licenseNft.nft.shippingDestination,
    query: null,
  },
  {
    name: 'Optional Choose To Make a License Smart Contract',
    link: routes.underConstruction,
    query: null,
  },
  {
    name: 'Optional Choose the vendor License Contract Delivery Method',
    link: routes.underConstruction,
    query: null,
  },
];

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryOrderSetUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const OrderSetUp: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Order set up" />

    <h3 className="m-2 text-center text-xl">Order wait list</h3>
    <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
      <section className="grid grid-cols-3 items-center justify-center rounded-2xl border-4 p-2 text-center align-middle">
        <span>UpUnikSelf order tracking number</span>
        <span>[License]</span>
        <span>[Full price]</span>
      </section>
      <Link href={routes.vendor.orderSetup.licenseNft.nft.trackingNumber}>
        <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4" />
      </Link>
      <Link href={routes.vendor.orderSetup.licenseNft.nft.trackingNumber}>
        <section className="-mt-5 h-14 w-full rounded-b-2xl border-x-4 border-b-4" />
      </Link>
      <button type="button" className="w-full text-center">
        Show More
      </button>
    </section>

    <h3 className="m-2 mt-4 text-center text-xl font-bold">
      Order Set Up Settings
    </h3>
    <section className="m-2">
      {options.map(({ name, link, query }) => (
        <Link
          key={name}
          href={{
            pathname: link,
            query: query,
          }}
          className="mx-4 my-2 grid grid-cols-3 items-center justify-center align-middle"
        >
          <span className="col-span-2">{name}</span>
          <section className="mx-auto size-12 rounded-2xl bg-deep-sapphire md:size-20" />
        </Link>
      ))}
    </section>

    <Description>
      You will have to give us insight into your License Agreement delivery
      options in order to complete your offerings listing process. You can
      choose onsite and online, You can choose to make a license Smart Contract
      and to attach that smart contract to your NFT.
    </Description>

    <CommonLink href={routes.vendor.dashboard}>
      <section className="py-1 text-lg md:text-xl lg:text-2xl">Done</section>
    </CommonLink>
  </section>
);

export default OrderSetUp;
export { getServerSideProps };
