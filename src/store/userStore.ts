import { UserData, UserState } from '@/types/userType';
import { create } from 'zustand';

export const useUserStore = create<UserState>((set) => ({
    isLogin: false,
    userId: '',
    userName: '',
    blogUserName: '',
    reportCount: 0,
    handleLogin: (loginState: boolean) => set(() => ({ isLogin: loginState })),
    updateUserData: (userData: UserData) => set(() => ({ ...userData })),
}));
