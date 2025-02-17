import type { NextApiRequest, NextApiResponse } from 'next';
import Example from '@/assets/emails/test';
import { render } from '@react-email/render';
import { handleEmailFire } from '@/helpers/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await handleEmailFire({
    to: 'example@example.com',
    subject: 'This is a example email',
    html: await render(
      Example({ clientName: 'Example', buttonLink: 'https://example.com' }),
    ),
  });

  return res.status(200).json({ message: 'Success' });
}
