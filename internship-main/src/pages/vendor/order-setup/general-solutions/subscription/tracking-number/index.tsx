import { FC, useEffect, useState } from 'react';
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
  'Ensure Shoppitto chose an available calendar appointment',
  'Ensure Order can be Delivered',
  'UpUnikSelf has checked payment details',
  'UpUnikSelf confirms retention of fiat payment',
  'UpUnikSelf has sent an order confirmation email to Shoppitto',
  'UpUnikSelf confirms crypto payment (coming soon)',
  'UpUnikSelf has sent an invoice and receipt email to Shoppitto',
  'Vendor has decided to cancel the order',
  'UpUnikSelf has sent an email to Shoppitto confirm order cancellation for unexpected circumstances',
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

const tableList = ['Plan Name', 'Due Date', 'Quantity', 'Full Price'];

const TrackingNumber: FC = () => {
  const router = useRouter();
  const [randomValues, setRandomValues] = useState<number[]>([]);

  useEffect(() => {
    setRandomValues(
      Array(optionsList.length)
        .fill(null)
        .map(() => Math.random()),
    );
  }, []);

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Order Number" />

      <h3 className="my-8 text-center text-3xl font-bold">
        [UpUnikSelf Order Tracking Number]
      </h3>

      {optionsList.map((option, index) => (
        <section
          className="flex w-full items-center justify-center space-x-4 p-4"
          key={index}
        >
          <span className="w-3/4 rounded-2xl bg-deep-sapphire p-4 text-center text-xl font-bold text-white">
            {option}
          </span>
          <span className="ml-8 flex size-16 items-center justify-center rounded-2xl border-4 text-xl font-bold">
            {randomValues[`${index}`] > 0.2 ? (
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

      <div className="my-8 text-center">
        <label className="flex flex-col items-center text-2xl font-bold">
          Retention of fees by UpUnikSelf
          <input
            type="text"
            className="mt-4 w-16 rounded-2xl border-4 text-center"
            defaultValue="$0"
            readOnly
            disabled
          />
        </label>
      </div>

      <Description>
        Fees retained by UpUnikSelf for payment to the shipping company, all
        other fees relating to the completion of this order, and taxes.
      </Description>

      <h3 className="mt-8 text-center text-2xl font-bold">Order Details</h3>

      <section className="m-4 flex justify-center overflow-x-auto">
        <table className="border-collapse border-4 text-center">
          <thead>
            <tr className="h-16">
              <th className="border-4">Solution Name</th>
              <th className="border-4">[Solution Name]</th>
            </tr>
          </thead>
          <tbody>
            {tableList.map((item, index) => (
              <tr key={index} className="h-16">
                <td className="border-4">{item}</td>
                <td className="border-4">[{item}]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <CommonLink
        href={routes.vendor.orderSetup.generalSolutions.subscription.default}
        onClick={goBack}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default TrackingNumber;
export { getServerSideProps };
