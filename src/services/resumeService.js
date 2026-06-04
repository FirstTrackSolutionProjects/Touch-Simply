import API from "../api/api";


// CREATE RESUME
// export const createResume = async (resumeData) => {

//   const res = await API.post(
//     "/resumes",
//     resumeData
//   );

//   return res.data;
// };

export const createResume = async (data) => { 
  const response = await fetch(`${import.meta.env.VITE_API_URL}/resumes`, 
  {method: 'POST', headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'},body: JSON.stringify(data)})

  const resumeData = await response.json()
  return resumeData;
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