"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type Props = {
  user: { id: string; email?: string };
  tenant: { id: string; name: string } | null;
  payment: {
    id: string;
    period: string;
    amount: number;
    currency: string;
    status: string;
    paid_at: string | null;
  } | null;
  currentMonth: string;
  googleConnected: boolean;
  imageCount: number;
  videoCount: number;
};

function formatMonth(period: string) {
  const [year, month] = period.split("-");
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {active && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      )}
      <span
        className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
          active ? "bg-green-400" : "bg-yellow-400"
        }`}
      />
    </span>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function DashboardClient({ user, tenant, payment, currentMonth, googleConnected, imageCount, videoCount }: Props) {
  const router = useRouter();
  const isPaid = payment?.status === "paid";
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState("");

  const handleConnectGoogle = () => {
    setConnecting(true);
    window.location.href = "/api/google/connect";
  };

  const handleDisconnectGoogle = async () => {
    const res = await fetch("/api/google/disconnect", { method: "POST" });
    if (res.ok) router.refresh();
  };

  return (
    <div className="px-4 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-4xl">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
            Dashboard
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-accent sm:text-3xl">
            Hoş geldiniz.
          </h1>
          <p className="mt-1 text-sm text-muted">{tenant?.name}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Asistan Durumu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Asistan
              </p>
              <StatusDot active />
            </div>
            <p className="mt-4 text-xl font-bold text-accent">Aktif</p>
            <p className="mt-1 text-sm text-muted">Telegram ile ulaşın</p>
          </motion.div>

          {/* Ödeme Durumu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className={`rounded-2xl border p-6 ${
              isPaid
                ? "border-green-500/20 bg-green-500/5"
                : "border-yellow-500/20 bg-yellow-500/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                {formatMonth(currentMonth)}
              </p>
              <StatusDot active={isPaid} />
            </div>
            <p
              className={`mt-4 text-xl font-bold ${
                isPaid ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {isPaid ? "Ödendi" : "Bekliyor"}
            </p>
            {isPaid && payment?.paid_at ? (
              <p className="mt-1 text-sm text-muted">
                {new Date(payment.paid_at).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            ) : (
              <button
                onClick={() => router.push("/odeme")}
                className="mt-3 rounded-full bg-accent px-5 py-1.5 text-xs font-medium text-background transition-transform hover:scale-105"
              >
                Ödeme Yap
              </button>
            )}
          </motion.div>

          {/* Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
              Plan
            </p>
            <p className="mt-4 text-xl font-bold text-accent">$1.000</p>
            <p className="mt-1 text-sm text-muted">Aylık paket</p>
          </motion.div>
        </div>

        {/* Details Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Kullanım */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="text-sm font-semibold tracking-tight text-accent">
              Kullanım
            </h2>
            <div className="mt-5 space-y-4">
              {[
                { label: "Görsel", count: imageCount, limit: 1000 },
                { label: "Video", count: videoCount, limit: 50 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">{item.label}</span>
                    <span className="text-sm font-medium text-accent">
                      {item.count.toLocaleString("tr-TR")} / {item.limit.toLocaleString("tr-TR")}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 w-full rounded-full bg-border">
                    <div
                      className="h-1 rounded-full bg-accent transition-all"
                      style={{ width: `${Math.min((item.count / item.limit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              {[
                { label: "Asistan Tipi", value: "Özel" },
                { label: "Durum", value: "Aktif" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-accent">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Destek */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="text-sm font-semibold tracking-tight text-accent">
              Destek
            </h2>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm text-muted">
                  Asistanınıza Telegram ile ulaşabilirsiniz.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">E-posta</span>
                <a
                  href="mailto:contact@biyikgokhan.com"
                  className="text-sm text-accent transition-opacity hover:opacity-70"
                >
                  contact@biyikgokhan.com
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Hesap</span>
                <span className="text-sm text-muted">{user.email}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Workspace */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mt-6 rounded-2xl border border-border bg-surface p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-accent">
              Google Workspace
            </h2>
            {googleConnected && (
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <StatusDot active />
                Bağlı
              </span>
            )}
          </div>

          {connectError && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {connectError}
            </div>
          )}

          {googleConnected ? (
            <div className="mt-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { name: "Gmail", icon: "M" },
                  { name: "Calendar", icon: "C" },
                  { name: "Drive", icon: "D" },
                  { name: "Sheets", icon: "S" },
                ].map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">
                      {service.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-accent">
                        {service.name}
                      </p>
                      <p className="text-xs text-green-400">Aktif</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleDisconnectGoogle}
                className="mt-4 text-xs text-muted transition-colors hover:text-red-400"
              >
                Bağlantıyı Kes
              </button>
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-sm text-muted">
                Asistanınızın Gmail, Calendar, Drive ve Sheets&apos;e erişebilmesi
                için Google hesabınızı bağlayın.
              </p>
              <button
                onClick={handleConnectGoogle}
                disabled={connecting}
                className="mt-4 flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-accent transition-all hover:border-accent hover:bg-surface-hover disabled:opacity-50"
              >
                {connecting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-4 w-4 rounded-full border-2 border-accent/30 border-t-accent"
                  />
                ) : (
                  <>
                    <GoogleIcon />
                    Google Workspace Bağla
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
