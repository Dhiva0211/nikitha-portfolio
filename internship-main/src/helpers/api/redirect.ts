'use server';

import { routes } from '@/routes';
import { NextResponse, NextRequest } from 'next/server';
import { serialize } from 'cookie';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Session } from '@prisma/client';
import createToken from './create-token';
import cookieName, { maxAgeCookie, timeSessionToken } from './cookie-handler';

const redirectLogin = async (
  request: NextRequest,
  token: RequestCookie | undefined,
) => {
  const defaultResponse = NextResponse.redirect(
    new URL(routes.login, request.url),
  );

  if (token) {
    const prisma = new PrismaClient();
    const accessSession: Session = await prisma.session.findUnique({
      where: {
        sessionToken: JSON.stringify(token.value),
      },
    });

    if (!accessSession || !accessSession.valid || !accessSession.refreshValid) {
      await prisma.session.updateMany({
        where: {
          accountId: accessSession.accountId,
        },
        data: {
          valid: false,
          refreshValid: false,
        },
      });
      prisma.$disconnect();

      return defaultResponse;
    }

    const newToken = await createToken(
      accessSession.accountId,
      timeSessionToken,
    );

    await prisma.session.updateMany({
      where: {
        accountId: accessSession.accountId,
      },
      data: {
        valid: false,
        refreshValid: false,
      },
    });

    await prisma.session.create({
      data: {
        accountId: accessSession.accountId,
        sessionToken: JSON.stringify(newToken),
        valid: true,
        refreshToken: JSON.stringify(accessSession.refreshToken),
        refreshValid: true,
        expires: new Date(Date.now() + maxAgeCookie),
      },
    });
    prisma.$disconnect();

    request.headers.set(
      'Set-Cookie',
      serialize(cookieName, newToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600 * 24,
        path: '/',
      }),
    );

    return null;
  }

  return defaultResponse;
};

const redirectServerPageToLogin = () => ({
  redirect: {
    destination: routes.login,
    permanent: false,
  },
});

export default redirectLogin;
export { redirectServerPageToLogin };
