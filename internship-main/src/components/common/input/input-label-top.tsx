import { trimAndSpacesFilled } from '@/helpers/common/string-manipulation';
import { FC } from 'react';

interface InputLabelTopProps {
  readonly labelToUse: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly defaultValue?: string;
}

const InputLabelTop: FC<InputLabelTopProps> = ({
  labelToUse,
  type = 'text',
  required = false,
  className = '',
  disabled = false,
  defaultValue = '',
}) => (
  <section
    className={`m-2 mt-6 overflow-hidden rounded-xl border-4 ${className}`}
  >
    <label
      className={`flex justify-center rounded-xl border-b-4 p-5 text-center text-lg font-extrabold md:text-xl lg:text-2xl ${className}`}
      htmlFor={labelToUse}
    >
      {labelToUse}
    </label>

    <input
      id={labelToUse}
      name={trimAndSpacesFilled(labelToUse)}
      type={type}
      defaultValue={defaultValue}
      className="w-full p-2 text-center text-lg font-extrabold md:text-xl lg:text-2xl"
      required={required}
      disabled={disabled}
    />
  </section>
);

export default InputLabelTop;
