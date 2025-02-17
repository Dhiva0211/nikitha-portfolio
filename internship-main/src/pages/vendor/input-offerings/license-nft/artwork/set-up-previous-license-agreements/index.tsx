import { FC, useState } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import dynamic from 'next/dynamic';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

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

const artworksArray = [
  {
    name: 'Artwork 1',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 2',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 3',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 4',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 5',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 6',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 7',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 8',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 9',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
  {
    name: 'Artwork 10',
    licenses: [
      {
        description: '',
        type: '',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
      },
    ],
  },
];

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUpPreviousLicenseAgreements: FC = () => {
  const [artworks, setArtworks] = useState(artworksArray.slice(0, 4));

  const showMoreArtworks = () => {
    const newArtworks = artworksArray.slice(
      artworks.length,
      artworks.length + 4,
    );
    setArtworks([...artworks, ...newArtworks]);
  };

  const addLicense = (artworkIndex: number) => {
    const newArtworks = [...artworks];
    newArtworks[`${artworkIndex}`].licenses.push({
      description: '',
      type: '',
      startDate: '2024-10-20',
      endDate: '2024-10-20',
    });
    setArtworks(newArtworks);
  };

  const deleteLicense = (artworkIndex: number, licenseIndex: number) => {
    const newArtworks = [...artworks];
    newArtworks[`${artworkIndex}`].licenses.splice(licenseIndex, 1);
    if (newArtworks[`${artworkIndex}`].licenses.length === 0) {
      newArtworks.splice(artworkIndex, 1);
    }
    setArtworks(newArtworks);
  };

  const updateLicense = (
    artworkIndex: number,
    licenseIndex: number,
    field: string,
    value: string,
  ) => {
    const newArtworks = [...artworks];
    newArtworks[`${artworkIndex}`].licenses[`${licenseIndex}`][`${field}`] =
      value;
    setArtworks(newArtworks);
  };

  return (
    <section className="mt-4">
      <ShowWindowTitle
        smallTitle
        secondTitle="Set up previous license agreements"
      />

      <section className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
        {artworks.map((artwork, artworkIndex) => (
          <div key={artworkIndex} className="rounded-lg border-4 p-4">
            <div className="mb-4 text-xl font-semibold">{artwork.name}</div>
            <div className="mb-4 size-32 rounded-lg border-4 sm:size-44" />
            <div className="space-y-6">
              {artwork.licenses.map((license, licenseIndex) => (
                <div key={licenseIndex} className="rounded-lg border-2 p-4">
                  <div className="mb-4 flex items-center">
                    <button
                      className="mr-4 flex size-8 items-center justify-center rounded-lg border-4 text-lg font-bold"
                      onClick={() => deleteLicense(artworkIndex, licenseIndex)}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">
                      License {licenseIndex + 1}
                    </span>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">License Description</label>
                      <input
                        type="text"
                        className="rounded-md border-4 px-2 py-1 outline-none"
                        value={license.description}
                        onChange={e =>
                          updateLicense(
                            artworkIndex,
                            licenseIndex,
                            'description',
                            e.target.value,
                          )
                        }
                        placeholder="Enter license description"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-medium">License Type</label>
                      <input
                        type="text"
                        className="rounded-md border-4 px-2 py-1 outline-none"
                        value={license.type}
                        onChange={e =>
                          updateLicense(
                            artworkIndex,
                            licenseIndex,
                            'type',
                            e.target.value,
                          )
                        }
                        placeholder="Enter license type"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">Start Date</label>
                        <input
                          type="date"
                          className="rounded-md border-4 px-2 py-1 outline-none"
                          value={license.startDate}
                          onChange={e =>
                            updateLicense(
                              artworkIndex,
                              licenseIndex,
                              'startDate',
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-medium">End Date</label>
                        <input
                          type="date"
                          className="rounded-md border-4 px-2 py-1 outline-none"
                          value={license.endDate}
                          onChange={e =>
                            updateLicense(
                              artworkIndex,
                              licenseIndex,
                              'endDate',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => addLicense(artworkIndex)}
              className="mt-4 rounded-lg border-4 px-4 py-2 hover:bg-deep-sapphire hover:text-white"
            >
              Add License
            </button>
          </div>
        ))}
      </section>
      <div className="mb-1 mt-4 flex w-full justify-center">
        <button
          type="button"
          onClick={showMoreArtworks}
          className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        >
          Show More
        </button>
      </div>
      <CommonLink
        href={routes.vendor.inputOfferings.licenseNft.artwork.default}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default SetUpPreviousLicenseAgreements;
export { getServerSideProps };
