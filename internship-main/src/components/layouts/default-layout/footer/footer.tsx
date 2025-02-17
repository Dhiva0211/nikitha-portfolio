import { routes } from '@/routes';
import Link from 'next/link';
import { FC } from 'react';

const leftList = [
  'Support',
  'About',
  'Careers',
  'Alumni Network',
  'Social Network Diplomas',
  'Marketplace Entrepreneur Diplomas',
];
const rightList = [
  'Sign Up For Emails',
  'Terms and Conditions',
  'Privacy',
  'CA Privacy',
  'Terms of Use',
  'Your Privacy Choice',
];
const digitalLiteracyDiploma1 = [
  'Digital Literacy Diplomas - Age 13-15',
  'Digital Literacy Diplomas - Age 16-17',
  'Digital Literacy Diplomas - Age 18-27',
];
const digitalLiteracyDiploma2 = [
  'Digital Literacy Diplomas - Age 28-43',
  'Digital Literacy Diplomas - Age 44-59',
  'Digital Literacy Diplomas - Age 60-120',
];
const actualYear = new Date().getFullYear();

const Footer: FC = () => (
  <footer className="mt-auto w-full bg-deep-sapphire text-white">
    {/* Upper Section with Left and Right Links */}
    <section className="m-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Left Column */}
      <section className="flex justify-center">
        <ul className="flex flex-col">
          {leftList.map(item => (
            <li key={item} className="py-1 text-base sm:text-lg lg:text-xl">
              <Link href={routes.underConstruction}>{item}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Right Column */}
      <section className="flex justify-center">
        <ul className="flex flex-col">
          {rightList.map(item => (
            <li key={item} className="py-1 text-base sm:text-lg lg:text-xl">
              <Link href={routes.underConstruction}>{item}</Link>
            </li>
          ))}
        </ul>
      </section>
    </section>

    {/* Center Section: Title */}
    <p className="my-4 text-center text-base sm:text-lg lg:text-xl">
      Increase your cyber knowledge
    </p>

    {/* Digital Literacy Diplomas Sections */}
    <section className="m-4 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2">
      <ul className="flex flex-col items-center">
        {digitalLiteracyDiploma1.map(item => (
          <li key={item} className="py-1 text-base sm:text-lg lg:text-xl">
            <Link href={routes.underConstruction}>{item}</Link>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col items-center">
        {digitalLiteracyDiploma2.map(item => (
          <li key={item} className="py-1 text-base sm:text-lg lg:text-xl">
            <Link href={routes.underConstruction}>{item}</Link>
          </li>
        ))}
      </ul>
    </section>

    {/* Footer Note */}
    <p className="mt-4 text-center text-base sm:text-lg lg:text-xl">
      © {actualYear > 2024 ? '2024 - ' : ''}
      {actualYear} UpUnikSelf Inc. All rights reserved.
    </p>
  </footer>
);

export default Footer;
