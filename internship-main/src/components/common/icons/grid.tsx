import { FC } from 'react';

interface GridProps {
  readonly className?: string;
  readonly svgClassName?: string;
  readonly color?: string;
}

const Grid: FC<GridProps> = ({ className, svgClassName, color }) => (
  <section className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={svgClassName}
      style={{ stroke: color }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h7v7H3V3zm0 10h7v7H3v-7zm10 0h7v7h-7v-7zm0-10h7v7h-7V3z"
      />
    </svg>
  </section>
);

export default Grid;
