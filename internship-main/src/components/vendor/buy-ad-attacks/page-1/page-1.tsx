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
  'Ad Attacks',
  'Pay after sale ad',
  'Your lookup plaza top of search',
  'You lookup plaza larger window',
  'Add offering to Ai look',
  'Add offering to AI Fashion',
  'Add offering to AI House',
  'First time newsletter ad',
  'Video-Direct sell in app',
  'App discount',
  'Tv-Direct Sell',
  'Sponsor events',
  'Initiate sales from emails',
  'Discount policy',
];
const Page1: FC = () => (
  <section className="m-2">
    <Description>
      UpUnikSelf wants to boost your sales potential. We understand that your
      objectives and strategies will depend on the marketing phase that you are
      in.
      <br />
      1 - Awareness - Make Shoppittos aware of your offerings’ existence.
      <br />
      2 - Interest - Encourage Shoppittos to learn more about your offerings.
      <br />
      3 - Decision - Convince Shoppittos to make a purchase.
      <br />
      To get in front of your audience and engage Shoppittos, we provide you
      with various marketing tools.
    </Description>

    <section className="m-2 grid grid-cols-2 place-items-center gap-2">
      {list.map(item => (
        <Link
          key={item}
          href={routes.underConstruction}
          className="flex h-40 flex-col items-center justify-center sm:h-32 md:h-28"
        >
          <div className="grow" />
          <span className="text-center text-lg font-bold md:text-xl">
            {item}
          </span>

          <section className="mt-4 aspect-square size-16 rounded-2xl border-4 bg-deep-sapphire" />
        </Link>
      ))}
    </section>
  </section>
);

export default Page1;
