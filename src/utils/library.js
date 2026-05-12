// src/utils/library.js

const STORAGE_KEY = "touchsimply-library";

// ================= SAVE =================
export const saveToLibrary = (item) => {
  try {
    const existing =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Prevent duplicates
    const alreadyExists = existing.find(
      (i) =>
        i.title === item.title &&
        i.format === item.format &&
        i.type === item.type
    );

    if (alreadyExists) return;

    const updated = [item, ...existing];

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