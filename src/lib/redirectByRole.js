export function redirectByRole(user, router) {
  if (user.role === "admin") {
    router.push("/admin/dashboard");
  } else if (user.role === "parent") {
    router.push("/parent/dashboard");
  } else if (user.role === "student") {
    router.push("/student/dashboard");
  } else if (user.role === "teacher") {
    router.push("/teacher/dashboard");
  } else if (user.role === "principal") {
    router.push("/principal/dashboard");
  } else if (user.role === "staff") {
    router.push("/staff/dashboard");
  }
}
