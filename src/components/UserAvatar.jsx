import React from "react";
import { FaUser } from "react-icons/fa";

const UserAvatar = ({ user, size = "md", className = "" }) => {
  // Support different user data structures:
  // 1. From `checkAuth`: `user` object has first_name, last_name, avatar_url
  // 2. From `login` direct response: `user` object has `name`, `picture`
  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : user?.name || "User";
  const picture = user?.avatar_url || user?.picture;

  const getInitials = () => {
    if (!displayName) return "U";
    const nameParts = displayName.trim().split(/\s+/);
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  if (picture) {
    return (
      <img
        src={picture}
        alt={displayName}
        className={`rounded-full object-cover border-2 border-white/50 ${sizeClass} ${className}`}
        onError={(e) => {
          e.target.style.display = "none";
          const parent = e.target.parentElement;
          const fallback = parent.querySelector(".avatar-fallback");
          if (fallback) fallback.style.display = "flex";
        }}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-semibold ${sizeClass} ${className} avatar-fallback`}
    >
      {displayName ? getInitials() : <FaUser size={size === "xs" ? 10 : 14} />}
    </div>
  );
};

export default UserAvatar;