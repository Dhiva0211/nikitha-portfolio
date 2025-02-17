'use server';

import { createHash, randomBytes } from 'crypto';

const encryptPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256');

  hash.update(password + salt);
  const hashedPassword = hash.digest('hex');

  return `${salt}:${hashedPassword}`;
};

const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const [salt, originalHash] = hashedPassword.split(':');
  const hash = createHash('sha256');

  hash.update(password + salt);
  const newHash = hash.digest('hex');

  return newHash === originalHash;
};

export default encryptPassword;
export { verifyPassword };
