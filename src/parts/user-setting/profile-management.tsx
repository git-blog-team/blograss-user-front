import { RowCenterCenter } from '@/styles/flexModules';
import styled from '@emotion/styled';

export default function ProfileManagement() {
    return (
        <StyledProfileManagement>
            <p>준비즁임당</p>
        </StyledProfileManagement>
    );
}
const StyledProfileManagement = styled.div`
    width: 100%;
    height: 100%;
    ${RowCenterCenter};
`;
