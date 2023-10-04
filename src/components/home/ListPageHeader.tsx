import { BLOGRASS_NEW_POST_PAGE } from '@/constants/api';

import {
    ColumnFlexStartFlexStart,
    RowFlexEndCenter,
    RowFlexStartCenter,
    RowSpaceBetweenEnd,
} from '@/styles/flexModules';

import styled from '@emotion/styled';
import Link from 'next/link';
import Button from '../common/Button';
import { useUserStore } from '@/store';
import { HighlightOutlined, RightOutlined } from '@ant-design/icons';

export default function ListPageHeader() {
    const { isLogin } = useUserStore();
    return (
        <StyedWrapper>
            <StyledNotice>
                <HighlightOutlined
                    style={{ color: 'green', fontSize: '2.5rem' }}
                />
                <div>
                    <h3>공지사항 기능 준비중입니다.</h3>
                    <p>2023.10.4</p>
                </div>
                <RightOutlined style={{ color: 'gray', fontSize: '2rem' }} />
            </StyledNotice>
            <StyledWrapperNav>
                <form action="">
                    <input type="text" />
                    <Button>검색</Button>
                </form>
                {isLogin && (
                    <Link href={BLOGRASS_NEW_POST_PAGE}>
                        <Button>새 잔디심기</Button>
                    </Link>
                )}
            </StyledWrapperNav>
        </StyedWrapper>
    );
}

const StyedWrapper = styled.section`
    ${RowSpaceBetweenEnd}
    width: 100%;
    padding: 2rem 0;
`;

const StyledWrapperNav = styled.nav`
    ${RowFlexEndCenter}
    input {
        height: 3.8rem;
        width: 20rem;
        margin: 0 1rem 0 0;
    }
    > a {
        margin: 0 0 0 1rem;
    }
`;

const StyledNotice = styled.div`
    ${RowFlexStartCenter};
    border: 1px solid green;
    border-radius: 0.8rem;
    height: 8rem;
    width: 40rem;

    background-color: white;
    padding: 0 2rem;
    > div {
        ${ColumnFlexStartFlexStart};
        margin: 0 12rem 0 1.5rem;
        cursor: pointer;

        > h3 {
            font-size: 1.5rem;
        }
        > p {
            font-size: 1.3rem;
            margin: 1rem 0 0 0;
            color: gray;
        }
    }
`;
