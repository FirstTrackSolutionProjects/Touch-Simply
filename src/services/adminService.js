import API from "../api/api";

export const getAdminOverview = async () => (await API.get("/admin/overview")).data;
export const getAdminUsers = async (params) => (await API.get("/admin/users", { params })).data;
export const setAdminUserStatus = async (id, is_blocked) => (await API.patch(`/admin/users/${id}/status`, { is_blocked })).data;
export const adjustAdminCredits = async (id, operation, amount) => (await API.post(`/admin/users/${id}/credits`, { operation, amount })).data;
export const getAdminResumes = async (params) => (await API.get("/admin/resumes", { params })).data;
export const deleteAdminResume = async (id) => (await API.delete(`/admin/resumes/${encodeURIComponent(id)}`)).data;
export const getAdminTransactions = async (params) => (await API.get("/admin/transactions", { params })).data;
export const getAdminTemplates = async () => (await API.get("/admin/templates")).data;
export const getAdminPlans = async () => (await API.get("/admin/plans")).data;
export const createAdminPlan = async (plan) => (await API.post("/admin/plans", plan)).data;
export const updateAdminPlan = async (id, plan) => (await API.patch(`/admin/plans/${id}`, plan)).data;
export const deleteAdminPlan = async (id) => (await API.delete(`/admin/plans/${id}`)).data;
