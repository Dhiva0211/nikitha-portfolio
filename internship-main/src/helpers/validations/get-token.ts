import { parse } from 'cookie';
import { cookieName } from '../api';

const getToken = (cookie: string | undefined): string | undefined => {
  if (!cookie) return '';

  const cookies = parse(cookie);
  return cookies[`${cookieName}`];
};

export default getToken;
