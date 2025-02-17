import { FC, useState } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import dynamic from 'next/dynamic';
import { carouselPlans } from '@/assets/mocks';
import Link from 'next/link';

const SliderComponent = dynamic(
  () =>
    import('@/components/common/slider').then(mod => ({
      default: mod.SliderComponent,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface CarouselWithViewProps {
  href: string;
}

const CarouselWithView: FC<CarouselWithViewProps> = ({ href }) => {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);

  const handlePlanSelectedClass = (id: number) =>
    `overflow-hidden rounded-xl border-4 border-bubblegum-pink bg-white text-sm text-bubblegum-pink hover:transform hover:scale-100  ${id === selectedPlan ? 'scale-100' : 'scale-75'}`;

  return (
    <section className="m-10 mx-auto w-screen max-w-7xl p-6">
      <SliderComponent>
        {carouselPlans.map(plan => (
          <section
            key={plan.id}
            className={handlePlanSelectedClass(plan.id)}
            onClickCapture={() => setSelectedPlan(plan.id)}
          >
            <label
              className="flex cursor-pointer justify-center rounded-2xl bg-white p-4 text-lg font-extrabold text-bubblegum-pink"
              htmlFor={plan.title}
            >
              {plan.title}
            </label>
          </section>
        ))}
      </SliderComponent>

      <section className="m-2 flex h-96 flex-col justify-between rounded-xl border-4 border-bubblegum-pink bg-white text-center font-bold">
        <span className="mt-6 text-xl text-bubblegum-pink">
          Plan {selectedPlan}
        </span>
        <span className="text-bubblegum-pink">...</span>
      </section>

      <section className="flex items-center justify-center">
        <Link
          href={{
            pathname: href,
            query: { edit: selectedPlan },
          }}
          className="flex cursor-pointer justify-center rounded-2xl border-4 border-bubblegum-pink bg-white p-4 text-lg font-extrabold text-bubblegum-pink"
        >
          Edit the plans
        </Link>
      </section>
    </section>
  );
};

export default CarouselWithView;
