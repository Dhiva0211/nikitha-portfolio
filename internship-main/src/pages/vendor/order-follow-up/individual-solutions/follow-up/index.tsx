import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryOrderFollowUp } from '@/helpers/initial-values';
import clock from '@//public/images/waiting.png';
import Image from 'next/image';
import { RenderIf } from '@/helpers/common/render-conditional';

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

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryOrderFollowUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const FollowUp: FC = () => {
  const [state, setState] = useState<Record<string, boolean> | undefined>();

  const handleState = (key: string) => {
    if (state?.[`${key}`] === undefined || !state?.[`${key}`])
      return setState({ ...state, [key]: true });
    if (state?.[`${key}`]) setState({ ...state, [key]: false });
  };

  return (
    <section className="mx-4 my-8 w-full max-w-7xl rounded-lg border-t-4 border-deep-sapphire bg-white p-4 shadow-md sm:p-6 md:p-8">
      <ShowWindowTitle smallTitle secondTitle="Order Follow Up" />

      <section className="mt-2 flex items-center justify-around gap-2">
        <span className="h-16 w-96 rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Shoppitto confirms that the photo is accurate
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 border-corn-flower-blue text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-16 w-96 rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Vendor confirmation that the order was packed
        </span>
        <span
          className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold"
          onClickCapture={() => handleState('packed')}
        >
          <RenderIf
            condition={state?.['packed'] === true}
            then={'Yes'}
            otherwise={
              <Image
                src={clock}
                alt="Waiting"
                width={747}
                height={625}
                className="size-14 object-contain sm:size-20"
              />
            }
          />
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-16 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Choose shipping label option
        </span>
        <section>
          <select
            name="labelOption"
            id="labelOption"
            className="rounded-2xl border-4"
          >
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </section>
      </section>

      <span className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-4 text-xl font-bold">
        Shipping Number
        <span className="mt-2 flex cursor-pointer items-center justify-center text-xl font-bold">
          123456-1236456789-123456H
        </span>
      </span>

      <Description>
        You have 3 Shipping Label options.
        <br />
        Option 1 - You pay to print, using your own printer, your shipping
        labels under your company’s name, which we prepare for you. Learn more
        in Logistics.
        <br />
        Option 2 - You don’t pay to print, using your own printer, your shipping
        label under UpUnikSelf’s name which we prepare for you.
        <br />
        Option 3 - The price of the shipping plan already includes printing the
        shipping label, and you receive a QR code to print the shipping label
        when you mail the order.
      </Description>

      <section>
        <section className="mt-2 flex items-center justify-around">
          <span className="h-16 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
            Optional: Vendor download shipping number
          </span>
          <section className="flex items-center justify-around gap-2">
            <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
              Print
            </span>
            <span className="flex h-16 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-4 text-sm font-bold">
              Download
            </span>
          </section>
        </section>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-16 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Vendor confirmation of shipping
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Yes
        </span>
      </section>

      <section>
        <section className="mt-2 flex items-center justify-around">
          <span className="h-16 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
            Optional: Shipping company has sent photo proof of delivery
          </span>
          <section className="flex items-center justify-around gap-2">
            <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 border-corn-flower-blue text-xl font-bold">
              Yes
            </span>
          </section>
        </section>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-24 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: UpUnikSelf has sent a physical delivery confirmation email
          to Shoppitto
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 border-corn-flower-blue text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-24 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Vendor confirms that Shoppitto information was used to make
          an account
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-24 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: UpUnikSelf has sent an email to Shoppitto confirming that
          the new account was made
        </span>
        <span className="flex size-16 items-center justify-center rounded-2xl border-4 border-corn-flower-blue text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-24 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Vendor confirms that the solution has been delivered to the
          Shoppitto in the Vendor&apos;s Address
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-28 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: UpUnikSelf has sent an email to Shoppitto confirming that
          the solution has been delivered in the Vendor&apos;s address
        </span>
        <span className="flex size-16 items-center justify-center rounded-2xl border-4 border-corn-flower-blue text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-28 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Vendor confirms that the solution has been delivered to the
          Shoppitto in the Shoppitto&apos;s Address
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-28 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: UpUnikSelf has sent an email to Shoppitto confirming that
          the solution has been delivered in the Shoppitto&apos;s address
        </span>
        <span className="flex size-16 items-center justify-center rounded-2xl border-4 border-corn-flower-blue text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-28 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: Vendor confirms that the solution has been delivered to the
          Shoppitto remotely
        </span>
        <span className="flex size-16 cursor-pointer items-center justify-center rounded-2xl border-4 text-xl font-bold">
          Yes
        </span>
      </section>

      <section className="mt-2 flex items-center justify-around">
        <span className="h-28 w-96 content-center rounded-2xl bg-deep-sapphire p-1 text-xl font-bold text-white">
          Optional: UpUnikSelf has sent an email to Shoppitto confirming that
          the solution has been delivered remotely
        </span>
        <span className="flex size-16 items-center justify-center rounded-2xl border-4 border-corn-flower-blue text-xl font-bold">
          Yes
        </span>
      </section>

      <label
        className="m-2 flex items-center justify-between"
        htmlFor="logistics-fees"
      >
        <span className="h-16 w-96 content-center p-1 text-xl font-bold">
          Estimated logistics fees
        </span>
        <input
          id="logistics-fees"
          type="text"
          defaultValue="$0"
          className="size-16 rounded-2xl border-4 text-center"
        />
      </label>

      <CommonLink
        href={routes.vendor.orderFollowUp.individualSolutions.default}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default FollowUp;
export { getServerSideProps };
