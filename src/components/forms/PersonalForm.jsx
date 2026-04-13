import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { generateSummary } from "../../utils/aiMock";

const PersonalForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [e.target.name]: e.target.value,
      },
    });
  };

  // ✅ Image Upload
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

  // ✅ AI Summary Generator
  const handleGenerateSummary = () => {
    setLoadingAI(true);

    setTimeout(() => {
      const text = generateSummary({
        role: resumeData.personal?.role,
        experience: resumeData.personal?.experience,
        skills: resumeData.skills,
      });

      setResumeData({
        ...resumeData,
        personal: {
          ...resumeData.personal,
          summary: text,
        },
      });

      setLoadingAI(false);
    }, 800);
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!resumeData.personal?.name) newErrors.name = "Name is required";
    if (!resumeData.personal?.email) newErrors.email = "Email is required";
    if (!resumeData.personal?.phone) newErrors.phone = "Phone is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
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

          <div className="relative group">
            <img
              src={
                resumeData.personal?.image ||
                "https://via.placeholder.com/120?text=Upload"
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />

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
        <InputField
          label="Full Name *"
          name="name"
          value={resumeData.personal?.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Email */}
        <InputField
          label="Email Address *"
          name="email"
          type="email"
          value={resumeData.personal?.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Phone */}
        <InputField
          label="Phone Number *"
          name="phone"
          type="tel"
          value={resumeData.personal?.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        {/* Role (NEW) */}
        <InputField
          label="Your Role"
          name="role"
          placeholder="Frontend Developer"
          value={resumeData.personal?.role}
          onChange={handleChange}
        />

        {/* Experience (NEW) */}
        <InputField
          label="Experience (Years)"
          name="experience"
          placeholder="2"
          value={resumeData.personal?.experience}
          onChange={handleChange}
        />

        {/* Summary + AI */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Professional Summary
          </label>

          <textarea
            name="summary"
            rows="4"
            placeholder="Write your summary..."
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={resumeData.personal?.summary || ""}
            onChange={handleChange}
          />

          <button
            onClick={handleGenerateSummary}
            className="mt-2 bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition"
          >
            {loadingAI ? "Generating..." : "✨ Generate Summary (AI)"}
          </button>
        </div>

        {/* LinkedIn */}
        <InputField
          label="LinkedIn Profile"
          name="linkedin"
          value={resumeData.personal?.linkedin}
          onChange={handleChange}
        />

        {/* GitHub */}
        <InputField
          label="GitHub Profile"
          name="github"
          value={resumeData.personal?.github}
          onChange={handleChange}
        />

        {/* Save */}
        <button
          onClick={validate}
          className={`mt-4 py-2 rounded-lg transition text-white 
            ${saved ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {saved ? "Saved ✅" : "Save Details"}
        </button>

      </div>
    </div>
  );
};

export default PersonalForm;



// 🔥 Reusable Input Component (VERY CLEAN)
const InputField = ({ label, name, value, onChange, error, ...rest }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      name={name}
      value={value || ""}
      onChange={onChange}
      className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      {...rest}
    />
    {error && <span className="text-sm text-red-500">{error}</span>}
  </div>
);