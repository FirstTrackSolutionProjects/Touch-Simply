import API from "../api/api";


// REGISTER
export const registerUser = async (userData) => {

  const res = await API.post(
    "/auth/register",
    userData
  );

  return res.data;
};

// GOOGLE LOGIN
export const googleLoginUser = async (tokenId) => {
  const res = await API.post("/auth/google-login", { tokenId });
  return res.data;
};


// LOGIN
export const loginUser = async (userData) => {

  const res = await API.post(
    "/auth/login",
    userData
  );

  return res.data;
};