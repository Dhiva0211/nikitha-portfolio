import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { useRouter } from 'next/router';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import clock from '@//public/images/waiting.png';
import Image from 'next/image';
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

const optionsList = [
  {
    name: 'Ensure Shoppitto chose an available calendar appointment',
    random: 0.2,
  },
  { name: 'Ensure Order can be Delivered', random: 0.8 },
  { name: 'UpUnikSelf has checked payment details', random: 0.5 },
  { name: 'UpUnikSelf confirms retention of fiat payment', random: 0.3 },
  {
    name: 'UpUnikSelf has sent an order confirmation email to Shoppitto',
    random: 0.7,
  },
  { name: 'UpUnikSelf confirms crypto payment (Coming Soon)', random: 0.1 },
  {
    name: 'UpUnikSelf has sent an invoice and receipt email to Shoppitto',
    random: 0.9,
  },
  { name: 'Vendor has decided to cancel the order', random: 0.4 },
  {
    name: 'UpUnikSelf has sent an email to Shoppitto confirm order cancellation for unexpected circumstances',
    random: 0.0,
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

const tableList = ['Tier Name', 'Due Date', 'Quantity', 'Full Price'];
const TrackingNumber: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Order Number" />

      <h3 className="m-2 text-3xl font-bold">
        [UpUnikSelf Order Tracking Number]
      </h3>

      {optionsList.map(option => (
        <section
          className="m-2 flex grid-cols-2 place-items-start content-center items-center justify-around"
          key={option.name}
        >
          <span className="w-1/2 rounded-2xl border-4 bg-deep-sapphire p-2 text-left text-xl font-bold text-white">
            {option.name}
          </span>
          <span className="flex size-16 items-center justify-center rounded-l border-4 text-xl font-bold sm:rounded-2xl">
            {option.random > 0.2 ? (
              'Yes'
            ) : (
              <Image
                src={clock}
                alt="Waiting"
                width={747}
                height={625}
                className="size-14 object-contain sm:size-20"
              />
            )}
          </span>
        </section>
      ))}

      <label className="m-2 flex grid-cols-2 justify-around text-2xl font-bold">
        <span className="w-1/2">Retention of fees by UpUnikSelf</span>
        <input
          type="text"
          className="w-16 rounded-2xl border-4 text-center"
          defaultValue="$0"
          readOnly
          disabled
        />
      </label>

      <Description>
        Fees retained by UpUnikSelf for payment to the shipping company, all
        other fees relating to the completion of this order, and taxes.
      </Description>

      <h3 className="text-center text-2xl font-bold">Order Details</h3>
      <section className="m-2 flex items-center justify-center overflow-y-hidden overflow-x-visible p-2">
        <table className="border-separate border-spacing-0 overflow-hidden rounded-2xl border-4">
          <thead>
            <tr className="h-16">
              <th className="rounded-tl-2xl border-b-4 border-r-4 px-4 py-2">
                Solution Name
              </th>
              <th className="rounded-tr-2xl border-b-4 px-4 py-2 font-bold">
                [Solution Name]
              </th>
            </tr>
          </thead>
          <tbody>
            {tableList.map((table, index) => (
              <tr key={table} className="h-16 last:border-b-0">
                <td
                  className={`border-r-4 px-4 py-2 text-center ${
                    index === tableList.length - 1 ? '' : 'border-b-4'
                  }`}
                >
                  {table}
                </td>
                <td
                  className={`w-1/2 px-4 py-2 text-center ${
                    index === tableList.length - 1 ? '' : 'border-b-4'
                  }`}
                >
                  [{table}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <CommonLink
        href={
          routes.vendor.orderSetup.generalSolutions.individualServices.default
        }
        onClick={goBack}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default TrackingNumber;
export { getServerSideProps };
