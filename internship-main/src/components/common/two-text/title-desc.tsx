import { FC } from 'react';

interface TitleDescProps {
  readonly title: string;
  readonly description: string;
  readonly classNameLeft: string;
  readonly classNameRight: string;
  readonly haveBackground: boolean;
}

const TitleDesc: FC<TitleDescProps> = ({
  title,
  description,
  classNameLeft,
  classNameRight,
  haveBackground,
}) => (
  <section
    className={`m-3 flex h-40 items-center justify-center overflow-hidden rounded-2xl ${haveBackground ? 'border-white bg-deep-sapphire' : ''} border-4`}
  >
    <h4 className={`${classNameLeft}`}>{title}</h4>
    <span className={`${classNameRight}`}>{description}</span>
  </section>
);

export default TitleDesc;
