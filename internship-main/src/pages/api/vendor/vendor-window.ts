import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { BusinessInfo, PrismaClient } from '@prisma/client';
import { isValidDate, ResponseText } from '@/helpers/api';

export const config = {
  api: {
    bodyParser: false,
  },
};

const areFieldsValid = (formData: BusinessInfo): boolean =>
  Object.values(formData).every(
    value => value !== undefined && value !== null && value !== 'null',
  );

// /api/vendor/vendor-window
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

      const formData: BusinessInfo = Object.entries(fields).reduce(
        (acc, [key, value]) => {
          if (value === undefined) return acc;

          acc[`${key}`] = value[`${0}`];
          return acc;
        },
        {} as BusinessInfo,
      );

      if (!areFieldsValid(formData)) {
        res.status(400).json({
          error: ResponseText.processFailed,
        });
        return;
      }

      try {
        const busStartYear = String(formData.busStartYear);
        const termsAndConditionSellersAccount = String(
          formData.termsAndConditionSellersAccount,
        );
        const termsAndConditionFinishRegistration = String(
          formData.termsAndConditionFinishRegistration,
        );
        const joinInDate = String(formData.joinInDate);

        const prisma = new PrismaClient();
        const businessInfo = await prisma.businessInfo.upsert({
          where: {
            userId: formData.userId,
          },
          update: {
            categoryId: formData.categoryId,
            busLegalName: formData.busLegalName,
            busStartYear: isValidDate(busStartYear)
              ? new Date(formData.busStartYear ?? '').toISOString()
              : null,
            countryCode: formData.countryCode,
            phoneNumber: formData.phoneNumber,
            termsAndConditionSellersAccount: isValidDate(
              termsAndConditionSellersAccount,
            )
              ? new Date(
                  formData.termsAndConditionSellersAccount ?? '',
                ).toISOString()
              : null,
            termsAndConditionFinishRegistration: isValidDate(
              termsAndConditionFinishRegistration,
            )
              ? new Date(
                  formData.termsAndConditionFinishRegistration ?? '',
                ).toISOString()
              : null,
            country: formData.country,
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            tutorNumber: formData.tutorNumber,
            taxIdNumber: formData.taxIdNumber,
            idPhotoUrl: formData.idPhotoUrl,
            electronicSignatureUrl: formData.electronicSignatureUrl,
            joinInDate: isValidDate(joinInDate)
              ? new Date(formData.joinInDate ?? '').toISOString()
              : null,
            userId: formData.userId,
          },
          create: {
            categoryId: formData.categoryId,
            busLegalName: formData.busLegalName,
            busStartYear: isValidDate(busStartYear)
              ? new Date(formData.busStartYear ?? '').toISOString()
              : null,
            countryCode: formData.countryCode,
            phoneNumber: formData.phoneNumber,
            termsAndConditionSellersAccount: isValidDate(
              termsAndConditionSellersAccount,
            )
              ? new Date(
                  formData.termsAndConditionSellersAccount ?? '',
                ).toISOString()
              : null,
            country: formData.country,
            address1: formData.address1,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            taxIdNumber: formData.taxIdNumber,
            idPhotoUrl: formData.idPhotoUrl,
            electronicSignatureUrl: formData.electronicSignatureUrl,
            userId: formData.userId,
          },
        });
        prisma.$disconnect();

        if (businessInfo) {
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
