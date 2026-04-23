import { useState } from "react";
import { useResume } from "../context/ResumeContext";

const EditField = ({
  section,
  field,
  index = null,
  className = "",
  placeholder = "",
  type = "text",
}) => {
  const { resumeData, setResumeData } = useResume();
  const [editing, setEditing] = useState(false);

  let value = "";

  if (index !== null) {
    value = resumeData?.[section]?.[index]?.[field] || "";
  } else {
    value = resumeData?.[section]?.[field] || "";
  }

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (index !== null) {
      const updated = [...resumeData[section]];
      updated[index][field] = newValue;

      setResumeData({ ...resumeData, [section]: updated });
    } else {
      setResumeData({
        ...resumeData,
        [section]: {
          ...resumeData[section],
          [field]: newValue,
        },
      });
    }
  };

  // 🔥 Handle keyboard
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && type !== "textarea") {
      setEditing(false);
    }
    if (e.key === "Escape") {
      setEditing(false);
    }
  };

  // 🔥 TEXTAREA
  if (editing && type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={() => setEditing(false)}
        autoFocus
        rows={3}
        className="w-full border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-yellow-50 px-2 py-1 rounded-md text-sm transition"
      />
    );
  }

  // 🔥 INPUT
  if (editing) {
    return (
      <input
        value={value}
        onChange={handleChange}
        onBlur={() => setEditing(false)}
        onKeyDown={handleKeyDown}
        autoFocus
        className="border-b border-purple-400 focus:border-purple-600 outline-none bg-yellow-50 px-1 py-[2px] text-sm transition"
      />
    );
  }

  // 🔥 DISPLAY MODE
  return (
    <span
      onClick={() => setEditing(true)}
      className={`
        cursor-pointer 
        px-1 rounded 
        transition-all duration-200
        hover:bg-yellow-100 
        hover:shadow-sm
        ${!value ? "text-gray-400 italic" : ""}
        ${className}
      `}
    >
      {value || placeholder || "Click to edit"}
    </span>
  );
};

export default EditField;