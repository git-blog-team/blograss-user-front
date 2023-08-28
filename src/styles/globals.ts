import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import theme from '@/styles/theme';

export const globalStyles = () => css`
    ${emotionReset};

    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    body {
        background-color: #f5f5f5;
    }

    main {
        margin-top: 82px;
        display: flex;
        flex-direction: column;
        align-items: center;
        > section {
            width: 1400px;
        }
    }

    a {
        text-decoration: none;
    }

    label {
        font-size: 24px;
        line-height: 36px;
        color: ${theme.colors.black};
    }
`;

export default globalStyles;
