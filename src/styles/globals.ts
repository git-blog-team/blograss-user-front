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
    html {
        font-size: 62.5%;
    }
    body {
        background-color: #f5f5f5;
        min-width: 30rem;
        min-height: 100vh;
    }

    main {
        margin-top: 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        > section {
            max-width: 140rem;
            width: 100%;
        }
    }

    a {
        text-decoration: none;
        color: inherit;

        &:active {
            color: inherit;
        }
    }

    label {
        font-size: 2.4rem;
        line-height: 3.6rem;
        color: ${theme.colors.black};
    }
`;

export default globalStyles;
