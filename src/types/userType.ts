export interface UserData {
    userId: string;
    userName: string;
    blogUserName: string | null;
    reportCount: number;
}
export interface UserState extends UserData {
    isLogin: boolean;
    handleLogin: (loginState: boolean) => void;
    updateUserData: (userData: UserData) => void;
}
