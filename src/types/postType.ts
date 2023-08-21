import { UserData } from './userType';

export interface IPostDetailProps {
    postId: string;
    title: string;
    content: string;
    reportCount: number;
    user: UserData;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export interface PostNew {
    title: string;
    content: string;
}

export interface PostDetailParams {
    postId: string | string[] | undefined;
    accessToken: string;
    refreshToken: string;
}

export interface PostItem {
    postId: string;
    title: string;
    content: string;
    reportCount: number;
    user: UserData;
    images: [];
    createdAt: string;
    updatedAt: string;
}
