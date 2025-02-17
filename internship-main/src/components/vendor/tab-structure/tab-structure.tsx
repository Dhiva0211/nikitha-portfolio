import { FC, useState } from 'react';
import { carouselPlans } from '@/assets/mocks';
import Link from 'next/link';

interface TabStructureProps {
  href: string;
  frameColor?: string;
}

const TabStructure: FC<TabStructureProps> = ({ href, frameColor }) => {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 3 < carouselPlans.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={startIndex === 0}
          style={{ backgroundColor: startIndex === 0 ? '#D3D3D3' : frameColor }}
          className="rounded-full bg-bubblegum-pink p-2 text-white disabled:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + 3 >= carouselPlans.length}
          style={{ backgroundColor: frameColor }}
          className="rounded-full bg-bubblegum-pink p-2 text-white disabled:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div
        style={{ borderColor: frameColor }}
        className="rounded-xl border-x-4 border-b-4 border-bubblegum-pink"
      >
        <div className="-mx-1 flex">
          {carouselPlans.slice(startIndex, startIndex + 3).map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                borderColor: frameColor,
                color: frameColor,
                marginBottom: '-1px',
              }}
              className={`flex-1 px-6 py-3 text-center text-lg font-extrabold transition-all duration-100 ${
                selectedPlan === plan.id
                  ? '-mt-1 overflow-hidden rounded-t-lg border-x-4 border-b-0 border-t-4 border-bubblegum-pink bg-white text-bubblegum-pink'
                  : 'rounded-t-lg border-4 border-bubblegum-pink bg-white text-bubblegum-pink'
              }`}
            >
              {plan.title}
            </button>
          ))}
        </div>

        <section className="flex h-96 flex-col justify-between rounded-b-lg bg-white p-6 text-center font-bold">
          <span
            style={{ color: frameColor }}
            className="mt-6 text-2xl text-bubblegum-pink"
          >
            Plan {selectedPlan}
          </span>
        </section>
      </div>

      <section className="my-6 flex items-center justify-start">
        <section className="m-2 flex flex-wrap">
          <video
            controls
            className="m-2 flex size-48 flex-col justify-between rounded-xl border-4 bg-white text-center font-bold"
          />
        </section>

        <Link
          href={{
            pathname: href,
            query: { edit: selectedPlan },
          }}
          style={{ borderColor: frameColor, color: frameColor }}
          className="flex cursor-pointer justify-center rounded-2xl border-4 border-bubblegum-pink bg-white p-4 text-lg font-extrabold text-bubblegum-pink"
        >
          Edit the plans
        </Link>
      </section>
    </section>
  );
};

export default TabStructure;
