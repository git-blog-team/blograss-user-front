import { create } from 'zustand';

interface UserData {
    userId: string;
    userName: string;
    blogUserName: string | null;
    reportCount: number;
}
interface UserState extends UserData {
    isLogin: boolean;
    handleLogin: (loginState: boolean) => void;
    updateUserData: (userData: UserData) => void;
}

export const useUserStore = create<UserState>((set) => ({
    isLogin: false,
    userId: '',
    userName: '',
    blogUserName: '',
    reportCount: 0,
    handleLogin: (loginState: boolean) => set(() => ({ isLogin: loginState })),
    updateUserData: (userData: UserData) => set(() => ({ ...userData })),
}));
