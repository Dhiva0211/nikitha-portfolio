import { FC, ReactNode, ElementType } from 'react';

interface DescriptionProps {
  children: ReactNode;
  as?: ElementType;
}

const Description: FC<DescriptionProps> = ({ children, as: Tag = 'p' }) => (
  <Tag className="m-4 mx-2 max-w-7xl rounded-xl border-4 bg-lavender-blush p-4 text-center lg:text-lg">
    {children}
  </Tag>
);

export default Description;
