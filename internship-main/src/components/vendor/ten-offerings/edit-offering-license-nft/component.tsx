import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import whiteImage from '@//public/images/white-image.jpg';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface ComponentProps {
  edit: string | Array<string> | undefined;
}

const Component: FC<ComponentProps> = ({ edit }) => {
  const router = useRouter();

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  const buildQuery = () => {
    if (Array.isArray(edit)) {
      return edit.join('');
    }

    if (typeof edit === 'string') {
      return edit;
    }

    return '';
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle smallTitle secondTitle="Edit NFT To License" />
      <h6 className="text-center text-xl font-bold">NFT License {edit}</h6>

      <CommonLink
        href={routes.vendor.tenOfferings.licenseNft.nft.deleteOffering}
        query={{ edit: buildQuery() }}
      >
        <span className="text-xl font-bold">Change this NFT to license</span>
      </CommonLink>
      <CommonLink
        href={routes.vendor.tenOfferings.licenseNft.nft.default}
        onClick={goBack}
      >
        <span className="text-xl font-bold">Add another NFT to license</span>
      </CommonLink>

      <Description>
        You can only sell up to 10 NFT licenses at any one time. When you choose
        to change one of them, you must first delete the old NFT license and
        then add the new one. All the orders made by Shoppittos of the old NFT
        license before it was deleted must still be fulfilled.
      </Description>

      <InputLabelLeft labelToUse="NFT Name" />
      <InputLabelLeft labelToUse="Connect new wallet" />

      <Description>
        Choose this option if your NFT is in another wallet.
      </Description>

      <section className="m-4 flex max-w-7xl">
        <section className="flex size-36 items-center justify-center rounded-xl border-4 p-2">
          <Image
            src={whiteImage}
            alt="NFT"
            width={300}
            height={300}
            className="m-2 size-full object-contain"
          />
        </section>
        <label className="m-2 cursor-pointer font-bold" htmlFor="nft-image">
          Choose NFT to License
          <input type="file" id="nft-image" className="hidden" />
        </label>
      </section>

      <Select
        labelToUse="Select which sub-category your NFT to license applies to"
        options={[]}
      />

      <Description>
        Choose one of the categories in which your NFT license should be sold
      </Description>

      <InputLabelLeft labelToUse="NFT Keywords" />

      <Description>
        Up to 30 keywords, no emojis Separate each keyword by a comma “,”
      </Description>

      <CommonLink href={routes.returnBack} onClick={goBack}>
        <span className="text-xl font-bold">Cancel</span>
      </CommonLink>

      <Description>
        You can only license up to 10 NFTs at a time. You can change any NFT
        that you want to license, and all new NFT licenses need to go through
        the approval process.
      </Description>
      <section className="flex justify-center">
        <CommonLinkNoBg
          href={routes.vendor.tenOfferings.licenseNft.nft.ApprovalOffering}
        >
          <div className="flex items-center justify-center gap-3">
            <Ellipse
              className="size-20"
              svgClassName="fill-deep-sapphire stroke-deep-sapphire"
            />
            <span className="text-xl font-bold sm:text-2xl md:text-3xl">
              Request Approval
            </span>
          </div>
        </CommonLinkNoBg>
      </section>
    </section>
  );
};

export default Component;
