/* eslint-disable @typescript-eslint/no-explicit-any */
// update path as needed

import publicAxios from "@/axiosInstance/publicaxios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const refreshAccessToken = async (
  setUser: (user: any | null) => void
): Promise<boolean> => {
  try {
    const res = await publicAxios.post("/auth/refresh-token");

    if (res.status === 200) {
      const data = res.data;
      localStorage.setItem("accessToken", data.data.accessToken);
      const decoded: any = jwtDecode(data.data.accessToken);

      setUser({
        email: decoded.email,
        role: decoded.role,
        profileImage: decoded.profileImage,
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
