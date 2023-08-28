import { BLOGRASS_NEW_POST_PAGE } from '@/constants/api';
import { useUserStore } from '@/store/userStore';
import { RowFlexEndCenter, RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import Button from '../common/Button';

export default function ListPageHeader() {
    const { isLogin } = useUserStore((state) => state);
    return (
        <StyedWrapper>
            <div>
                <StyledPostCountLabel>나의 게시물</StyledPostCountLabel>
                <StyledPostCountText>122</StyledPostCountText>
            </div>
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
    ${RowSpaceBetweenCenter}
    width: 100%;
    height: 83px;
    padding: 0px 60px;
    background-color: ${theme.colors.white};
`;

const StyledPostCountLabel = styled.span`
    font-size: 20px;
    font-weight: 700;
    margin-right: 10px;
`;

const StyledPostCountText = styled.span`
    font-size: 14px;
    font-weight: 400;
    color: #7b7fa8;
`;

const StyledWrapperNav = styled.nav`
    ${RowFlexEndCenter}
`;
