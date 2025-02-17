import { FC } from 'react';
import Image from 'next/image';
import constructionLogo from '@//public/images/logo-constructor.png';

const ErrorPage: FC = () => (
  <main className="grow">
    <section className="m-2 mt-10 flex flex-col rounded-xl border-4 p-6">
      <span className="text-center text-4xl font-bold">Work in Progress</span>
    </section>

    <section className="flex justify-center">
      <Image
        src={constructionLogo}
        alt="construction logo"
        width={928}
        height={622}
        placeholder="blur"
      />
    </section>

    <section className="m-6 text-center text-3xl font-bold">
      <span>
        Exciting news! Our team is working diligently to introduce this feature.
      </span>
    </section>
  </main>
);

export default ErrorPage;
