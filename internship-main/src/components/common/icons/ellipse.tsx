import { FC } from 'react';

interface EllipseProps {
  readonly className?: string;
  readonly svgClassName?: string;
}

const Ellipse: FC<EllipseProps> = ({ className, svgClassName }) => (
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
      <ellipse cx="12" cy="12" rx="6" ry="10" />
    </svg>
  </section>
);

export default Ellipse;
