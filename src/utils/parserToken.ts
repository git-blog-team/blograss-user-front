export const parseTokens = (inputString: string) => {
    const tokenPairs = inputString.split('; ');
    const result: { [key: string]: string } = {};

    for (const pair of tokenPairs) {
        const [key, value] = pair.split('=');
        result[key] = value;
    }

    return {
        accessToken: result.accessToken.trim(),
        refreshToken: result.refreshToken.trim(),
    };
};
