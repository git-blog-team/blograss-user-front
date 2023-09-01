import { create } from 'zustand';

interface ICommonState {
    isLoading: boolean;
    setLoading: (isLoadingState: boolean) => void;
}

export const useCommonStore = create<ICommonState>((set) => ({
    isLoading: false,
    setLoading: (isLoadingState) =>
        set(() => ({
            isLoading: isLoadingState,
        })),
}));
