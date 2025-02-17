import { routes } from '@/routes';
import type { NextApiRequest, NextApiResponse } from 'next';

// /api/vendor/license-nft
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { minted } = req.body;

    // TODO: Add your server-side form handling logic here

    const urlToSend = minted
      ? routes.vendor.tenOfferings.licenseNft.nft.default
      : routes.vendor.tenOfferings.licenseNft.artwork.default;
    const newUrl = new URL(
      urlToSend,
      `http://${req.headers.host}${routes.login}`,
    );
    newUrl.search = new URLSearchParams({ color: 'true' }).toString();

    res.writeHead(302, { Location: newUrl.toString() });
    res.end();
    return;
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
