import { create } from 'zustand';
import { useAlertStore } from './alertStore';
import { devtools } from 'zustand/middleware';
import { useToast } from './toastStore';
import { useUserStore } from './userStore';

const commonStore = (set) => ({
    isLoading: false,
    toastMessage: '',
    methods: {
        showToast: (payload) => {
            set({ toastMessage: payload });
            setTimeout(() => set({ toastMessage: '' }), 3000);
        },
        setLoading: (payload) => set({ isLoading: payload }),
    },
});
export const useCommonStore = create(devtools(commonStore));

export { useAlertStore, useToast, useUserStore };
