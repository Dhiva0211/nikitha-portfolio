import { routes } from '@/routes';

const categoryOrderSetUp = [
  {
    title: 'Objects',
    link: routes.vendor.orderSetup.objMachPack.default,
    query: null,
    children: [],
  },
  {
    title: 'Machines',
    link: routes.vendor.orderSetup.objMachPack.default,
    query: null,
    children: [],
  },
  {
    title: 'Packaging',
    link: routes.vendor.orderSetup.objMachPack.default,
    query: null,
    children: [],
  },
  {
    title: 'General Solutions',
    link: null,
    query: null,
    children: [
      {
        title: 'Individual Solutions',
        link: routes.vendor.orderSetup.generalSolutions.individualServices
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.orderSetup.generalSolutions.subscription.default,
        query: null,
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
        link: routes.vendor.orderSetup.licenseNft.nft.default,
        query: null,
      },
      {
        title: 'Non-Minted NFT',
        link: routes.vendor.orderSetup.licenseNft.nft.default,
        query: null,
      },
      {
        title: 'Artwork',
        link: routes.vendor.orderSetup.licenseNft.artwork.default,
        query: null,
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
        link: routes.vendor.orderSetup.generalSolutions.individualServices
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.orderSetup.generalSolutions.subscription.default,
        query: null,
      },
    ],
  },
];

export { categoryOrderSetUp };
