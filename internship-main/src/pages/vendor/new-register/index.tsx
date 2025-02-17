import { ChangeEvent, FC, FormEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { apiRoutes, routes } from '@/routes';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import {
  VendorRegistrationForm,
  ApiResponse,
  ApiSelectOption,
} from '@/helpers/interfaces';
import { vendorRegistrationFormInitialValues } from '@/helpers/initial-values';
import { RenderIf } from '@/helpers/common/render-conditional';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import {
  passwordSizeValidation,
  passwordPatternValidation,
  validateEmail,
} from '@/helpers/validations';

const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const TermsAndConditionsAcceptance1 = dynamic(
  () =>
    import('@/components/vendor/terms-and-condition-acceptance').then(mod => ({
      default: mod.TermsAndConditionsAcceptance1,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Steps = dynamic(
  () =>
    import('@/components/common/steps').then(mod => ({
      default: mod.Steps,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();

  let typeOfBusiness: ReadonlyArray<ApiSelectOption> = [];
  let typeOfShoppitto: ReadonlyArray<ApiSelectOption> = [];

  try {
    const [typeOfBusinessData, typeOfShoppittoData] = await Promise.all([
      prisma.typeOfBusiness.findMany(),
      prisma.typeOfShoppitto.findMany(),
    ]);

    typeOfBusiness = typeOfBusinessData.map(({ valueId, name }) => ({
      valueId,
      name,
    }));
    typeOfShoppitto = typeOfShoppittoData.map(({ valueId, name }) => ({
      valueId,
      name,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    prisma.$disconnect();
    return {
      redirect: {
        destination: routes.vendor.dashboard,
        permanent: false,
      },
    };
  }
  prisma.$disconnect();

  return {
    props: {
      data: {
        typeOfBusiness,
        typeOfShoppitto,
      },
    },
  };
};

interface VendorRegistrationProps {
  data: {
    typeOfBusiness: Array<ApiSelectOption>;
    typeOfShoppitto: Array<ApiSelectOption>;
  };
}

const formId = 'vendor-registration-form';
const typeOfBusinessError = 'type-of-business-error';
const typeOfShoppittoAccountError = 'type-of-shoppitto-account-error';

const VendorRegistration: FC<VendorRegistrationProps> = ({ data }) => {
  const router = useRouter();
  const { typeOfBusiness, typeOfShoppitto } = data;
  const [formData, setFormData] = useState<VendorRegistrationForm>(
    vendorRegistrationFormInitialValues,
  );
  const [view, setView] = useState<number>(1);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [typeOfError, setTypeOfError] = useState<ReadonlyArray<string>>([]);

  const isOptionSelected = (selected: boolean) =>
    selected ? 'text-lg font-bold underline' : 'text-base';

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    if (isFormSubmitting) return;
    const { value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleContinueButton = () => {
    if (isFormSubmitting) return;
    if (formData.email === '' || formData.password === '') {
      alert('Please fill in the email and password fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!passwordSizeValidation(formData.password)) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (!passwordPatternValidation(formData.password)) {
      alert(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number and be at least 8 characters long.',
      );
      return;
    }

    setView(2);
  };

  const handleSelectTypeCompany = (option: string) => {
    if (isFormSubmitting) return;
    setFormData(prevState => ({ ...prevState, typeOfBusiness: option }));
    setTypeOfError([]);
  };

  const handleSelectTypeOfShoppittoAccount = (option: string) => {
    if (isFormSubmitting) return;
    setFormData(prevState => ({ ...prevState, shoppittoAccount: option }));
    setTypeOfError([]);
  };

  const handleTermsAndConditionsAcceptance = (tCsAcc: boolean) => {
    if (isFormSubmitting) return;
    setFormData(prevState => ({ ...prevState, termsAndConditions: tCsAcc }));
  };

  const handleFormBehavior = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormSubmitting) return;
  };

  const handleFormRegistration = async () => {
    if (!formData.typeOfBusiness) {
      setTypeOfError([typeOfBusinessError]);
      const errorElement = document.getElementById(typeOfBusinessError);
      if (errorElement)
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      return;
    }

    if (!formData.shoppittoAccount) {
      setTypeOfError([typeOfShoppittoAccountError]);
      const errorElement = document.getElementById(typeOfShoppittoAccountError);
      if (errorElement)
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      return;
    }

    setIsFormSubmitting(true);
    const formDataToView = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToView.append(key, value);
    });

    await fetch(apiRoutes.vendorRegistration, {
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
    <section>
      <h1 className="mb-2 mt-6 text-center text-4xl font-bold">
        Welcome New Vendor!
      </h1>
      <h6 className="text-center text-2xl font-bold">No setup fees.</h6>

      <form id={formId} onSubmit={handleFormBehavior} method="POST">
        <RenderIf
          condition={view === 2}
          then={
            <section>
              <Steps activeStep={2} numberOfSteps={2} />

              <InputLabelLeft
                labelToUse="First Name"
                required
                value={formData.firstName}
                onChange={e => handleInputChange(e, 'firstName')}
              />
              <InputLabelLeft
                labelToUse="Last Name"
                required
                value={formData.lastName}
                onChange={e => handleInputChange(e, 'lastName')}
              />

              <Select labelToUse="Select your type of business">
                <ul className="flex flex-col items-center">
                  {typeOfBusiness.map(option => (
                    <li key={option.valueId}>
                      <button
                        id={option.valueId}
                        onClick={() => handleSelectTypeCompany(option.valueId)}
                        className="cursor-pointer"
                      >
                        <label
                          htmlFor={option.valueId}
                          className={isOptionSelected(
                            formData.typeOfBusiness === option.valueId,
                          )}
                        >
                          {option.name}
                        </label>
                      </button>
                    </li>
                  ))}
                </ul>
              </Select>

              <section id={typeOfBusinessError}>
                <RenderIf
                  condition={
                    typeOfError.length > 0 &&
                    typeOfError.includes(typeOfBusinessError)
                  }
                  then={
                    <label className="text-center text-lg font-bold text-medium-orchid">
                      Please select a type of business.
                    </label>
                  }
                  otherwise={<></>}
                />
              </section>

              <label className="m-2 flex justify-center rounded-xl border-4 bg-light-purple/40 text-xl">
                Check one that applies.
              </label>

              <Select
                labelToUse="Would you also like a Shoppitto account?"
                required
              >
                <ul className="flex flex-col items-center">
                  {typeOfShoppitto.map(option => (
                    <li key={option.valueId}>
                      <button
                        id={option.valueId}
                        onClick={() =>
                          handleSelectTypeOfShoppittoAccount(option.valueId)
                        }
                        className="cursor-pointer"
                      >
                        <label
                          htmlFor={option.valueId}
                          className={isOptionSelected(
                            formData.shoppittoAccount === option.valueId,
                          )}
                        >
                          {option.name}
                        </label>
                      </button>
                    </li>
                  ))}
                </ul>
              </Select>

              <section id={typeOfShoppittoAccountError}>
                <RenderIf
                  condition={
                    typeOfError.length > 0 &&
                    typeOfError.includes(typeOfShoppittoAccountError)
                  }
                  then={
                    <label className="text-center text-lg font-bold text-medium-orchid">
                      Please select a option.
                    </label>
                  }
                  otherwise={<></>}
                />
              </section>

              <label className="m-2 flex justify-center rounded-xl border-4 bg-light-purple/40 text-xl">
                Check one.
              </label>

              <TermsAndConditionsAcceptance1
                formId={formId}
                tCsAcc={formData.termsAndConditions || false}
                onChange={handleTermsAndConditionsAcceptance}
              />
            </section>
          }
          otherwise={
            <section>
              <Steps activeStep={1} numberOfSteps={2} />
              <InputLabelLeft
                labelToUse="Email"
                type="email"
                required
                value={formData.email}
                onChange={e => handleInputChange(e, 'email')}
              />
              <InputLabelLeft
                labelToUse="Password"
                type="password"
                required
                value={formData.password}
                onChange={e => handleInputChange(e, 'password')}
              />
              <section className="m-2 mb-6 mt-8 text-center text-lg font-extrabold sm:text-xl">
                Additional Options
              </section>
              <section className="m-2 my-6 flex flex-col gap-2">
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
              <section className="m-2 mb-6 mt-8 flex flex-col gap-2">
                <Link
                  href={routes.underConstruction}
                  className="w-full rounded-xl border-4 p-2 text-center font-bold"
                >
                  Use Biometrics
                </Link>
              </section>
            </section>
          }
        />

        <RenderIf
          condition={isFormSubmitting}
          then={
            <section className="h-20">
              <DotsAnimation />
            </section>
          }
          otherwise={
            <>
              <RenderIf
                condition={view === 1}
                then={
                  <section className="m-4 flex justify-center">
                    <button
                      type="button"
                      className="w-80 appearance-none rounded-3xl border-4 bg-deep-sapphire p-2 text-center text-2xl font-bold text-white"
                      onClick={() => handleContinueButton()}
                    >
                      Continue
                    </button>
                  </section>
                }
                otherwise={
                  <section className="m-4 flex justify-center">
                    <button
                      type="button"
                      className="w-80 appearance-none rounded-3xl border-4 bg-deep-sapphire p-2 text-center text-2xl font-bold text-white"
                      onClick={handleFormRegistration}
                    >
                      Submit
                    </button>
                  </section>
                }
              />

              <Link
                href={routes.vendor.login}
                className="m-6 flex justify-center font-bold"
              >
                Already have an account?{' '}
                <span className="ml-2 hover:underline">Log In.</span>
              </Link>
            </>
          }
        />
      </form>
    </section>
  );
};

export default VendorRegistration;
export { getServerSideProps };
