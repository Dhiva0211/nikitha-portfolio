import { FC } from 'react';

interface MagnifyingGlassProps {
  className?: string;
  svgClassName?: string;
}

const MagnifyingGlass: FC<MagnifyingGlassProps> = ({
  className,
  svgClassName,
}) => (
  <section className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={svgClassName}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </section>
);

export default MagnifyingGlass;
