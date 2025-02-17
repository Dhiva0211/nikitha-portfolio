import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
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

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-white p-6 shadow-md ${className} border-4`}>
    {children}
  </div>
);

const TimeFrameButtons = () => {
  const [active, setActive] = useState('1D'); // Default active button

  const timeFrames = ['1D', '1W', '1M', '3M', '1Y', 'All'];

  return (
    <>
      {timeFrames.map(timeFrame => (
        <span
          key={timeFrame}
          onClick={() => setActive(timeFrame)}
          className={`cursor-pointer rounded-lg px-4 py-2 transition duration-150 ${active === timeFrame ? 'bg-deep-sapphire text-white' : 'bg-gray-200'} hover:bg-deep-sapphire hover:text-white`}
        >
          {timeFrame}
        </span>
      ))}
    </>
  );
};

const CardHeader = ({ children }) => (
  <div className="mb-6 h-1/2">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-bold sm:text-xl">{children}</h3>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const firstList = ['Net sales', 'Orders', 'Average order value'];
const secondList = [
  'Product views',
  '% added to cart',
  '% Reached checkout',
  '% Bought',
  'Shopwindow visits',
  '% Returning shoppittos',
];
const thirdList = [
  'Product views',
  '% Added to cart',
  '% Reached checkout',
  '% Bought',
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

const Statistics: FC = () => {
  const [selectedOffering, setSelectedOffering] =
    useState<string>('Offering 1');

  return (
    <section className="mx-auto mt-4 max-w-7xl p-4">
      <ShowWindowTitle smallTitle secondTitle="Statistics" />

      <div className="mb-8 mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Rating 1</CardTitle>
          </CardHeader>
          <div className="grow" />
          <CardContent className="flex grow flex-col justify-between">
            {25}
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Rating 2</CardTitle>
          </CardHeader>
          <div className="grow" />
          <CardContent className="flex grow flex-col justify-between">
            {25}
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Volume of Sales</CardTitle>
          </CardHeader>
          <div className="grow" />
          <CardContent className="flex grow flex-col justify-between">
            {100000}
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Return % of items Sold</CardTitle>
          </CardHeader>
          <div className="grow" />
          <CardContent className="flex grow flex-col justify-between">
            {25}
          </CardContent>
        </Card>
      </div>

      {firstList.map(item => (
        <section className="mb-8" key={item}>
          <h3 className="mb-2 text-xl font-bold">{item}</h3>
          <div className="mb-2 flex justify-between text-sm">
            <TimeFrameButtons />
          </div>
          <div className="h-44 w-full rounded-lg border-4 bg-gray-100" />
        </section>
      ))}

      <h2 className="mb-6 text-center text-2xl font-bold">Shopping behavior</h2>
      {secondList.map(item => (
        <section className="mb-8" key={item}>
          <h3 className="mb-2 text-xl font-bold">{item}</h3>
          <div className="mb-2 flex justify-between text-sm">
            <TimeFrameButtons />
          </div>
          <div className="h-44 w-full rounded-lg border-4 bg-gray-100" />
        </section>
      ))}

      <h2 className="mb-6 text-center text-2xl font-bold">
        Offerings Analysis
      </h2>
      <Description>
        ABC Inventory Analysis
        <br />
        <span className="flex justify-center">
          <span className="flex justify-items-start text-left">
            A - Offerings that contribute more than 10% to Net Sales
            <br />
            B - Offerings that contribute between 5-10% to Net Sales
            <br />C - Offerings that contribute less than 5% to Net Sales
          </span>
        </span>
      </Description>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Product views</CardTitle>
            <CardTitle>ABC inventory analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="">
          {Array.from({ length: 10 }).map((_, i) => (
            <p className="mb-2 text-lg font-medium" key={i}>
              Offering {i + 1}
            </p>
          ))}
        </CardContent>
      </Card>

      <select
        value={selectedOffering}
        onChange={e => setSelectedOffering(e.target.value)}
        className="mb-8 w-full rounded border p-2 text-lg font-medium"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <option key={i}>Offering {i + 1}</option>
        ))}
      </select>

      {thirdList.map(item => (
        <section className="mb-8" key={item}>
          <h3 className="mb-2 text-xl font-bold">
            {item}{' '}
            <span className="text-lg font-normal">{selectedOffering}</span>
          </h3>
          <div className="mb-2 flex justify-between text-sm">
            <TimeFrameButtons />
          </div>
          <div className="h-44 w-full rounded-lg border-4 bg-gray-100" />
        </section>
      ))}

      <TitleDescHr
        title="Vendor Boost subscription"
        description="Market Analysis - Shoppitto Behavior"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Market Segmentation"
      />
      <TitleDescHr
        title="Vendor Boost subscription"
        description="Market Targeting - Shoppitto Dedicated Discounts"
      />

      <div className="mt-8 text-center">
        <CommonLink className="p-4" href={routes.vendor.dashboard}>
          Done
        </CommonLink>
      </div>
    </section>
  );
};

export default Statistics;
export { getServerSideProps };
