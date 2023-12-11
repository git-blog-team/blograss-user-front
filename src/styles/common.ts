import styled from '@emotion/styled';
import { RowFlexStartCenter } from './flexModules';

export const StyledCommonWhiteWrapper = styled.div`
    position: relative;
    border-radius: 0.8rem;
    box-shadow: 0px 2px 4px 0px #bfc4d4;
    width: 100%;
    max-width: 1400px;
    min-height: 70vh;
    background-color: white;
`;
export const StyledTapWrapper = styled.ul`
    ${RowFlexStartCenter};
    margin: 2rem 0;
`;
export const StyledTapItem = styled.li<{ isFocus: boolean }>`
    cursor: pointer;
    margin: 0 1rem 0 0;
    width: 20rem;
    line-height: 6rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: ${(props) => (props.isFocus ? 700 : 500)};
    color: ${(props) => (props.isFocus ? 'green' : 'black')};
    background-color: white;
    :hover {
        color: ${(props) => (props.isFocus ? 'green' : 'yellowgreen')};
    }

    > a {
        display: block;
        width: 100%;
    }
`;
