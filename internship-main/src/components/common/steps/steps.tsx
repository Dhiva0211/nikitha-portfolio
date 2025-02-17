import { RenderIf } from '@/helpers/common/render-conditional';
import { FC } from 'react';

interface StepProps {
  activeStep: number;
  numberOfSteps: number;
}

const handleActiveState = (active: boolean) =>
  active ? 'bg-deep-sapphire text-white' : '';
const Steps: FC<StepProps> = ({ activeStep, numberOfSteps }) => (
  <section className="m-2 mt-4 flex items-center justify-center">
    {Array.from({ length: numberOfSteps }, (_, index) => (
      <>
        <span
          key={index}
          className={`size-6 rounded border text-center ${handleActiveState(index < activeStep)}`}
        >
          {index + 1}
        </span>
        <RenderIf
          condition={index < numberOfSteps - 1}
          then={<span className="h-1 w-10 bg-deep-sapphire" />}
          otherwise={null}
        />
      </>
    ))}
  </section>
);

export default Steps;
