import { RenderIf } from '@/helpers/common/render-conditional';
import { routes } from '@/routes';
import Link from 'next/link';
import { FC } from 'react';
import TitleDesc from './title-desc';

interface TitleDescHrProps {
  readonly title: string;
  readonly description: string;
  readonly isLink?: boolean;
}

const classNameLeft =
  'w-2/5 sm:w-1/4 h-full flex items-center text-md justify-center rounded-2xl border-r-4 border-white bg-deep-sapphire p-2 sm:p-4 text-center sm:text-xl md:text-2xl font-bold text-white';
const classNameRight =
  'rounded-r-2xl flex-1 text-center flex items-center justify-center p-2 sm:p-4 h-full text-white text-xs sm:text-lg md:text-xl font-semibold';
const TitleDescHr: FC<TitleDescHrProps> = ({
  title,
  description,
  isLink = true,
}) => (
  <RenderIf
    condition={isLink}
    then={
      <Link href={routes.underConstruction}>
        <TitleDesc
          title={title}
          description={description}
          classNameLeft={classNameLeft}
          classNameRight={classNameRight}
          haveBackground={true}
        />
      </Link>
    }
    otherwise={
      <TitleDesc
        title={title}
        description={description}
        classNameLeft={classNameLeft}
        classNameRight={classNameRight}
        haveBackground={true}
      />
    }
  />
);

export default TitleDescHr;
