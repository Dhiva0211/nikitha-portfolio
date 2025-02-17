import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { useRouter } from 'next/router';
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

const optionsList = [
  'Ensure Order can be Delivered',
  'UpUnikSelf has checked payment details',
  'UpUnikSelf confirms retention of fiat payment',
  'UpUnikSelf confirms Shoppitto has signed the License Agreement',
  'UpUnikSelf confirms vendor has signed the license agreement',
  'UpUnikSelf has sent an order confirmation email to Shoppitto',
  'UpUnikSelf confirms crypto payment',
  'UpUnikSelf has sent an invoice and receipt email to Shoppitto',
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

const tableList = ['Beginning Date', 'End Date', 'Quantity', 'Full Price'];
const TrackingNumber: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle
        smallTitle
        secondTitle="[UpUnikSelf Order Tracking Number]"
      />

      {optionsList.map(option => (
        <section
          className="m-2 grid grid-cols-2 place-items-center content-center items-center"
          key={option}
        >
          <span className="rounded-2xl border-4 bg-deep-sapphire text-center text-xl font-bold text-white">
            {option}
          </span>
          <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
            Yes
          </span>
        </section>
      ))}

      <label className="flex justify-around text-2xl font-bold">
        Retention of fees by UpUnikSelf
        <input
          type="text"
          className="w-16 rounded-2xl border-4 text-center"
          defaultValue="$0"
        />
      </label>

      <Description>
        Fees retained by UpUnikSelf for payment to the shipping company, all
        other fees relating to the completion of this order, and taxes.
      </Description>

      <h3 className="text-center text-2xl font-bold">Order Details</h3>
      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <table className="border-collapse border-4">
          <thead>
            <tr className="h-16">
              <th className="border-4">License Name</th>
              <th className="border-4" />
            </tr>
          </thead>
          <tbody>
            {tableList.map(table => (
              <tr key={table} className="h-16">
                <td className="border-4 text-center">{table}</td>
                <td className="w-1/2 border-4" />
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <CommonLink
        href={routes.vendor.orderSetup.licenseNft.artwork.default}
        onClick={goBack}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default TrackingNumber;
export { getServerSideProps };
