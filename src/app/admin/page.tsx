"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me, logout } from "@/services/authService";
import {
  listEnquiries,
  updateEnquiryStatus,
  listAdmissions,
  updateAdmissionStatus,
} from "@/services/adminService";
import { sendAnnouncement } from "@/services/announcementService";
import { ApiClientError } from "@/services/api";
import { subscribeToPush } from "@/services/pushNotifications";
import CreateAccountForm from "@/components/CreateAccountForm";
import AccountsList from "@/components/AccountsList";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "responded";
  created_at: string;
};

type Admission = {
  id: number;
  student_name: string;
  grade_applied: string;
  parent_name: string;
  phone: string;
  email: string;
  status: "pending" | "under_review" | "accepted" | "rejected";
  created_at: string;
};

const ENQUIRY_STATUSES = ["new", "read", "responded"] as const;
const ADMISSION_STATUSES = ["pending", "under_review", "accepted", "rejected"] as const;

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminName, setAdminName] = useState<string | null>(null);

  const [tab, setTab] = useState<"enquiries" | "admissions" | "announcements" | "accounts">(
    "enquiries"
  );
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const [accountsRefreshKey, setAccountsRefreshKey] = useState(0);

  useEffect(() => {
    me()
      .then((res) => {
        setAdminName(res?.data?.user?.name ?? "Admin");
        subscribeToPush("admin");
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setCheckingAuth(false));
  }, [router]);

  useEffect(() => {
    if (checkingAuth) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (tab === "enquiries") {
          const res = await listEnquiries();
          if (!cancelled) setEnquiries(res?.data ?? []);
        } else if (tab === "admissions") {
          const res = await listAdmissions();
          if (!cancelled) setAdmissions(res?.data ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiClientError ? err.message : "Failed to load data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [tab, checkingAuth]);

  async function handleEnquiryStatusChange(id: number, status: string) {
    try {
      await updateEnquiryStatus(id, status);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: status as Enquiry["status"] } : e))
      );
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to update status.");
    }
  }

  async function handleAdmissionStatusChange(id: number, status: string) {
    try {
      await updateAdmissionStatus(id, status);
      setAdmissions((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: status as Admission["status"] } : a))
      );
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to update status.");
    }
  }

  async function handleSendAnnouncement(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSentMessage(null);
    try {
      await sendAnnouncement(annTitle, annMessage);
      setAnnTitle("");
      setAnnMessage("");
      setSentMessage("Announcement sent successfully.");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Failed to send announcement.");
    } finally {
      setSending(false);
    }
  }

  async function handleLogout() {
    await logout().catch(() => {});
    router.replace("/admin/login");
  }

  if (checkingAuth) {
    return <div className="max-w-5xl mx-auto px-4 py-20 text-muted">Checking session...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted">Welcome, {adminName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-ink/15 px-5 py-2.5 font-semibold hover:bg-ink/[0.03] transition-colors"
        >
          Log out
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("enquiries")}
          className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
            tab === "enquiries" ? "bg-indigo text-white" : "bg-white border border-ink/15"
          }`}
        >
          Enquiries
        </button>
        <button
          onClick={() => setTab("admissions")}
          className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
            tab === "admissions" ? "bg-indigo text-white" : "bg-white border border-ink/15"
          }`}
        >
          Admissions
        </button>
        <button
          onClick={() => setTab("announcements")}
          className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
            tab === "announcements" ? "bg-indigo text-white" : "bg-white border border-ink/15"
          }`}
        >
          Announcements
        </button>
        <button
          onClick={() => setTab("accounts")}
          className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
            tab === "accounts" ? "bg-indigo text-white" : "bg-white border border-ink/15"
          }`}
        >
          Accounts
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-[10px] bg-coral/10 border border-coral/30 text-coral font-semibold px-4 py-3.5 text-sm">
          {error}
        </div>
      )}

      {sentMessage && (
        <div className="mb-5 rounded-[10px] bg-green-50 border border-green-200 text-green-700 font-semibold px-4 py-3.5 text-sm">
          {sentMessage}
        </div>
      )}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : tab === "enquiries" ? (
        <div className="space-y-4">
          {enquiries.length === 0 && <p className="text-muted">No enquiries yet.</p>}
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{enq.subject}</p>
                  <p className="text-sm text-muted">
                    {enq.name} &lt;{enq.email}&gt; · {enq.created_at}
                  </p>
                </div>
                <select
                  value={enq.status}
                  onChange={(e) => handleEnquiryStatusChange(enq.id, e.target.value)}
                  className="rounded-[10px] border border-ink/15 px-3 py-2 text-sm font-semibold bg-paper"
                >
                  {ENQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-3 text-sm">{enq.message}</p>
            </div>
          ))}
        </div>
      ) : tab === "admissions" ? (
        <div className="space-y-4">
          {admissions.length === 0 && <p className="text-muted">No applications yet.</p>}
          {admissions.map((adm) => (
            <div
              key={adm.id}
              className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {adm.student_name} — {adm.grade_applied}
                  </p>
                  <p className="text-sm text-muted">
                    Parent: {adm.parent_name} · {adm.phone} · {adm.email}
                  </p>
                  <p className="text-sm text-muted">Applied: {adm.created_at}</p>
                </div>
                <select
                  value={adm.status}
                  onChange={(e) => handleAdmissionStatusChange(adm.id, e.target.value)}
                  className="rounded-[10px] border border-ink/15 px-3 py-2 text-sm font-semibold bg-paper"
                >
                  {ADMISSION_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : tab === "announcements" ? (
        <form
          onSubmit={handleSendAnnouncement}
          className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-6 space-y-4 max-w-lg"
        >
          <div>
            <label className="block font-semibold text-sm mb-1.5">Title</label>
            <input
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1.5">Message</label>
            <textarea
              value={annMessage}
              onChange={(e) => setAnnMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-[10px] border border-ink/15 bg-paper focus:bg-white focus:outline-none focus:border-indigo-soft focus:ring-4 focus:ring-indigo-soft/15 transition"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="rounded-full bg-indigo hover:bg-indigo-deep transition-colors text-white font-semibold px-6 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Announcement"}
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-6">
          <CreateAccountForm onCreated={() => setAccountsRefreshKey((k) => k + 1)} />
          <AccountsList refreshKey={accountsRefreshKey} />
        </div>
      )}
    </div>
  );
}
