"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function AnalyticsClient({ products }) {
  // Convert DB data → chart-friendly data
  const productData = products.map((product) => ({
    name: product.name,
    price: Number(product.price),
    stock: Number(product.stock),
  }));
  const LOW_STOCK_THRESHOLD = 10;
  const lowStockProducts = products.filter(
    (product) => Number(product.stock) < LOW_STOCK_THRESHOLD
  );

  const lowStockCount = lowStockProducts.length;




  // KPIs (optional but very good for marks)
  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stock),
    0
  );
  const inventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price) * Number(p.stock),
    0
  );

  return (
    <div className="bg-gray-900">
      <h1 className="text-center text-white-400 text-2xl font-bold mb-8">Analytics</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 p-6 rounded text-center">
          <p className="text-yellow-400">Total Products</p>
          <p className="text-white-400 text-3xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded text-center">
          <p className="text-yellow-400">Total Stock</p>
          <p className="text-white-400 text-3xl font-bold">{totalStock}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded text-center">
          <p className="text-yellow-400">Inventory Value</p>
          <p className="text-white-400 text-3xl font-bold">
            ₹{inventoryValue}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded text-center">
        <h3 className="text-lg font-semibold text-red-400">
            Low Stock Items
        </h3>

        <p className="text-white-400 text-4xl font-bold mt-2">
            {lowStockCount}
        </p>

        <p className="text-sm text-red-400 mt-2">
            Stock below {LOW_STOCK_THRESHOLD}
        </p>
        </div>
      </div>

      {/* STOCK CHART */}
      <div className="text-white-400 bg-gray-800 p-6 rounded mb-10">
        <h2 className="text-white-400 text-lg font-semibold mb-4">
          Stock Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PRICE CHART */}
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-white-400 text-lg font-semibold mb-4">
          Price Analysis
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#38bdf8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
        {/* LOW STOCK PRODUCTS TABLE */}
        <div className="text-yellow-400 bg-gray-800 p-6 rounded mt-10">
        <h2 className="text-lg font-semibold mb-4 text-red-400">
            ⚠️ Low Stock Products
        </h2>

        {lowStockProducts.length === 0 ? (
            <p className="text-gray-400">
            All products are sufficiently stocked 🎉
            </p>
        ) : (
            <table className="w-full border border-gray-700">
            <thead className="bg-gray-900">
                <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Stock</th>
                <th className="p-3 text-center">Status</th>
                </tr>
            </thead>

            <tbody>
                {lowStockProducts.map((product) => (
                <tr
                    key={product.id}
                    className="border-t border-gray-700"
                >
                    <td className="p-3">{product.name}</td>

                    <td className="p-3 text-center text-red-400 font-bold">
                    {product.stock}
                    </td>

                    <td className="p-3 text-center">
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-sm">
                        Low Stock
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>

    </div>
    
  );
}
