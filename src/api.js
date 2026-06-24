import axios from "axios";

/* ================= BASE CONFIG ================= */
export const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://menu.teknova-sy.com/api";

export const TOKEN_KEY = "restaurant_admin_token";

/* ================= API ENDPOINTS ================= */
export const API = {
  login: `${BASE_URL}/auth/login`,
  refresh: `${BASE_URL}/auth/refresh`,
  me: `${BASE_URL}/auth/me`,

  categories: `${BASE_URL}/categories`,
  products: `${BASE_URL}/products`,

  adminProducts: `${BASE_URL}/admin/products`,
  adminCategories: `${BASE_URL}/admin/categories`,
  adminOrders: `${BASE_URL}/admin/orders`,
  adminUsers: `${BASE_URL}/admin/users`,

  notifications: `${BASE_URL}/notifications/unread`,
  notificationsRead: `${BASE_URL}/notifications/read`,
};

/* ================= TOKEN HELPERS ================= */
export function getSavedToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/* ================= HELPERS ================= */
function extractToken(result) {
  return (
    result?.access_token ||
    result?.token ||
    result?.data?.access_token ||
    result?.data?.token ||
    result?.data?.plainTextToken ||
    result?.data?.plain_text_token ||
    ""
  );
}

export function getArray(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.data)) return result.data.data;
  if (Array.isArray(result?.items)) return result.items;
  if (Array.isArray(result?.result)) return result.result;
  if (Array.isArray(result?.results)) return result.results;
  return [];
}

/* ================= PRICE FORMAT ================= */
export function formatPrice(value, currency = "") {
  if (value === null || value === undefined || value === "") {
    return currency ? `0 ${currency}` : "0";
  }

  const stringValue = String(value).trim();

  const normalizedValue = stringValue
    .replace(/[^\d.,]/g, "")
    .replace(",", ".");

  const numberValue = Number(normalizedValue);

  if (Number.isNaN(numberValue)) {
    return currency ? `${stringValue} ${currency}` : stringValue;
  }

  const formatted = numberValue.toLocaleString("ar-SY");

  return currency ? `${formatted} ${currency}` : formatted;
}

/* ================= FETCH API ================= */
export async function getJson(url, token) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response");
    }

    const result = await response.json();

    if (!response.ok && !(result && result.data)) {
      throw new Error(result?.message || `HTTP Error: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

/* ================= LOGIN ================= */
export async function login(
  email = process.env.REACT_APP_ADMIN_EMAIL || "admin@gmail.com",
  password = process.env.REACT_APP_ADMIN_PASSWORD || "password"
) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await fetch(API.login, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || result?.error || "Login failed"
    );
  }

  const token = extractToken(result);

  if (token) saveToken(token);

  return token;
}

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem(TOKEN_KEY) ||
    localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;