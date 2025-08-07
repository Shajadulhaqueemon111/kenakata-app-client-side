"use client";
import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-teal-400 mb-2">KenaKataHub</h2>
          <p className="text-sm text-gray-300">
            Get your daily groceries delivered to your doorstep within 1 hour.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-teal-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/user">Home</Link>
            </li>
            <li>
              <Link href="/user">Categories</Link>
            </li>
            <li>
              <Link href="/user">Offers</Link>
            </li>
            <li>
              <Link href="/user/profile">My Account</Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-teal-300">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/user">FAQ</Link>
            </li>
            <li>
              <Link href="/user/contact">Help Center</Link>
            </li>
            <li>
              <Link href="/user/contact">Returns</Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-teal-300">
            Stay Connected
          </h3>
          <div className="flex gap-4 text-gray-300 mb-4">
            <Link href="https://www.facebook.com/">
              <Facebook className="hover:text-white" />
            </Link>
            <Link href="https://www.instagram.com/mdsajedulhaqueemon">
              <Instagram className="hover:text-white" />
            </Link>
            <Link href="https://x.com/home">
              <Twitter className="hover:text-white" />
            </Link>
            <Link href="mailto:mdshajdulhaqueemon@gmail.com">
              <Mail className="hover:text-white" />
            </Link>
          </div>
          <p className="text-sm text-gray-400">Email: support@kenakata.com</p>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <p className="text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Kenakata. All rights reserved.md@emon
      </p>
    </footer>
  );
};

export default Footer;
