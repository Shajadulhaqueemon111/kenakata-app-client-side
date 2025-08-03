/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../authcontext/context";
import { jwtDecode } from "jwt-decode";
import { signIn } from "next-auth/react";
import publicAxios from "@/axiosInstance/publicaxios";

interface DecodedToken {
  email?: string;
  role?: string;
  profileImage?: string;
  exp?: number;
}

const LoginPage = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter both email and password");
      return;
    }

    try {
      const response = await publicAxios.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;
      toast.success("Logged in successfully!");

      const token = data.data?.accessToken;
      if (!token) {
        toast.error("Invalid token received");
        return;
      }

      localStorage.setItem("accessToken", token);

      const decoded = jwtDecode<DecodedToken>(token);
      const user = {
        email: decoded.email || data.data.email,
        role: decoded.role || data.data.role,
        profileImage: decoded.profileImage || data.data.profileImage,
        exp: decoded.exp || data.data.exp,
      };
      setUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      router.push(user.role?.toLowerCase() === "admin" ? "/dashboard" : "/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-red-600 hover:underline">
            Register
          </Link>
        </p>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm text-gray-500">
            <span className="bg-white px-2">OR</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-black"
          onClick={() => signIn("google", { callbackUrl: "/user" })}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
