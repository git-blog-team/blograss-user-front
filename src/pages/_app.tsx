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
import AuthTokenContext from '@/context/AuthTokenContext';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/common';
import { useUserStore } from '@/store/userStore';
import { BLOGRASS_GET_USER_DATA } from '@/constants/api';
import axios from '@/api/middlewares';
import { useEffect } from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    const isAccessToken = Cookies.get(ACCESS_TOKEN);
    const isRefreshToken = Cookies.get(REFRESH_TOKEN);
    const updateUserStore = useUserStore((state) => state.handleLogin);
    const updateUserData = useUserStore((state) => state.updateUserData);

    const getUserData = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        axios.get(BLOGRASS_GET_USER_DATA).then((res: any) => {
            console.log('res', res);
            updateUserStore(true);
            updateUserData(res.result[0]);
        });
    };

    useEffect(() => {
        if (isAccessToken && isRefreshToken) {
            getUserData();
        }
    }, []);

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
                    <AuthTokenContext>
                        <main className={openSans.className}>
                            <Header />
                            <Component {...pageProps} />
                        </main>
                    </AuthTokenContext>
                </Hydrate>
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
