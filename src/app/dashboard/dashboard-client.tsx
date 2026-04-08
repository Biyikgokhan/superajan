"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type Props = {
  user: { id: string; email?: string };
  tenant: { id: string; name: string; company: string } | null;
  payment: {
    id: string;
    period: string;
    amount: number;
    currency: string;
    status: string;
    paid_at: string | null;
  } | null;
  currentMonth: string;
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

export function DashboardClient({ user, tenant, payment, currentMonth }: Props) {
  const router = useRouter();
  const isPaid = payment?.status === "paid";
  const firstName = tenant?.name?.split(" ")[0] || "";

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
            Merhaba{firstName ? `, ${firstName}` : ""}.
          </h1>
          <p className="mt-1 text-sm text-muted">{tenant?.company}</p>
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
                { label: "Görsel Hakkı", value: "1.000 / ay" },
                { label: "Depolama", value: "15 GB" },
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

        {/* Google Workspace Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mt-6 rounded-2xl border border-border bg-surface p-6"
        >
          <h2 className="text-sm font-semibold tracking-tight text-accent">
            Bağlı Servisler
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                  <p className="text-xs text-green-400">Bağlı</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
