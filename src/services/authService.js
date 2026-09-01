import { apiPost, apiGet } from "./api";

export function login(email, password) {
  return apiPost("/auth/login", { email, password });
}

export function logout() {
  return apiPost("/auth/logout", {});
}

export function me() {
  return apiGet("/auth/me");
}
