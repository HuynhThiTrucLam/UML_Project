import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean | null;
  user: AuthData | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthState: () => boolean;
}

interface AuthData {
  token: string;
  timestamp: number;
  username: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  checkAuthState: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<AuthData | null>(null);

  // Function to check if user is authenticated by verifying token in localStorage
  const checkAuthState = (): boolean => {
    const token = localStorage.getItem("auth_token");
    console.log("token", !!token);
    return !!token;
  };

  useEffect(() => {
    // Check authentication state when component mounts
    const isAuth = checkAuthState();
    if (isAuth) {
      const authData = localStorage.getItem("auth_token");
      if (authData) {
        setUser(JSON.parse(authData));
      }
    }
    setIsAuthenticated(isAuth);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // In a real app, you would call an API here
    // For now, use mock credentials
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        new URLSearchParams({
          grant_type: "password",
          username,
          password,
          scope: "",
          client_id: "string",
          client_secret: "string",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );

      if (response.data && response.data.access_token) {
        // Store auth data
        const authData = {
          token: response.data.access_token,
          timestamp: new Date().getTime(),
          username,
        };
        setUser(authData);
        localStorage.setItem("auth_token", JSON.stringify(authData));
        localStorage.setItem("user", JSON.stringify({ username }));
        setIsAuthenticated(true);
        toast.success("Đăng ký thành công!", {
          description: "Chào mừng bạn đến với hệ thống!",
          duration: 5000,
          className: "[&>[data-icon]]:!text-green-500",
        });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, checkAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
