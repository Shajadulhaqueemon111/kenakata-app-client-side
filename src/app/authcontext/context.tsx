/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../login/refreshtoken";
import { logOut } from "../login/logout";

interface User {
  email: string;
  role: string;
  profileImage?: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  authLoaded: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
  authLoaded: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("loggedInUser");

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem("loggedInUser");
        }
      }

      if (token) {
        try {
          const decoded: { exp: number } = jwtDecode(token);
          const expirationTime = decoded.exp * 1000;

          if (Date.now() > expirationTime) {
            const refreshed = await refreshAccessToken(setUser);
            if (!refreshed) {
              await logout();
              return;
            }
          }
        } catch (err) {
          console.log(err);
          await logout();
          return;
        }
      }

      setAuthLoaded(true);
    };

    checkAuth();
  }, []);

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUser");
    await logOut();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, authLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
