import API from "../api/api";


// CREATE PORTFOLIO
export const createPortfolio = async (
  portfolioData
) => {

  const res = await API.post(
    "/portfolios",
    portfolioData
  );

  return res.data;
};


// GET ALL PORTFOLIOS
export const getAllPortfolios = async () => {

  const res = await API.get(
    "/portfolios"
  );

  return res.data;
};


// GET SINGLE PORTFOLIO
export const getSinglePortfolio = async (
  id
) => {

  const res = await API.get(
    `/portfolios/${id}`
  );

  return res.data;
};


// UPDATE PORTFOLIO
export const updatePortfolio = async (
  id,
  updatedData
) => {

  const res = await API.put(
    `/portfolios/${id}`,
    updatedData
  );

  return res.data;
};


// DELETE PORTFOLIO
export const deletePortfolio = async (
  id
) => {

  const res = await API.delete(
    `/portfolios/${id}`
  );

  return res.data;
};