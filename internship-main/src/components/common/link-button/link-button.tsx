import { FC, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

interface LinkProps {
  href: string;
  children: ReactNode;
  query?: Record<string, string | number | boolean | null | undefined>;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

const CommonLink: FC<LinkProps> = ({
  href,
  children,
  onClick,
  query,
  className,
}) => (
  <section className="flex justify-center">
    <Link
      href={{
        pathname: href,
        query: query,
      }}
      className={`m-5 flex w-72 items-center justify-around rounded-2xl bg-deep-sapphire p-2 text-center font-bold text-white sm:w-80 ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  </section>
);

const CommonLinkNoBg: FC<LinkProps> = ({
  href,
  children,
  onClick,
  query,
  className,
}) => (
  <Link
    href={{
      pathname: href,
      query: query,
    }}
    className={`mx-auto my-4 flex w-80 max-w-lg items-center justify-around rounded-2xl border-4 font-bold hover:underline sm:w-full ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const CommonButton: FC<ButtonProps> = ({
  type,
  onClick,
  children,
  className,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`m-5 flex items-center justify-around rounded-lg bg-deep-sapphire p-2 text-white ${className}`}
  >
    {children}
  </button>
);

interface StateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const StateButton: FC<StateButtonProps> = ({ onClick, disabled }) => (
  <>
    <button
      type="button"
      className={`w-24 rounded-2xl border-4 p-3 font-semibold transition-all sm:w-32 ${
        disabled
          ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
          : 'cursor-pointer border-deep-sapphire bg-white text-deep-sapphire hover:bg-gray-50'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Edit
    </button>
    <button
      type="button"
      className={`w-24 rounded-2xl border-4 p-3 font-semibold transition-all sm:w-32 ${
        disabled
          ? 'cursor-pointer border-deep-sapphire bg-deep-sapphire text-white hover:bg-deep-sapphire/90'
          : 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
      }`}
      onClick={onClick}
      disabled={!disabled}
    >
      Save
    </button>
  </>
);

export { CommonLink, CommonLinkNoBg, CommonButton, StateButton };
