import { RenderIf } from '@/helpers/common/render-conditional';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useState } from 'react';

const Grid = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Grid,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Hamburger = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Hamburger,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface GridOrListProps {
  readonly href: string;
  readonly frameColor?: string;
}

const GridOrList: FC<GridOrListProps> = ({ href, frameColor }) => {
  const arrayOfElements = Array.from({ length: 10 }, (_, i) => i);
  const [isGrid, setIsGrid] = useState<boolean>(true);

  const handleGridState = (value: boolean) => {
    if (value)
      return 'border-2 border-bubblegum-pink cursor-not-allowed rounded-lg p-1';

    return '';
  };

  return (
    <section className="m-4 mx-auto w-full max-w-7xl">
      <section className="mb-4 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => setIsGrid(true)}
          className={handleGridState(isGrid)}
          style={
            isGrid ? { border: '2px solid' + frameColor || undefined } : {}
          }
        >
          <Grid
            color={frameColor}
            svgClassName="size-8 stroke-bubblegum-pink"
          />
          <span className="hidden">Grid</span>
        </button>
        <button
          type="button"
          onClick={() => setIsGrid(false)}
          className={handleGridState(!isGrid)}
          style={
            !isGrid ? { border: '2px solid' + frameColor || undefined } : {}
          }
        >
          <Hamburger
            color={frameColor}
            svgClassName="size-8 stroke-bubblegum-pink"
          />
          <span className="hidden">List</span>
        </button>
      </section>

      <RenderIf
        condition={isGrid}
        then={
          <section className="grid grid-cols-2 grid-rows-4 gap-2 sm:grid-cols-4">
            {arrayOfElements.map((_, i) => (
              <Link
                className={`${
                  i === 2 || i === 5
                    ? 'sm:col-span-2 sm:row-span-2'
                    : i === 4 || i === 9
                      ? 'col-span-2 row-span-2 sm:col-span-1 sm:row-span-1'
                      : ''
                }`}
                key={i}
                href={{
                  pathname: href,
                  query: { edit: i + 1 },
                }}
              >
                <section
                  style={{ border: '4px solid' + frameColor || undefined }}
                  className="flex aspect-square flex-col items-center justify-between rounded-xl border-4 border-bubblegum-pink bg-white text-lg font-bold sm:p-4 md:text-2xl"
                >
                  <span
                    style={{ color: frameColor || undefined }}
                    className="text-bubblegum-pink"
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{ color: frameColor || undefined }}
                    className="text-bubblegum-pink"
                  >
                    ...
                  </span>
                </section>
              </Link>
            ))}
          </section>
        }
        otherwise={
          <section className="grid grid-flow-row place-items-center gap-2">
            {arrayOfElements.map((_, i) => (
              <Link
                href={{
                  pathname: href,
                  query: { edit: i + 1 },
                }}
                className="w-full max-w-xl"
                key={i}
              >
                <section
                  style={{ border: '4px solid' + frameColor || undefined }}
                  className="mx-auto flex aspect-square size-full flex-col justify-between rounded-xl border-4 border-bubblegum-pink bg-white text-center text-lg font-bold md:text-2xl"
                >
                  <span
                    style={{ color: frameColor || undefined }}
                    className="text-bubblegum-pink"
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{ color: frameColor || undefined }}
                    className="text-bubblegum-pink"
                  >
                    ...
                  </span>
                </section>
              </Link>
            ))}
          </section>
        }
      />
    </section>
  );
};

export default GridOrList;
