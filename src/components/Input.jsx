

// src/components/Input.jsx
import React from "react";

const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 ${className}`}
    />
  );
};

export default Input;