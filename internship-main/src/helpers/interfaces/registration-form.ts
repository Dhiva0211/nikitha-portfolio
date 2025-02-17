interface VendorRegistrationForm {
  readonly firstName: string | undefined;
  readonly lastName: string | undefined;
  readonly typeOfBusiness: string | undefined;
  readonly email: string | undefined;
  readonly password: string | undefined;
  readonly shoppittoAccount: string | undefined;
  readonly termsAndConditions: boolean | undefined;
}

export type { VendorRegistrationForm };
