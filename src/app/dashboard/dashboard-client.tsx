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

export function DashboardClient({ user, tenant, payment, currentMonth }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/giris");
    router.refresh();
  };

  const isPaid = payment?.status === "paid";

  return (
    <div className="px-6 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-start justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
              Dashboard
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-accent">
              Hoş geldiniz{tenant ? `, ${tenant.name.split(" ")[0]}` : ""}.
            </h1>
            <p className="mt-2 text-sm text-muted">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 text-sm text-muted transition-colors hover:text-accent"
          >
            Çıkış
          </button>
        </motion.div>

        {/* Payment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-12"
        >
          <div
            className={`rounded-2xl border p-8 ${
              isPaid
                ? "border-green-500/20 bg-green-500/5"
                : "border-yellow-500/20 bg-yellow-500/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  {formatMonth(currentMonth)} Ödeme Durumu
                </p>
                <p
                  className={`mt-3 text-2xl font-bold tracking-tight ${
                    isPaid ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {isPaid ? "Ödendi" : "Ödeme Bekleniyor"}
                </p>
                {isPaid && payment?.paid_at && (
                  <p className="mt-2 text-sm text-muted">
                    {new Date(payment.paid_at).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                {!isPaid && (
                  <div>
                    <p className="mt-2 text-sm text-muted">
                      Ayın ilk 5 günü içinde ödeme yapabilirsiniz.
                    </p>
                    <button
                      onClick={() => router.push("/odeme")}
                      className="mt-4 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105"
                    >
                      Ödeme Yap
                    </button>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-accent">$1.000</p>
                <p className="mt-1 text-sm text-muted">/ay</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Plan Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-8 rounded-2xl border border-border bg-surface p-8"
        >
          <h2 className="text-lg font-semibold tracking-tight text-accent">
            Planınız
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Plan", value: "Aylık Paket" },
              { label: "Görsel Hakkı", value: "1.000 / ay" },
              { label: "Workspace", value: "Google (OAuth)" },
              { label: "Durum", value: "Aktif" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between border-b border-border py-3 last:border-0 sm:border-0 sm:flex-col sm:py-0">
                <span className="text-sm text-muted">{item.label}</span>
                <span className="text-sm font-medium text-accent">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-8 rounded-2xl border border-border bg-surface p-8"
        >
          <h2 className="text-lg font-semibold tracking-tight text-accent">
            Destek
          </h2>
          <p className="mt-3 text-sm text-muted">
            Asistanınıza Telegram üzerinden ulaşabilirsiniz. Teknik destek
            ve fatura soruları için:
          </p>
          <p className="mt-3 text-sm">
            <a
              href="mailto:contact@biyikgokhan.com"
              className="text-accent transition-opacity hover:opacity-70"
            >
              contact@biyikgokhan.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
