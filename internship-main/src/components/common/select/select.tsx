import { trimAndSpacesFilled } from '@/helpers/common/string-manipulation';
import { FC, useState, MouseEvent, ReactNode } from 'react';

interface SelectProps {
  readonly labelToUse: string;
  options?: ReadonlyArray<string>;
  readonly required?: boolean;
  children?: ReactNode;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'justify-start' | 'justify-center' | 'justify-end';
  readonly readonly?: boolean;
}

const Select: FC<SelectProps> = ({
  labelToUse,
  required = false,
  options,
  children,
  alignItems = 'center',
  justifyContent,
  readonly = true,
}) => {
  const [optionSelected, setOptionSelected] = useState<string>('');

  const handleOptionSelected = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => setOptionSelected(event.currentTarget.id);

  const isOptionSelected = (option: string) =>
    option === optionSelected ? 'text-lg font-bold underline' : 'text-base';

  return (
    <section className="m-4 mx-2 mt-6 max-w-7xl overflow-hidden rounded-xl border-4">
      <label
        htmlFor={labelToUse}
        className="flex justify-center rounded-xl border-b-4 p-5 text-center text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl"
      >
        {labelToUse}
      </label>

      <section className={`${justifyContent ? `${justifyContent} flex` : ``}`}>
        <ul
          className={`m-4 space-y-2 ${
            alignItems === 'start'
              ? 'text-start'
              : alignItems === 'center'
                ? 'text-center'
                : alignItems === 'end'
                  ? 'text-end'
                  : ''
          }`}
        >
          {options?.map?.(option => (
            <li key={option}>
              <button
                id={option}
                onClick={e => handleOptionSelected(e)}
                className={`${readonly ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer hover:underline'}`}
                disabled={readonly}
              >
                <label
                  htmlFor={option}
                  className={`${isOptionSelected(option)} cursor-pointer md:text-lg lg:text-xl`}
                >
                  {option}
                </label>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <input
        type="hidden"
        name={trimAndSpacesFilled(labelToUse)}
        value={optionSelected}
        required={required}
      />
      {children}
    </section>
  );
};

export default Select;
