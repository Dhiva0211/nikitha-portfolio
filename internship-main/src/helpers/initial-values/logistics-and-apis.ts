import { routes } from '@/routes';

const categoryLogisticsAndApis = [
  {
    title: 'Objects',
    link: routes.vendor.logisticsAndApis.objectsMachinesPackaging.default,
    query: null,
    children: [],
  },
  {
    title: 'Machines',
    link: routes.vendor.logisticsAndApis.objectsMachinesPackaging.default,
    query: null,
    children: [],
  },
  {
    title: 'Packaging',
    link: routes.vendor.logisticsAndApis.objectsMachinesPackaging.default,
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
        link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.logisticsAndApis.generalSolutions.subscription
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
        link: routes.vendor.logisticsAndApis.licenseNft.nft.default,
        query: null,
      },
      {
        title: 'Non-Minted NFT',
        link: routes.vendor.logisticsAndApis.licenseNft.nonMintedNft.default,
        query: null,
      },
      {
        title: 'Artwork',
        link: routes.vendor.logisticsAndApis.licenseNft.artwork,
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
        link: routes.vendor.logisticsAndApis.generalSolutions.individualServices
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.logisticsAndApis.generalSolutions.subscription
          .default,
        query: null,
      },
    ],
  },
];

export { categoryLogisticsAndApis };
