import { apiGet, apiPatch } from "./api";

export function listEnquiries(status) {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiGet(`/enquiries${q}`);
}

export function updateEnquiryStatus(id, status) {
  return apiPatch(`/enquiries/${id}/status`, { status });
}

export function listAdmissions(status) {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiGet(`/admissions${q}`);
}

export function updateAdmissionStatus(id, status) {
  return apiPatch(`/admissions/${id}/status`, { status });
}
