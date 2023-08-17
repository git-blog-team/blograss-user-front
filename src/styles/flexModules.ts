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

export const RowSpaceBetweenCenter = () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
