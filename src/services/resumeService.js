import API from "../api/api";


// CREATE RESUME
export const createResume = async (resumeData) => {

  const res = await API.post(
    "/resumes",
    resumeData
  );

  return res.data;
};


// GET ALL RESUMES
export const getAllResumes = async () => {

  const res = await API.get(
    "/resumes"
  );

  return res.data;
};


// GET SINGLE RESUME
export const getSingleResume = async (id) => {

  const res = await API.get(
    `/resumes/${id}`
  );

  return res.data;
};


// UPDATE RESUME
export const updateResume = async (
  id,
  updatedData
) => {

  const res = await API.put(
    `/resumes/${id}`,
    updatedData
  );

  return res.data;
};


// DELETE RESUME
export const deleteResume = async (id) => {

  const res = await API.delete(
    `/resumes/${id}`
  );

  return res.data;
};