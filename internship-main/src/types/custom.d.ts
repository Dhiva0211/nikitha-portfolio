import { Settings } from 'react-slick';

declare module 'react-slick' {
  const value: Settings;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}
