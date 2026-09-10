// Shared fetch wrapper. Every service (enquiryService, admissionService,
// and later eventService/noticeService/paymentService, etc.) goes through
// this instead of calling fetch() directly from components — one place
// to change the base URL, headers, or error shape.
//
// NEXT_PUBLIC_API_URL should be the bare backend URL with NO /api suffix
// (e.g. https://school-backend-docker-z9r4.onrender.com) — this file adds
// the /api prefix itself, same as src/lib/api.js callers do inline.

const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api";

export class ApiClientError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function apiGet(path) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      credentials: "include",
    });
  } catch {
    throw new ApiClientError(
      "Could not reach the server. Please check your connection and try again.",
      0
    );
  }
  return parseResponse(res);
}

export async function apiPost(path, body) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiClientError(
      "Could not reach the server. Please check your connection and try again.",
      0
    );
  }
  return parseResponse(res);
}

export async function apiPatch(path, body) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiClientError(
      "Could not reach the server. Please check your connection and try again.",
      0
    );
  }
  return parseResponse(res);
}

async function parseResponse(res) {
  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // Non-JSON error response — fall through with a generic message.
  }

  if (!res.ok) {
    throw new ApiClientError(
      payload?.error?.message || "Something went wrong. Please try again.",
      res.status,
      payload?.error?.details
    );
  }

  return payload;
}

export const getPendingAdmissions = () => apiGet("/admissions/pending");
export const approveAdmission = (id, classId) => apiPost(`/admissions/${id}/approve`, { classId });
export const rejectAdmission = (id, reason) => apiPost(`/admissions/${id}/reject`, { reason });
export const getClasses = () => apiGet("/classes");
