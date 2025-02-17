import { FC } from 'react';

interface HamburgerProps {
  readonly className?: string;
  readonly svgClassName?: string;
  readonly color?: string;
}

const Hamburger: FC<HamburgerProps> = ({ className, svgClassName, color }) => (
  <section className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      stroke="currentColor"
      className={svgClassName}
      style={{ stroke: color || undefined }}
    >
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4"
        x1="7"
        x2="25"
        y1="16"
        y2="16"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4"
        x1="7"
        x2="25"
        y1="25"
        y2="25"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4"
        x1="7"
        x2="25"
        y1="7"
        y2="7"
      />
    </svg>
  </section>
);

export default Hamburger;
