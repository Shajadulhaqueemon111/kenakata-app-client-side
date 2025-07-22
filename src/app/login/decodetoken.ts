/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/decodeToken.ts
"use server";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function decodeToken(token: string | null): DecodedToken | null {
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}
