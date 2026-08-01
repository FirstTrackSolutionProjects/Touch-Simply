import React from "react";
import { FaUser } from "react-icons/fa";

const UserAvatar = ({ user, size = "md", className = "" }) => {
  // Get user data from props
  const { name = "", picture = null } = user || {};

  // Get initials from name
  const getInitials = () => {
    if (!name) return "U";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Size classes
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // If picture exists, show image
  if (picture) {
    return (
      <img
        src={picture}
        alt={name || "User"}
        className={`rounded-full object-cover border-2 border-white/50 ${sizeClass} ${className}`}
        onError={(e) => {
          // If image fails to load, show initials instead
          e.target.style.display = "none";
          const parent = e.target.parentElement;
          const fallback = parent.querySelector(".avatar-fallback");
          if (fallback) {
            fallback.style.display = "flex";
          }
        }}
      />
    );
  }

  // Fallback: Show initials or default icon
  return (
    <div
      className={`rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold ${sizeClass} ${className} avatar-fallback`}
    >
      {name ? getInitials() : <FaUser size={size === "xs" ? 10 : 14} />}
    </div>
  );
};

export default UserAvatar;