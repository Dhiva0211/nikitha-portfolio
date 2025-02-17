import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { FC } from 'react';
import Link from 'next/link';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryManageReturns } from '@/helpers/initial-values';

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

const optionsList = [
  'Cancel order',
  'Send a Replacement',
  'Issue a Refund',
  'Access mediation',
];

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryManageReturns,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const ManageReturnsComplain: FC = () => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Manage Returns" />

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <h3 className="m-2 text-2xl font-bold">Reason for complaint</h3>
        <textarea
          className="w-full resize-none rounded-2xl border-4 p-2"
          maxLength={500}
        />
      </section>

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <h3 className="m-2 text-2xl font-bold">Complaint attached photo</h3>
        <section className="m-2 h-24 w-36 rounded-2xl border-4 bg-white">
          <label htmlFor="complaint-photo">
            <span className="hidden">complain photo</span>
            <input
              id="complaint-photo"
              type="file"
              className="w-36 opacity-0"
            />
          </label>
        </section>
      </section>

      <Link
        href={routes.vendor.orderFollowUp.objectsMachinesPackaging.followUp}
        className="flex justify-center"
      >
        <span className="w-full rounded-2xl border-4 p-2 text-center text-2xl font-bold">
          View order history
        </span>
      </Link>

      <section className="m-2">
        {optionsList.map(option => (
          <section key={option}>
            <h4 className="font-bold">{option}</h4>
            <section className="flex items-center justify-between gap-2">
              <input
                type="text"
                defaultValue="Order Number"
                className="rounded-2xl border-4 p-2 text-2xl font-bold"
              />
              <Link href={routes.underConstruction}>
                <span className="rounded-2xl border-4 p-2 text-2xl font-bold">
                  Yes
                </span>
              </Link>
            </section>
          </section>
        ))}
      </section>

      <CommonLink
        href={routes.vendor.manageReturns.objectsMachinesPackaging.default}
        onClick={goBack}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default ManageReturnsComplain;
export { getServerSideProps };
