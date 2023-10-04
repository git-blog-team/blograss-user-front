import { ValueType } from '@/types/commonType';

import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface AlertData {
    message: string;
    headerTitle?: string;
    callback?: () => void;
    bigger?: boolean;
    isBackgroundColorUnset?: boolean;
}

const initData: AlertData = {
    message: '',
};

const alertStore = (set: ValueType<any, any>) => ({
    alertData: initData,
    setAlert: (payload: AlertData) => {
        set({ alertData: payload });
    },
    closeAlert: () => {
        set({ alertData: { message: '' } });
    },
});

const useAlertStore = create(devtools(alertStore));

export { useAlertStore };
