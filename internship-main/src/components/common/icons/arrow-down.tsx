import { FC } from 'react';

interface ArrowDownProps {
  readonly className?: string;
  readonly svgClassName?: string;
}

const ArrowDown: FC<ArrowDownProps> = ({ className, svgClassName }) => (
  <section className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={svgClassName}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </section>
);

export default ArrowDown;
