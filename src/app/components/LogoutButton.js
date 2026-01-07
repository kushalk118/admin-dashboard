"use client";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("isAdmin");
        window.location.href = "/login";
      }}
      className="mt-6 self-start hover:text-red-400"
    >
      Logout
    </button>
  );
}
