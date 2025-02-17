'use client';
import Select from '@/components/common/select/select';
import { apiRoutes } from '@/routes';
import { FC, useState } from 'react';

const LicenseOwnNft: FC = () => {
  const [isMintedNft, setIsMintedNft] = useState<boolean>(false);
  const [isNonMintedNft, setIsNonMintedNft] = useState<boolean>(false);
  const [isArtwork, setIsArtwork] = useState<boolean>(false);
  const [isCertified, setIsCertified] = useState<boolean>(false);

  return (
    <section className="mt-4 px-4 md:px-8 lg:px-16">
      <h6 className="m-2 mt-10 text-center text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Confirming which type of Art you are licensing
      </h6>

      <div className="mt-4 rounded-md border-2 border-deep-sapphire bg-purple-100 p-4">
        <p className="text-center text-sm text-deep-sapphire md:text-base lg:text-lg">
          In order to license a minted or non-minted NFT, you have to prove you
          own it at the moment of signing the licensing contract by connecting
          your wallet so that the marketplace verifies its existence in your
          wallet.
        </p>
      </div>

      <section className="mt-4 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="mintedNFT"
            className="hidden"
            checked={isMintedNft}
            onChange={() => setIsMintedNft(!isMintedNft)}
          />
          <label
            htmlFor="mintedNFT"
            className="flex cursor-pointer items-center gap-4"
          >
            <div
              className={`m-2 flex size-8 items-center justify-center rounded border-4 ${
                isMintedNft ? 'border-deep-sapphire' : 'border-gray-400'
              }`}
            >
              <span className="text-2xl font-bold">
                {isMintedNft ? '✓' : ''}
              </span>
            </div>
            <span className="text-sm font-bold">Minted NFT</span>
          </label>
        </div>

        <Select
          labelToUse="In Which Marketplace is it selling in?"
          options={[]}
        />

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="nonMintedNFT"
            className="hidden"
            checked={isNonMintedNft}
            onChange={() => setIsNonMintedNft(!isNonMintedNft)}
          />
          <label
            htmlFor="nonMintedNFT"
            className="flex cursor-pointer items-center gap-4"
          >
            <div
              className={`m-2 flex size-8 items-center justify-center rounded border-4 ${
                isNonMintedNft ? 'border-deep-sapphire' : 'border-gray-400'
              }`}
            >
              <span className="text-2xl font-bold">
                {isNonMintedNft ? '✓' : ''}
              </span>
            </div>
            <span className="text-sm font-bold">Non-Minted NFT</span>
          </label>
        </div>

        <Select
          labelToUse="In Which Marketplace is it selling in?"
          options={[]}
        />
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="artwork"
            className="hidden"
            checked={isArtwork}
            onChange={() => setIsArtwork(!isArtwork)}
          />
          <label
            htmlFor="artwork"
            className="flex cursor-pointer items-center gap-4"
          >
            <div
              className={`m-2 flex size-8 items-center justify-center rounded border-4 ${
                isArtwork ? 'border-deep-sapphire' : 'border-gray-400'
              }`}
            >
              <span className="text-2xl font-bold">{isArtwork ? '✓' : ''}</span>
            </div>
            <span className="text-sm font-bold">Artwork</span>
          </label>
        </div>
      </section>

      <form action={apiRoutes.nftLicense} method="POST" className="mt-6">
        <input
          type="hidden"
          name="minted"
          value={isMintedNft ? 'true' : 'false'}
        />
        <input
          type="hidden"
          name="nonMinted"
          value={isNonMintedNft ? 'true' : 'false'}
        />
        <input
          type="hidden"
          name="artwork"
          value={isArtwork ? 'true' : 'false'}
        />
        <div className="flex items-center justify-center gap-4 p-4">
          <input
            type="checkbox"
            id="certify"
            className="hidden"
            checked={isCertified}
            onChange={() => setIsCertified(!isCertified)}
            required
          />
          <label
            htmlFor="certify"
            className="flex cursor-pointer items-center gap-4"
          >
            <div
              className={`m-2 flex size-8 items-center justify-center rounded border-4 ${
                isCertified ? 'border-deep-sapphire' : 'border-gray-400'
              }`}
            >
              <span className="text-2xl font-bold">
                {isCertified ? '✓' : ''}
              </span>
            </div>
            <span className="text-left text-sm font-bold">
              I certify that I am licensing my own minted NFTs, non-minted NFTs,
              or Artwork, which is not a copy in part or in all, of another
              minted or non-minted NFT.
            </span>
          </label>
        </div>

        <div className="m-4 flex justify-center">
          <button
            type="submit"
            className="w-full max-w-sm rounded-3xl border-4 bg-deep-sapphire p-2 text-center text-lg font-bold text-white sm:w-60 sm:text-xl md:w-80 md:text-2xl"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default LicenseOwnNft;
