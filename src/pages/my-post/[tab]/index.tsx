import PostList from '@/components/home/PostList';
import { MY_POST_URL } from '@/constants/page';
import { useUserStore } from '@/store';
import {
    StyledCommonWhiteWrapper,
    StyledTapItem,
    StyledTapWrapper,
} from '@/styles/common';
import { RowCenterCenter, RowSpaceBetweenCenter } from '@/styles/flexModules';
import PageLoader from '@/components/common/PageLoader';
import styled from '@emotion/styled';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BLOGRASS_NEW_POST_PAGE } from '@/constants/api';
import Button from '@/components/common/Button';

export default function MyPost() {
    const { userId } = useUserStore();

    const router = useRouter();
    const { tab } = router.query;

    const tapTitle = [
        { name: 'post', title: '포스트' },
        { name: 'diectory', title: '디렉토리' },
        { name: 'report', title: '신고게시물' },
    ];
    const tapItems = {
        post: <PostList userId={userId} />,
        directory: <PostList />,
        report: <PostList />,
    };

    return (
        <StyledMyPostWrapper>
            <div>
                <StyledTapWrapper>
                    {_.map(tapTitle, (tapItem, index) => (
                        <StyledTapItem
                            key={index}
                            isFocus={tab === tapItem.name}
                        >
                            <Link href={`${MY_POST_URL}/${tapItem.name}`}>
                                {tapItem.title}
                            </Link>
                        </StyledTapItem>
                    ))}
                </StyledTapWrapper>

                <Button href={BLOGRASS_NEW_POST_PAGE}>새 잔디심기</Button>
            </div>
            {tab ? <div>{tapItems[tab as string]}</div> : <PageLoader />}
        </StyledMyPostWrapper>
    );
}

const StyledMyPostWrapper = styled(StyledCommonWhiteWrapper)`
    height: fit-content;
    margin: 3rem 2rem;
    padding: 1rem;
    ol {
        ${RowCenterCenter}
        width: 100%;

        flex-wrap: wrap;
        gap: 33px;
        padding: 3rem 0 0 0;
    }
    > div {
        &:first-of-type {
            ${RowSpaceBetweenCenter};
            > a {
                margin: 0 3rem 0 0;
            }
        }
        &:last-of-type {
            padding: 0 3rem;
        }
    }
`;
