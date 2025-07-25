"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Link from "next/link";
import Swal from "sweetalert2";
import authAxiosInstance from "@/axiosInstance/authaxios";

type Tuser = {
  _id: string;
  name: string;
  email: string;
  status: "active" | "block";
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

const TotalUser = () => {
  const [users, setUsers] = useState<Tuser[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Access token does not exist in local storage");
        setLoading(false);
        return;
      }

      try {
        const res = await authAxiosInstance.get("/user");
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  // Calculate pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (_id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Access token does not exist in local storage");
        return;
      }

      try {
        const res = await axios.delete(
          `http://localhost:5000/api/v1/user/${_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (res.status === 200 || res.status === 204) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          setUsers((previousUser) =>
            previousUser.filter((user) => user._id !== _id)
          );

          // Optional: If current page becomes empty after deletion, go back a page
          if (currentUsers.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          toast.error("Failed to delete user.");
        }
      } catch (err) {
        console.error(err);
        toast.error("User deletion failed!");
      }
    } else {
      toast("Delete action cancelled.");
    }
  };

  return (
    <div className="p-4 mx-auto items-center min-h-screen max-w-6xl mt-6">
      <h1 className="text-xl font-bold mb-4 text-center mt-4 text-black">
        Total Users
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="border-b px-6 py-3">#</th>
              <th className="border-b px-6 py-3">Name</th>
              <th className="border-b px-6 py-3">Email</th>
              <th className="border-b px-6 py-3">Role</th>
              <th className="border-b px-6 py-3">Status</th>
              <th className="border-b px-6 py-3 text-center">Update</th>
              <th className="border-b px-6 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="border-t px-6 py-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="border-t px-6 py-4">{user.name}</td>
                <td className="border-t px-6 py-4">{user.email}</td>
                <td className="border-t px-6 py-4">{user.role}</td>
                <td className="border-t px-6 py-4 capitalize">{user.status}</td>
                <td className="border-t px-6 py-4 text-center">
                  <Link href={`/dashboard/updateuser/${user._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                      Update
                    </button>
                  </Link>
                </td>
                <td className="border-t px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TotalUser;
