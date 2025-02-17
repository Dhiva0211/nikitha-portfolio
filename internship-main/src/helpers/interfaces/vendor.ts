interface VendorData {
  readonly country: string;
  readonly city: string;
  readonly joinedInDate: string | Date;
  readonly vendorName: string;
  readonly bgColor?: string | null;
  readonly frameColor?: string | null;
}

export default VendorData;
