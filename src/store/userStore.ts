import { create } from 'zustand';

interface UserState {
    isLogin: boolean;
    userId: string;
    userName: string;
    blogUserName: string | null;
    reportCount: number;
    handleLogin: (loginState: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
    isLogin: false,
    userId: '',
    userName: '',
    blogUserName: '',
    reportCount: 0,
    handleLogin: (loginState: boolean) => set(() => ({ isLogin: loginState })),
}));
