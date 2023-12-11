import { css } from '@emotion/react';

/**
 * 네이밍 규칙을 아래와 같이 정의 했습니다.
 * - FlexDirection
 * - JustifyContent
 * - AlignItems
 */
export const ColumnFlexStartFlexStart = () => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const ColumnFlexStartCenter = () => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;
export const ColumnCenterFlexEnd = () => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

export const ColumnCenterCenter = () => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const RowSpaceBetweenCenter = () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const RowSpaceBetweenEnd = () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
`;

export const RowCenterCenter = () => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const RowFlexStartCenter = () => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
export const RowFlexEndCenter = () => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;
