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
  const [user, setUser] = useState(null);
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
        return data.data;
      }

      setUser(null);
      return null;
    } catch (error) {
      console.error(error);
      setUser(null);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (token) => {
    if (!token) {
      throw new Error("Login response did not include an access token");
    }

    localStorage.setItem("token", token);
    return checkAuth();
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );
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
