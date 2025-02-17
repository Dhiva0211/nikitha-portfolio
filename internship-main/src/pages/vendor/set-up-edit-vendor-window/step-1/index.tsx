import { FC, FormEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { apiRoutes, routes } from '@/routes';
import { RenderIf } from '@/helpers/common/render-conditional';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { convertDateToString, getToken } from '@/helpers/validations';
import { redirectServerPageToLogin } from '@/helpers/api';
import {
  PrismaClient,
  TypeOfCategory,
  BusinessInfo,
  Countries,
  Account,
} from '@prisma/client';
import { ApiResponse, TypeOfCategoryList } from '@/helpers/interfaces';
import { linksList, rearrangeCategories } from '@/helpers/steps';
import { vendorWindowInitialValues } from '@/helpers/initial-values';
import { useRouter } from 'next/router';

const Steps = dynamic(
  () =>
    import('@/components/common/steps').then(mod => ({
      default: mod.Steps,
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
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
const TermsAndConditionsAcceptance = dynamic(
  () =>
    import('@/components/vendor/terms-and-condition-acceptance').then(mod => ({
      default: mod.TermsAndConditionsAcceptance,
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

type AccountSubset = Pick<Account, 'userId'> & { BusinessInfo: BusinessInfo };
type TypeOfCategorySubset = Pick<
  TypeOfCategory,
  'valueId' | 'mainCategory' | 'subCategory'
>;
type CountriesSubset = Pick<Countries, 'valueId' | 'name' | 'countryCode'>;

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

  let user: AccountSubset | null = null;
  let categoriesList: ReadonlyArray<TypeOfCategorySubset> = [];
  let countriesList: ReadonlyArray<CountriesSubset> = [];

  await Promise.all([
    prisma.account.findUnique({
      where: {
        userId: session.accountId,
      },
      select: {
        userId: true,
        BusinessInfo: true,
      },
    }) as Promise<AccountSubset | null>,
    prisma.typeOfCategory.findMany({
      select: {
        valueId: true,
        mainCategory: true,
        subCategory: true,
      },
    }) as Promise<ReadonlyArray<TypeOfCategorySubset> | null>,
    prisma.countries.findMany({
      select: {
        valueId: true,
        name: true,
        countryCode: true,
      },
    }) as Promise<ReadonlyArray<CountriesSubset> | null>,
  ])
    .then(([userInfo, categoryListInfo, countriesListInfo]) => {
      if (userInfo !== null) user = userInfo;
      if (categoryListInfo !== null) categoriesList = categoryListInfo;
      if (countriesListInfo !== null) countriesList = countriesListInfo;
    })
    .finally(() => prisma.$disconnect());

  if (!user) return redirectServerPageToLogin();

  let businessInfo: BusinessInfo = vendorWindowInitialValues;
  // @ts-expect-error - BusinessInfo exist in user after the if verify
  if (Object.hasOwn(user, 'BusinessInfo') && user.BusinessInfo) {
    businessInfo = {
      // @ts-expect-error - BusinessInfo exist in user after the if verify
      ...user.BusinessInfo,
    };
  }

  if (!businessInfo.countryCode) {
    businessInfo.country = countriesList[0].valueId;
    businessInfo.countryCode = countriesList[0].countryCode;
  }

  return {
    props: {
      data: {
        typeOfCategory: categoriesList,
        countries: countriesList,
        businessInfo: JSON.stringify(businessInfo),
        // @ts-expect-error - userId exist in user after the if verify
        userId: user.userId,
      },
    },
  };
};

interface Step1Props {
  data: {
    typeOfCategory: ReadonlyArray<TypeOfCategory>;
    countries: ReadonlyArray<Countries>;
    businessInfo: string;
    userId: string;
  };
}

const formId = 'editor-proprieties-step1';
const typeOfCategoryError = 'type-of-business-error';
const Step1: FC<Step1Props> = ({ data }) => {
  const router = useRouter();
  const { typeOfCategory, countries, businessInfo, userId } = data;
  const [typeOfCategoryList, setTypeOfCategoryList] = useState<
    ReadonlyArray<TypeOfCategoryList>
  >([]);
  const [step1FormData, setStep1FormData] = useState<BusinessInfo>(
    JSON.parse(businessInfo),
  );
  const [typeOfError, setTypeOfErrors] = useState<ReadonlyArray<string>>([]);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [tCsAcc, setTCsAcc] = useState<boolean>(false);
  const [isSaveAndExit, setIsSaveAndExit] = useState<boolean>(false);

  const handleTermsAndConditionsAcceptance = (tCsAccToUse: boolean) => {
    if (!tCsAccToUse) return;
    setTCsAcc(tCsAccToUse);
  };

  const handleOptionSelected = (option: boolean) =>
    option ? 'font-semibold' : '';

  const handleFormData = (key: string, value: string | number | Date) => {
    setStep1FormData(values => ({ ...values, [key]: value }));
  };

  const handleSaveAndExit = () => setIsSaveAndExit(true);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!step1FormData.categoryId) {
      setTypeOfErrors(values => [...values, typeOfCategoryError]);
      const errorElement = document.getElementById(typeOfCategoryError);
      if (errorElement)
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      return;
    }

    setTypeOfErrors([]);
    setIsFormSubmitting(true);
    const formDataToView = new FormData();
    Object.entries(step1FormData).forEach(([key, value]) => {
      if (key === 'id') return;
      if (value instanceof Date) {
        const dateToString = String(value);
        formDataToView.append(key, dateToString);
        return;
      }

      if (key === 'termsAndConditionSellersAccount') {
        const dataToUse =
          step1FormData.termsAndConditionSellersAccount && tCsAcc
            ? String(step1FormData.termsAndConditionSellersAccount)
            : new Date().toISOString();

        formDataToView.append(key, dataToUse);
        return;
      }

      if (key === 'userId') {
        formDataToView.append('userId', userId);
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
            : linksList[1];
          router.push(linkToGo);
        }
      })
      .finally(() => setIsFormSubmitting(false));
  };

  useEffect(() => {
    if (typeOfCategory) {
      const typeOfCategoryListToUse = rearrangeCategories(typeOfCategory);

      setTypeOfCategoryList(typeOfCategoryListToUse);
    }
  }, [typeOfCategory]);

  useEffect(() => {
    if (step1FormData.termsAndConditionSellersAccount) setTCsAcc(true);
  }, [step1FormData]);

  return (
    <section className="mt-4 p-4">
      <h1 className="m-2 text-center text-3xl font-bold text-deep-sapphire">
        Welcome, new Vendor!
      </h1>
      <h2 className="text-center text-xl font-bold">No setup fees.</h2>

      <Steps activeStep={1} numberOfSteps={6} />

      <form id={formId} onSubmit={handleOnSubmit} method="POST">
        <section className="mt-2 flex flex-col justify-around">
          <Select labelToUse="Select which category you want to sell" required>
            <ul className="m-2 flex-col text-center">
              {typeOfCategoryList.map(option => (
                <li key={option.id}>
                  <RenderIf
                    condition={option.children.length > 0}
                    then={
                      <section className="flex cursor-pointer flex-col">
                        <label className="text-xl font-bold">
                          {option.mainCategory}
                        </label>
                        {option.children.map(child => (
                          <span
                            key={child.id}
                            className={handleOptionSelected(
                              child.id === step1FormData.categoryId,
                            )}
                            onClick={() =>
                              handleFormData('categoryId', child.id)
                            }
                          >
                            {child.subCategory}
                          </span>
                        ))}
                      </section>
                    }
                    otherwise={
                      <span
                        className={`cursor-pointer text-xl ${handleOptionSelected(option.id === step1FormData.categoryId)}`}
                        onClick={() => handleFormData('categoryId', option.id)}
                      >
                        {option.mainCategory}
                      </span>
                    }
                  />
                </li>
              ))}
            </ul>
          </Select>
          <section id={typeOfCategoryError}>
            <RenderIf
              condition={
                typeOfError.length > 0 &&
                typeOfError.includes(typeOfCategoryError)
              }
              then={
                <label className="text-center text-lg text-red-500">
                  Please select a type of business.
                </label>
              }
              otherwise={<></>}
            />
          </section>
        </section>

        <Description>Check one that applies.</Description>

        <InputLabelLeft
          labelToUse="Business legal name (if appropriate)"
          value={step1FormData.busLegalName}
          onChange={e => handleFormData('busLegalName', e.target.value)}
          required
        />
        <InputLabelLeft
          type="date"
          labelToUse="Business start year"
          value={convertDateToString(step1FormData.busStartYear)}
          onChange={e => handleFormData('busStartYear', e.target.value)}
          required
        />

        <Description>
          As a Sole Proprietor, this should be the year you started conducting
          your business activity. As a Registered Company, this should be the
          year you legally registered your company. We use this information for
          our Fraud Prevention Policy.
        </Description>
        <section className="m-4 mx-auto flex max-w-7xl overflow-hidden rounded-xl border-4">
          <select
            className="h-14 max-w-56 text-left font-bold"
            value={step1FormData.countryCode}
            onChange={e => handleFormData('countryCode', e.target.value)}
            required
          >
            {countries.map(country => (
              <option
                key={country.valueId}
                className="flex w-full justify-between py-2"
                value={country.countryCode}
              >
                +{country.countryCode} - {country.name}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full overflow-hidden rounded-r-2xl text-center font-bold"
            value={step1FormData.phoneNumber}
            onChange={e => handleFormData('phoneNumber', e.target.value)}
            required
          />
        </section>
        <section>
          <Link href={routes.underConstruction} className="cursor-pointer">
            <InputLabelLeft labelToUse="Add biometrics" />
          </Link>
        </section>

        <Description>Optional</Description>
        <section className="text-center">
          <TermsAndConditionsAcceptance
            formId={formId}
            tCsAcc={tCsAcc}
            onChange={handleTermsAndConditionsAcceptance}
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

export default Step1;
export { getServerSideProps };
