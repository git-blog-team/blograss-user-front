import { postAPI } from '@/api/postAPI';
import { PostItem } from '@/types/postType';
import { useQuery } from '@tanstack/react-query';
import PostCardItem from './PostCardItem';
import styled from '@emotion/styled';
import { ColumnCenterCenter, RowCenterCenter } from '@/styles/flexModules';
import { useFilter } from '../common/Filter';
import { useRouter } from 'next/router';
import NoResult from '../common/NoResult';
import {
    postListFilterOptions,
    userPostListFilterOptions,
} from '@/constants/options';

export default function PostList({ userId }: { userId?: string }) {
    const router = useRouter();

    const isUserPost = !!userId;

    const { filterRender, defaultFilterString } = useFilter({
        filterOptions: isUserPost
            ? userPostListFilterOptions(userId)
            : postListFilterOptions,
        // TODO : userlist api 에 검색기능 추가후 hasSearch:true 로 변경 예정
        hasSearch: isUserPost ? false : true,
    });

    const filterString =
        (router.query.filterString as string) ?? defaultFilterString;

    const { data } = useQuery(
        isUserPost
            ? ['getUserPostList', userId, filterString]
            : ['getPostList', filterString],
        isUserPost
            ? postAPI.getUserPostList(filterString)
            : postAPI.getPostList(filterString),
    );

    return (
        <StyledWrapperPostCard>
            {filterRender()}
            {data?.result[0].content.length ? (
                <ol>
                    {data?.result[0].content.map((postItem: PostItem) => (
                        <PostCardItem
                            key={postItem.postId}
                            postItem={postItem}
                        />
                    ))}
                </ol>
            ) : (
                <NoResult />
            )}
        </StyledWrapperPostCard>
    );
}

const StyledWrapperPostCard = styled.div`
    width: 100%;
    ${ColumnCenterCenter};
    ol {
        ${RowCenterCenter}
        width: 100%;
        flex-wrap: wrap;
        gap: 33px;
        padding: 0 10px;
    }
`;
