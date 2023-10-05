import styled from '@emotion/styled';
import React from 'react';
import Dialog from 'react-modal';

import { ColumnCenterCenter } from '@/styles/flexModules';

interface IModalProps {
    children: JSX.Element | JSX.Element[];
    title: string;
    handleClose: () => void;
    isOpened: boolean;
    shouldCloseOnBackgroundClick?: boolean;
    isBackgroundColorUnset?: boolean;
    confirmCloseModalProps?: {
        alertMessage?: string;
        isOpen: boolean;
        isBackgroundColorUnset?: boolean;
        fontStyles?: { [key: string]: string | number };
    };
}

Dialog.setAppElement('body');

export default function Modal(props: IModalProps) {
    const {
        children,
        handleClose,
        isOpened,
        shouldCloseOnBackgroundClick = true,
        title,
        isBackgroundColorUnset,
    } = props;

    const dialogStyle = {
        overlay: {
            background: isBackgroundColorUnset ? '' : 'rgba(0, 0, 0, 0.5)',
            zIndex: 500,
        },
    };

    return isOpened ? (
        <Dialog
            contentLabel={`${title} 모달`}
            isOpen={isOpened}
            onRequestClose={handleClose}
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={shouldCloseOnBackgroundClick}
            style={dialogStyle}
        >
            <StyledModal className={'modal'}>
                <div>{children}</div>
            </StyledModal>
        </Dialog>
    ) : null;
}

const StyledModal = styled.div`
    position: fixed;
    ${ColumnCenterCenter}
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > div {
        position: relative;
    }
`;
