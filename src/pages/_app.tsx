import globalStyles from '@/styles/globals';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '@/layout/Header';
import { Open_Sans } from 'next/font/google';
import AuthTokenContext from '@/context/AuthTokenContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    console.log(pageProps);
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Global styles={globalStyles} />
                <AuthTokenContext>
                    <main className={openSans.className}>
                        <Header />
                        <Component {...pageProps} />
                    </main>
                </AuthTokenContext>
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
