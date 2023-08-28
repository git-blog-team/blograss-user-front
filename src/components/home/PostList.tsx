import { postAPI } from '@/api/postAPI';
import { PostItem } from '@/types/postType';
import { useQuery } from '@tanstack/react-query';
import PostCardItem from './PostCardItem';
import styled from '@emotion/styled';
import { RowCenterCenter } from '@/styles/flexModules';

export default function PostList() {
    const { data } = useQuery({
        queryKey: ['getPostList'],
        queryFn: postAPI.getPostList,
    });

    return (
        <StyledWrapperPostCard>
            <ol>
                {data?.data.result[0].content.map((postItem: PostItem) => (
                    <PostCardItem key={postItem.postId} postItem={postItem} />
                ))}
            </ol>
        </StyledWrapperPostCard>
    );
}

const StyledWrapperPostCard = styled.div`
    width: 100%;
    ol {
        ${RowCenterCenter}
        width: 100%;
        flex-wrap: wrap;
        gap: 33px;
        padding: 0 10px;
    }
`;
