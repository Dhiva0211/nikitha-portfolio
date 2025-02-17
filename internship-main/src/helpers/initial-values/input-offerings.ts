import { routes } from '@/routes';

const categoryInputOfferings = [
  {
    title: 'Objects',
    link: routes.vendor.inputOfferings.objMachPack.default,
    query: null,
    children: [],
  },
  {
    title: 'Machines',
    link: routes.vendor.inputOfferings.objMachPack.default,
    query: null,
    children: [],
  },
  {
    title: 'Packaging',
    link: routes.vendor.inputOfferings.objMachPack.default,
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
        link: routes.vendor.inputOfferings.generalSolutions.individualServices
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.inputOfferings.generalSolutions.subscription
          .default,
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
        link: routes.vendor.inputOfferings.licenseNft.nft.default,
        query: null,
      },
      {
        title: 'Non-Minted NFT',
        link: routes.vendor.inputOfferings.licenseNft.nft.default,
        query: null,
      },
      {
        title: 'Artwork',
        link: routes.vendor.inputOfferings.licenseNft.artwork.default,
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
        link: routes.vendor.inputOfferings.generalSolutions.individualServices
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.inputOfferings.generalSolutions.subscription
          .default,
        query: null,
      },
    ],
  },
];

export { categoryInputOfferings };
