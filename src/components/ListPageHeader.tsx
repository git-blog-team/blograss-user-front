import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

export default function ListPageHeader() {
    return (
        <StyedWrapper>
            <div>
                <StyledPostCountLabel>나의 게시물</StyledPostCountLabel>
                <StyledPostCountText>122</StyledPostCountText>
            </div>
            <nav>
                <form action="">
                    <input type="text" />
                    <button>검색</button>
                </form>
                <button>새잔디심기</button>
            </nav>
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
