import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';

const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

interface AddAnotherStepProps {
  readonly name: string;
}

interface Step {
  name: string;
  description: string;
}

const AddAnotherStep: FC<AddAnotherStepProps> = ({ name }) => {
  const [stepFields, setStepFields] = useState<Step[]>([
    { name: '', description: '' },
  ]);

  const handleStepChange = (
    index: number,
    field: keyof Step,
    value: string,
  ) => {
    const updatedSteps = stepFields.map((step, i) =>
      i === index ? { ...step, [field]: value } : step,
    );
    setStepFields(updatedSteps);
  };

  const addStepField = () => {
    setStepFields([...stepFields, { name: '', description: '' }]);
  };

  const removeStepField = (index: number) => {
    const updatedSteps = stepFields.filter((_, i) => i !== index);
    setStepFields(updatedSteps);
  };

  return (
    <section className="m-2 mt-10">
      <h3 className="m-2 rounded-2xl border-4 p-2 text-center text-2xl font-bold">
        {name}
      </h3>

      {stepFields.map((step, index) => (
        <section key={index} className="relative my-6 md:mx-4">
          <div className="flex items-center gap-2">
            <InputLabelLeft
              labelToUse={`Step ${index + 1} Name`}
              value={step.name}
              onChange={e => handleStepChange(index, 'name', e.target.value)}
              className="w-full"
            />

            <button
              type="button"
              onClick={() => removeStepField(index)}
              className="flex size-10 items-center justify-center rounded-2xl border-4 border-deep-sapphire text-xl font-bold text-deep-sapphire hover:bg-deep-sapphire hover:text-white"
            >
              -
            </button>
          </div>

          <section className="mt-4 flex justify-center">
            <input
              value={step.description}
              onChange={e =>
                handleStepChange(index, 'description', e.target.value)
              }
              placeholder="Description"
              className="w-full rounded-2xl border-4 p-2 text-center text-sm font-bold sm:text-xl md:text-lg"
            />
          </section>
        </section>
      ))}

      <section className="m-2 flex justify-center">
        <button
          onClick={addStepField}
          type="button"
          className="flex w-full items-center justify-center rounded-2xl border-4 py-2 text-xl font-bold transition hover:scale-105 hover:bg-deep-sapphire hover:text-white md:w-2/3"
        >
          Add another description
        </button>
      </section>
    </section>
  );
};

export default AddAnotherStep;
