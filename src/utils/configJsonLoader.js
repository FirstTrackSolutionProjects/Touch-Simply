// Touch-Simply/src/utils/configJsonLoader.js

/**
 * Backend promise: create response includes `configJsonUrl` (pre-signed S3 URL).
 * Frontend fetches it, validates against expected shape, returns normalized config.
 *
 * Expected shape:
 * {
 *   sections: [
 *     {
 *       id: string,
 *       title: string,
 *       isArray?: boolean,
 *       fields: [
 *         { name, label, type, required?, rows?, options?, placeholder? }
 *       ]
 *     }
 *   ]
 * }
 */

const VALID_FIELD_TYPES = [
  "text",
  "textarea",
  "email",
  "url",
  "tel",
  "date",
  "month",
  "number",
  "select",
  "checkbox",
  "file",
];

const emptyRow = (sec) => {
  const row = {};
  for (const f of sec.fields) {
    row[f.name] = f.type === "checkbox" ? false : "";
  }
  return row;
};

const normalizeConfig = (raw) => {
  if (!raw || !Array.isArray(raw.sections)) {
    throw new Error("Invalid config: missing sections[]");
  }

  const sections = raw.sections.map((sec) => {
    if (!sec.id || !sec.title) {
      throw new Error("Each section requires id + title");
    }
    if (!Array.isArray(sec.fields)) {
      throw new Error(`Section "${sec.id}" missing fields[]`);
    }
    const fields = sec.fields.map((f) => {
      if (!f.name || !f.label) {
        throw new Error(`Field in "${sec.id}" requires name + label`);
      }
      return {
        ...f,
        type: VALID_FIELD_TYPES.includes(f.type) ? f.type : "text",
        required: !!f.required,
      };
    });
    return { ...sec, isArray: !!sec.isArray, fields };
  });

  return { sections };
};

export const loadConfigJson = async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to download config JSON");
  const raw = await res.json();
  return normalizeConfig(raw);
};

export const buildEmptyFormData = (config) => {
  const data = {};
  for (const sec of config.sections) {
    if (sec.isArray) {
      data[sec.id] = [emptyRow(sec)];
    } else {
      data[sec.id] = emptyRow(sec);
    }
  }
  return data;
};