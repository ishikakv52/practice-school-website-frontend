import { apiPost } from "./api";

/**
 * @param {{
 *   studentName: string, dateOfBirth: string, gradeApplied: string,
 *   parentName: string, phone: string, email: string, message?: string
 * }} data
 */
export function submitAdmission(data) {
  return apiPost("/admissions", data);
}
