const STORAGE_KEY = "myLibrary";

export const getLibrary = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveToLibrary = (item) => {
  const existing = getLibrary();

  const newItem = {
    id: Date.now(),
    file: item.file,
    slides: item.slides || null,
    type: item.type || "unknown",
    category: item.category || "general",
    name: item.name || "Untitled",
    createdAt: new Date().toLocaleString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newItem, ...existing])
  );
};

export const deleteFromLibrary = (id) => {
  const updated = getLibrary().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};