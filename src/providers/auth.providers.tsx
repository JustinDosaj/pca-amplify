"use client"
import { createContext, useEffect, useState, ReactNode } from "react";
import { configureAmplify } from "@/config/auth.config";
import { fetchAuthSession, fetchUserAttributes, signOut, signIn, signInWithRedirect } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";

interface User {
  email: string | null;
  username: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    try {

      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      router.push('/')

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      
      await signIn({ username: email, password });
      await checkAuth(); // Refresh auth state
      router.replace('/')

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    await signInWithRedirect({ provider: "Google" })
  };


  useEffect(() => {
    configureAmplify();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString() || null;
      const authenticated = !!idToken;

      let userData: User | null = null;
      if (authenticated) {
        const attributes = await fetchUserAttributes();
        userData = {
          email: attributes.email || null,
          username: attributes.sub || null,
        };
      }

      setIsAuthenticated(authenticated);
      setUser(userData);
    } catch (error) {
      console.error("Auth error:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <AuthContext.Provider value={{isAuthenticated, isLoading, user, login, logout, loginWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
};

// Custom hook to use auth
// export const useAuth = () => {
//   const auth = useContext(AuthContext);
//   if (!auth) throw new Error("useAuth must be used within an AuthProvider");
//   return auth;
// };
