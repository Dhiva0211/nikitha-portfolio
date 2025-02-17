import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { FC, useState } from 'react';
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
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
    categoryManageReturns,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const optionsList = ['Cancel order', 'Issue a Refund', 'Access mediation'];

interface ButtonState {
  [key: string]: boolean;
}

const ManageReturnsComplain: FC = () => {
  const router = useRouter();
  const [photoUploadTime, setPhotoUploadTime] = useState<string>('');
  const [buttonStates, setButtonStates] = useState<ButtonState>({});
  const [isEditing, setIsEditing] = useState(false);
  const [dates, setDates] = useState({
    refund: '',
    mediation: '',
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const now = new Date();
      setPhotoUploadTime(now.toLocaleString());
    }
  };

  const toggleButton = (option: string) => {
    if (!isEditing) return;
    setButtonStates(prev => ({
      ...prev,
      [option]: !prev[`${option}`],
    }));
  };

  const goBack = (event: React.MouseEvent) => {
    event.preventDefault();
    router.back();
  };

  return (
    <section className="mt-4 w-full max-w-5xl rounded-lg border-t-4 border-deep-sapphire p-2 shadow-md md:p-4">
      <ShowWindowTitle smallTitle secondTitle="Manage Returns" />

      <section className="mt-4 w-full px-2">
        <section className="my-6">
          <h3 className="mb-2 text-xl font-bold">Reason for complaint</h3>
          <textarea
            className="w-full resize-none rounded-2xl border-4 p-4"
            maxLength={500}
            defaultValue="Reason for Complaint"
            readOnly
          />
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-xl font-bold">
            Optional: Complaint attached photo
          </h3>
          <div className="flex items-center gap-4">
            <section className="h-24 w-36 rounded-2xl border-4 bg-white">
              <label
                htmlFor="complaint-photo"
                className="block size-full cursor-pointer"
              >
                <span className="hidden">complain photo</span>
                <input
                  id="complaint-photo"
                  type="file"
                  className="size-full opacity-0"
                  onChange={handlePhotoUpload}
                  disabled
                />
              </label>
            </section>
            {photoUploadTime && (
              <span className="text-sm sm:text-lg">
                Uploaded: {photoUploadTime}
              </span>
            )}
          </div>
        </section>

        <section className="my-10 flex items-center justify-center gap-4">
          <span className="w-full rounded-2xl border-4 bg-deep-sapphire p-2 text-left text-xl font-bold text-white">
            UpUnikSelf policy allows a refund
          </span>
          <span className="flex h-16 w-32 items-center justify-center whitespace-nowrap rounded-2xl border-4 text-xl font-bold">
            Yes / No
          </span>
        </section>

        <Link href={routes.vendor.orderFollowUp.default} className="mb-6 block">
          <span className="block w-full rounded-2xl border-4 p-4 text-center text-xl font-bold hover:bg-gray-50">
            View order history
          </span>
        </Link>

        <section className="mb-6 space-y-6">
          {optionsList.map(option => (
            <section key={option}>
              <h4 className="mb-2 text-lg font-bold">{option}</h4>
              <section className="flex items-center justify-between gap-4 sm:gap-6 md:gap-20">
                <input
                  type="text"
                  defaultValue="[Order Number]"
                  className="flex-1 rounded-2xl border-4 p-4 text-lg"
                  readOnly={!isEditing}
                />
                <button
                  onClick={() => toggleButton(option)}
                  className={`min-w-20 rounded-2xl border-4 p-4 text-lg font-bold transition-colors ${
                    buttonStates[`${option}`]
                      ? 'bg-deep-sapphire text-white'
                      : 'bg-white text-deep-sapphire'
                  } `}
                  disabled={!isEditing}
                >
                  {buttonStates[`${option}`] ? 'Yes' : 'No'}
                </button>
              </section>
            </section>
          ))}
        </section>

        <div className="my-8 flex gap-4">
          <button
            className={`w-24 rounded-2xl border-4 p-3 font-semibold transition-all sm:w-32 ${
              isEditing
                ? 'border-gray-300 bg-gray-100 text-gray-400'
                : 'border-deep-sapphire bg-white text-deep-sapphire hover:bg-gray-50'
            }`}
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
          >
            Edit
          </button>
          <button
            className={`w-24 rounded-2xl border-4 p-3 font-semibold transition-all sm:w-32 ${
              isEditing
                ? 'border-deep-sapphire bg-deep-sapphire text-white hover:bg-deep-sapphire/90'
                : 'border-gray-300 bg-gray-100 text-gray-400'
            }`}
            onClick={() => setIsEditing(false)}
            disabled={!isEditing}
          >
            Save
          </button>
        </div>

        <Description as="div">
          <div className="flex flex-col justify-center">
            <div className="mx-6 mb-4 text-left">
              In case of physical return, when the return item has arrived to
              your warehouse, you have 48 hours to decide, or in case of digital
              delivery complaint, you have 48 hours to decide what to do next:
            </div>
            <div className="list-disc space-y-2 pl-6 text-left">
              <div>To issue a refund, click on the refund button.</div>
              <div>To access mediation, click on the mediation button.</div>
            </div>
          </div>
        </Description>

        <section className="mb-6 space-y-4">
          {[
            { label: 'Date of refund', key: 'refund' },
            { label: 'Date mediation was solved', key: 'mediation' },
          ].map(({ label, key }) => (
            <div key={key} className="my-8 rounded-2xl border-4 p-4">
              <h4 className="mb-2 text-lg font-bold">{label}</h4>
              <input
                type="date"
                value={dates[`${key}`]}
                onChange={e =>
                  setDates(prev => ({ ...prev, [key]: e.target.value }))
                }
                className="w-full rounded-xl border-2 p-3"
                readOnly={!isEditing}
              />
            </div>
          ))}
        </section>

        <CommonLink
          href={
            routes.vendor.manageReturns.individualSolutionsSubscription.default
          }
          onClick={goBack}
        >
          <section className="p-4">Done</section>
        </CommonLink>
      </section>
    </section>
  );
};

export default ManageReturnsComplain;
export { getServerSideProps };
