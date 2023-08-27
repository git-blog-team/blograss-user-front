import { UserData } from './userType';

export interface ImgesArrayItem {
    url: string;
}

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
    images: ImgesArrayItem[] | [];
}

export interface PostDetailParams {
    postId: string | string[] | undefined;
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

export interface PostUpdate extends PostNew {
    postId: string;
}
