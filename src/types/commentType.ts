import { PostItem } from './postType';
import { UserData } from './userType';

export interface PostNewComment {
    post: { postId: string };
    content: string;
}
export interface EditComment {
    commentId: string;
    content: string;
}

export interface CommentListData {
    result: { content: CommentData[]; totalElements: number }[];
}
export interface CommentData {
    commentId: string;
    content: string;
    createdAt: string;
    reportCount: number;
    updatedAt: string;
    post: PostItem;
    user: UserData;
}
