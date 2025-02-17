import { FC, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryLogisticsAndApis } from '@/helpers/initial-values';

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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
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
    categoryLogisticsAndApis,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const InputPreferredShippingPlan: FC = () => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(
    null,
  );

  const handleOptionClick = (option: 'yes' | 'no') => {
    setSelectedOption(option);
  };

  return (
    <section className="mt-4 p-4">
      <ShowWindowTitle smallTitle secondTitle="Logistics" />

      <section className="my-4 overflow-x-auto rounded-2xl border-4 border-deep-sapphire">
        <h3 className="border-b-4 p-4 text-3xl font-bold text-deep-sapphire">
          Digital Shipping Deals
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left font-bold text-deep-sapphire">
              <th className="border-4 border-deep-sapphire p-4">Solution</th>
              <th className="border-4 border-deep-sapphire p-4">
                Shipping Plan
              </th>
              <th className="border-4 border-deep-sapphire p-4">Weight</th>
              <th className="border-4 border-deep-sapphire p-4">
                Package Height
              </th>
              <th className="border-4 border-deep-sapphire p-4">
                Package Length
              </th>
              <th className="border-4 border-deep-sapphire p-4">
                Package Width
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                solution: 'Solution 1',
                plan: 'Own',
                weight: '1kg',
                height: '20cm',
                length: '30cm',
                width: '30cm',
              },
              {
                solution: 'Solution 2',
                plan: 'USPS Economy 1',
                weight: '2kg',
                height: '15cm',
                length: '25cm',
                width: '35cm',
              },
              {
                solution: 'Solution 3',
                plan: 'DHL Standard 1',
                weight: '3kg',
                height: '20cm',
                length: '30cm',
                width: '40cm',
              },
            ].map((plan, i) => (
              <tr key={i}>
                <td className="border-4 border-deep-sapphire p-4">
                  {plan.solution}
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  {plan.plan}
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  {plan.weight}
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  {plan.height}
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  {plan.length}
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  {plan.width}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="my-4 overflow-x-auto rounded-2xl border-4 border-deep-sapphire">
        <h3 className="border-b-4 p-4 text-3xl font-bold text-deep-sapphire">
          Choose Digital Shipping
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left font-bold text-deep-sapphire">
              <th className="border-4 border-deep-sapphire p-4">Solution</th>
              <th className="border-4 border-deep-sapphire p-4">
                Shipping Plan
              </th>
              <th className="border-4 border-deep-sapphire p-4">Weight</th>
              <th className="border-4 border-deep-sapphire p-4">
                Package Height
              </th>
              <th className="border-4 border-deep-sapphire p-4">
                Package Length
              </th>
              <th className="border-4 border-deep-sapphire p-4">
                Package Width
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, i) => (
              <tr key={i}>
                <td className="border-4 border-deep-sapphire p-4">
                  Solution {i + 1}
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  <input
                    type="text"
                    placeholder="Enter Plan"
                    className="w-full rounded-md border border-deep-sapphire p-2"
                  />
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  <input
                    type="text"
                    placeholder="Enter Weight"
                    className="w-full rounded-md border border-deep-sapphire p-2"
                  />
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  <input
                    type="text"
                    placeholder="Enter Height"
                    className="w-full rounded-md border border-deep-sapphire p-2"
                  />
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  <input
                    type="text"
                    placeholder="Enter Length"
                    className="w-full rounded-md border border-deep-sapphire p-2"
                  />
                </td>
                <td className="border-4 border-deep-sapphire p-4">
                  <input
                    type="text"
                    placeholder="Enter Width"
                    className="w-full rounded-md border border-deep-sapphire p-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Description>
        A considerable amount of the target market may prefer not to pay
        shipping costs. It would be wise to carefully consider the advantages
        and disadvantages of including all shipping costs in the Offering Price.
        Please check the button below to confirm that you have or have not
        included all shipping costs in the Offering Price.
      </Description>

      <section className="m-4 flex items-center justify-around">
        <span className="whitespace-normal break-words font-bold">
          Does the offering price include shipping costs?
        </span>
        <button
          type="button"
          onClick={() => handleOptionClick('yes')}
          className={`rounded-2xl border-4 px-4 py-2 ${
            selectedOption === 'yes' ? 'bg-deep-sapphire text-white' : ''
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => handleOptionClick('no')}
          className={`rounded-2xl border-4 px-4 py-2 ${
            selectedOption === 'no' ? 'bg-deep-sapphire text-white' : ''
          }`}
        >
          No
        </button>
      </section>

      <Select labelToUse="Confirm digital shipping provider">
        <button
          onClick={() => setConfirmed(!confirmed)}
          className={`m-4 flex cursor-pointer items-center justify-between ${
            confirmed ? 'text-lg font-bold' : 'text-base'
          }`}
        >
          By clicking, you confirm the above choice of shipping, and that you
          have read and agreed to the shipping company’s terms and conditions.
          <input
            type="checkbox"
            id="confirm-logistics"
            className="m-2"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
        </button>
      </Select>

      <Link
        href={
          routes.vendor.logisticsAndApis.generalSolutions.individualServices
            .setUpDigitalDeliveryOfYourService.inputPreferredShippingPlan
            .orderInsurances
        }
        className="m-2 flex items-center justify-between"
      >
        <section>
          <p className="w-56 text-2xl font-bold">Order Insurances</p>
          <p className="w-56 text-lg font-bold">Optional</p>
        </section>
        <section className="size-20 rounded-2xl border-4 bg-deep-sapphire" />
      </Link>

      <CommonLink
        href={
          routes.vendor.logisticsAndApis.generalSolutions.individualServices
            .default
        }
      >
        <section className="m-4 rounded-2xl bg-deep-sapphire p-4 text-center font-bold text-white">
          Done
        </section>
      </CommonLink>
    </section>
  );
};

export default InputPreferredShippingPlan;
export { getServerSideProps };
