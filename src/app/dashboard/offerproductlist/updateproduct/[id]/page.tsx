/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import authAxiosInstance from "@/axiosInstance/authaxios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import publicAxios from "@/axiosInstance/publicaxios";

const UpdateOfferproduct = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    description: "",
    rating: "",
    offerPercent: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing data for update
  useEffect(() => {
    const fetchOfferProduct = async () => {
      try {
        const res = await publicAxios.get(`/offer/${id}`);
        const data = res.data.data;
        console.log(data);
        setFormData({
          name: data.name || "",
          category: data.category || "",
          price: data.price || "",
          weight: data.weight || "",
          description: data.description || "",
          rating: data.rating || "",
          offerPercent: data.offerPercent || "",
        });
      } catch (error) {
        console.error("Failed to fetch offer product:", error);
        toast.error("Error loading product data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOfferProduct();
    }
  }, [id]);

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
      const response = await authAxiosInstance.patch(`/offer/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Offer product updated:", response.data.data);
      toast.success("Offer product updated successfully!");
      router.push("/dashboard/offerproductlist");
    } catch (error) {
      console.error("Failed to update offer product:", error);
      toast.error("Error updating offer product.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading offer product...</p>;
  }

  return (
    <div className="max-w-5xl text-black mx-auto p-6 bg-white shadow rounded-md mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Offer Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
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
          required
        />

        {/* Image Input (optional) */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
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

export default UpdateOfferproduct;
