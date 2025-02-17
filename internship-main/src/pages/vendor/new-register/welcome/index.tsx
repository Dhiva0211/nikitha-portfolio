import { routes } from '@/routes';
import Link from 'next/link';
import { FC } from 'react';

const VendorWelcome: FC = () => (
  <section className="text-center">
    <h1 className="mt-6 text-center text-4xl font-bold">All Done!</h1>

    <p className="m-4 text-xl">
      You will receive an email briefly and with it you can activate and set up
      your account in the Set Up and Edit Account section of the Vendor
      Dashboard, and start selling almost anything. Check exceptions in the
      Terms and Conditions.
    </p>

    <p className="m-4 text-xl">
      Boost your sales by focusing on selling your up to 10 most popular
      offerings.
    </p>

    <p className="m-4 text-xl">
      You may grow your sales with our extensive selection of marketing tactics.
    </p>

    <section className="m-4 mt-10 flex justify-center">
      <Link
        href={routes.vendor.login}
        className="w-80 appearance-none rounded-3xl border-4 bg-deep-sapphire p-2 text-center text-2xl font-bold text-white"
      >
        Continue
      </Link>
    </section>
  </section>
);

export default VendorWelcome;
