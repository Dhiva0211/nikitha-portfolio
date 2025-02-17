import { routes } from '@/routes';

const categoryManageReturns = [
  {
    title: 'Objects',
    link: routes.vendor.manageReturns.objectsMachinesPackaging.default,
    query: null,
    children: [],
  },
  {
    title: 'Machines',
    link: routes.vendor.manageReturns.objectsMachinesPackaging.default,
    query: null,
    children: [],
  },
  {
    title: 'Packaging',
    link: routes.vendor.manageReturns.objectsMachinesPackaging.default,
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
        link: routes.vendor.manageReturns.individualSolutionsSubscription
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.manageReturns.individualSolutionsSubscription
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
        link: routes.vendor.manageReturns.licenseNft.default,
        query: null,
      },
      {
        title: 'Non-Minted NFT',
        link: routes.vendor.manageReturns.licenseNft.default,
        query: null,
      },
      {
        title: 'Artwork',
        link: routes.vendor.manageReturns.licenseNft.default,
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
        link: routes.vendor.manageReturns.individualSolutionsSubscription
          .default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.manageReturns.individualSolutionsSubscription
          .default,
        query: null,
      },
    ],
  },
];

export { categoryManageReturns };
