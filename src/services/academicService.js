import { apiGet, apiPost } from "./api";

export function listClasses() {
  return apiGet("/classes");
}

export function listMyClasses() {
  return apiGet("/classes/mine");
}

export function createClass({ name, section }) {
  return apiPost("/classes", { name, section });
}

export function assignTeacherToClass(classId, teacherId) {
  return apiPost(`/classes/${classId}/teachers`, { teacherId });
}

export function listStudents(classId) {
  return apiGet(`/students?classId=${classId}`);
}

export function createStudent({ name, classId, rollNumber }) {
  return apiPost("/students", { name, classId, rollNumber });
}

export function markAttendance({ classId, date, records }) {
  return apiPost("/attendance", { classId, date, records });
}

export function getAttendance(classId, date) {
  return apiGet(`/attendance?classId=${classId}&date=${date}`);
}
