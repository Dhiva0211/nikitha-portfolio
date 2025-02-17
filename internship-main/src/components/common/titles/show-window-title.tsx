import { RenderIf } from '@/helpers/common/render-conditional';
import { FC } from 'react';

interface ShowWindowTitleProps {
  readonly smallTitle?: boolean;
  readonly secondTitle?: string;
  readonly thirdTitle?: string;
}

const ShowWindowTitle: FC<ShowWindowTitleProps> = ({
  smallTitle,
  secondTitle = '',
  thirdTitle = '',
}) => (
  <section>
    <h1
      className={`text-center font-bold text-deep-sapphire ${
        smallTitle
          ? 'm-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
          : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
      }`}
    >
      ShopWindow
    </h1>
    <RenderIf
      condition={
        secondTitle !== '' && secondTitle !== null && secondTitle !== undefined
      }
      then={
        <h2 className="m-2 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {secondTitle}
        </h2>
      }
      otherwise={null}
    />
    <RenderIf
      condition={
        thirdTitle !== '' && thirdTitle !== null && thirdTitle !== undefined
      }
      then={
        <h3 className="m-2 text-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          {thirdTitle}
        </h3>
      }
      otherwise={null}
    />
  </section>
);

export default ShowWindowTitle;
