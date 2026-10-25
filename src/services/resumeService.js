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

// DOWNLOAD RESUME
export const downloadResume = async (resumeId) => {
  const res = await API.get(`/resumes/${resumeId}/download`);
  // returns { success, data: { downloadUrl } }
  return res.data;
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

// GET SIMPLE WORKSPACE
export const getSimpleWorkspace = async (resumeId) => {
  const res = await API.get(`/resumes/${resumeId}/workspace/simple`);
  return res.data;
};

// GET CONFIG JSON UPLOAD URL
export const getConfigJsonUploadUrl = async (resumeId) => {
  const res = await API.get(`/resumes/${resumeId}/config-upload-url`);
  return res.data;
};

// GET DATA JSON UPLOAD URL
export const getDataJsonUploadUrl = async (resumeId) => {
  const res = await API.get(`/resumes/${resumeId}/data-upload-url`);
  return res.data;
};

// UPLOAD DATA JSON DIRECTLY TO S3
export const uploadDataJson = async (resumeId, formData) => {
  // 1. Get signed PUT URL
  const res = await getDataJsonUploadUrl(resumeId);
  const uploadUrl = res.data?.uploadUrl;
  if (!uploadUrl) throw new Error("No upload URL returned");

  // 2. PUT data directly to S3
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!put.ok) throw new Error(`S3 upload failed: ${put.status}`);
  return true;
};

// UPLOAD CONFIG JSON DIRECTLY TO S3
export const uploadConfigJson = async (resumeId, configJson) => {
  // 1. Get signed PUT URL
  const res = await getConfigJsonUploadUrl(resumeId);
  const uploadUrl = res.data?.uploadUrl;
  if (!uploadUrl) throw new Error("No upload URL returned");

  // 2. PUT config directly to S3
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(configJson),
  });

  if (!put.ok) throw new Error(`S3 upload failed: ${put.status}`);
  return true;
};

// GET ALL RESUME DOWNLOADS (LIBRARY)
export const getAllResumeDownloads = async (query = { page: 1, limit: 10 }) => {
  const res = await API.get("/resumes/downloads", { params: query });
  return res.data;
};

// GET RESUME DOWNLOAD BY ID
export const getResumeDownloadById = async (downloadId) => {
  const res = await API.get(`/resumes/downloads/${downloadId}`);
  return res.data;
};

// REDOWNLOAD FROM LIBRARY
export const redownloadFromLibrary = async (downloadId) => {
  const res = await API.get(`/resumes/downloads/${downloadId}/download`);
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