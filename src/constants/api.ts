export const BLOGRASS_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://blograss.com';

export const BLOGRASS_DEVAPI_BASE_URL = 'https://api.blograss.com:7878';
export const BLOGRASS_PRODUCT_API_BASE_URL = 'https://api.blograss.com:7777';

export const BLOGRASS_API_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? BLOGRASS_DEVAPI_BASE_URL
        : BLOGRASS_PRODUCT_API_BASE_URL;

export const BLOGRASS_GITHUB_LOGIN = `${BLOGRASS_API_BASE_URL}/login/github`;

export const BLOGRASS_AUTH_GET_TOKEN = '/auth?code=';
export const BLOGRASS_GET_USER_DATA = '/auth/user';
export const BLOGRASS_USER_LOGOUT = '/auth/logout';
export const BLOGRASS_TOKEN_REPUBLISH = '/auth/tokenrepubilsh';
export const BLOGRASS_COMMENT = '/comment';
export const BLOGRASS_CREATE_NEW_POST = '/post';
export const BLOGRASS_GET_COMMENT_LIST = '/comment?';
export const BLOGRASS_GET_POST_DETAIL = '/post?urlSlug=';
export const BLOGRASS_GET_POST_LIST = '/post/list?';
export const BLOGRASS_GET_USER_POST_LIST = '/post/userlist?';
export const BLOGRASS_DEL_POST = '/post';
export const BLOGRASS_PUT_POST = '/post';
export const BLOGRASS_NEW_POST_PAGE = `${BLOGRASS_BASE_URL}/newpost`;
export const BLOGRASS_IMAGE_UPLOAD = '/image';
export const BLOGRASS_IMAGE_BUCKET_URL =
    'https://blograss-bucket.s3.ap-northeast-2.amazonaws.com/images';
