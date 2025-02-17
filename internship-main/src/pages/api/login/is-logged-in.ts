import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getToken } from '@/helpers/validations';

export const config = {
  api: {
    bodyParser: false,
  },
};

// /api/login/is-logged-in
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const token = getToken(req.headers.cookie);

    if (!token) {
      res.status(200).json({
        isLogin: false,
      });
      return;
    }

    if (token) {
      const prisma = new PrismaClient();
      const session = await prisma.session.findUnique({
        where: {
          sessionToken: JSON.stringify(token),
        },
      });

      if (session && session.valid) {
        res.status(200).json({
          isLogin: true,
        });

        return;
      }

      res.status(200).json({
        isLogin: false,
      });
    }
    return;
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
