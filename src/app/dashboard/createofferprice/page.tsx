/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import authAxiosInstance from "@/axiosInstance/authaxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateOfferProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    description: "",
    rating: "",
    offerPercent: "",
  });
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("price", formData.price);
    form.append("weight", formData.weight);
    form.append("description", formData.description);
    form.append("rating", formData.rating);
    form.append("offerPercent", formData.offerPercent);

    if (imageFile) {
      form.append("image", imageFile);
    }

    try {
      const response = await authAxiosInstance.post(
        "/offer/create-offer",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Offer product created:", response.data);
      toast.success("Offer product created successfully!");
      router.push("/dashboard/offerproductlist");
    } catch (error) {
      console.error("Failed to create offer product:", error);
      toast.error("Error creating offer product.");
    }
  };

  return (
    <div className="max-w-5xl text-black mx-auto p-6 bg-white shadow rounded-md mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Offer Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Inputs */}
        {[
          { name: "name", placeholder: "Product Name" },
          { name: "category", placeholder: "Category" },
          { name: "price", placeholder: "Price" },
          { name: "weight", placeholder: "Weight" },
          { name: "rating", placeholder: "Rating" },
          { name: "offerPercent", placeholder: "Offer Percentage" },
        ].map((input) => (
          <input
            key={input.name}
            type="text"
            name={input.name}
            placeholder={input.placeholder}
            value={(formData as any)[input.name]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateOfferProduct;
