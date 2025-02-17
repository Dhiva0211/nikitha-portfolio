import { FC } from 'react';

interface NewExpectedUpdateProps {
  readonly className?: string;
  readonly header: string;
  readonly isEditing: boolean;
}

const MAX_DESCRIPTION_LENGTH = 70;

const NewExpectedUpdate: FC<NewExpectedUpdateProps> = ({
  className = '',
  header,
  isEditing,
}) => {
  return (
    <section
      className={`mt-6 overflow-hidden rounded-xl border-4 ${className}`}
    >
      <h1 className="flex justify-center rounded-xl border-b-4 p-5 text-center text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl">
        {header}
      </h1>

      <section className="flex flex-col items-center space-y-4 p-6">
        <div className="relative w-full">
          <input
            type="date"
            placeholder="Enter date"
            className="w-full rounded-lg border-2 border-deep-sapphire p-3 text-lg font-normal placeholder:text-corn-flower-blue focus:outline-none"
            readOnly={!isEditing}
          />
        </div>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border-2 border-deep-sapphire p-3 text-lg font-normal placeholder:text-corn-flower-blue focus:outline-none"
            readOnly={!isEditing}
          />
        </div>
        <div className="relative w-full">
          <textarea
            placeholder="Description"
            maxLength={MAX_DESCRIPTION_LENGTH}
            className="min-h-32 w-full resize-none rounded-lg border-2 border-deep-sapphire p-3 text-lg font-normal placeholder:text-corn-flower-blue focus:outline-none"
            readOnly={!isEditing}
          />
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {`0/${MAX_DESCRIPTION_LENGTH} characters`}
          </div>
        </div>
      </section>
    </section>
  );
};

export default NewExpectedUpdate;
