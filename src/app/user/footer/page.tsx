"use client";
import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-teal-400 mb-2">GroceryHub</h2>
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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Categories</a>
            </li>
            <li>
              <a href="#">Offers</a>
            </li>
            <li>
              <a href="#">My Account</a>
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
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Track Order</a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-teal-300">
            Stay Connected
          </h3>
          <div className="flex gap-4 text-gray-300 mb-4">
            <a href="#">
              <Facebook className="hover:text-white" />
            </a>
            <a href="#">
              <Instagram className="hover:text-white" />
            </a>
            <a href="#">
              <Twitter className="hover:text-white" />
            </a>
            <a href="#">
              <Mail className="hover:text-white" />
            </a>
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
