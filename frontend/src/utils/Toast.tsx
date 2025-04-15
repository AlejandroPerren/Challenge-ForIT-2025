import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type = "success" }) => {
  const color =
    type === "success"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";

  return (
    <div
      className={`fixed top-5 right-5 border px-4 py-2 rounded shadow-md ${color} animate-fade-in-out`}
    >
      {message}
    </div>
  );
};

export default Toast;
