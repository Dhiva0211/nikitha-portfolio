'use client';
import { FC } from 'react';

interface TermsAndConditionsAcceptanceProps {
  readonly formId: string;
  readonly tCsAcc: boolean;
  onChange?: (tCsAcc: boolean) => void;
}

const TermsAndConditionsAcceptance: FC<TermsAndConditionsAcceptanceProps> = ({
  formId,
  tCsAcc,
  onChange,
}) => {
  const handleTCsAcc = () => {
    const newValue = !tCsAcc;
    onChange?.(newValue);
  };

  return (
    <>
      <button type="button" className="appearance-none">
        <label
          htmlFor="termsAndConditions"
          className="mx-4 my-8 flex cursor-pointer items-center justify-around"
        >
          <section
            className="m-2 flex aspect-square size-12 items-center justify-center border-4 md:size-20"
            tabIndex={0}
          >
            <span className="my-auto text-center text-2xl font-bold md:text-6xl">
              {tCsAcc ? 'x' : ''}
            </span>
            <input
              type="checkbox"
              id="termsAndConditions"
              name="termsAndConditions"
              form={formId}
              className="sr-only"
              checked={tCsAcc}
              onChange={handleTCsAcc}
              required
            />
          </section>
          <span className="ml-2 text-lg font-bold sm:ml-4 sm:text-xl md:ml-6 md:text-2xl">
            I have read and agreed to the Terms and Conditions
          </span>
        </label>
      </button>
    </>
  );
};

export default TermsAndConditionsAcceptance;
