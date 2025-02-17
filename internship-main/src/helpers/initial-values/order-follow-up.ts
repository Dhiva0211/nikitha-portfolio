import { routes } from '@/routes';

const categoryOrderFollowUp = [
  {
    title: 'Objects',
    link: routes.vendor.orderFollowUp.objectsMachinesPackaging.default,
    query: null,
    children: [],
  },
  {
    title: 'Machines',
    link: routes.vendor.orderFollowUp.objectsMachinesPackaging.default,
    query: null,
    children: [],
  },
  {
    title: 'Packaging',
    link: routes.vendor.orderFollowUp.objectsMachinesPackaging.default,
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
        link: routes.vendor.orderFollowUp.individualSolutions.default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.orderFollowUp.subscription.default,
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
        link: routes.vendor.orderFollowUp.licenseNft,
        query: null,
      },
      {
        title: 'Non-Minted NFT',
        link: routes.vendor.orderFollowUp.licenseNft,
        query: null,
      },
      {
        title: 'Artwork',
        link: routes.vendor.orderFollowUp.licenseNft,
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
        link: routes.vendor.orderFollowUp.individualSolutions.default,
        query: null,
      },
      {
        title: 'Subscription',
        link: routes.vendor.orderFollowUp.subscription.default,
        query: null,
      },
    ],
  },
];

export { categoryOrderFollowUp };
