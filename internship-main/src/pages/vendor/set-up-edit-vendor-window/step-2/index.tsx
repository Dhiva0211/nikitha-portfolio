import { FC, FormEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { apiRoutes, routes } from '@/routes';
import { BusinessInfo, Countries, PrismaClient } from '@prisma/client';
import { redirectServerPageToLogin } from '@/helpers/api';
import { linksList } from '@/helpers/steps';
import { getToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { RenderIf } from '@/helpers/common/render-conditional';
import { usaStates } from '@/assets/countries';
import { ApiResponse } from '@/helpers/interfaces';

const Steps = dynamic(
  () =>
    import('@/components/common/steps').then(mod => ({
      default: mod.Steps,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);
  if (!token) return redirectServerPageToLogin();

  const prisma = new PrismaClient();
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: JSON.stringify(token),
    },
  });

  const isExpired =
    !session || new Date(session.expires) < new Date() || !session?.valid;
  if (isExpired) {
    prisma.$disconnect();
    return redirectServerPageToLogin();
  }

  const user = await prisma.account.findUnique({
    where: {
      userId: session.accountId,
    },
    select: {
      userId: true,
      BusinessInfo: true,
    },
  });
  prisma.$disconnect();

  if (!user?.BusinessInfo) {
    return {
      redirect: {
        destination: linksList[0],
        permanent: false,
      },
    };
  }
  const countriesList = await prisma.countries.findMany({
    select: {
      valueId: true,
      name: true,
      isoCode: true,
    },
  });
  const usaId = countriesList.find(country =>
    country.isoCode.includes('USA'),
  )?.valueId;

  return {
    props: {
      data: {
        businessInfo: JSON.stringify(user.BusinessInfo),
        countries: countriesList,
        usaId,
      },
    },
  };
};

interface Step2Props {
  data: {
    readonly businessInfo: string;
    countries: ReadonlyArray<Countries>;
    readonly usaId: string;
  };
}

const formId = 'editor-proprieties-step2';
const Step2: FC<Step2Props> = ({ data }) => {
  const router = useRouter();
  const { businessInfo, countries, usaId } = data;
  const [step2FormData, setStep2FormData] = useState<BusinessInfo>(
    JSON.parse(businessInfo),
  );
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);

  const handleFormData = (key: string, value: string | number | Date) => {
    setStep2FormData(values => ({ ...values, [key]: value }));
  };

  const handleSaveAndExit = () => setIsSaveAndExit(true);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsFormSubmitting(true);
    const formDataToView = new FormData();
    Object.entries(step2FormData).forEach(([key, value]) => {
      if (key === 'id') return;
      if (value instanceof Date) {
        const dateToString = String(value);
        formDataToView.append(key, dateToString);
        return;
      }

      formDataToView.append(key, value ? value.toString() : '');
    });

    await fetch(apiRoutes.vendorWindow, {
      method: 'POST',
      body: formDataToView,
    })
      .then(resp => resp.json())
      .then(async (resp: ApiResponse) => {
        if (resp?.error) {
          alert(resp.error);
          return;
        }

        if (resp?.location) {
          const linkToGo = isSaveAndExit
            ? routes.vendor.dashboard
            : linksList[2];
          router.push(linkToGo);
        }
      })
      .finally(() => setIsFormSubmitting(false));
  };

  return (
    <section className="mt-4">
      <h1 className="m-2 text-center text-3xl font-bold text-deep-sapphire">
        Legal address
      </h1>

      <Steps activeStep={2} numberOfSteps={6} />

      <form id={formId} onSubmit={handleOnSubmit} method="POST">
        <section className="m-2 mx-4 mt-8 flex items-center rounded-xl border-4">
          <label
            className="h-full w-44 rounded-xl border-r-4 p-2 text-center text-sm font-extrabold sm:w-64 sm:p-5 sm:text-xl md:text-2xl"
            htmlFor="country"
          >
            Country
          </label>

          <select
            id="country"
            className="w-full border-none text-center text-sm font-extrabold sm:text-xl md:text-2xl"
            value={step2FormData.country}
            onChange={e => handleFormData('country', e.target.value)}
            required
          >
            {countries.map(country => (
              <option key={country.valueId} value={country.valueId}>
                {country.name}
              </option>
            ))}
          </select>
        </section>
        <section className="mx-2">
          <InputLabelLeft
            labelToUse="Address line 1"
            required
            value={step2FormData.address1}
            onChange={e => handleFormData('address1', e.target.value)}
          />
          <InputLabelLeft
            labelToUse="Address line 2"
            value={step2FormData.address2 ?? ''}
            onChange={e => handleFormData('address2', e.target.value)}
          />
          <InputLabelLeft
            labelToUse="City"
            required
            value={step2FormData.city}
            onChange={e => handleFormData('city', e.target.value)}
          />
        </section>
        <RenderIf
          condition={step2FormData.country === usaId}
          then={
            <section className="m-2 mx-4 mt-4 flex items-center rounded-xl border-4">
              <label
                className="h-full w-44 rounded-xl border-r-4 p-2 text-center text-sm font-extrabold sm:w-64 sm:p-5 sm:text-xl md:text-2xl"
                htmlFor="state"
              >
                State
              </label>

              <select
                className="w-full border-none text-center text-sm font-extrabold sm:text-xl md:text-2xl"
                value={step2FormData.state}
                onChange={e => handleFormData('state', e.target.value)}
              >
                {usaStates.map(state => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </section>
          }
          otherwise={
            <InputLabelLeft
              labelToUse="State"
              required
              value={step2FormData.state}
              onChange={e => handleFormData('state', e.target.value)}
            />
          }
        />
        <section className="mx-2">
          <InputLabelLeft
            labelToUse="Postal code"
            required
            value={step2FormData.postalCode}
            onChange={e => handleFormData('postalCode', e.target.value)}
          />
        </section>
        <RenderIf
          condition={isFormSubmitting}
          then={
            <section className="mb-20">
              <DotsAnimation />
            </section>
          }
          otherwise={
            <section className="flex flex-col items-center">
              <CommonButton
                type="submit"
                className="w-80"
                onClick={handleSaveAndExit}
              >
                <span className="text-xl font-bold">Save so far and Exit</span>
              </CommonButton>

              <CommonButton type="submit" className="w-80">
                <span className="text-xl font-bold">Continue</span>
              </CommonButton>
            </section>
          }
        />
      </form>
    </section>
  );
};

export default Step2;
export { getServerSideProps };
