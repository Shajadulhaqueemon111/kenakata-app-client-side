/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Tuser = {
  _id: string;
  name: string;
  email: string;
  status: "active" | "block";
  role: string;
  profileImage?: string;
};

const UpdateUserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<Tuser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Tuser, "profileImage">>({
    _id: "",
    name: "",
    email: "",
    status: "active",
    role: "",
  });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return toast.error("No access token found");

        const res = await axios.get(
          `https://kenakata-server-side.vercel.app /api/v1/user/${userId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const fetchedUser = res.data?.data;
        setUser(fetchedUser);
        setFormData({
          _id: fetchedUser._id,
          name: fetchedUser.name,
          email: fetchedUser.email,
          status: fetchedUser.status,
          role: fetchedUser.role,
        });
      } catch (error) {
        toast.error("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!["active", "block"].includes(formData.status))
      newErrors.status = "Status must be active or block";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("status", formData.status);
    data.append("role", formData.role);
    if (profileImageFile) {
      data.append("profileImage", profileImageFile);
    }

    try {
      const token = localStorage.getItem("accessToken") || "";
      await axios.patch(
        `https://kenakata-server-side.vercel.app /api/v1/user/${userId}`,
        data,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("User updated successfully");
      router.push("/dashboard/totalusers");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("User update failed");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!user) return <p className="text-center py-10">User not found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="role">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="active">Active</option>
            <option value="block">Block</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
          )}
        </div>

        {/* Profile Image */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="profileImage">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {profileImageFile && (
            <p className="mt-2 text-gray-600 text-sm w-full">
              Selected file: {profileImageFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUserPage;
