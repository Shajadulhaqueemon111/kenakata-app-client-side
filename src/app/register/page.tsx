"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>

          <form className="space-y-4">
            <Input type="name" placeholder="Name" className="text-black" />
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
            already have an account?{" "}
            <Link href="/login">
              <span className="text-red-600 hover:underline">Login</span>
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
