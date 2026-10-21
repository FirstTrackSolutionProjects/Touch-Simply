// Touch-Simply/src/components/DynamicForm.jsx
import React from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DynamicForm = ({
  config,
  data,
  onChange,
  onAddArrayField,
  onRemoveArrayField,
}) => {
  const renderField = (field, value, sectionId, index = null) => {
    const baseProps = {
      id: `${sectionId}-${field.name}-${index ?? "s"}`,
      value: value ?? "",
      onChange: (e) =>
        onChange(
          sectionId,
          field.name,
          field.type === "checkbox" ? e.target.checked : e.target.value,
          index
        ),
      required: field.required,
      placeholder: field.placeholder || "",
      className:
        "w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm",
    };

    switch (field.type) {
      case "textarea":
        return <textarea {...baseProps} rows={field.rows || 3} />;
      case "select":
        return (
          <select {...baseProps}>
            <option value="">Select...</option>
            {(field.options || []).map((opt) => (
              <option
                key={opt.value ?? opt}
                value={opt.value ?? opt}
              >
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) =>
                onChange(sectionId, field.name, e.target.checked, index)
              }
            />
            {field.label}
          </label>
        );
      default:
        return <input type={field.type} {...baseProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {config.sections.map((section) => (
        <div
          key={section.id}
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-gray-800">
              {section.title}
            </h3>
            {section.isArray && (
              <button
                type="button"
                onClick={() => onAddArrayField(section.id)}
                className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md hover:bg-purple-200 transition"
              >
                <Plus size={14} /> Add
              </button>
            )}
          </div>

          {section.isArray ? (
            <div className="space-y-4">
              <AnimatePresence>
                {(data[section.id] || []).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 border rounded-xl bg-gray-50 relative"
                  >
                    {data[section.id].length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          onRemoveArrayField(section.id, index)
                        }
                        className="absolute top-2 right-2 text-red-500 hover:bg-red-50 rounded p-1"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map((field) => (
                        <div
                          key={field.name}
                          className={
                            field.type === "textarea"
                              ? "md:col-span-2"
                              : ""
                          }
                        >
                          {field.type !== "checkbox" && (
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              {field.label} {field.required && "*"}
                            </label>
                          )}
                          {renderField(
                            field,
                            item[field.name],
                            section.id,
                            index
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div
                  key={field.name}
                  className={
                    field.type === "textarea" ? "md:col-span-2" : ""
                  }
                >
                  {field.type !== "checkbox" && (
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {field.label} {field.required && "*"}
                    </label>
                  )}
                  {renderField(
                    field,
                    data[section.id]?.[field.name],
                    section.id
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;