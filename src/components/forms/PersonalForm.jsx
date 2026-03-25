import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const PersonalForm = () => {
  const { resumeData, setResumeData } = useResume();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setResumeData({
        ...resumeData,
        personal: {
          ...resumeData.personal,
          image: imageUrl,
        },
      });
    }
  };

  // Simple Validation
  const validate = () => {
    let newErrors = {};

    if (!resumeData.personal.name) {
      newErrors.name = "Name is required";
    }
    if (!resumeData.personal.email) {
      newErrors.email = "Email is required";
    }
    if (!resumeData.personal.phone) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid gap-5">

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3">

          <label className="text-sm font-medium text-gray-700">
            Profile Image
          </label>

          {/* Image Preview */}
          <div className="relative group">
            <img
              src={
                resumeData.personal.image ||
                "https://via.placeholder.com/120?text=Upload"
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />

            {/* Overlay on hover */}
            <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
              <span className="text-white text-xs">Change</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>

          {/* Upload Button */}
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-sm">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>

        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            name="name"
            placeholder="Enter your full name"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={resumeData.personal.name || ""}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={resumeData.personal.email || ""}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={resumeData.personal.phone || ""}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone}</span>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            name="address"
            placeholder="Enter your address"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={resumeData.personal.address || ""}
            onChange={handleChange}
          />
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            LinkedIn Profile
          </label>
          <input
            name="linkedin"
            placeholder="https://linkedin.com/in/yourname"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={resumeData.personal.linkedin || ""}
            onChange={handleChange}
          />
        </div>

        {/* GitHub */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            GitHub Profile
          </label>
          <input
            name="github"
            placeholder="https://github.com/yourname"
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={resumeData.personal.github || ""}
            onChange={handleChange}
          />
        </div>

        {/* Validate Button */}
        <button
          onClick={validate}
          className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Details
        </button>

      </div>
    </div>
  );
};

export default PersonalForm;