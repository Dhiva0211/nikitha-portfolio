import { importJWK, JWK, SignJWT } from 'jose';

const createToken = async (
  userId: string,
  expirationTime: string,
): Promise<string> => {
  const secretJWK: JWK = {
    kty: 'oct',
    k: Buffer.from(process.env.JWT_SECRET as string).toString('base64url'),
  };

  const secretKeyLikeFromJWK = await importJWK(secretJWK, 'HS256');

  const token = await new SignJWT({ userId: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expirationTime)
    .sign(secretKeyLikeFromJWK);

  return token;
};

export default createToken;
