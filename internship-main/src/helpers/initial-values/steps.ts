import { BusinessInfo } from '@prisma/client';

const vendorWindowInitialValues: BusinessInfo = {
  id: 0,
  categoryId: '',
  busLegalName: '',
  busStartYear: null,
  countryCode: '',
  phoneNumber: '',
  termsAndConditionSellersAccount: null,
  termsAndConditionFinishRegistration: null,
  country: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  tutorNumber: '',
  taxIdNumber: '',
  idPhotoUrl: '',
  electronicSignatureUrl: '',
  joinInDate: null,
  userId: '',
  layoutId: null,
};

export { vendorWindowInitialValues };
