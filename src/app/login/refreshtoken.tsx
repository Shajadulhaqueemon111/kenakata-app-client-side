/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const refreshAccessToken = async (
  setUser: (user: any | null) => void
): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:5001/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("accessToken", data.data.accessToken);
      const decoded: any = jwtDecode(data.data.accessToken);

      setUser({
        email: decoded.email,
        role: decoded.role,
        profilImage: decoded.profilImage,
      });

      toast.success("Token refreshed successfully!");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Token refresh failed", error);
    return false;
  }
};
