const apiRoutes = {
  vendorRegistration: '/api/vendor/registration',
  login: '/api/login/login',
  isLoggedIn: '/api/login/is-logged-in',
  deleteCookie: '/api/cookie/delete',
  vendorWindow: '/api/vendor/vendor-window',
  businessLayout: '/api/vendor/business-layout',
  categories: '/api/vendor/categories',
  nftLicense: '/api/vendor/license-nft',
} as const;

export default apiRoutes;
