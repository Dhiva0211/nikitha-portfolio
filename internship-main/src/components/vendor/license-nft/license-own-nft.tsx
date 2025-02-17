'use client';
import { FC, useState } from 'react';

const LicenseOwnNft: FC = () => {
  const [licenseOwned, setLicenseOwned] = useState<boolean>(false);

  // This function toggles the checkbox's state
  const handleLicenseOwned = () => setLicenseOwned(!licenseOwned);

  return (
    <>
      {/* Hidden checkbox (to be submitted with the form) */}
      <input
        type="checkbox"
        id="licenseOwnedNFT"
        className="hidden"
        checked={licenseOwned}
        onChange={handleLicenseOwned}
        required
      />

      {/* Custom checkbox label */}
      <label
        htmlFor="licenseOwnedNFT"
        className="mx-4 my-8 flex cursor-pointer items-center justify-start gap-4"
      >
        {/* Custom checkbox visual */}
        <div
          className={`m-2 flex size-8 items-center justify-center rounded border-4 ${
            licenseOwned ? 'border-deep-sapphire' : 'border-gray-400'
          }`}
        >
          {/* Show checkmark '✓' when checked */}
          <span className="text-2xl font-bold">{licenseOwned ? '✓' : ''}</span>
        </div>

        {/* Certification text */}
        <span className="ml-2 text-left text-sm font-bold">
          I certify that I am licensing my own minted NFTs, non-minted NFTs, or
          Artwork, which is not a copy in part or in all, of another minted or
          non-minted NFT.
        </span>
      </label>
    </>
  );
};

export default LicenseOwnNft;
