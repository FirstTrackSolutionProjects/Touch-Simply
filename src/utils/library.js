export const getLibrary = () => {
  return JSON.parse(localStorage.getItem("resumeLibrary")) || [];
};

export const saveToLibrary = (item) => {
  const existing = getLibrary();

  localStorage.setItem(
    "resumeLibrary",
    JSON.stringify([item, ...existing])
  );
};

export const deleteFromLibrary = (id) => {
  const updated = getLibrary().filter((i) => i.id !== id);
  localStorage.setItem("resumeLibrary", JSON.stringify(updated));
};