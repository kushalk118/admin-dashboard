import { createClient } from "@supabase/supabase-js";
import ProductsClient from "./ProductsClient";
import AuthGuard from "../components/AuthGuard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Server fetch error:", error);
  }

  return (
    <AuthGuard>
      <ProductsClient initialProducts={products || []} />
    </AuthGuard>
  );
}
