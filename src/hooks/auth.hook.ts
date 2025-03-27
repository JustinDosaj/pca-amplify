import { useContext } from "react";
import { AuthContext } from "@/providers/auth.providers";

// Custom hook to use auth
export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used within an AuthProvider");
  return auth;
};