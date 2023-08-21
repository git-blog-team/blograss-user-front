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
