export const BLOGRASS_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://blograss.com';
export const BLOGRASS_API_BASE_URL = 'https://api.blograss.com:7777';
export const BLOGRASS_GITHUB_LOGIN = `${BLOGRASS_API_BASE_URL}/login/github`;
export const BLOGRASS_AUTH_GET_TOKEN = '/auth?code=';
export const BLOGRASS_GET_USER_DATA = '/auth/user';
export const BLOGRASS_USER_LOGOUT = '/auth/logout';
export const BLOGRASS_TOKEN_REPUBLISH = '/auth/tokenrepubilsh';
export const BLOGRASS_CREATE_NEW_POST = '/post';
export const BLOGRASS_GET_POST_DETAIL = '/post?postId=';
export const BLOGRASS_GET_POST_LIST = '/post/list?';
export const BLOGRASS_DEL_POST = '/post';
export const BLOGRASS_NEW_POST_PAGE = `${BLOGRASS_BASE_URL}/newpost`;
