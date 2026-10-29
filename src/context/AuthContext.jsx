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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setAuthLoading(true);
    const token = localStorage.getItem("token");
    try{
      if (token) {
        const data = await checkAuthService();
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        return data.data;
      }

      setUser(null);
      localStorage.removeItem("user");
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
    setAuthLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authLoading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
