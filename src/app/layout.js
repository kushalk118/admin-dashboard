import "./globals.css";
import Link from "next/link";
import LogoutButton from "./components/LogoutButton";
import Providers from "./providers";

export const metadata = {
  title: "Admin Dashboard",
  description: "E-commerce Product Management Dashboard",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-500 text-gray-100">

        <Providers>
          <div className="flex min-h-screen">

            {/* SIDEBAR */}
            <aside className="w-64 bg-gray-800 px-6 py-8 border-r border-slate-700">
              <h2 className="nav-links text-2xl font-bold mb-10">
                Admin Panel
              </h2>

              <nav className="flex flex-col gap-4">
                <Link href="/dashboard" className=" nav-links">
                  Dashboard
                </Link>
                <Link href="/products" className=" nav-links">
                  Products
                </Link>
                <Link href="/analytics" className="nav-links">
                  Analytics
                </Link>
                
                
    
                
               
              </nav>

              <div className=" text-red-400 mt-auto pt-10">
                <LogoutButton />
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1">
              {children}
            </main>

          </div>
        </Providers>
      </body>
    </html>
  );
}