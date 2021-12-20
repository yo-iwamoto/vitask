import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import '../global.css';
import { theme } from '@/plugins/mui';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>vitask</title>
      </Head>
      <CssBaseline />
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
