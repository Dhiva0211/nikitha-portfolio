import { FC, useState } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';

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
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
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

interface SalesTaxesOptionsProps {
  readonly returnTo: string;
}

const SalesTaxesOptions: FC<SalesTaxesOptionsProps> = ({ returnTo }) => {
  const [selectedValues, setSelectedValues] =
    useState<Record<string, boolean>>();

  const handleChange = (offering: string, value: boolean) => {
    setSelectedValues(prev => ({
      ...prev,
      [offering]: value,
    }));
  };

  return (
    <section className="m-2 mt-4 flex w-full max-w-5xl flex-wrap items-center justify-center gap-2 px-12 text-center">
      <ShowWindowTitle smallTitle secondTitle="Set Up Price" />

      <Description>
        <strong>Sales Taxes</strong>
        <br />
        When you sell on UpUnikSelf, you’re responsible for complying with all
        applicable tax laws. We strongly suggest seeking professional advice
        about your tax obligations.
        <br />
        You can also review the UpUnikSelf Tax Terms and Conditions.
        <br />
        Your tax-related responsibilities may include:
        <br />
        - Paying sales tax on UpUnikSelf sales
        <br />- Paying income tax on UpUnikSelf sales
      </Description>

      <section className="m-2 mt-4 flex w-full max-w-5xl flex-wrap items-center justify-center gap-2 px-12 text-center">
        <p className="w-full sm:w-1/2">
          Do you think you are exempt to pay sales-related taxes in the US?
        </p>

        <CommonLink href={routes.underConstruction}>
          <section className="p-4">
            <span className="text-base font-bold">
              Click the button to present proof documentation
            </span>
          </section>
        </CommonLink>
      </section>
      <Description>
        <strong>Sales Taxes</strong>
        <br />
        <strong>Marketplace responsibility: </strong>
        In the US, 46 US jurisdictions require the collection of sales tax. In
        such cases, UpUnikSelf will collect and will remit internet sales tax on
        your behalf from sales to shipping addresses in those states. Some
        states also oblige marketplaces to collect and remit tax-related fees
        (Mattress recycling fee, Electronic waste recycling fee, Tire recycling
        fee, White goods disposal fee, Retail delivery fee). Each state’s
        legislation dictates if shipping and handling are taxable or not.
        UpUnikSelf will collect tax on shipping and handling where applicable.
        Because there are between 11,000 to 12,000 unique sales tax rules in the
        US alone, and UpUnikSelf cannot control the entire volume of sales of
        each vendor in each region in a period of time since they may originate
        from other marketplaces outside of UpUnikSelf, in order to avoid fines
        from tax authorities, UpUnikSelf may assume that each vendor’s volume of
        sales surpasses each state’s sales tax threshold.
      </Description>

      <section className="m-2 mt-4 flex w-full max-w-5xl flex-wrap items-center justify-center gap-2 px-12 text-center">
        <p className="w-full sm:w-1/2">
          Do you think you are liable to collect sales-related taxes in the US,
          in addition to those already collected by us?
        </p>

        <CommonLink href={routes.underConstruction}>
          <section className="p-4">
            <span className="text-base font-bold">
              Click the button to present proof documentation
            </span>
          </section>
        </CommonLink>
      </section>

      <Description>
        <strong>Sales Taxes</strong>
        <br />
        <strong>Vendor Responsibility: </strong>
        It may happen that the shipping address isn&apos;t in one of the
        marketplace responsibility states, and the seller has a responsibility
        to charge sales tax in that state. In this case, the vendor will have to
        include sales taxes in the sale price, collect them and remit them to
        the tax authorities. We recommend you consult your tax advisor.
      </Description>

      <section className="m-2 mt-4 flex w-full max-w-5xl flex-wrap items-center justify-center gap-2 px-12 text-center">
        <p className="w-full sm:w-1/2">
          Do you think you are liable to collect
          <br />
          - VAT in the EU, UK, MEXICO, KAZAKHSTAN, BELARUS, or
          <br />
          - VOEC in NORWAY, or
          <br />
          - GST in AUSTRALIA, NEW ZEALAND?
          <br />
        </p>

        <CommonLink href={routes.underConstruction}>
          <section className="p-4">
            <span className="text-base font-bold">
              Click the button to present proof documentation
            </span>
          </section>
        </CommonLink>
      </section>

      <Description>
        <strong>Sales Taxes</strong>
        <br />
        To sell to Shoppittos worldwide, tax authorities may require certain
        vendors to charge and remit sales-related taxes. It is each vendor’s
        responsibility to ensure they are sales-related tax-compliant. Complete
        the following steps to ensure you are sales-related tax-compliant and to
        avoid potential selling restrictions. Register with the local tax
        authority in each country where you’ve determined you have a
        sales-related tax obligation. Provide UpUnikSelf with your Value Added
        Tax ID number, or VOEC and GST ID number, and we will automatically add
        it to all your eligible new orders’ price. To provide and edit your Tax
        ID go to Vendor Dashboard and select Setup and Edit Vendor Window.
      </Description>

      <section className="m-2 mt-4 flex max-w-5xl flex-col items-center gap-2 px-6 text-center">
        <h3 className="m-2 text-2xl font-bold">Vendor Tax Decisions</h3>
        <p>Do all of your offerings’ prices already include the sales tax?</p>
        <section className="flex max-w-full flex-col gap-2 sm:flex-row">
          <CommonLinkNoBg
            className="size-16 w-full sm:w-auto"
            href={routes.underConstruction}
          >
            <section className="flex size-16 items-center justify-center">
              <span className="text-xl font-bold">Yes</span>
            </section>
          </CommonLinkNoBg>
          <CommonLinkNoBg className="size-16" href={routes.underConstruction}>
            <section className="flex size-16 items-center justify-center">
              <span className="text-xl font-bold">No</span>
            </section>
          </CommonLinkNoBg>
        </section>
      </section>

      <Description>
        UpUnikSelf will calculate and present to the Shoppitto a separate sales
        tax in both cases. In certain countries such as Japan, it is mandatory
        to include the sales tax in the selling price. Check with your tax
        lawyer for information on your tax obligations.
      </Description>

      <section className="m-2 mt-4 flex max-w-5xl flex-col items-center gap-2 px-6 text-center">
        <p>
          Do you want all applicable sales taxes to be charged on the sales
          price?
        </p>

        <section className="flex max-w-full flex-col gap-2 sm:flex-row">
          <CommonLinkNoBg className="size-16" href={routes.underConstruction}>
            <section className="flex size-16 items-center justify-center">
              <span className="text-xl font-bold">Yes</span>
            </section>
          </CommonLinkNoBg>
          <CommonLinkNoBg className="size-16" href={routes.underConstruction}>
            <section className="flex size-16 items-center justify-center">
              <span className="text-xl font-bold">No</span>
            </section>
          </CommonLinkNoBg>
        </section>
      </section>

      <Description>
        Sometimes, there may be Federal and regional taxes which overlap.
        Choosing No in the above question will allow UpUnikSelf to not double
        charge sales-related taxes. Check with your tax lawyer if this is a
        better option for you.
      </Description>

      <h3 className="m-2 px-12 text-center text-xl">
        Does your shipping price already include sales tax on shipping?
      </h3>

      <section className="m-2 rounded-2xl border-4 px-8 py-4">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <span />
          <div className="grid grid-cols-2 gap-2">
            <span className="text-center text-lg font-bold">Yes</span>
            <span className="text-center text-lg font-bold">No</span>
          </div>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="mb-2 grid grid-cols-2 items-center">
            <span className="font-bold">Offering {index + 1}</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  name="yes-no"
                  checked={selectedValues?.[`offering${index}`]}
                  onChange={() => handleChange(`offering${index}`, true)}
                  className="size-5"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  name="yes-no"
                  checked={!selectedValues?.[`offering${index}`]}
                  onChange={() => handleChange(`offering${index}`, false)}
                  className="size-5"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <Description>
        Some shipping deals already include sales taxes on shipping. Check with
        your shipping provider.
      </Description>

      <CommonLink href={returnTo}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default SalesTaxesOptions;
