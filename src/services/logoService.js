import API from "../api/api";


// CREATE LOGO
export const createLogo = async (
  logoData
) => {

  const res = await API.post(
    "/logos",
    logoData
  );

  return res.data;
};


// GET ALL LOGOS
export const getAllLogos = async () => {

  const res = await API.get(
    "/logos"
  );

  return res.data;
};


// GET SINGLE LOGO
export const getSingleLogo = async (
  id
) => {

  const res = await API.get(
    `/logos/${id}`
  );

  return res.data;
};


// UPDATE LOGO
export const updateLogo = async (
  id,
  updatedData
) => {

  const res = await API.put(
    `/logos/${id}`,
    updatedData
  );

  return res.data;
};


// DELETE LOGO
export const deleteLogo = async (
  id
) => {

  const res = await API.delete(
    `/logos/${id}`
  );

  return res.data;
};