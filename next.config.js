/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    images: {
        domains: ['blograss-bucket.s3.ap-northeast-2.amazonaws.com'],
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
