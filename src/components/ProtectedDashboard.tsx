"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { redirectByRole } from "@/lib/redirectByRole";
import { useAuth, type AuthUser } from "@/lib/auth-context";

type ProtectedDashboardProps = {
  expectedRole: AuthUser["role"];
  title: string;
  children?: React.ReactNode;
};

export default function ProtectedDashboard({
  expectedRole,
  title,
  children,
}: ProtectedDashboardProps) {
  const router = useRouter();
  const { user, loading: sessionLoading, setUser } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    apiRequest("/api/auth/me")
      .then((result) => {
        if (!active) return;

        const authenticatedUser = result.data.user as AuthUser;
        setUser(authenticatedUser);

        if (authenticatedUser.role !== expectedRole) {
          redirectByRole(authenticatedUser, router);
        }
      })
      .catch(() => {
        if (active) router.replace("/login");
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [expectedRole, router, setUser]);

  async function handleLogout() {
    await apiRequest("/api/auth/logout", { method: "POST" }).catch(() => {});
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/login");
  }

  if (sessionLoading || checking || !user || user.role !== expectedRole) {
    return <div className="max-w-5xl mx-auto px-4 py-20 text-muted">Checking session...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          <p className="text-muted">Welcome, {user.name}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-ink/15 px-5 py-2.5 font-semibold hover:bg-ink/[0.03] transition-colors"
        >
          Log out
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-8">
        {children ?? <p className="text-muted">Your dashboard is ready.</p>}
      </div>
    </div>
  );
}
