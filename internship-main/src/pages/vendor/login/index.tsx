import { FC, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { apiRoutes, routes } from '@/routes';
import { ApiResponse } from '@/helpers/interfaces';
import { RenderIf } from '@/helpers/common/render-conditional';

const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const VendorLogin: FC = () => {
  const router = useRouter();
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const handleFormLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsFormSubmitting(true);
    const formDataToView = new FormData(event.currentTarget);

    await fetch(apiRoutes.login, {
      method: 'POST',
      body: formDataToView,
    })
      .then(resp => resp.json())
      .then((resp: ApiResponse) => {
        if (resp?.error) {
          alert(resp.error);
          return;
        }

        if (resp?.location) {
          router.push(resp.location);
        }
      })
      .finally(() => setIsFormSubmitting(false));
  };

  return (
    <section className="mt-2 flex flex-col justify-around">
      <h1 className="mt-6 text-center text-4xl font-bold">Welcome Back!</h1>

      <form onSubmit={handleFormLogin} method="POST">
        <InputLabelLeft
          labelToUse="Email"
          required
          disabled={isFormSubmitting}
        />
        <InputLabelLeft
          labelToUse="Password"
          type="password"
          required
          disabled={isFormSubmitting}
        />
        <button type="submit" hidden disabled={isFormSubmitting}>
          Submit
        </button>

        <RenderIf
          condition={isFormSubmitting}
          then={
            <section className="mb-10">
              <DotsAnimation />
            </section>
          }
          otherwise={null}
        />

        <section className="text-center">
          <Link
            href={routes.underConstruction}
            className="font-bold hover:underline"
          >
            Forgot password?
          </Link>
        </section>

        <section className="m-2 mt-8 flex flex-col gap-2">
          <Link
            href={routes.underConstruction}
            className="w-full rounded-xl border-4 p-2 text-left font-bold"
          >
            Sign in with Google
          </Link>
          <Link
            href={routes.underConstruction}
            className="w-full rounded-xl border-4 p-2 text-left font-bold"
          >
            Sign in with Apple
          </Link>
          <Link
            href={routes.underConstruction}
            className="w-full rounded-xl border-4 p-2 text-left font-bold"
          >
            Sign in with Github
          </Link>
          <Link
            href={routes.underConstruction}
            className="w-full rounded-xl border-4 p-2 text-left font-bold"
          >
            Sign in with Facebook
          </Link>
          <Link
            href={routes.underConstruction}
            className="w-full rounded-xl border-4 p-2 text-left font-bold"
          >
            Sign in with Salesforce
          </Link>
        </section>
      </form>

      {/* Ensure Use Biometrics button matches the others */}
      <section className="m-2 mb-6 mt-8 flex flex-col gap-2">
        <Link
          href={routes.underConstruction}
          className="w-full rounded-xl border-4 p-2 text-center font-bold"
        >
          Use Biometrics
        </Link>
      </section>
    </section>
  );
};

export default VendorLogin;
