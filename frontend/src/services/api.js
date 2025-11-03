import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000/api",
});

// --- Analytics Endpoints ---
export const getOverview = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.startDate)
    params.append(
      "start_date",
      filters.startDate instanceof Date
        ? filters.startDate.toISOString().split("T")[0]
        : filters.startDate
    );
  if (filters.endDate)
    params.append(
      "end_date",
      filters.endDate instanceof Date
        ? filters.endDate.toISOString().split("T")[0]
        : filters.endDate
    );
  const query = params.toString() ? `?${params.toString()}` : "";
  return (await api.get(`/overview${query}`)).data;
};

export const getTopProducts = async (limit = 10, filters = {}) => {
  const params = new URLSearchParams({ limit });
  if (filters.startDate)
    params.append(
      "start_date",
      filters.startDate instanceof Date
        ? filters.startDate.toISOString().split("T")[0]
        : filters.startDate
    );
  if (filters.endDate)
    params.append(
      "end_date",
      filters.endDate instanceof Date
        ? filters.endDate.toISOString().split("T")[0]
        : filters.endDate
    );
  return (await api.get(`/top-products?${params.toString()}`)).data;
};

// --- Função adicionada: top products com filtros customizados ---
export const getTopProductsFiltered = async (filters = {}, limit = 10) => {
  const params = new URLSearchParams({ limit });
  if (filters.startDate)
    params.append(
      "start_date",
      filters.startDate instanceof Date
        ? filters.startDate.toISOString().split("T")[0]
        : filters.startDate
    );
  if (filters.endDate)
    params.append(
      "end_date",
      filters.endDate instanceof Date
        ? filters.endDate.toISOString().split("T")[0]
        : filters.endDate
    );
  if (filters.category) params.append("category", filters.category);
  if (filters.storeId) params.append("store_id", filters.storeId);

  return (await api.get(`/top-products?${params.toString()}`)).data;
};

// --- Sales Endpoints ---
export const createSale = async (payload) =>
  (await api.post("/sales/", payload)).data;

export const listSales = async (skip = 0, limit = 100) => {
  const params = new URLSearchParams({ skip, limit });
  return (await api.get(`/sales/?${params.toString()}`)).data;
};

// --- Export default para instância axios, se necessário ---
export default api;
