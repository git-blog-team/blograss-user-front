import globalStyles from '@/styles/globals';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '@/layout/Header';
import { Open_Sans } from 'next/font/google';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import { authAPI } from '@/api/auth';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    const isAccessToken = Cookies.get(ACCESS_TOKEN);
    const isRefreshToken = Cookies.get(REFRESH_TOKEN);
    const updateUserStore = useUserStore((state) => state.handleLogin);
    const updateUserData = useUserStore((state) => state.updateUserData);

    useEffect(() => {
        if (isAccessToken && isRefreshToken) {
            authAPI.getUserData().then((res) => {
                if (res) {
                    updateUserStore(true);
                    updateUserData(res.data.result[0]);
                }
            });
        }
    }, [isAccessToken, isRefreshToken]);

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
                <Hydrate state={pageProps.dehydratedState}>
                    <Global styles={globalStyles} />
                    <main className={openSans.className}>
                        <Header />
                        <Component {...pageProps} />
                    </main>
                </Hydrate>
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
