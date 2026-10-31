import API from "../api/api";

export const getMyProfile = async () => (await API.get("/users/me/profile")).data;
export const updateMyProfile = async (profile) => (await API.patch("/users/me/profile", profile)).data;
