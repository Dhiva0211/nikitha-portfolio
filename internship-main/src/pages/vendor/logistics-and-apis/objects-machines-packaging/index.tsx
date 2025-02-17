import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';
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
const TitleDescHr = dynamic(
  () =>
    import('@/components/common/two-text').then(mod => ({
      default: mod.TitleDescHr,
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

const listOptions = [
  {
    title: 'Input Package Choices',
    link: routes.vendor.logisticsAndApis.objectsMachinesPackaging
      .inputPackageChoices,
  },
  {
    title: 'Input Preferred Shipping Plan',
    link: routes.vendor.logisticsAndApis.objectsMachinesPackaging
      .inputPreferredShippingPlan.default,
  },
  {
    title: 'Print Shipping Labels',
    link: routes.vendor.logisticsAndApis.objectsMachinesPackaging
      .printShippingLabels,
  },
];

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

const Logistics: FC = () => (
  <section className="mt-4">
    <ShowWindowTitle smallTitle secondTitle="Logistics" />

    <section>
      <div className="mx-2 mt-10 grid items-center rounded-xl border-4 border-deep-sapphire text-deep-sapphire md:mx-4 lg:mx-10 xl:mx-36">
        <h3 className="rounded-2xl border-b-4 border-deep-sapphire py-2 text-center text-3xl font-bold">
          Chosen Shipping Plan
        </h3>
        <table>
          <thead>
            <tr className="grid grid-cols-5 text-center text-lg font-semibold">
              <td>Offerings Shipping Plan</td>
              <td className="grid text-center">
                Weight{' '}
                <span className="font-thin">
                  Including Offering, Packaging and Protective Materials
                </span>
              </td>
              <td>Package Height</td>
              <td>Package Length</td>
              <td>Package Width</td>
            </tr>
          </thead>
          <tbody id="table-body">
            {/* <!-- Section --> */}
            <tr className="grid grid-cols-5 text-center">
              <td>
                <h3 className="text-xl font-bold">Offering 1</h3>
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 1</span> <span>USPS Economy 1</span>
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 2</span> <span>DHL Standard 1</span>
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 3</span> <span>Economy 1</span>
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 4</span> <span>DHL Standard 1</span>
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>
            {/* <!-- Section --> */}

            {/* <!-- Section 2 --> */}
            <tr className="grid grid-cols-5 text-center">
              <td>
                <h3 className="text-xl font-bold">Offering 2</h3>
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 1</span> <span />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 2</span> <span>USPS Economy 1</span>
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 3</span> <span>Own</span>
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>
            <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
              <td className="grid grid-cols-2">
                <span>Size 4</span> <span>Own</span>
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                />
              </td>
            </tr>

            {Array.from({ length: 8 }).map((_, i) => (
              <section key={i}>
                <tr className="grid grid-cols-5 text-center" key={i}>
                  <td>
                    <h3 className="text-xl font-bold">Offering {i + 3}</h3>
                  </td>
                </tr>
                <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
                  <td className="grid grid-cols-2">
                    <span>Size 1</span> <span />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                </tr>
                <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
                  <td className="grid grid-cols-2">
                    <span>Size 2</span> <span />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                </tr>
                <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
                  <td className="grid grid-cols-2">
                    <span>Size 3</span> <span />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                </tr>
                <tr className="grid grid-cols-5 py-1 text-center text-lg font-semibold">
                  <td className="grid grid-cols-2">
                    <span>Size 4</span> <span />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-14 rounded-xl border-4 border-deep-sapphire pl-1 sm:w-20 md:w-24 lg:w-32 xl:w-40"
                    />
                  </td>
                </tr>
              </section>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="m-4">
      {listOptions.map((option, index) => (
        <Link
          key={index}
          href={option.link}
          className="mt-2 flex items-center justify-between"
        >
          <span className="w-56 text-2xl font-bold">{option.title}</span>
          <section className="size-20 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
      ))}
    </section>

    <TitleDescHr
      title="Vendor Boost subscription"
      description="Shipping Plan Fees Comparison per Shoppitto Location"
    />
    <TitleDescHr
      title="Vendor Boost subscription"
      description="Shipping Plan Date Comparison per Shoppitto Location"
    />

    <CommonLink href={routes.vendor.dashboard}>
      <section className="py-1">Done</section>
    </CommonLink>
  </section>
);

export default Logistics;
export { getServerSideProps };
