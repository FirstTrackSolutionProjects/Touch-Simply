import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PortfolioForm = ({ data, setData }) => {
  const [removingIndex, setRemovingIndex] = useState(null);

  education: [
  {
    degree: "",
    college: "",
    startYear: "",
    endYear: "",
    isPresent: false,
  },
]

  useEffect(() => {
    if (!data.projects || data.projects.length === 0) {
      setData({
        ...data,
        projects: [{ title: "", desc: "", github: "", image: "" }],
      });
    }
  }, [data.projects]);

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...data.projects];
    updated[index][field] = value;
    setData({ ...data, projects: updated });
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
    setData({
      ...data,
      projects: [
        ...data.projects,
        { title: "", desc: "", github: "", image: "" },
      ],
    });
  };

  const removeProject = (index) => {
    if (data.projects.length === 1) return;
    setRemovingIndex(index);

    setTimeout(() => {
      const updated = data.projects.filter((_, i) => i !== index);
      setData({ ...data, projects: updated });
      setRemovingIndex(null);
    }, 250);
  };
  // INIT EDUCATION
useEffect(() => {
  if (!data.education || data.education.length === 0) {
    setData({
      ...data,
      education: [{ degree: "", college: "", startYear: "", endYear: "", isPresent: false}],
    });
  }
}, [data.education]);

// CHANGE
const handleEducationChange = (index, field, value) => {
  const updated = [...data.education];
  updated[index][field] = value;
  setData({ ...data, education: updated });
};

// ADD
const addEducation = () => {
  setData({
    ...data,
    education: [
      ...data.education,
      { degree: "", college: "", year: "", desc: "" },
    ],
  });
};

// REMOVE
const removeEducation = (index) => {
  if (data.education.length === 1) return;

  const updated = data.education.filter((_, i) => i !== index);
  setData({ ...data, education: updated });
};

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-900/20 to-black px-3 sm:px-6 py-6">

    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

      {/* 👤 PERSONAL INFO */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">

        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          👤 Personal Info
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

          <input placeholder="Full Name" value={data.name || ""} onChange={(e)=>handleChange("name",e.target.value)}
            className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>

          <input placeholder="Email" value={data.email || ""} onChange={(e)=>handleChange("email",e.target.value)}
               className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>

          <input placeholder="Phone" value={data.phone || ""} onChange={(e)=>handleChange("phone",e.target.value)}
            className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>

          <input type="date" value={data.dob || ""} onChange={(e)=>handleChange("dob",e.target.value)}
            className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

          <input placeholder="City" value={data.city || ""} onChange={(e)=>handleChange("city",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>
          <input placeholder="State" value={data.state || ""} onChange={(e)=>handleChange("state",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>
          <input placeholder="Pincode" value={data.pincode || ""} onChange={(e)=>handleChange("pincode",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>

        </div>

      </div>

        {/* 🎓 EDUCATION */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">

        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          🎓 Education
        </h3>

        <AnimatePresence>
          {data.education?.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-4"
            >

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

                {/* DEGREE */}
                <input
                  placeholder="Degree (B.Tech, MBA...)"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(i, "degree", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
                />

                {/* COLLEGE */}
                <input
                  placeholder="College / University"
                  value={edu.college}
                  onChange={(e) =>
                    handleEducationChange(i, "college", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
                />

                {/* START YEAR */}
                <div className="font-semibold">Start Year</div>
                <input
                  type="month"
                  value={edu.startYear}
                  onChange={(e) =>
                    handleEducationChange(i, "startYear", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
                />

                {/* END YEAR */}
                <div className="font-semibold">End Year</div>
                <input
                  type="month"
                  placeholder="End Year"
                  value={edu.endYear}
                  disabled={edu.isPresent}
                  onChange={(e) =>
                    handleEducationChange(i, "endYear", e.target.value)
                  }
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg outline-none ${
                    edu.isPresent
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-gray-50 focus:ring-2 focus:ring-purple-500"
                  }`}
                />

              </div>

              {/* PRESENT CHECKBOX */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={edu.isPresent}
                  onChange={(e) =>
                    handleEducationChange(i, "isPresent", e.target.checked)
                  }
                />
                <label className="text-sm text-gray-600">
                  Currently Studying
                </label>
              </div>

             

            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={addEducation}
          className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-medium"
        >
          <Plus size={12} />
          Add Education
        </button>

      </div>

      {/* 🌐 SOCIAL */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">

        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          🌐 Social Links
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

          <input placeholder="GitHub URL" value={data.github || ""} onChange={(e)=>handleChange("github",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>
          <input placeholder="LinkedIn URL" value={data.linkedin || ""} onChange={(e)=>handleChange("linkedin",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>
          <input placeholder="Instagram URL" value={data.instagram || ""} onChange={(e)=>handleChange("instagram",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>
          <input placeholder="Facebook URL" value={data.facebook || ""} onChange={(e)=>handleChange("facebook",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>
          <input placeholder="Twitter (X)" value={data.twitter || ""} onChange={(e)=>handleChange("twitter",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>
          <input placeholder="YouTube URL" value={data.youtube || ""} onChange={(e)=>handleChange("youtube",e.target.value)} className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>

        </div>

      </div>

      {/* 🚀 PROJECTS */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-4">

        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          🚀 Projects
        </h3>

        <AnimatePresence>
          {data.projects.map((proj, i) => (
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

              {/* MOBILE = stack, DESKTOP = split */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">

                <div className="space-y-3">

                  <input placeholder="Project Title" value={proj.title}
                    onChange={(e)=>handleProjectChange(i,"title",e.target.value)}
                    className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition"/>

                  <textarea placeholder="Description" value={proj.desc}
                    onChange={(e)=>handleProjectChange(i,"desc",e.target.value)}
                    className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition min-h-[100px]"/>

                </div>

                <div>
                  <label className="cursor-pointer block">
                    <div className="w-full h-[140px] sm:h-[160px] rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden hover:border-purple-500 transition">

                      {proj.image ? (
                        <img src={proj.image} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="text-center text-gray-400">
                          <p className="text-sm">Upload Image</p>
                          <p className="text-xs">PNG, JPG</p>
                        </div>
                      )}

                    </div>

                    <input type="file" className="hidden"
                      onChange={(e)=>handleImageUpload(i,e.target.files[0])}/>
                  </label>
                </div>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={addProject}
          className="w-full flex items-center justify-center  bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-medium active:scale-95 sm:hover:scale-[1.02] transition"
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