const hasOwn = (value, key) =>
  Object.prototype.hasOwnProperty.call(value, key);

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isFieldDefinition = (value) =>
  isObject(value) &&
  (hasOwn(value, "type") ||
    hasOwn(value, "current_value") ||
    hasOwn(value, "default_value"));

const copyValue = (value) => (Array.isArray(value) ? [...value] : value);

const validateFieldValue = (value, type, path) => {
  if (type === "list") {
    if (
      !Array.isArray(value) ||
      !value.every((item) =>
        ["string", "number", "boolean"].includes(typeof item)
      )
    ) {
      throw new Error(`Invalid config: "${path}" must contain a list value`);
    }
    return;
  }

  if (type === "checkbox") {
    if (typeof value !== "boolean") {
      throw new Error(`Invalid config: "${path}" must contain a boolean value`);
    }
    return;
  }

  if (
    value !== null &&
    !["string", "number", "boolean"].includes(typeof value)
  ) {
    throw new Error(`Invalid config: "${path}" must contain a scalar value`);
  }
};

const validateFieldDefinition = (field, path) => {
  if (typeof field.type !== "string" || !field.type.trim()) {
    throw new Error(`Invalid config: "${path}" requires a field type`);
  }
  if (typeof field.name !== "string" || !field.name.trim()) {
    throw new Error(`Invalid config: "${path}" requires a field name`);
  }
  if (
    field.title !== undefined &&
    typeof field.title !== "string"
  ) {
    throw new Error(`Invalid config: "${path}.title" must be a string`);
  }
  if (
    field.label !== undefined &&
    typeof field.label !== "string"
  ) {
    throw new Error(`Invalid config: "${path}.label" must be a string`);
  }
  if (!field.title && !field.label) {
    throw new Error(`Invalid config: "${path}" requires a field title or label`);
  }
  if (field.required !== undefined && typeof field.required !== "boolean") {
    throw new Error(`Invalid config: "${path}.required" must be a boolean`);
  }
  if (field.rows !== undefined && (!Number.isInteger(field.rows) || field.rows < 1)) {
    throw new Error(`Invalid config: "${path}.rows" must be a positive integer`);
  }
  if (field.options !== undefined && !Array.isArray(field.options)) {
    throw new Error(`Invalid config: "${path}.options" must be an array`);
  }

  const hasCurrentValue = hasOwn(field, "current_value");
  const hasDefaultValue = hasOwn(field, "default_value");
  if (!hasCurrentValue && !hasDefaultValue) {
    throw new Error(
      `Invalid config: "${path}" requires a current_value or default_value`
    );
  }

  if (hasCurrentValue) {
    validateFieldValue(field.current_value, field.type, `${path}.current_value`);
  }
  if (hasDefaultValue) {
    validateFieldValue(field.default_value, field.type, `${path}.default_value`);
  }

  if (!hasCurrentValue) {
    field.current_value = copyValue(field.default_value);
  }
  if (!hasDefaultValue) {
    field.default_value = copyValue(field.current_value);
  }
};

const validateNode = (node, path) => {
  if (Array.isArray(node)) {
    node.forEach((item, index) => validateNode(item, `${path}[${index}]`));
    return;
  }
  if (!isObject(node)) return;

  if (isFieldDefinition(node)) {
    validateFieldDefinition(node, path);
    return;
  }

  if (node.optional !== undefined && typeof node.optional !== "boolean") {
    throw new Error(`Invalid config: "${path}.optional" must be a boolean`);
  }

  Object.entries(node).forEach(([key, value]) => {
    validateNode(value, `${path}.${key}`);
  });
};

/**
 * Validate the generic config format while allowing section names and nested
 * field/group contents to vary. Field definitions are identified by their
 * type/name/title-or-label and current/default value properties.
 */
export const validateConfigJson = (raw) => {
  if (!isObject(raw)) {
    throw new Error("Invalid config: expected a JSON object");
  }
  if (!Number.isFinite(raw.version)) {
    throw new Error("Invalid config: version must be a number");
  }
  if (typeof raw.template !== "string" || !raw.template.trim()) {
    throw new Error("Invalid config: template must be a non-empty string");
  }
  if (typeof raw.engine !== "string" || !raw.engine.trim()) {
    throw new Error("Invalid config: engine must be a non-empty string");
  }
  if (!isObject(raw.sections) || Object.keys(raw.sections).length === 0) {
    throw new Error("Invalid config: sections must be a non-empty object");
  }

  Object.entries(raw.sections).forEach(([sectionId, section]) => {
    if (!sectionId.trim()) {
      throw new Error("Invalid config: section names cannot be empty");
    }
    if (!isObject(section)) {
      throw new Error(`Invalid config: section "${sectionId}" must be an object`);
    }
    if (typeof section.optional !== "boolean") {
      throw new Error(
        `Invalid config: section "${sectionId}" requires an optional boolean`
      );
    }
    if (
      section.title !== undefined &&
      typeof section.title !== "string"
    ) {
      throw new Error(
        `Invalid config: section "${sectionId}".title must be a string`
      );
    }
    if (
      !["fields", "items", "subsections"].some((key) =>
        hasOwn(section, key)
      )
    ) {
      throw new Error(
        `Invalid config: section "${sectionId}" requires fields, items, or subsections`
      );
    }
    if (hasOwn(section, "fields") && !isObject(section.fields)) {
      throw new Error(
        `Invalid config: section "${sectionId}".fields must be an object`
      );
    }
    if (hasOwn(section, "items") && !Array.isArray(section.items)) {
      throw new Error(
        `Invalid config: section "${sectionId}".items must be an array`
      );
    }
    if (
      hasOwn(section, "subsections") &&
      !isObject(section.subsections) &&
      !Array.isArray(section.subsections)
    ) {
      throw new Error(
        `Invalid config: section "${sectionId}".subsections must be an object or array`
      );
    }
    validateNode(section, `sections.${sectionId}`);
  });

  return raw;
};

export const createEmptyConfigNode = (node) => {
  if (Array.isArray(node)) {
    return node.map(createEmptyConfigNode);
  }
  if (!isObject(node)) return node;

  if (isFieldDefinition(node)) {
    return {
      ...node,
      current_value:
        node.type === "list" ? [] : node.type === "checkbox" ? false : "",
    };
  }

  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [
      key,
      createEmptyConfigNode(value),
    ])
  );
};

export const loadConfigJson = async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to download config JSON (${res.status})`);
  }
  return validateConfigJson(await res.json());
};
