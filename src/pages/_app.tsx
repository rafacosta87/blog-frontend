import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { GlobalStyles } from '../styles/global-styles';
import { BlogThemeProvider } from '../contexts/BlogThemeContext';
import { Loading } from '../components/Loading';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <BlogThemeProvider>
      {loading && <Loading />}
      <Component {...pageProps} />
      <GlobalStyles />
    </BlogThemeProvider>
  );
}

export default MyApp;
