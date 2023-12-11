import { BLOGRASS_BASE_URL, BLOGRASS_IMAGE_BUCKET_URL } from '@/constants/api';
import { PostItem } from '@/types/postType';
import Image from 'next/image';
import styled from '@emotion/styled';
import {
    ColumnFlexStartCenter,
    ColumnFlexStartFlexStart,
    RowCenterCenter,
} from '@/styles/flexModules';
import { format } from 'timeago.js';
import theme from '@/styles/theme';
import Link from 'next/link';
import { useRouter } from 'next/router';

const blurDataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0OJJcDwAEmwHoBp6SWAAAAABJRU5ErkJggg==';

export default function PostCardItem({ postItem }: { postItem: PostItem }) {
    const router = useRouter();

    const onClickPost = () => {
        router.push({
            pathname: `${BLOGRASS_BASE_URL}/post/${postItem.urlSlug}`,
            query: {
                postUserId: postItem.user.userId,
            },
        });
    };
    return (
        <StyledWrapperPostCardItem>
            <div onClick={onClickPost}>
                <h1>{postItem.title}</h1>
                <span>
                    {postItem.user.userName} | {postItem.user.userId}
                    <br /> {format(postItem.createdAt)}
                </span>
                <div>
                    {postItem.images[0] ? (
                        <Image
                            src={`${BLOGRASS_IMAGE_BUCKET_URL}/${postItem.images[0].url}`}
                            alt={postItem.title}
                            width={280}
                            height={150}
                            style={{ objectFit: 'cover', overflow: 'hidden' }}
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                        />
                    ) : (
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={80}
                            height={80}
                        />
                    )}
                </div>

                <StyledWrapperText>
                    <StyledPostCardItemContent>
                        {postItem.content}
                    </StyledPostCardItemContent>
                </StyledWrapperText>
            </div>
        </StyledWrapperPostCardItem>
    );
}

const StyledWrapperPostCardItem = styled.article`
    width: 30rem;
    height: 400px;
    border-radius: 0.8rem;
    box-shadow: 0px 2px 4px 0px #bfc4d4;
    &:hover {
        box-shadow: 0px 2px 4px 0px #a0ab9c;
    }

    > div {
        ${ColumnFlexStartCenter}
        width: 100%;
        height: 100%;
        background-color: white;
        border: unset;
        border-radius: 0.8rem;
        cursor: pointer;
        padding: 3rem 2rem;

        > h1 {
            width: 100%;
            font-size: 1.8rem;
            font-weight: 700;
            line-height: 1.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            color: ${theme.colors.black};
            margin: 0 0 1.5rem 0;
        }
        > span {
            width: 100%;
            font-size: 1.3rem;
            text-align: left;
            color: gray;
            margin: 0.8rem 0;
        }

        > div {
            &:first-of-type {
                ${RowCenterCenter}
                width: 100%;
                height: 18rem;
                background-color: #eff9ef;
            }
        }
    }
`;

const StyledWrapperText = styled.div`
    ${ColumnFlexStartFlexStart}
    width: 100%;
    padding: 10px;
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
