import { Section } from '@react-email/components';
import { CSSProperties, FC } from 'react';

const styleButton: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  maxWidth: '334px',

  margin: '40px auto',
  padding: '16px 64px',

  borderRadius: '15px',
  background: '#52409A',

  color: '#DDDCD7',
  fontSize: '16px',

  boxSizing: 'border-box',
  textDecoration: 'none',
};

const styleText: CSSProperties = {
  margin: '0 auto',
};

interface IProps {
  text: string;
  href: string;
}

const ButtonEmailTemplate: FC<IProps> = ({ text, href }) => (
  <Section style={{ width: '100%' }}>
    <a href={href} style={styleButton}>
      <span style={styleText}>{text}</span>
    </a>
  </Section>
);

export default ButtonEmailTemplate;
