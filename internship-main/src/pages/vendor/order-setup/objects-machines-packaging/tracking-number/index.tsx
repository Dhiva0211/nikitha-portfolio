import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { useRouter } from 'next/router';
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
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
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
  'Confirmation that there is stock',
  'Ensure order can be shipped',
  'UpUnikSelf has checked payment details',
  'UpUnikSelf confirms retention of fiat payment',
  'UpUnikSelf has sent an order confirmation email to Shoppitto',
  'UpUnikSelf confirms crypto payment',
  'UpUnikSelf has sent an invoice and receipt email to Shoppitto',
];
const tableList = [
  '[Basic offering size]',
  '[Basic offering color]',
  '[Basic offering material]',
  '[Basic offering weight]',
  '[Basic offering price]',
  '[Customization technology]',
  '[Customization price]',
  '[Quantity]',
  '[Full price]',
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
              <th className="border-4">[Offering Name]</th>
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

      <h3 className="text-2xl font-bold">Customization File</h3>
      <CommonLinkNoBg href={routes.underConstruction}>
        <span className="text-center text-xl font-bold">
          View Customization
        </span>
      </CommonLinkNoBg>
      <CommonLink href={routes.underConstruction}>
        <span className="text-center text-xl font-bold">Download</span>
      </CommonLink>

      <section className="m-2 flex items-center justify-around">
        <span className="text-xl font-bold">Integrate with production</span>
        <Link href={routes.underConstruction}>
          <section className="size-12 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
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
