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
  'w-40 sm:w-56 rounded-2xl bg-deep-sapphire text-center text-2xl ml-2 font-bold text-white h-20 content-center sm:text-3xl md:text-5xl';
const classNameRight =
  'w-24 sm:w-28 rounded-r-2xl text-center bg-white text-deep-sapphire mr-2 -ml-3 -z-50 h-20 border-y-4 border-r-4 content-center text-lg sm:text-xl md:text-2xl';
const TitleDescBgWhite: FC<TitleDescHrProps> = ({
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
          haveBackground={false}
        />
      </Link>
    }
    otherwise={
      <TitleDesc
        title={title}
        description={description}
        classNameLeft={classNameLeft}
        classNameRight={classNameRight}
        haveBackground={false}
      />
    }
  />
);

export default TitleDescBgWhite;
