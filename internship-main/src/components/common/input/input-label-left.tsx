import { trimAndSpacesFilled } from '@/helpers/common/string-manipulation';
import { ChangeEvent, FC, HTMLProps } from 'react';

interface InputLabelLeftProps extends HTMLProps<HTMLInputElement> {
  readonly labelToUse: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly defaultValue?: string;
  readonly value?: string | number | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputLabelLeft: FC<InputLabelLeftProps> = ({
  labelToUse,
  type = 'text',
  required = false,
  disabled = false,
  defaultValue,
  value,
  onChange,
  className = '',
  ...props
}) => (
  <section
    className={`m-4 mx-2 flex max-w-7xl overflow-hidden rounded-xl border-4 ${className}`}
  >
    <label
      className="w-44 rounded-xl border-r-4 p-2 text-center text-sm font-extrabold sm:w-64 sm:p-5 sm:text-xl md:text-2xl"
      htmlFor={labelToUse}
    >
      {labelToUse}
    </label>

    <input
      id={labelToUse}
      name={trimAndSpacesFilled(labelToUse)}
      type={type}
      {...(defaultValue !== undefined ? { defaultValue } : {})}
      {...(value !== undefined ? { value } : {})}
      {...(onChange ? { onChange } : {})}
      className="w-full pl-2 text-center text-sm font-extrabold placeholder:text-corn-flower-blue sm:text-xl md:text-2xl"
      required={required}
      disabled={disabled}
      {...props}
    />
  </section>
);

export default InputLabelLeft;
