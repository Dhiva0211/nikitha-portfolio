import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import Link from 'next/link';
import { routes } from '@/routes';

const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const list = [
  'Bulk Discounts',
  'Koach discounts',
  'Pop up discounts',
  'Special occasion discounts',
  'Free shipping discounts',
  'UpUnikSelf account dealz',
  '50% First time shoppitto discount',
  '80% Startup discount',
  'Show up in suggestions with discount',
  'Allow extreme customized sales at a premium',
];
const Page2: FC = () => (
  <section className="m-2">
    <Description>
      You can set up various discount and sales tools to help you boost your
      sales. The most popular discount among world buyers is free shipping.
      Another popular discount tool is to set up a minimum shop amount to access
      free shipping. You can also set up your preferred selling quantity.
      Although, you have to input the price to sell one unit of your basic
      offering, to offer the choice to buy one unit as a paid sample before the
      buyer commits to larger purchases. You can offer a discount to sell above
      your preferred quantity and set it up in bulk discounts below.
    </Description>

    <section className="m-2 grid grid-cols-2 place-items-center gap-2">
      {list.map(item => (
        <Link
          key={item}
          href={routes.underConstruction}
          className="flex h-36 flex-col items-center justify-center sm:h-32 md:h-28"
        >
          <span className="text-center text-lg font-bold md:text-xl">
            {item}
          </span>
          <div className="grow" />
          <section className="mt-4 aspect-square size-16 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
      ))}
    </section>
  </section>
);

export default Page2;
