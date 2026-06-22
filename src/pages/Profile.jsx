import React, { useState } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  Briefcase,
  Edit3,
  Save,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [loading, setLoading] = useState(false);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });

    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const updatedUser = {
        ...user,
        ...data.user,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      setEditMode(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">

        <div className="h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

        <div className="px-8 pb-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-14 gap-6 mb-8">

            <div className="flex items-end gap-5">
              <div className="w-28 h-28 rounded-full border-4 border-[#0f172a] bg-slate-800 flex items-center justify-center text-3xl font-bold">
                {initials}
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {user.name}
                </h1>

                <p className="text-gray-400">
                  {user.role || "User"}
                </p>
              </div>
            </div>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 transition"
              >
                <Edit3 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 disabled:opacity-50"
                >
                  <Save size={18} />
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white/5 rounded-2xl p-5">
              <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                <UserIcon size={16} />
                Full Name
              </label>

              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 rounded-xl p-3 outline-none focus:border-cyan-500"
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            <div className="bg-white/5 rounded-2xl p-5">
              <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                <Mail size={16} />
                Email
              </label>

              <p>{user.email}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-5">
              <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                <Phone size={16} />
                Phone Number
              </label>

              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 rounded-xl p-3 outline-none focus:border-cyan-500"
                />
              ) : (
                <p>{user.phone || "Not provided"}</p>
              )}
            </div>

            <div className="bg-white/5 rounded-2xl p-5">
              <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                <Briefcase size={16} />
                Role
              </label>

              <p>{user.role || "User"}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;