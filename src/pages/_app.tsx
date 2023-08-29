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
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import { authAPI } from '@/api/authAPI';
import { getTokens } from '@/utils/cookie';
import PageLoader from '@/components/common/PageLoader';
import { useCommonStore } from '@/store/commonStore';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    const { accessToken, refreshToken } = getTokens();
    const { handleLogin, updateUserData } = useUserStore((state) => state);
    const { isLoading } = useCommonStore((state) => state);

    useEffect(() => {
        if (accessToken && refreshToken) {
            authAPI.getUserData().then((res) => {
                if (res) {
                    handleLogin(true);
                    updateUserData(res.data.result[0]);
                }
            });
        }
    }, [accessToken, refreshToken]);

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
                        {isLoading && <PageLoader />}
                    </main>
                </Hydrate>
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
