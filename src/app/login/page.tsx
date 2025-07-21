"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form className="space-y-4">
          <Input type="email" placeholder="Email" className="text-black" />
          <Input
            type="password"
            placeholder="Password"
            className="text-black"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Dont have an account?{" "}
          <Link href="/register">
            <span className="text-red-600 hover:underline">Register</span>
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
          className="w-full flex items-center justify-center gap-2"
          onClick={() => alert("Handle Google login here")}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
