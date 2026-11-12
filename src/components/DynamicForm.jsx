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

const getDateInputKind = (field) => {
  const descriptor = [field.name, field.title, field.label, field.placeholder]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (field.type === "date" || /\b(date of birth|birth date|dob)\b/.test(descriptor)) return "date";
  if (
    field.type === "month" ||
    /\b(start date|end date|completion date|pass date|month\s*\/?\s*year)\b/.test(descriptor)
  ) return "month";
  return null;
};

const toCalendarValue = (value, kind) => {
  if (!value) return "";
  const text = String(value).trim();
  const match = kind === "date"
    ? text.match(/^(\d{4}-\d{2}-\d{2})/)
    : text.match(/^(\d{4}-\d{2})/);
  if (match) return match[1];
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return kind === "date" ? `${year}-${month}-${day}` : `${year}-${month}`;
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
  const sectionHelp = {
    header: "Add your name and the contact details you want employers to use.",
    personal_information: "Add the personal and contact details you want employers to see. You can leave private or optional details blank.",
    personal_details: "Optional: add any details you want, such as date of birth, gender, parents' names, nationality, marital status, birthplace, address, or languages. Leave any field blank and it will be omitted from your CV.",
    education: "For every course or qualification, add the school, college, or university name, your degree/course, start date, completion or pass date, and grade if available.",
    experience: "Add each job or internship, with the organization, your role, dates, and key responsibilities.",
    skills: "Add skills relevant to the role you are applying for.",
    projects: "Add projects with a short description of what you built or achieved.",
  };
  const humanizeSection = (id, title) => {
    if (id.toLowerCase() === "header") return "Personal Information";
    if (id.toLowerCase() === "personal_information") return "Personal Information";
    return title;
  };
  const renderField = (field, path) => {
    const fieldId = path.map(String).join("-");
    const label = field.title || field.label || field.name;
    const value = getFieldValue(field);
    const required = field.required === true;
    const isEmpty = value == null || value === "" || (Array.isArray(value) && value.length === 0);
    const placeholder = isEmpty
      ? field.placeholder || label || "Enter value"
      : "";
    const fieldClassName =
      "w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm placeholder:text-gray-500";

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
            placeholder={placeholder}
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

    const dateInputKind = getDateInputKind(field);
    const isDateRange = /\bdate\s*range\b/i.test(
      [field.name, field.title, field.label, field.placeholder].filter(Boolean).join(" ")
    );
    if (isDateRange) {
      const [rawStart = "", rawEnd = ""] = String(value ?? "").split(/\s*(?:--|–|—|\bto\b)\s*/i);
      const start = toCalendarValue(rawStart, "month");
      const end = toCalendarValue(rawEnd, "month");
      const updateRange = (nextStart, nextEnd) => {
        const range = nextStart || nextEnd ? `${nextStart} -- ${nextEnd}` : "";
        onChange(path, range);
      };
      return (
        <div key={fieldId} className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {label} {required && "*"}
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-xs text-gray-500">
              Start month
              <input
                type="month"
                aria-label={`${label} start month`}
                value={start}
                required={required}
                className={`${fieldClassName} mt-1`}
                onChange={(event) => updateRange(event.target.value, end)}
              />
            </label>
            <label className="block text-xs text-gray-500">
              End month
              <input
                type="month"
                aria-label={`${label} end month`}
                value={end}
                required={required}
                className={`${fieldClassName} mt-1`}
                onChange={(event) => updateRange(start, event.target.value)}
              />
            </label>
          </div>
        </div>
      );
    }

    const inputType = dateInputKind || (HTML_INPUT_TYPES.has(field.type) ? field.type : "text");
    const inputValue = dateInputKind ? toCalendarValue(value, dateInputKind) : (value ?? "");
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
          value={inputValue}
          required={required}
          placeholder={placeholder}
          className={fieldClassName}
          onChange={(event) => onChange(path, event.target.value)}
        />
        {dateInputKind && (
          <p className="mt-1 text-xs text-gray-500">Select {dateInputKind === "date" ? "a date" : "a month and year"} from the calendar.</p>
        )}
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
        const title = humanizeSection(sectionId, getNodeTitle(section, titleCase(sectionId)));
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
            {sectionHelp[sectionId.toLowerCase()] && (
              <p className="-mt-2 mb-4 text-xs leading-5 text-gray-500">
                {sectionHelp[sectionId.toLowerCase()]}
              </p>
            )}
            {renderNode(section, ["sections", sectionId])}
          </section>
        );
      })}
    </div>
  );
};

export default DynamicForm;
