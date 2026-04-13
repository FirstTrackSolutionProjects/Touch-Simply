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

  // 🔥 TEXTAREA support
  if (editing && type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={() => setEditing(false)}
        autoFocus
        className="w-full border outline-none bg-yellow-50 p-1 rounded"
      />
    );
  }

  return editing ? (
    <input
      value={value}
      onChange={handleChange}
      onBlur={() => setEditing(false)}
      autoFocus
      className="border-b outline-none bg-yellow-50 px-1"
    />
  ) : (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-pointer hover:bg-yellow-100 px-1 rounded ${className}`}
    >
      {value || placeholder || "Click to edit"}
    </span>
  );
};

export default EditField;