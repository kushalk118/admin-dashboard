"use client";

import { useState, useEffect } from "react";
import { z } from "zod";

/* ZOD SCHEMA */
const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Product name must contain only letters"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),

  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),

  image_url: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export default function CreateProductForm({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);


  /* Fill form when editing */
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
    }
  }, [editingProduct]);

  async function handleSubmit(e) {
    e.preventDefault();

    let imageUrl = "";

    if (imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    imageUrl = data.url;
    }

    const productData = {
    name,
    price: Number(price),
    stock: Number(stock),
    image_url: imageUrl,
    };


    /* VALIDATION */
    const result = productSchema.safeParse(productData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...productData,
      });
    } else {
      onAddProduct(productData);
    }

    /* Reset form */
    setName("");
    setPrice("");
    setStock("");
    setImageFile(null);

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded mb-8 max-w-md margin-auto"
    >
      <h2 className="text-white-400 text-xl font-bold mb-4">
        {editingProduct ? "Edit Product" : "Create Product"}
      </h2>

      {/* NAME */}
      <div className="mb-4">
        <label className="text-white-400 block mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* PRICE */}
      <div className="mb-4">
        <label className="text-white-400 block mb-1">Price (₹)</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
        />
        {errors.price && (
          <p className="text-red-400 text-sm mt-1">
            {errors.price}
          </p>
        )}
      </div>

      {/* STOCK */}
      <div className="mb-4">
        <label className="text-white-400 block mb-1">Stock</label>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
        />
        {errors.stock && (
          <p className="text-red-400 text-sm mt-1">
            {errors.stock}
          </p>
        )}
      </div>
      {/* IMAGE */}
      <div className="mb-4">
        <label className="text-white-400 block mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 rounded bg-gray-900 border border-gray-700"
        />
      </div>


      <button
        type="submit"
        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
