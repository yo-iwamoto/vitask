import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { theme } from '@/plugins/mui';
import '@/styles/global.css';
import { ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>すごい課題通知</title>
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}
