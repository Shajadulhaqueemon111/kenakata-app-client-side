/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import authAxiosInstance from "@/axiosInstance/authaxios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Tproduct = {
  _id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  weight: string;
  description: string;
  rating: string;
};

const categoryOptions = [
  "Fruits",
  "Vegetables",
  "Fish",
  "Meat",
  "Cooking Essentials",
  "Cleaning Products",
];
const CreateProduct = () => {
  const [formData, setFormData] = useState<Omit<Tproduct, "_id" | "image">>({
    name: "",
    category: "",
    price: "",
    weight: "",
    rating: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) return toast.error("Please upload an image.");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("weight", formData.weight);
    data.append("rating", formData.rating);
    data.append("description", formData.description);
    data.append("image", imageFile);

    try {
      setIsSubmitting(true);
      const response = await authAxiosInstance.post(
        "/grosary-product/create-grosary",
        data
      );
      console.log(response);
      toast.success("Product created successfully!");
      router.push("/dashboard/productlist");
      setFormData({
        name: "",
        category: "",
        price: "",
        weight: "",
        description: "",
        rating: "",
      });
      setImageFile(null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl  mx-auto p-6 bg-white shadow rounded-md mt-8 text-black">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Create New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block mb-1 font-semibold text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select category
            </option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <FormInput
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          type="number"
        />

        {/* Weight */}
        <FormInput
          label="Weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />

        {/* Description (takes full width) */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image upload (takes full width) */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold text-gray-700">
            Image
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
          {imageFile && (
            <p className="text-sm mt-1 text-gray-500">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        {/* Submit button (full width) */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable FormInput
const FormInput = ({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  type?: string;
}) => (
  <div>
    <label htmlFor={name} className="block mb-1 font-semibold">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

export default CreateProduct;
