import { FormEvent, RefObject } from 'react';
import { UserData } from './userType';
import { Editor } from '@toast-ui/react-editor';

export interface ImgesArrayItem {
    url: string;
}

export interface PostDetailData {
    postId: string;
    title: string;
    content: string;
    reportCount: number;
    user: UserData;
    images: PostImages[] | [];
    createdAt: string;
    updatedAt: string;
    urlSlug: string;
    directory: string;
}
export interface IPostDetailProps {
    currentPost: PostDetailData;
    nextPost: PostDetailData;
    prevPost: PostDetailData;
}

export interface PostNew {
    title: string;
    content: string;
    images: ImgesArrayItem[] | [];
}

export interface PostDetailParams {
    urlSlug: string | string[] | undefined;
    postUserId: string | string[] | undefined;
}

export interface PostImages extends ImgesArrayItem {
    imageId: string;
    postId: string;
}

export interface PostItem {
    postId: string;
    title: string;
    content: string;
    reportCount: number;
    user: UserData;
    images: PostImages[] | [];
    createdAt: string;
    updatedAt: string;
    urlSlug: string;
}

export interface PostUpdate extends PostNew {
    directory: string;
    urlSlug: string;
}

export interface IPropsEditorPage {
    onSubmit: (e: FormEvent) => void;
    setTitle: (title: string) => void;
    editorRef: RefObject<Editor>;
    data?: PostDetailData;
}

export interface IPropsPostEditor {
    editorRef: RefObject<Editor>;
    initialValue?: string;
}

export interface IAnotherPostProps {
    nextPost: PostDetailData;
    prevPost: PostDetailData;
}
