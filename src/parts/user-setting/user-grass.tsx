import GitCalender from '@/components/common/GitCalender';
import { useUserStore } from '@/store';
import { RowCenterCenter } from '@/styles/flexModules';
import styled from '@emotion/styled';

export default function UserGrass() {
    const { userId } = useUserStore();
    return (
        <StyledUserGrass>
            <div>
                <GitCalender userId={userId} />
            </div>
        </StyledUserGrass>
    );
}
const StyledUserGrass = styled.div`
    ${RowCenterCenter};
    width: 100%;
    height: 100%;
    > label {
        font-size: 1.6rem;
        font-weight: 600;
    }
    > div {
        border: 1px solid lightgray;
        padding: 5rem 10rem;
    }
`;
