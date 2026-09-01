import { apiPost } from "./api";

/**
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
export function submitEnquiry(data) {
  return apiPost("/enquiries", data);
}
