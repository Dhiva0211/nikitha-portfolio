import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { VendorRegistrationForm } from '@/helpers/interfaces';
import { PrismaClient } from '@prisma/client';
import { encryptPassword, ResponseText } from '@/helpers/api';
import {
  passwordPatternValidation,
  passwordSizeValidation,
} from '@/helpers/validations';
import { routes } from '@/routes';

export const config = {
  api: {
    bodyParser: false,
  },
};

const areFieldsValid = (formData: VendorRegistrationForm): boolean =>
  Object.values(formData).every(value => value !== undefined && value !== '');

// /api/vendor/registration
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields) => {
      if (err) {
        res.status(500).json({
          error: ResponseText.registerError,
        });
        return;
      }

      const password = fields.password?.[0] ?? '';
      const isPasswordValid =
        passwordSizeValidation(password) && passwordPatternValidation(password);

      if (!isPasswordValid) {
        res.status(400).json({
          error: ResponseText.registerPasswordInvalid,
        });
        return;
      }

      const formData: VendorRegistrationForm = {
        firstName: fields.firstName?.[0],
        lastName: fields.lastName?.[0],
        typeOfBusiness: fields.typeOfBusiness?.[0],
        email: fields.email?.[0],
        password: password,
        shoppittoAccount: fields.shoppittoAccount?.[0],
        termsAndConditions: fields.termsAndConditions?.[0] === 'true',
      };

      if (!areFieldsValid(formData)) {
        res.status(400).json({
          error: ResponseText.registerMissingFields,
        });
        return;
      }

      try {
        const hashedPassword = await encryptPassword(
          formData.password as string,
        );

        const prisma = new PrismaClient();
        const newUser = await prisma.account.create({
          data: {
            firstName: formData.firstName as string,
            lastName: formData.lastName as string,
            typeOfBusinessValueId: formData.typeOfBusiness as string,
            typeOfShoppittoValueId: formData.shoppittoAccount as string,
            email: formData.email as string,
            password: hashedPassword,
            termsAccepted: formData.termsAndConditions as boolean,
            termsAcceptedAt: new Date(),
          },
        });
        prisma.$disconnect();

        if (newUser) {
          return res.status(200).json({
            location: routes.vendor.newRegister.welcome,
          });
        }

        return res.status(500).json({
          error: ResponseText.registerUserFailed,
        });
      } catch (e) {
        res.status(500).json({
          error: ResponseText.registerUserFailed,
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
