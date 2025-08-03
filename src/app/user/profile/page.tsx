"use client";
import { useAuth } from "@/app/authcontext/context";
import Image from "next/image";

import React from "react";

const UserProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200">
      {/* Cover Photo */}
      <div className="relative w-full h-60 bg-gray-300">
        <Image
          src="https://i.ibb.co/KxYGZnpY/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg"
          alt="Cover"
          layout="fill"
          objectFit="cover"
          className="rounded-b-md"
        />
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative bg-white shadow-lg rounded-lg p-6 mt-[-80px] pt-20">
          {/* Profile Image (overlapping the cover) */}
          <div className="absolute left-1/2 top-[-60px] transform -translate-x-1/2">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <Image
                  src={
                    user?.profileImage || "https://i.ibb.co/2nPqYsR/user.png"
                  }
                  alt="User"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-black font-bold">
              Email: {user?.email || "emon@gmail.com"}
            </p>
            <p className="text-sm font-bold text-black mt-1 capitalize">
              Role: {user?.role || "user"}
            </p>

            <div className="mt-4">
              {/* <button className="btn btn-outline btn-primary btn-sm">
                Edit Profile
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
