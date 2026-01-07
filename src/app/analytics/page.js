import { createClient } from "@supabase/supabase-js";
import AnalyticsClient from "./AnalyticsClient";
import AuthGuard from "../components/AuthGuard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function AnalyticsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("name, price, stock");

  if (error) {
    console.error("Server analytics fetch error:", error);
  }

  return (
    <AuthGuard>
      <AnalyticsClient products={products || []} />
    </AuthGuard>
  );
}
