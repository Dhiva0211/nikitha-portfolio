import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { serialize } from 'cookie';
import { getToken } from '@/helpers/validations';
import { routes } from '@/routes';

// /api/cookie/delete
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const token = getToken(req.headers.cookie);

    if (token) {
      res.setHeader(
        'Set-Cookie',
        serialize('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: -1,
          path: '/',
        }),
      );
      const prisma = new PrismaClient();
      await prisma.session.update({
        where: {
          sessionToken: JSON.stringify(token),
        },
        data: {
          valid: false,
        },
      });
      prisma.$disconnect();
    }

    res.status(200).json({ location: routes.login });
    return;
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
