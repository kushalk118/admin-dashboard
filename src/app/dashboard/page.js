"use client";

import AuthGuard from "../components/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Dashboard
        </h1>
        <p>Welcome to the admin dashboard.</p>
      </div>
    </AuthGuard>
  );
}
