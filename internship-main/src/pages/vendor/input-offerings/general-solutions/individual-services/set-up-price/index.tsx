import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { categoryInputOfferings } from '@/helpers/initial-values';
import { getToken, validSessionToken } from '@/helpers/validations';
import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';

const IndividualServicesSetUp = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/set-up/individual-services'
    ).then(mod => ({
      default: mod.IndividualServicesSetUp,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const EditOfferingIndividualServices = dynamic(
  () =>
    import(
      '@/components/vendor/input-offerings/set-up/edit-offering-individual-services'
    ).then(mod => ({
      default: mod.EditOfferingIndividualServices,
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
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUp: FC = () => {
  const [isPriceClicked] = useState<boolean>(false);

  const [discounts, setDiscounts] = useState({
    discount1: false,
    discount2: false,
  });
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleDiscountChange = (discount: string) => {
    setDiscounts(prev => ({ ...prev, [discount]: !prev[`${discount}`] }));
  };

  const validateDates = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    if (!startDate) {
      alert('Please select a start date.');
      return false;
    }
    if (startDate < today) {
      alert('Start date cannot be before today.');
      return false;
    }
    if (!endDate) {
      alert('Please select an end date.');
      return false;
    }
    if (endDate < startDate) {
      alert('End date cannot be before the start date.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateDates()) return;
    setIsSaved(true);
    alert('Settings have been saved. Click Done to confirm.');
  };

  return (
    <section className="mt-4 sm:px-4 md:px-8 lg:px-12 xl:px-16">
      <EditOfferingIndividualServices>
        <IndividualServicesSetUp
          salesTaxesOptionsLink={
            routes.vendor.inputOfferings.generalSolutions.individualServices
              .setUpPrice.salesTaxesOptions
          }
          individualEditLink={
            routes.vendor.inputOfferings.generalSolutions.individualServices
              .setUpPrice.default
          }
          returnLink={
            routes.vendor.inputOfferings.generalSolutions.individualServices
              .default
          }
        />

        {isPriceClicked && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Choose Tiers</h2>
            <label>
              <input
                type="checkbox"
                checked={discounts.discount1}
                onChange={() => handleDiscountChange('discount1')}
              />
              Tier 1 Discount
            </label>
            <label>
              <input
                type="checkbox"
                checked={discounts.discount2}
                onChange={() => handleDiscountChange('discount2')}
              />
              Tier 2 Discount
            </label>

            <div className="mt-2">
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 rounded border px-4 py-2"
            >
              Save
            </button>
            {isSaved && <p className="mt-2">Click Done to finalize.</p>}
          </div>
        )}
      </EditOfferingIndividualServices>
    </section>
  );
};

export default SetUp;
export { getServerSideProps };
