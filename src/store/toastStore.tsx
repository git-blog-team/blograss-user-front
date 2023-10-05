import styled from '@emotion/styled';
import { useState } from 'react';

const useToast = (message: string) => {
    const [showingState, setShowing] = useState(false);

    const openToast = () => {
        setShowing(true);

        setTimeout(function () {
            setShowing(false);
        }, 3000);
    };
    const ToastComponent = () => {
        return (
            <>
                {showingState && (
                    <StyledToast isShowing={showingState}>
                        {message}
                    </StyledToast>
                )}
            </>
        );
    };
    return { openToast, ToastComponent };
};

export { useToast };

const StyledToast = styled.div<{ isShowing: boolean }>`
    display: ${(props) => (props.isShowing ? 'block' : 'none')};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background: black;
    font-size: 1.3rem;
    line-height: 1.9rem;
    color: white;
    opacity: ${(props) => (props.isShowing ? 1 : 0)};
    z-index: 9999;
    white-space: pre-line;
`;
