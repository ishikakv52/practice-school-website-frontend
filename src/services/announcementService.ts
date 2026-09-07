import { apiGet, apiPost } from "./api";

export async function sendAnnouncement(title: string, message: string) {
  return apiPost("/announcements/send", { title, message });
}

export async function listAnnouncements() {
  return apiGet("/announcements");
}