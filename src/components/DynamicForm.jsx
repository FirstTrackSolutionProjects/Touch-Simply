import React from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const hasOwn = (value, key) =>
  Object.prototype.hasOwnProperty.call(value, key);

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isFieldDefinition = (value) =>
  isObject(value) &&
  (hasOwn(value, "type") ||
    hasOwn(value, "current_value") ||
    hasOwn(value, "default_value"));

const titleCase = (value) =>
  String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());

const getFieldValue = (field) =>
  hasOwn(field, "current_value") ? field.current_value : field.default_value;

const getNodeTitle = (node, fallback) => {
  if (typeof node?.title === "string" && node.title.trim()) {
    return node.title;
  }
  if (typeof node?.label === "string" && node.label.trim()) {
    return node.label;
  }
  return fallback;
};

const TRANSPARENT_CONTAINERS = new Set(["fields", "items", "subsections"]);
const METADATA_KEYS = new Set(["optional"]);
const HTML_INPUT_TYPES = new Set([
  "date",
  "email",
  "month",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week",
]);

const DynamicForm = ({
  config,
  onChange,
  onAddArrayField,
  onRemoveArrayField,
}) => {
  const renderField = (field, path) => {
    const fieldId = path.map(String).join("-");
    const label = field.title || field.label || field.name;
    const value = getFieldValue(field);
    const required = field.required === true;
    const fieldClassName =
      "w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm";

    if (field.type === "checkbox") {
      return (
        <div key={fieldId}>
          <label
            htmlFor={fieldId}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              id={fieldId}
              type="checkbox"
              checked={Boolean(value)}
              required={required}
              onChange={(event) => onChange(path, event.target.checked)}
            />
            <span>
              {label} {required && "*"}
            </span>
          </label>
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={fieldId}>
          <label
            htmlFor={fieldId}
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            {label} {required && "*"}
          </label>
          <select
            id={fieldId}
            value={value ?? ""}
            required={required}
            className={fieldClassName}
            onChange={(event) => onChange(path, event.target.value)}
          >
            <option value="">Select...</option>
            {(field.options || []).map((option) => {
              const optionValue =
                isObject(option) && hasOwn(option, "value")
                  ? option.value
                  : option;
              const optionLabel =
                isObject(option) && hasOwn(option, "label")
                  ? option.label
                  : optionValue;
              return (
                <option key={String(optionValue)} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    if (field.type === "textarea" || field.type === "list") {
      const textValue =
        field.type === "list" && Array.isArray(value)
          ? value.join("\n")
          : value ?? "";
      return (
        <div
          key={fieldId}
          className={
            field.type === "textarea" || field.type === "list"
              ? "md:col-span-2"
              : ""
          }
        >
          <label
            htmlFor={fieldId}
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            {label} {required && "*"}
          </label>
          <textarea
            id={fieldId}
            value={textValue}
            required={required}
            placeholder={field.placeholder || ""}
            rows={field.rows || 3}
            className={fieldClassName}
            onChange={(event) => {
              const nextValue =
                field.type === "list"
                  ? event.target.value
                      .split(/\r?\n/)
                      .filter((line) => line.trim().length > 0)
                  : event.target.value;
              onChange(path, nextValue);
            }}
          />
        </div>
      );
    }

    const inputType = HTML_INPUT_TYPES.has(field.type) ? field.type : "text";
    return (
      <div key={fieldId}>
        <label
          htmlFor={fieldId}
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          {label} {required && "*"}
        </label>
        <input
          id={fieldId}
          type={inputType}
          value={value ?? ""}
          required={required}
          placeholder={field.placeholder || ""}
          className={fieldClassName}
          onChange={(event) => onChange(path, event.target.value)}
        />
      </div>
    );
  };

  const renderArray = (items, path) => {
    const itemLabel = titleCase(path[path.length - 1] || "item");
    const singularItemLabel = itemLabel.endsWith("s")
      ? itemLabel.slice(0, -1)
      : itemLabel;

    return (
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">
            No entries are defined for this group.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {items.map((item, index) => (
              <motion.div
                key={`${path.map(String).join("-")}-${index}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-4 border rounded-xl bg-gray-50 relative space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">
                    Entry {index + 1}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveArrayField(path, index)}
                      className="flex items-center gap-1 text-xs text-red-500 hover:bg-red-50 rounded p-1"
                      aria-label={`Remove ${singularItemLabel.toLowerCase()} ${index + 1}`}
                    >
                      <X size={14} /> Remove
                    </button>
                  )}
                </div>
                {renderNode(item, [...path, index])}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => onAddArrayField(path)}
            className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md hover:bg-purple-200 transition"
          >
            <Plus size={14} /> Add {singularItemLabel.toLowerCase()}
          </button>
        )}
      </div>
    );
  };

  const renderNode = (node, path) => {
    if (isFieldDefinition(node)) {
      return renderField(node, path);
    }
    if (Array.isArray(node)) {
      return renderArray(node, path);
    }
    if (!isObject(node)) {
      return null;
    }

    const entries = Object.entries(node).filter(
      ([key, value]) =>
        !METADATA_KEYS.has(key) &&
        !(["label", "title"].includes(key) && typeof value === "string")
    );
    const fields = entries.filter(([, value]) => isFieldDefinition(value));
    const children = entries.filter(([, value]) => !isFieldDefinition(value));

    return (
      <div className="space-y-4">
        {fields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(([key, field]) =>
              renderField(field, [...path, key])
            )}
          </div>
        )}
        {children.map(([key, child]) => {
          const childPath = [...path, key];
          if (TRANSPARENT_CONTAINERS.has(key)) {
            return (
              <React.Fragment key={key}>
                {renderNode(child, childPath)}
              </React.Fragment>
            );
          }

          return (
            <div key={key} className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">
                {getNodeTitle(child, titleCase(key))}
              </h4>
              {renderNode(child, childPath)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(config.sections).map(([sectionId, section]) => {
        const title = getNodeTitle(section, titleCase(sectionId));
        return (
          <section
            key={sectionId}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-800">{title}</h3>
              {section.optional && (
                <span className="text-[11px] text-gray-400">Optional</span>
              )}
            </div>
            {renderNode(section, ["sections", sectionId])}
          </section>
        );
      })}
    </div>
  );
};

export default DynamicForm;
