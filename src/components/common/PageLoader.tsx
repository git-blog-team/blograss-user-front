import styled from '@emotion/styled';
import GridLoader from './GridLoader';
import { ColumnCenterCenter } from '@/styles/flexModules';
import theme from '@/styles/theme';

export default function PageLoader() {
    return (
        <WrapperLoader>
            <StyledBackgroundCircle>
                <GridLoader size={20} />
            </StyledBackgroundCircle>
        </WrapperLoader>
    );
}

const WrapperLoader = styled.div`
    ${ColumnCenterCenter}
    width: 100%;
    height: 100dvh;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
`;

const StyledBackgroundCircle = styled.div`
    ${ColumnCenterCenter}
    background-color: #fff;
    padding: 20px;
    border-radius: 100%;
    box-shadow: 0px 2px 4px 0px ${theme.colors.point_green};
`;
