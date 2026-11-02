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

// Accept the auth response envelopes used across current and older API deployments.
export const getAuthResult = (response) => {
  const roots = [response, response?.data, response?.data?.data, response?.result, response?.result?.data].filter(Boolean);
  const tokenKeys = ["accessToken", "access_token", "token"];
  let token;
  let user;

  for (const root of roots) {
    user ||= root.user;
    for (const key of tokenKeys) {
      const candidate = root[key] || root.tokens?.[key];
      if (typeof candidate === "string" && candidate.trim()) {
        token = candidate;
        break;
      }
    }
    if (token) break;
  }

  return { token, user };
};

export const checkAuthService = async () => {
  const res = await API.get("/auth/check");
  return res.data;
}

export const setAccountPassword = async (passwordData) => {
  const res = await API.patch("/auth/password", passwordData);
  return res.data;
};
