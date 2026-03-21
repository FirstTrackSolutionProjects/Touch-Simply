// src/components/Textarea.jsx
import React from "react";

const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      {...props}
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 ${className}`}
    ></textarea>
  );
};

export default Textarea;