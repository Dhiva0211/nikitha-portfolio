import { routes } from '@/routes';

const category10Offerings = [
  {
    title: 'Objects',
    link: routes.vendor.tenOfferings.objMachPack.default,
    query: { color: true },
    children: [],
  },
  {
    title: 'Machines',
    link: routes.vendor.tenOfferings.objMachPack.default,
    query: { color: true },
    children: [],
  },
  {
    title: 'Packaging',
    link: routes.vendor.tenOfferings.objMachPack.default,
    query: { color: true },
    children: [],
  },
  {
    title: 'General Solutions',
    link: null,
    query: null,
    children: [
      {
        title: 'Individual Solutions',
        link: routes.vendor.tenOfferings.generalSolutions.individualServices
          .default,
        query: { color: true },
      },
      {
        title: 'Subscription',
        link: routes.vendor.tenOfferings.generalSolutions.subscription.default,
        query: { color: true },
      },
    ],
  },
  {
    title: 'License NFTs',
    link: null,
    query: null,
    children: [
      {
        title: 'Minted NFT',
        link: routes.vendor.tenOfferings.licenseNft.default,
        query: { minted: true },
      },
      {
        title: 'Non-Minted NFT',
        link: routes.vendor.tenOfferings.licenseNft.default,
        query: { minted: false },
      },
      {
        title: 'Artwork',
        link: routes.vendor.tenOfferings.licenseNft.default,
        query: { artwork: true },
      },
    ],
  },
  {
    title: 'AI Solutions',
    link: null,
    query: null,
    children: [
      {
        title: 'Individual Solutions',
        link: routes.vendor.tenOfferings.generalSolutions.individualServices
          .default,
        query: { color: true },
      },
      {
        title: 'Subscription',
        link: routes.vendor.tenOfferings.generalSolutions.subscription.default,
        query: { color: true },
      },
    ],
  },
];

export { category10Offerings };
