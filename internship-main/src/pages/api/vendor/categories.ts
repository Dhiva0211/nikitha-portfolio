import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { ResponseText } from '@/helpers/api';

export const config = {
  api: {
    bodyParser: false,
  },
};

// /api/vendor/categories
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const prisma = new PrismaClient();
    const categories = await prisma.categories.findMany({
      select: {
        id: false,
        valueId: true,
        category: true,
        subCategory: true,
        item: true,
        subItem: true,
      },
    });
    prisma.$disconnect();

    if (categories.length > 0) {
      res.status(200).json({ data: categories });
      return;
    }

    res.status(404).json({
      error: ResponseText.noData,
    });

    return;
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
