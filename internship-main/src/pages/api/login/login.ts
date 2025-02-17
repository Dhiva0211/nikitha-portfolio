import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { IncomingForm } from 'formidable';
import { serialize } from 'cookie';
import { routes } from '@/routes';
import {
  cookieName,
  maxAgeCookie,
  ResponseText,
  timeRefreshToken,
  timeSessionToken,
  verifyPassword,
} from '@/helpers/api';
import createToken from '@/helpers/api/create-token';

export const config = {
  api: {
    bodyParser: false,
  },
};

// /api/login/login
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields) => {
      if (err) {
        res.status(500).json({
          error: ResponseText.loginError,
        });
        return;
      }

      const email = fields.email?.[0];
      const password = fields.password?.[0];

      if (!email || !password) {
        res.status(400).json({
          error: ResponseText.registerMissingFields,
        });
        return;
      }
      const prisma = new PrismaClient();
      const userInformation = await prisma.account.findUnique({
        where: {
          email,
        },
        select: {
          userId: true,
          password: true,
        },
      });

      if (!userInformation) {
        res.status(401).json({
          error: ResponseText.loginWrongEmailPassword,
        });
        prisma.$disconnect();
        return;
      }

      const passwordIsMatch = await verifyPassword(
        password,
        userInformation?.password as string,
      );

      if (!passwordIsMatch) {
        res.status(401).json({
          error: ResponseText.loginWrongEmailPassword,
        });
        return;
      }

      const accessToken = await createToken(
        userInformation.userId,
        timeSessionToken,
      );
      const refreshToken = await createToken(
        userInformation.userId,
        timeRefreshToken,
      );

      // Invalidate all previous tokens related to user
      await prisma.session.updateMany({
        where: {
          accountId: userInformation.userId,
        },
        data: {
          valid: false,
        },
      });
      await prisma.session
        .create({
          data: {
            accountId: userInformation.userId,
            sessionToken: JSON.stringify(accessToken),
            valid: true,
            refreshToken: JSON.stringify(refreshToken),
            refreshValid: true,
            expires: new Date(Date.now() + maxAgeCookie),
          },
        })
        .then(() => {
          res.setHeader(
            'Set-Cookie',
            serialize(cookieName, accessToken, {
              httpOnly: true,
              secure: true,
              maxAge: maxAgeCookie,
              path: '/',
            }),
          );
          prisma.$disconnect();

          res.status(200).json({
            location: routes.vendor.dashboard,
          });
          return;
        });

      res.status(500).json({
        error: ResponseText.loginError,
      });
    });

    return;
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
