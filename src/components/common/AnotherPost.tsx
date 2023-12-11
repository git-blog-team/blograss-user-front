import {
    ColumnCenterFlexEnd,
    RowSpaceBetweenCenter,
} from '@/styles/flexModules';
import { IAnotherPostProps } from '@/types/postType';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export default function AnotherPost(data: IAnotherPostProps) {
    const { prevPost, nextPost } = data;
    const router = useRouter();
    const onClickItem = (post) => () => {
        router.push({
            pathname: `/post/${post.urlSlug}`,
            query: {
                postUserId: post.user.userId,
            },
        });
    };
    return (
        <StyledAnotherPost>
            {prevPost && (
                <StyledPrevPost onClick={onClickItem(prevPost)}>
                    <div>
                        <h3>이전 포스트</h3>
                        <p>{prevPost.title}</p>
                    </div>
                </StyledPrevPost>
            )}

            {nextPost && (
                <StyledNextPost onClick={onClickItem(nextPost)}>
                    <div>
                        <h3>다음 포스트</h3>
                        <p>{nextPost.title}</p>
                    </div>
                </StyledNextPost>
            )}
        </StyledAnotherPost>
    );
}
const StyledAnotherPost = styled.article`
    ${RowSpaceBetweenCenter};
    > div {
        ${RowSpaceBetweenCenter};
        border: 3px solid #d1ddd1;
        border-radius: 8px;
        padding: 15px 20px;
        cursor: pointer;
        width: 40%;

        > div {
            > h3 {
                font-size: 16px;
                margin: 0 0 10px 0;
                font-weight: 600;
            }
            > p {
                font-size: 13px;
            }
        }
    }
`;

const StyledNextPost = styled.div`
    ::after {
        content: '>';
        display: block;

        font-size: 30px;
        margin: 0 0 0 20px;
        color: green;
    }
`;
const StyledPrevPost = styled.div`
    ::before {
        content: '<';
        display: block;
        font-size: 30px;
        margin: 0 20px 0 0;
        color: green;
    }
    > div {
        ${ColumnCenterFlexEnd};
    }
`;
