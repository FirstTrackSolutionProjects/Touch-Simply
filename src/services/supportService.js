import API from "../api/api";

export const getMyTickets = async () => (await API.get("/users/me/tickets")).data;
export const createMyTicket = async (ticket) => (await API.post("/users/me/tickets", ticket)).data;
export const getMyInvoices = async () => (await API.get("/wallets/invoices/me")).data;
