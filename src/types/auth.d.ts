export interface IAuthContext {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User.IUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loginWithGoogle: () => void;
}