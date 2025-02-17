import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { FC, ReactNode } from 'react';

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const image = {
  margin: '40px auto',
};

const bodyText = {
  color: '#000',
  fontSize: '18px',
  margin: '16px auto',
};

const mutedText = {
  color: '#848484',
  fontSize: '18px',
};

const footerText = {
  color: '#000',
  fontSize: '11px',
  opacity: 0.4,
};

interface IProps {
  preview?: string;
  heading: ReactNode;
  children: ReactNode;
}

const EmailTemplateWrapper: FC<IProps> = ({ preview, heading, children }) => (
  <Html>
    <Head />
    <Preview>{preview || heading?.toString() || ''}</Preview>
    <Body style={main}>
      <Container>
        <Row>
          <Column align="center">
            <Img
              src="https://raw.githubusercontent.com/UpUnikSelf/upunikself/refs/heads/develop/public/images/logo.png?token=GHSAT0AAAAAACXFBIQLGBVZPTQEWKSEKJK6ZZKT6AQ"
              alt="UpUnikSelf logo"
              width={45}
              height={255}
              style={image}
            />
          </Column>
          <Column align="center">
            <Img
              src="https://raw.githubusercontent.com/UpUnikSelf/upunikself/refs/heads/develop/public/images/logo-full-word.png?token=GHSAT0AAAAAACXFBIQKBPLNBARS5A2F3CUKZZKT7DQ"
              alt="UpUnikSelf logo"
              width={255}
              height={45}
              style={image}
            />
          </Column>
        </Row>
        <Section>
          <Heading style={{ textAlign: 'center', color: '#000000' }}>
            {heading}
          </Heading>
        </Section>
        {children}
        <Section>
          <Text style={mutedText}>
            If you did request it, please feel free to disregard this email.
          </Text>
        </Section>
        <Section>
          <Text style={bodyText}>
            Best regards,
            <br />
            UpUnikSelf Team
          </Text>
        </Section>
        <Section>
          <Hr />
        </Section>
        <Section>
          <Text style={{ ...footerText, textAlign: 'center' }}>
            This email is to inform you of the latest updates to your account on
            UpUnikSelf.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplateWrapper;
