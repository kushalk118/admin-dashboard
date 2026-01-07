// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   function handleLogin(e) {
//     e.preventDefault();

//     // DUMMY ADMIN CREDENTIALS
//     if (
//       email === "kushal118@cdc.com" &&
//       password === "kushal118"
//     ) {
//       localStorage.setItem("isAdmin", "true");
//       router.push("/dashboard");
//     } else {
//       setError("Invalid admin credentials");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//       <form
//         onSubmit={handleLogin}
//         className="bg-gray-800 p-8 rounded w-full max-w-sm"
//       >
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Admin Login
//         </h1>

//         {error && (
//           <p className="text-red-400 mb-4 text-center">
//             {error}
//           </p>
//         )}

//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 rounded bg-gray-900 border border-gray-700"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 rounded bg-gray-900 border border-gray-700"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1️⃣ Supabase login
    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // 2️⃣ Fetch role from profiles table
    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      await supabase.auth.signOut();
      setError("Access denied: Admins only");
      setLoading(false);
      return;
    }

    // ✅ Admin verified → redirect
    router.push("/dashboard");
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-400 mb-4 text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

