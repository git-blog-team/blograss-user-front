import styled from '@emotion/styled';
import Modal from './modal';
import { useAlertStore } from '@/store';

export default function Alert() {
    const ALERT = useAlertStore();
    const { alertData } = ALERT;

    const handleCancel = () => {
        alertData.callback?.();
        ALERT.closeAlert();
    };

    return (
        <Modal
            handleClose={handleCancel}
            isBackgroundColorUnset={alertData.isBackgroundColorUnset}
            isOpened={!!alertData.message}
            title={'알림'}
        >
            <StyledAlertPopUpContainer bigger={alertData.bigger}>
                {alertData?.headerTitle && <h2>{alertData.headerTitle}</h2>}
                <p>{alertData.message}</p>
                <div>
                    <button onClick={handleCancel}>확인</button>
                </div>
            </StyledAlertPopUpContainer>
        </Modal>
    );
}

export const StyledAlertPopUpContainer = styled.div<{
    bigger?: boolean;
}>`
    width: ${(props) => (props.bigger ? '45rem' : '40rem')};

    h2 {
        margin: 0 0 3rem;
    }

    p {
        font-size: 1.6rem;
        color: black;
        line-height: 2.1rem;
        text-align: center;
        white-space: pre-line;
    }

    div {
        display: flex;
        justify-content: flex-end;
        margin: 2rem 0 0;

        button {
            font-size: 1.4rem;
            color: green;
        }
    }
`;
