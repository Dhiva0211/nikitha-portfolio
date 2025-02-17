import { convertDateToString } from '@/helpers/validations';
import { FC } from 'react';

interface AddLogoNameProps {
  readonly country: string;
  readonly city: string;
  readonly joinedInDate: string | Date;
  readonly vendorName: string;
}

const AddLogoName: FC<AddLogoNameProps> = ({
  country,
  city,
  joinedInDate,
  vendorName,
}) => (
  <section className="m-2 flex items-center justify-between rounded-xl border-4 text-deep-sapphire">
    <section className="flex min-w-fit grow flex-col justify-between p-2 sm:p-4">
      <section className="mb-4 flex items-center">
        <section className="flex size-14 shrink-0 items-center justify-center rounded-xl border-4 p-2 sm:size-20 lg:size-24">
          <label
            id="add_logo"
            className="flex size-full cursor-pointer items-center justify-center bg-deep-sapphire text-center text-sm font-extrabold text-white sm:text-xs"
          >
            LOGO
            <input type="file" id="add_logo" className="hidden" />
          </label>
        </section>

        <section className="ml-1 flex w-full flex-col text-xs sm:ml-3 sm:text-sm md:text-base lg:text-lg">
          <p>{country}</p>
          <p>{city}</p>
          <p>Joined {convertDateToString(new Date(joinedInDate))}</p>
        </section>
      </section>

      <p className="mt-2 w-full max-w-36 whitespace-nowrap text-sm font-bold sm:max-w-fit sm:px-2 sm:text-lg md:text-2xl lg:text-3xl">
        {vendorName}
      </p>
    </section>

    <section className="flex flex-col items-center gap-2 overflow-hidden p-2 sm:p-4">
      <div className="relative size-24 overflow-hidden rounded-lg border-4 sm:size-32 md:size-40 lg:size-48">
        <div className="absolute inset-0 bg-black">
          <video
            className="size-full object-cover"
            poster="placeholder.jpg"
            controls
          >
            <source src="" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <label
        htmlFor="add_video"
        className="cursor-pointer text-center text-sm sm:text-lg"
      >
        Click to add 20 Second Ad
        <input type="file" id="add_video" className="hidden" />
      </label>
    </section>
  </section>
);

export default AddLogoName;
