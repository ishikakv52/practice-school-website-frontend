export function redirectByRole(user, router) {
  if (user.role === "admin") {
    router.push("/admin/dashboard");
  } else if (user.role === "parent") {
    router.push("/parent/dashboard");
  } else if (user.role === "student") {
    router.push("/student/dashboard");
  }
}