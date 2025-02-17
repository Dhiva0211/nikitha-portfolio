import { jwtVerify } from 'jose';

const decodeToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token as string, secret);
  return payload;
};

export { decodeToken };
