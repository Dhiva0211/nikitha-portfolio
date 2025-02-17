import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
//TODO: we have the countries on the database, change to that
import countries from '../../../../../../../prisma/country-list.json';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryOrderSetUp } from '@/helpers/initial-values';

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

const columns = [
  { key: 'country', header: 'Country' },
  { key: 'allowedShipping', header: 'Allowed Shipping' },
  { key: 'confirmAllowedShipping', header: 'Confirm Allowed Shipping' },
];

const data = [
  { id: 'country1', label: 'Country 1' },
  { id: 'country2', label: 'Country 2' },
  { id: 'country3', label: 'Country 3' },
];

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);
  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryOrderSetUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const CheckBox: FC = () => {
  const [checked, setChecked] = useState(false);
  const checkOnChange = newCheckedValue => {
    setChecked(newCheckedValue);
  };
  return (
    <section
      onClick={() => checkOnChange(!checked)}
      className="m-2 flex aspect-square size-10 items-center justify-center rounded-xl border-4"
    >
      <span className="my-auto text-center text-2xl font-bold">
        {checked ? 'x' : ''}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={e => checkOnChange(e.target.checked)}
        required
      />
    </section>
  );
};

const ShippingDestinations: FC = () => {
  const [tableData, setTableData] = useState(data);

  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  const onRemove = (id: string) => {
    const updatedTableData = tableData.filter(item => item.id !== id);
    setTableData(updatedTableData);
  };

  const onAdd = () => {
    const newId = Date.now().toString();
    const newData = {
      id: newId,
      label: '',
    };
    setTableData([...tableData, newData]);
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Order Setup" />
      <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl">
        <h3 className="m-4 text-center text-xl font-bold">
          Allowed Shipping destinations
        </h3>
        <table className="w-full border-separate border-spacing-0 p-2 text-left text-xs shadow-none md:text-sm">
          <thead className="text-xs uppercase">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key.toString() || `empty-${index}`}
                  scope="col"
                  className={`w-1/3 ${index === 0 ? 'rounded-tl-xl' : ''} ${index === columns.length - 1 ? 'rounded-tr-xl' : ''} ${index === 0 ? 'border-4' : 'border-4 border-l'} border-b px-2 py-3`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, rowIndex) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td
                    key={`${item.id}-${column.key.toString() || `empty-${colIndex}`}`}
                    className={`border-4 ${rowIndex === tableData.length - 1 ? (colIndex === 0 ? 'rounded-bl-xl' : colIndex === columns.length - 1 ? 'rounded-br-xl' : '') : ''} ${rowIndex !== tableData.length - 1 ? 'border-b' : ''} ${colIndex !== 0 ? 'border-l' : ''} px-2 py-4 ${colIndex === 0 ? 'whitespace-nowrap font-medium' : ''} `}
                  >
                    {colIndex === 0 ? (
                      <div className="flex items-center justify-between">
                        <select className="w-full rounded border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm focus:border-x-deep-sapphire focus:outline-none focus:ring-2 focus:ring-deep-sapphire/50">
                          {countries.map(country => (
                            <option key={country.COUNTRY}>
                              {country.COUNTRY}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <CheckBox />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <section className="mt-2 flex w-full justify-evenly p-2">
          <button
            onClick={onAdd}
            className="mt-6 flex w-44 items-center justify-center rounded-2xl border-4 p-1 hover:bg-deep-sapphire hover:text-white sm:w-64 sm:px-4 sm:py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span className="ml-2 text-sm sm:text-lg">Add Country</span>
          </button>
          <button
            onClick={() => onRemove(tableData[tableData.length - 1].id)}
            className="mt-6 flex w-44 items-center justify-center rounded-2xl border-4 p-1 hover:bg-deep-sapphire hover:text-white sm:w-64 sm:px-4 sm:py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>

            <span className="ml-2 text-sm sm:text-lg">Remove Country</span>
          </button>
        </section>
      </section>

      <CommonLink
        href={routes.vendor.orderSetup.licenseNft.nft.default}
        onClick={goBack}
      >
        <section className="py-1">Done</section>
      </CommonLink>
    </section>
  );
};

export default ShippingDestinations;
export { getServerSideProps };
