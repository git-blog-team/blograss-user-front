import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
    BLOGRASS_API_BASE_URL,
    BLOGRASS_AUTH_GET_TOKEN,
} from './constants/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/common';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const code = new URLSearchParams(url.search).get('code') || '';
    let accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
    let refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

    /**
     * - code가 있고 토큰이 있으면 '/'로 이동
     * - code가 있고 토큰이 없으면 쿠키생성
     */

    // if (code && accessToken && refreshToken) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    const getAuthToken = async () => {
        const data = await fetch(
            `${BLOGRASS_API_BASE_URL}${BLOGRASS_AUTH_GET_TOKEN}${code}`,
        );
        const jsonData = await data.json();
        return jsonData.result[0];
    };

    if (code && !accessToken && !refreshToken) {
        const data = await getAuthToken();
        accessToken = data.accessToken;
        refreshToken = data.refreshToken;
        const response = NextResponse.next();
        if (accessToken && refreshToken) {
            response.cookies.set(ACCESS_TOKEN, accessToken);
            response.cookies.set(REFRESH_TOKEN, refreshToken);
        }
        return response;
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
};
