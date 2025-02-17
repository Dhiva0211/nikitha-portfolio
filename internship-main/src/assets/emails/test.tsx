import { Section, Text } from '@react-email/components';
import { EmailTemplateWrapper, ButtonEmailTemplate } from '@/components/email';

const bodyText = {
  color: '#000',
  fontSize: '18px',
  margin: '16px auto',
};

interface IProp {
  readonly clientName: string;
  readonly buttonLink: string;
}

const Example = ({ clientName, buttonLink }: IProp) => (
  <EmailTemplateWrapper
    preview="This is a preview example"
    heading="This is a heading example"
  >
    <Section>
      <Text style={bodyText}>Hi {clientName},</Text>
      <Text style={bodyText}>
        This is a example of a email template with a button.
      </Text>
    </Section>

    <ButtonEmailTemplate text="Accept the example" href={buttonLink} />
  </EmailTemplateWrapper>
);

export default Example;
