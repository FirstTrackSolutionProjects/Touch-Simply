import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthService } from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(true);
  const [authVerified, setAuthVerified] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setAuthVerified(false);
      setAuthLoading(false);
    };
    window.addEventListener("touchsimply:auth-expired", handleAuthExpired);
    return () => window.removeEventListener("touchsimply:auth-expired", handleAuthExpired);
  }, []);

  const checkAuth = async () => {
    setAuthLoading(true);
    setAuthVerified(false);
    const token = localStorage.getItem("token");
    try{
      if (token) {
        const data = await checkAuthService();
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        setAuthVerified(true);
        return data.data;
      }

      setUser(null);
      localStorage.removeItem("user");
      setAuthVerified(true);
      return null;
    } catch (error) {
      console.error(error);
      // Keep a previously authenticated user on transient/missing check-route errors.
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (token, userData) => {
    if (!token) {
      throw new Error("Login response did not include an access token");
    }

    localStorage.setItem("token", token);
    if (userData) {
      const normalizedUser = {
        ...userData,
        first_name: userData.first_name || userData.name || "User",
      };
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      setAuthVerified(true);
      setAuthLoading(false);
      return normalizedUser;
    }

    return checkAuth();
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem("user");
    setUser(null);
    setAuthVerified(false);
    setAuthLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authLoading,
        authVerified,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
