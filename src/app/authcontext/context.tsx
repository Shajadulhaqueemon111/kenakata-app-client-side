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
    const savedUser = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");

    if (savedUser) setUser(JSON.parse(savedUser));

    const checkTokenValidity = async () => {
      if (token) {
        try {
          const decoded: { exp: number } = jwtDecode(token);
          const expirationTime = decoded.exp * 1000;

          if (Date.now() > expirationTime) {
            const refreshed = await refreshAccessToken(setUser);
            if (!refreshed) {
              logout();
              router.push("/login");
            }
          }
        } catch {
          logout();
          router.push("/login");
        }
      }
      setAuthLoaded(true);
    };

    checkTokenValidity();
  }, []);

  const logout = async () => {
    setUser(null);
    console.log(" Context user cleared");
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
