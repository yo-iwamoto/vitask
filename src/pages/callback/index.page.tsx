import type { NextPage } from 'next';
import { usePage } from './hook';

const Page: NextPage = () => {
  usePage();

  return <div></div>;
};

export default Page;
