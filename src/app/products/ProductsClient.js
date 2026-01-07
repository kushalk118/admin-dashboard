"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import CreateProductForm from "./CreateProductForm";

export default function ProductsClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  async function refreshProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  }

  async function addProduct(product) {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: product.name,
          price: Number(product.price),
          stock: Number(product.stock),
          image_url: product.image_url,
        },
      ])
      .select()
      .single();

    if (!error) {
      setProducts((prev) => [data, ...prev]);
    }

    setLoading(false);
  }

  async function deleteProduct(id) {
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  async function updateProduct(updatedProduct) {
    const { data } = await supabase
      .from("products")
      .update({
        name: updatedProduct.name,
        price: Number(updatedProduct.price),
        stock: Number(updatedProduct.stock),
        image_url: updatedProduct.image_url,
      })
      .eq("id", updatedProduct.id)
      .select()
      .single();

    setProducts((prev) =>
      prev.map((p) => (p.id === data.id ? data : p))
    );
    setEditingProduct(null);
  }

  return (
    <div className="bg-gray-900">
      <h1 className="text-white-400 text-center text-2xl font-bold mb-6">Products</h1>

      <CreateProductForm
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        editingProduct={editingProduct}
      />

      {loading && (
        <p className="text-gray-400 text-center mt-6">Loading...</p>
      )}

      <table className="text-yellow-400 w-full border border-gray-700 mt-8">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Price (₹)</th>
            <th className="p-3 text-center">Stock</th>
            <th className="p-3 text-center">Image</th>
            <th className="p-3 text-center"></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-700"
            >
              <td className="text-white-400 p-3 text-center">{product.name}</td>
              <td className="text-white-400 p-3 text-center">{product.price}</td>
              <td className="text-white-400 p-3 text-center">{product.stock}</td>

                <td className="p-3 text-center">
                {product.image_url && (
                    <a
                    href={product.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded cursor-pointer hover:scale-110 transition"
                    />
                    </a>
                )}
                </td>


              <td className="p-3 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
