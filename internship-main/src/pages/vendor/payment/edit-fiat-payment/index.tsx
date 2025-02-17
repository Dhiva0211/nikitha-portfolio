import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { RenderSwitch } from '@/helpers/common/render-conditional';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
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
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
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
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const bankAccountList = ['Bank name', 'Account number', 'Routing number'];
const creditCardList = [
  'Type of card',
  'Name in card',
  'Card number',
  'Expiration date',
  'Security code',
];

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  return validSessionToken(
    token,
    context.resolvedUrl,
    true,
    false,
    false,
  ) as never;

  return {
    props: {},
  };
};

enum PaymentMethod {
  BankAccount = 'Bank Account',
  CreditDebitCard = 'Credit/Debit Card',
  DigitalWallet = 'Digital Wallet',
}

const EditFiatPayment: FC = () => {
  const [preferredPaymentSelected, setPreferredPaymentSelected] =
    useState<PaymentMethod>(PaymentMethod.BankAccount);

  const handlePreferredPaymentSelected = (value: PaymentMethod) =>
    setPreferredPaymentSelected(value);

  return (
    <section className="mt-4 w-full max-w-7xl px-4">
      <ShowWindowTitle smallTitle secondTitle="Payment" />

      <Select labelToUse="Chosen vendor fiat payment method" options={[' ']} />

      <section>
        <h3 className="text-center text-2xl font-bold">Edit Fiat Payment</h3>
        <Select labelToUse="Preferred payment method" options={[]}>
          <section className="flex flex-col">
            {Object.values(PaymentMethod).map((preferencePayment, index) => (
              <button
                type="button"
                key={index}
                onClick={() =>
                  handlePreferredPaymentSelected(preferencePayment)
                }
                className={
                  preferencePayment === preferredPaymentSelected
                    ? 'text-lg font-bold underline'
                    : 'text-base'
                }
              >
                {preferencePayment}
              </button>
            ))}
          </section>
        </Select>
        <section className="-mt-5 inline-flex">
          <button className="m-5 flex w-24 items-center justify-around rounded-xl border-4 p-2">
            Edit
          </button>
          <CommonButton type="button" className="w-36 rounded-2xl">
            Save
          </CommonButton>
        </section>
      </section>

      <Description>Check one that applies.</Description>

      <RenderSwitch
        value={preferredPaymentSelected}
        cases={{
          [PaymentMethod.BankAccount]: (
            <section className="m-2">
              <h3 className="text-2xl font-bold">
                {PaymentMethod.BankAccount} details:
              </h3>
              {bankAccountList.map((bankAccount, index) => (
                <InputLabelLeft key={index} labelToUse={bankAccount} />
              ))}
            </section>
          ),
          [PaymentMethod.CreditDebitCard]: (
            <section className="m-2">
              <h3 className="text-2xl font-bold">
                {PaymentMethod.CreditDebitCard} details:
              </h3>
              {creditCardList.map((creditCard, index) => (
                <InputLabelLeft key={index} labelToUse={creditCard} />
              ))}
            </section>
          ),
          [PaymentMethod.DigitalWallet]: (
            <section className="m-2">
              <h3 className="text-2xl font-bold">
                {PaymentMethod.DigitalWallet} details:
              </h3>
              <Select labelToUse="Wallet" options={['']} />
              <InputLabelLeft labelToUse="Account ID" />
            </section>
          ),
        }}
        defaultCase={
          <section className="m-2">
            <h3 className="text-2xl font-bold">Bank account details</h3>
            {bankAccountList.map((bankAccount, index) => (
              <InputLabelLeft key={index} labelToUse={bankAccount} />
            ))}
          </section>
        }
      />

      <CommonLink href={routes.vendor.payment.default}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default EditFiatPayment;
export { getServerSideProps };
