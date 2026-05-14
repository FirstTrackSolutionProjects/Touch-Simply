// src/utils/library.js

const STORAGE_KEY = "touchsimply-library";

// ================= SAVE =================
export const saveToLibrary = (item) => {
  try {
    const existing =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Identify project by title and type (raw project)
    const index = existing.findIndex(
      (i) =>
        i.title === item.title &&
        i.type === item.type
    );

    let updated;
    if (index !== -1) {
      // Update existing project
      updated = [...existing];
      updated[index] = { ...updated[index], ...item, updatedAt: new Date().toISOString() };
    } else {
      // Add new project
      updated = [{ ...item, id: Date.now(), createdAt: new Date().toISOString() }, ...existing];
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error(
      "Error saving to library:",
      error
    );
  }
};

// ================= GET =================
export const getLibrary = () => {
  try {
    const items =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // newest first
    return items.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  } catch (error) {
    console.error(
      "Error getting library:",
      error
    );

    return [];
  }
};

// ================= DELETE =================
export const deleteFromLibrary = (id) => {
  try {
    const existing =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const updated = existing.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error(
      "Error deleting item:",
      error
    );
  }
};

// ================= CLEAR =================
export const clearLibrary = () => {
  localStorage.removeItem(STORAGE_KEY);
};