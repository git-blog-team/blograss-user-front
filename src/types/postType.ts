import { FormEvent, RefObject } from 'react';
import { UserData } from './userType';
import { Editor } from '@toast-ui/react-editor';

export interface ImgesArrayItem {
    url: string;
}

export interface IPostDetailProps {
    postId: string;
    title: string;
    content: string;
    reportCount: number;
    user: UserData;
    images: PostImages[] | [];
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
}

export interface PostUpdate extends PostNew {
    postId: string;
}

export interface IPropsEditorPage {
    onSubmit: (e: FormEvent) => void;
    setTitle: (title: string) => void;
    editorRef: RefObject<Editor>;
    data?: IPostDetailProps;
}

export interface IPropsPostEditor {
    editorRef: RefObject<Editor>;
    initialValue?: string;
}
