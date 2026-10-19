// Touch-Simply/src/services/resumeService.js
import API from "../api/api";

// ==========================================
// TEMPLATES
// ==========================================

export const getResumeTemplates = async (query = { page: 1, limit: 100 }) => {
  const res = await API.get("/resumes/templates", { params: query });
  return res.data;
};

// ==========================================
// RESUMES
// ==========================================

// CREATE RESUME FROM TEMPLATE (SIMPLE MODE)
export const createResumeFromTemplate = async (templateId, payload) => {
  const res = await API.post(`/resumes/${templateId}/simple`, payload);
  return res.data;
};

// CREATE RESUME FROM TEMPLATE (MANUAL MODE)
export const createResumeManual = async (templateId, payload) => {
  const res = await API.post(`/resumes/${templateId}/manual`, payload);
  return res.data;
};

// SAVE FORM DATA (backend contract assumption)
export const saveResumeFormData = async (resumeId, formData) => {
  const res = await API.put(`/resumes/${resumeId}/form-data`, {
    data: formData,
  });
  return res.data;
};

// COMPILE RESUME
export const compileResume = async (resumeId) => {
  const res = await API.post(`/resumes/${resumeId}/compile`);
  return res.data;
};

// DOWNLOAD RESUME (blob)
export const downloadResume = async (resumeId) => {
  const res = await API.get(`/resumes/${resumeId}/download`, {
    responseType: "blob",
  });
  return res;
};

// GET ALL RESUMES
export const getAllResumes = async (query = { page: 1, limit: 10 }) => {
  const res = await API.get("/resumes", { params: query });
  return res.data;
};

// GET SINGLE RESUME
export const getResumeById = async (resumeId) => {
  const res = await API.get(`/resumes/${resumeId}`);
  return res.data;
};

// GET RESUME WORKSPACE
export const getResumeWorkspace = async (resumeId) => {
  const res = await API.get(`/resumes/${resumeId}/workspace`);
  return res.data;
};

// GET FILE URL
export const getResumeFileUrl = async (resumeId, filePath) => {
  const res = await API.get(`/resumes/${resumeId}/file-url`, {
    params: { filePath },
  });
  return res.data;
};

// GET UPLOAD URL
export const getUploadUrl = async (resumeId, filePath, fileType) => {
  const res = await API.post(`/resumes/${resumeId}/upload-url`, {
    filePath,
    fileType,
  });
  return res.data;
};

// DELETE RESUME
export const deleteResume = async (resumeId) => {
  const res = await API.delete(`/resumes/${resumeId}`);
  return res.data;
};

// CLONE — creates a new resume from the same template
export const cloneResume = async (templateId, title) => {
  return createResumeFromTemplate(templateId, {
    title: `${title} (Clone)`,
    description: "Cloned resume",
  });
};