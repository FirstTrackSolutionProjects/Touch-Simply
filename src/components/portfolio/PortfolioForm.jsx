import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PortfolioForm = ({ data, setData }) => {
  const [removingIndex, setRemovingIndex] = useState(null);

  // ✅ INIT PROJECTS
  useEffect(() => {
    if (!data.projects || data.projects.length === 0) {
      setData((prev) => ({
        ...prev,
        projects: [{ title: "", desc: "", github: "", image: "" }],
      }));
    }
  }, [data.projects, setData]);

  // ✅ INIT EDUCATION
  useEffect(() => {
    if (!data.education || data.education.length === 0) {
      setData((prev) => ({
        ...prev,
        education: [
          {
            degree: "",
            college: "",
            startYear: "",
            endYear: "",
            isPresent: false,
          },
        ],
      }));
    }
  }, [data.education, setData]);

  // ✅ INIT EXPERIENCE
useEffect(() => {
  if (!data.experience || data.experience.length === 0) {
    setData((prev) => ({
      ...prev,
      experience: [
        {
          role: "",
          company: "",
          start: "",
          end: "",
          isWorking: false,
        },
      ],
    }));
  }
}, [data.experience, setData]);

// ✅ INIT SKILLS + LANGUAGES
useEffect(() => {
  if (!data.skills) {
    setData((prev) => ({ ...prev, skills: "" }));
  }
  if (!data.languages) {
    setData((prev) => ({ ...prev, languages: "" }));
  }
}, [data.skills, data.languages, setData]);

  // ---------------- HANDLERS ----------------

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // PROJECT
  const handleProjectChange = (index, field, value) => {
    const updated = [...(data.projects || [])];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, projects: updated }));
  };

  const handleImageUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleProjectChange(index, "image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        { title: "", desc: "", github: "", image: "" },
      ],
    }));
  };

  const removeProject = (index) => {
    if ((data.projects || []).length === 1) return;

    setRemovingIndex(index);

    setTimeout(() => {
      const updated = data.projects.filter((_, i) => i !== index);
      setData((prev) => ({ ...prev, projects: updated }));
      setRemovingIndex(null);
    }, 250);
  };

  // EDUCATION
  const handleEducationChange = (index, field, value) => {
    const updated = [...(data.education || [])];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, education: updated }));
  };

  // EXPERIENCE
const handleExperienceChange = (index, field, value) => {
  const updated = [...(data.experience || [])];
  updated[index][field] = value;
  setData((prev) => ({ ...prev, experience: updated }));
};

const addExperience = () => {
  setData((prev) => ({
    ...prev,
    experience: [
      ...(prev.experience || []),
      { role: "", company: "", start: "", end: "", isWorking: false },
    ],
  }));
};

const removeExperience = (index) => {
  if ((data.experience || []).length === 1) return;

  const updated = data.experience.filter((_, i) => i !== index);
  setData((prev) => ({ ...prev, experience: updated }));
};

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          degree: "",
          college: "",
          startYear: "",
          endYear: "",
          isPresent: false,
        },
      ],
    }));
  };

  // PROFILE IMAGE
const handleProfileImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Create a FileReader to read the file as a Data URL
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the profileImage in your state to the Data URL
      setData((prev) => ({
        ...prev,
        profileImage: reader.result, // reader.result will be the base64 Data URL
      }));
    };

    reader.readAsDataURL(file); // Read the file as a Data URL
  };

  const removeEducation = (index) => {
    if ((data.education || []).length === 1) return;

    const updated = data.education.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, education: updated }));
  };

  // ---------------- UI (UNCHANGED) ----------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-900/20 to-black px-3 sm:px-6 py-6">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

        {/* 👤 PERSONAL INFO */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            👤 Personal Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

             {/* Profile Image */}
        <div className="sm:col-span-2 flex flex-col items-center gap-3">
          <label className="text-sm font-medium text-gray-700">
            Profile Image
          </label>

          <div className="relative group">
            {data.profileImage ? (
              <img
                src={data.profileImage}
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
                onChange={handleProfileImage}
                className="hidden"
              />
            </label>
          </div>

          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-sm">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImage}
              className="hidden"
            />
          </label>
        </div>


            <input placeholder="Full Name" value={data.name || ""} onChange={(e)=>handleChange("name",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"/>

            <input placeholder="Email" value={data.email || ""} onChange={(e)=>handleChange("email",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"/>

            <input placeholder="Phone" value={data.phone || ""} onChange={(e)=>handleChange("phone",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"/>

            <div className="w-full">
              <input
                type="date"
                name="dob"
                value={data.dob || ""}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="w-full h-[52px] px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <input placeholder="address" value={data.address || ""} onChange={(e)=>handleChange("address",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none sm:col-span-2"/>

            <input placeholder="city" value={data.city || ""} onChange={(e)=>handleChange("city",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"/>

            <input placeholder="state" value={data.state || ""} onChange={(e)=>handleChange("state",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"/>

            <input placeholder="country" value={data.country || ""} onChange={(e)=>handleChange("country",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"/>

            <input placeholder="pincode" value={data.pincode || ""} onChange={(e)=>handleChange("pincode",e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"/>
          </div>
        </div>

        {/* 🎓 EDUCATION */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            🎓 Education
          </h3>

          <AnimatePresence>
            {data.education?.map((edu, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-4">

                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Education {i + 1}
                  </h4>

                  {i !== 0 && (
                    <button onClick={() => removeEducation(i)}>
                      <X className="text-gray-400 hover:text-red-500" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="Degree" value={edu.degree}
                    onChange={(e)=>handleEducationChange(i,"degree",e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"/>

                  <input placeholder="College" value={edu.college}
                    onChange={(e)=>handleEducationChange(i,"college",e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg bg-gray-50"/>

                 <input
                    type="month"
                    value={edu.startYear}
                    onChange={(e) =>
                      handleEducationChange(i, "startYear", e.target.value)
                    }
                    className="w-full h-[52px] px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />

                  <input
                    type="month"
                    value={edu.endYear}
                    disabled={edu.isPresent}
                    onChange={(e) =>
                      handleEducationChange(i, "endYear", e.target.value)
                    }
                    className="w-full h-[52px] px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={edu.isPresent}
                    onChange={(e)=>handleEducationChange(i,"isPresent",e.target.checked)}/>
                  <label className="text-sm">Currently Studying</label>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          <button onClick={addEducation}
            className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg">
            <Plus size={12} />
            Add Education
          </button>
        </div>

        {/* 🌐 SOCIAL LINKS */}
        <div className="sm:col-span-2 mt-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Social Links
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <input
              placeholder="GitHub URL"
              value={data.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              placeholder="LinkedIn URL"
              value={data.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              placeholder="Instagram URL"
              value={data.instagram || ""}
              onChange={(e) => handleChange("instagram", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              placeholder="Facebook URL"
              value={data.facebook || ""}
              onChange={(e) => handleChange("facebook", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              placeholder="Twitter / X URL"
              value={data.twitter || ""}
              onChange={(e) => handleChange("twitter", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              placeholder="YouTube URL"
              value={data.youtube || ""}
              onChange={(e) => handleChange("youtube", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

          </div>
        </div>

        {/* 💼 EXPERIENCE */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">

        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          💼 Experience
        </h3>

        <AnimatePresence>
          {data.experience?.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-4">

              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-gray-700">
                  Experience {i + 1}
                </h4>

                {i !== 0 && (
                  <button onClick={() => removeExperience(i)}>
                    <X className="text-gray-400 hover:text-red-500" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Role"
                  value={exp.role}
                  onChange={(e)=>handleExperienceChange(i,"role",e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50"/>

                <input placeholder="Company"
                  value={exp.company}
                  onChange={(e)=>handleExperienceChange(i,"company",e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50"/>

               <input
                  type="month"
                  value={exp.start}
                  onChange={(e)=>handleExperienceChange(i,"start",e.target.value)}
                  className="w-full h-[52px] px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />

                <input
                  type="month"
                  value={exp.end}
                  disabled={exp.isWorking}
                  onChange={(e)=>handleExperienceChange(i,"end",e.target.value)}
                  className="w-full h-[52px] px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox"
                  checked={exp.isWorking}
                  onChange={(e)=>handleExperienceChange(i,"isWorking",e.target.checked)}
                />
                <label className="text-sm">Currently Working</label>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>

        <button onClick={addExperience}
          className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg">
          <Plus size={12} />
          Add Experience
        </button>

      </div>

        {/*  SKILLS &  LANGUAGES */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">

          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            Skills &  Languages
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              placeholder="Skills (React, Node, UI/UX...)"
              value={data.skills || ""}
              onChange={(e)=>handleChange("skills", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              placeholder="Languages (English, Hindi...)"
              value={data.languages || ""}
              onChange={(e)=>handleChange("languages", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            />

          </div>

        </div>

       {/* 🚀 PROJECTS */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">

          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            🚀 Projects
          </h3>

          <AnimatePresence>
            {data.projects?.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-4 ${
                  removingIndex === i ? "opacity-0 scale-95" : ""
                }`}
              >

                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Project {i + 1}
                  </h4>

                  {i !== 0 && (
                    <button onClick={() => removeProject(i)}>
                      <X className="text-gray-400 hover:text-red-500" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">

                  <div className="space-y-3">
                    <input
                      placeholder="Project Title"
                      value={proj.title}
                      onChange={(e)=>handleProjectChange(i,"title",e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    <textarea
                      placeholder="Description"
                      value={proj.desc}
                      onChange={(e)=>handleProjectChange(i,"desc",e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="cursor-pointer block">
                      <div className="w-full h-[140px] sm:h-[160px] rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden hover:border-purple-500 transition">

                        {proj.image ? (
                          <img src={proj.image}
                           alt="Project Image"
                          className="w-full h-full object-cover"/>
                        ) : (
                          <div className="text-center text-gray-400">
                            <p className="text-sm">Upload Image</p>
                            <p className="text-xs">PNG, JPG</p>
                          </div>
                        )}

                      </div>

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e)=>handleImageUpload(i,e.target.files[0])}
                      />
                    </label>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          <button
            onClick={addProject}
            className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-medium"
          >
            <Plus size={12} />
            Add New Project
          </button>

        </div>

      </div>
    </div>
  );
};

export default PortfolioForm;