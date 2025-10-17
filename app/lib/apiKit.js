"use client";
const API_BASE_URL ="https://api.bitechx.com";

async function apiRequest(
  endpoint,
  {
    method = "GET",
    body,
    headers = {},
    isServer = false,
    isFormData = false,
  } = {}
) {
  let token = null;
  if (typeof window !== "undefined" && !isServer) {
    const stored = localStorage.getItem("auth-storage");
    token = stored ? JSON.parse(stored)?.state?.token : null;
  }

  const config = {
    method,
    headers: {
      // Don't set Content-Type for FormData - let browser set it automatically
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    // Don't stringify FormData
    ...(body && { body: isFormData ? body : JSON.stringify(body) }),
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || `Request failed: ${res.status}`);
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
}

export const apiKit = {
  get: (endpoint, options) =>
    apiRequest(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    apiRequest(endpoint, { ...options, method: "POST", body }),
  patch: (endpoint, body, options) =>
    apiRequest(endpoint, { ...options, method: "PATCH", body }),
  delete: (endpoint, options) =>
    apiRequest(endpoint, { ...options, method: "DELETE" }),
  // Special method for file uploads with FormData
  postFormData: (endpoint, formData, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      isFormData: true,
    }),
};

// HOW SERVER COMPONENT CALL THE API
// const data = await apiClient.get("/user/dashboard", { isServer: true });