"use client";

import { useState, useEffect } from "react";
import { subscribeToPush } from "@/services/pushNotifications";

export default function PushSubscribeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      setVisible(true);
    }
  }, []);

  async function handleAccept(userType: "parent" | "student") {
    await subscribeToPush(userType);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white rounded-2xl shadow-lg border border-ink/10 p-5 z-50">
      <p className="font-semibold mb-3">Get notified about school announcements?</p>
      <div className="flex gap-2">
        <button
          onClick={() => handleAccept("parent")}
          className="flex-1 rounded-full bg-indigo text-white font-semibold py-2 text-sm"
        >
          I'm a Parent
        </button>
        <button
          onClick={() => handleAccept("student")}
          className="flex-1 rounded-full border border-ink/15 font-semibold py-2 text-sm"
        >
          I'm a Student
        </button>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="mt-2 text-xs text-muted underline"
      >
        Not now
      </button>
    </div>
  );
}