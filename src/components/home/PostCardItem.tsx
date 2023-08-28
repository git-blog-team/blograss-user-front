import { BLOGRASS_BASE_URL, BLOGRASS_IMAGE_BUCKET_URL } from '@/constants/api';
import { PostItem } from '@/types/postType';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import {
    ColumnFlexStartFlexStart,
    RowSpaceBetweenCenter,
} from '@/styles/flexModules';
import { format } from 'timeago.js';
import theme from '@/styles/theme';

export default function PostCardItem({ postItem }: { postItem: PostItem }) {
    return (
        <StyledWrapperPostCardItem>
            <StyledPostCardLink
                href={`${BLOGRASS_BASE_URL}/post/${postItem.postId}`}
            >
                <StyledWrapperHeader>
                    <span>
                        <b>by</b> {postItem.user.userId}
                    </span>
                    <span>{format(postItem.createdAt)}</span>
                </StyledWrapperHeader>
                {postItem.images[0] && (
                    <Image
                        src={`${BLOGRASS_IMAGE_BUCKET_URL}/${postItem.images[0].url}`}
                        alt={postItem.title}
                        width={320}
                        height={200}
                        style={{ objectFit: 'cover' }}
                    />
                )}
                <StyledWrapperText>
                    <StyledPostCardItemTitle>
                        {postItem.title}
                    </StyledPostCardItemTitle>
                    <StyledPostCardItemContent>
                        {postItem.content}
                    </StyledPostCardItemContent>
                </StyledWrapperText>
            </StyledPostCardLink>
        </StyledWrapperPostCardItem>
    );
}

const StyledWrapperPostCardItem = styled.article`
    ${ColumnFlexStartFlexStart}
    width: 320px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #bfc4d4;
`;

const StyledPostCardLink = styled(Link)`
    width: 100%;
`;

const StyledWrapperHeader = styled.div`
    ${RowSpaceBetweenCenter}
    width: 100%;
    padding: 10px;
    span {
        color: #555555;
        font-size: 0.8rem;
        b {
            font-weight: 700;
        }
    }
`;

const StyledWrapperText = styled.div`
    ${ColumnFlexStartFlexStart}
    width: 100%;
    padding: 10px;
`;

const StyledPostCardItemTitle = styled.h2`
    width: 100%;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5rem;
    white-space: normal;
    color: ${theme.colors.black};
`;

const StyledPostCardItemContent = styled.p`
    width: 100%;
    font-size: 0.8rem;
    line-height: 1.5rem;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 10px;
    color: #555555;
`;
