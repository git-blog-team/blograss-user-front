export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface IPropsHome {
    query: {
        code?: string;
    };
}
