import globalStyles from '@/styles/globals';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '@/layout/Header';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Global styles={globalStyles} />
                <main className={openSans.className}>
                    <Header />
                    <Component {...pageProps} />
                </main>
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
