import { ColumnCenterCenter, RowCenterCenter } from '@/styles/flexModules';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import styled from '@emotion/styled';

export default function NoResult() {
    return (
        <StyledNoResult>
            <StyledNoResultIcon />
            <p>검색하신 결과가 없습니다.</p>
        </StyledNoResult>
    );
}
const StyledNoResult = styled.div`
    ${ColumnCenterCenter};
    width: 40rem;
    height: 40rem;
    > p {
        font-size: 1.5rem;
        color: green;
        margin: 2rem 0 0 0;
    }
`;

const StyledNoResultIcon = styled(FileSearchOutlined)`
    ${RowCenterCenter};

    color: green;
    font-size: 10rem;
`;
