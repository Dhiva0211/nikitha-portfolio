import { routes } from '@/routes';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const getServerSideProps: GetServerSideProps = async context => {
  context.res.writeHead(302, { Location: routes.login });
  context.res.end();

  return { props: {} };
};

const EmptyHome: FC = () => <section />;

export default EmptyHome;
export { getServerSideProps };
