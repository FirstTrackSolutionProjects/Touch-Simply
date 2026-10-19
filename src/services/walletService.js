// Touch-Simply/src/services/walletService.js
import API from "../api/api";

export const getWalletBalance = async () => {
  const res = await API.get("/wallets/balance");
  return res.data;
};

export const createRechargeOrder = async (payload) => {
  const res = await API.post("/wallets/recharge/create-order-id", payload);
  return res.data;
};

export const verifyRechargePayment = async (payload) => {
  const res = await API.post("/wallets/recharge/verify-payment", payload);
  return res.data;
};

export const getMyTransactions = async (query = { page: 1, limit: 10 }) => {
  const res = await API.get("/wallets/transactions/me", { params: query });
  return res.data;
};