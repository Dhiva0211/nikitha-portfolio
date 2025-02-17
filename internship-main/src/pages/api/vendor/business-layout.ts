import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { BusinessLayout, PrismaClient } from '@prisma/client';
import { ResponseText } from '@/helpers/api';
import { decodeToken, getToken } from '@/helpers/validations';

export const config = {
  api: {
    bodyParser: false,
  },
};

const areFieldsValid = (formData: BusinessLayout): boolean =>
  Object.values(formData).every(
    value => value !== undefined && value !== null && value !== 'null',
  );

// /api/vendor/business-layout
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields) => {
      if (err) {
        res.status(500).json({
          error: ResponseText.processError,
        });
        return;
      }

      const formData: BusinessLayout = Object.entries(fields).reduce(
        (acc, [key, value]) => {
          if (value === undefined) return acc;

          acc[`${key}`] = value[`${0}`];
          return acc;
        },
        {} as BusinessLayout,
      );

      if (!areFieldsValid(formData)) {
        res.status(400).json({
          error: ResponseText.processFailed,
        });
        return;
      }

      try {
        const prisma = new PrismaClient();
        const businessLayout = await prisma.businessLayout.upsert({
          where: {
            layoutId: formData.layoutId,
          },
          update: {
            logoUrl: formData.logoUrl ?? '',
            addUrl: formData.addUrl ?? '',
            bgColor: formData.bgColor ?? '',
            frameColor: formData.frameColor ?? '',
          },
          create: {
            logoUrl: formData.logoUrl ?? '',
            addUrl: formData.addUrl ?? '',
            bgColor: formData.bgColor ?? '',
            frameColor: formData.frameColor ?? '',
          },
        });
        const businessInfo = await prisma.businessInfo.findUnique({
          where: {
            layoutId: formData.layoutId,
          },
        });

        if (!businessInfo?.layoutId) {
          const token = getToken(req.headers.cookie);
          const session = await prisma.session.findUnique({
            where: {
              sessionToken: JSON.stringify(token),
            },
          });
          const tokenDecoded = await decodeToken(
            JSON.parse(session?.sessionToken ?? ''),
          );
          await prisma.businessInfo.update({
            where: {
              // @ts-expect-error - the session always exist
              userId: tokenDecoded.userId,
            },
            data: {
              layoutId: businessLayout.layoutId,
            },
          });
        }
        prisma.$disconnect();

        if (businessLayout) {
          res.status(200).json({
            location: 'next',
          });

          return;
        }

        res.status(500).json({
          error: ResponseText.processError,
        });
      } catch (e) {
        res.status(500).json({
          error: ResponseText.processError,
          message: e.message,
        });
      }
    });

    return;
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
