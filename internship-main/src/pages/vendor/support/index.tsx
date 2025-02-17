import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { optionsTypeChat, optionsTypeFaq } from '@/assets/mocks';
import Link from 'next/link';

const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const VendorSupport: FC = () => (
  <section className="mt-4">
    <Select labelToUse="CHAT">
      <ul className="m-2 text-center">
        {optionsTypeChat.map(option => (
          <li key={option.title} className="my-4">
            <Link href={option.link} className="text-2xl font-bold">
              {option.title}
            </Link>
          </li>
        ))}
      </ul>
    </Select>

    <Select labelToUse="FAQ">
      <ul className="m-2 text-center">
        {optionsTypeFaq.map(option => (
          <li key={option.title} className="my-4">
            <Link href={option.link} className="text-2xl font-bold">
              {option.title}
            </Link>
          </li>
        ))}
      </ul>
    </Select>
  </section>
);

export default VendorSupport;
