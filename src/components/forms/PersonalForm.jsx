import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { generateSummary } from "../../utils/aiMock";

const PersonalForm = ({ goNext }) => {
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

 const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        image: reader.result,
      },
    }));
  };

  reader.readAsDataURL(file);
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
      setTimeout(() => {
        setSaved(false);
        goNext();
      }, 2000);
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
            {resumeData.personal?.image ? (
            <img
              src={resumeData.personal?.image}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center text-gray-500 text-sm border-4 border-white shadow-md">
                Upload
              </div>
            )}

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

        {/* DOB (NEW) */}
        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          value={resumeData.personal?.dob}
          onChange={handleChange}
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

        {/* Address Section */}
        <div className="grid gap-3 md:grid-cols-2">
          

          <InputField
            label="Landmark"
            name="landmark"
            placeholder="123 Main St"
            value={resumeData.personal?.landmark}
            onChange={handleChange}
          />
          <InputField
            label="City"
            name="city"
            placeholder="New York"
            value={resumeData.personal?.city}
            onChange={handleChange}
          />
          <InputField
            label="State"
            name="state"
            value={resumeData.personal?.state}
            onChange={handleChange}
          />
          <InputField
            label="Pincode"
            name="pincode"
            value={resumeData.personal?.pincode}
            onChange={handleChange}
          />
        </div>


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

        {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4"></div>

        {/* Save */}
        <button
          onClick={validate}
          className={`mt-4 py-2 rounded-lg transition text-white 
            ${saved ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {saved ? "Saved ✅" : "Save Details"}
        </button>

        {/* Next */}
        <button
          onClick={() => {
          let newErrors = {};

          if (!resumeData.personal?.name) newErrors.name = "Name is required";
          if (!resumeData.personal?.email) newErrors.email = "Email is required";
          if (!resumeData.personal?.phone) newErrors.phone = "Phone is required";

          setErrors(newErrors);

          if (Object.keys(newErrors).length === 0) {
            setSaved(true);

            goNext && goNext();
          }
        }}
          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition"
        >
          Next
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