"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import authAxiosInstance from "@/axiosInstance/authaxios";
import Image from "next/image";

type Tproduct = {
  _id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  weight: string;
  rating: string;
};

const UpdateProductPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Tproduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<Tproduct, "image" | "_id">>({
    name: "",
    category: "",
    price: "",
    weight: "",
    rating: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch product details on mount or id change
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          toast.error("Product ID is missing");
          setLoading(false);
          return;
        }
        const res = await authAxiosInstance.get(`/grosary-product/${id}`);
        const fetchedProduct = res.data?.data;

        if (!fetchedProduct) {
          toast.error("Product not found");
          setLoading(false);
          return;
        }

        setProduct(fetchedProduct);
        setFormData({
          name: fetchedProduct.name,
          category: fetchedProduct.category,
          price: fetchedProduct.price,
          weight: fetchedProduct.weight,
          rating: fetchedProduct.rating,
          description: fetchedProduct.description,
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.weight.trim()) newErrors.weight = "Weight is required";
    if (!formData.rating.trim()) newErrors.rating = "Weight is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(formData.price)))
      newErrors.price = "Price must be a number";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("weight", formData.weight);
    data.append("rating", formData.rating);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await authAxiosInstance.patch(`/grosary-product/${id}`, data);
      toast.success("Product updated successfully");
      router.push("/dashboard/productlist");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Product update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading product details...</div>;
  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="flex justify-center items-center lg:min-w-6xl md:max-w-5xl px-4 py-10 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white text-black p-6 md:p-8 rounded-xl shadow-md"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Product
        </h2>

        {/* Name */}
        <FormGroup
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Category */}
        <FormGroup
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
        />

        {/* Weight */}
        <FormGroup
          label="Weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          error={errors.weight}
        />
        <FormGroup
          label="Rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          error={errors.rating}
        />

        {/* Price */}
        <FormGroup
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          type="number"
        />

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Existing Image Preview */}
        {product.image && !imageFile && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Current Image</label>
            <Image
              src={product.image}
              alt={product.name}
              height={30}
              width={30}
              className="w-40 h-40 object-cover rounded"
            />
          </div>
        )}

        {/* New Image Upload */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="image">
            Upload New Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {imageFile && (
            <p className="mt-2 text-gray-600 text-sm w-full">
              Selected file: {imageFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full ${
            submitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 rounded font-semibold transition`}
        >
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

const FormGroup = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error?: string;
  type?: string;
}) => (
  <div className="mb-4">
    <label className="block mb-1 font-semibold" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default UpdateProductPage;
