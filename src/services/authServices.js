import API from "../api/api";

// REGISTER
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

// GOOGLE LOGIN
export const googleLoginUser = async (tokenId) => {
  const res = await API.post("/auth/login/google", { token: tokenId }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.data;
};

// LOGIN
export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};

export const checkAuthService = async () => {
  const res = await API.get("/auth/check");
  return res.data;
}

export const setAccountPassword = async (passwordData) => {
  const res = await API.patch("/auth/password", passwordData);
  return res.data;
};
