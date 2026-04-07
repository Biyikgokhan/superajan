"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type Memory = {
  id: string;
  category: string;
  summary: string;
  importance: number;
  created_at: string;
  tags?: string[];
};

type Conversation = {
  id: string;
  role: string;
  content: string;
  importance: number;
  created_at: string;
};

type Usage = {
  id: string;
  feature: string;
  status: string;
  created_at: string;
};

type Props = {
  user: { id: string; email?: string; user_metadata?: { full_name?: string } };
  tenant: { id: string; name: string; slug: string } | null;
  payment: {
    id: string;
    period: string;
    amount: number;
    currency: string;
    status: string;
    paid_at: string | null;
  } | null;
  currentMonth: string;
  memories: Memory[];
  conversations: Conversation[];
  usage: Usage[];
};

const FEATURE_LABELS: Record<string, string> = {
  image_gen: "Gorsel",
  sole_swap: "Taban",
  video_gen: "Video",
  voice_message: "Sesli Mesaj",
  calendar: "Takvim",
  drive: "Drive",
  research: "Arastirma",
  reminder: "Hatirlatma",
  memory: "Hafiza",
  conversation: "Konusma",
  admin_notify: "Bildirim",
  other: "Diger",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMonth(period: string) {
  const [year, month] = period.split("-");
  const months = [
    "Ocak", "Subat", "Mart", "Nisan", "Mayis", "Haziran",
    "Temmuz", "Agustos", "Eylul", "Ekim", "Kasim", "Aralik",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

// --- Section Components ---

function UpcomingEvents({ memories }: { memories: Memory[] }) {
  const events = memories
    .filter((m) => m.category === "event" || m.category === "project" || m.category === "note")
    .filter((m) => m.importance >= 7)
    .slice(0, 6);

  if (!events.length) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          Takvim ve Hatirlatmalar
        </h2>
      </div>
      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className="flex items-start gap-3 rounded-lg border border-border/50 bg-background p-3">
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground leading-relaxed">{e.summary}</p>
              <p className="mt-1 text-xs text-muted">{formatDate(e.created_at)}</p>
            </div>
            {e.importance >= 9 && (
              <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                Onemli
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessInsights({ memories }: { memories: Memory[] }) {
  const business = memories
    .filter((m) => m.category === "business" || m.category === "preference")
    .slice(0, 5);

  if (!business.length) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          Is Notlari
        </h2>
      </div>
      <div className="space-y-3">
        {business.map((m) => (
          <div key={m.id} className="rounded-lg border border-border/50 bg-background p-3">
            <p className="text-sm text-foreground leading-relaxed">{m.summary}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted">
                {m.category}
              </span>
              <span className="text-[10px] text-muted">{formatDate(m.created_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity({ conversations }: { conversations: Conversation[] }) {
  const recent = conversations.filter((c) => c.importance >= 4).slice(0, 8);

  if (!recent.length) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          Son Konusmalar
        </h2>
      </div>
      <div className="space-y-2">
        {recent.map((c) => (
          <div key={c.id} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
            <span className={`mt-1 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${
              c.role === "user" ? "bg-accent/10 text-accent" : "bg-surface text-muted"
            }`}>
              {c.role === "user" ? "Siz" : "Sera"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted leading-relaxed truncate">
                {c.content.length > 120 ? c.content.slice(0, 120) + "..." : c.content}
              </p>
              <p className="mt-0.5 text-[10px] text-muted/60">{formatDateTime(c.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsageStats({ usage }: { usage: Usage[] }) {
  const featureCounts: Record<string, number> = {};
  for (const u of usage) {
    const f = u.feature || "other";
    featureCounts[f] = (featureCounts[f] || 0) + 1;
  }

  const sorted = Object.entries(featureCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const max = sorted.length ? sorted[0][1] : 1;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          Kullanim Istatistikleri
        </h2>
      </div>
      <div className="space-y-3">
        {sorted.map(([feature, count]) => (
          <div key={feature}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted">
                {FEATURE_LABELS[feature] || feature}
              </span>
              <span className="text-xs font-medium text-accent">{count}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-border">
              <div
                className="h-1.5 rounded-full bg-accent/60 transition-all"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-muted/60">
        Toplam {usage.length} islem
      </p>
    </div>
  );
}

function PlanCard({
  payment,
  currentMonth,
  onPayment,
}: {
  payment: Props["payment"];
  currentMonth: string;
  onPayment: () => void;
}) {
  const isPaid = payment?.status === "paid";

  return (
    <div className={`rounded-2xl border p-6 ${
      isPaid
        ? "border-green-500/20 bg-green-500/5"
        : "border-accent/20 bg-accent/5"
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
            {formatMonth(currentMonth)}
          </p>
          <p className={`mt-2 text-lg font-bold tracking-tight ${
            isPaid ? "text-green-400" : "text-accent"
          }`}>
            {isPaid ? "Odendi" : "Odeme Bekleniyor"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-accent">$1.000</p>
          <p className="text-xs text-muted">+ KDV /ay</p>
        </div>
      </div>
      {!isPaid && (
        <button
          onClick={onPayment}
          className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-accent text-xs font-medium text-background transition-transform hover:scale-[1.02]"
        >
          Odeme Yap
        </button>
      )}
    </div>
  );
}

function QuickStats({ memories, conversations, usage }: { memories: Memory[]; conversations: Conversation[]; usage: Usage[] }) {
  const stats = [
    { label: "Hafiza", value: String(memories.length), sub: "kayit" },
    { label: "Konusma", value: String(conversations.length), sub: "mesaj" },
    { label: "Islem", value: String(usage.length), sub: "toplam" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-surface p-4 text-center">
          <p className="text-2xl font-bold text-accent">{s.value}</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// --- Main Dashboard ---

export function DashboardClient({
  user,
  tenant,
  payment,
  currentMonth,
  memories,
  conversations,
  usage,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "activity">("overview");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/giris");
    router.refresh();
  };

  const firstName = tenant?.name?.split(" ")[0] ||
    user.user_metadata?.full_name?.split(" ")[0] || "";

  return (
    <div className="px-4 pt-28 pb-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-start justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
              Dashboard
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-accent sm:text-3xl">
              Hos geldiniz{firstName ? `, ${firstName}` : ""}.
            </h1>
            <p className="mt-1 text-sm text-muted">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 text-xs text-muted transition-colors hover:text-accent"
          >
            Cikis
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 flex gap-1 rounded-lg border border-border bg-surface p-1"
        >
          {[
            { key: "overview" as const, label: "Genel Bakis" },
            { key: "activity" as const, label: "Aktivite" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-md py-2 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-accent text-background"
                  : "text-muted hover:text-accent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        {activeTab === "overview" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8 space-y-6"
          >
            {/* Top row: Plan + Stats */}
            <div className="grid gap-6 lg:grid-cols-2">
              <PlanCard
                payment={payment}
                currentMonth={currentMonth}
                onPayment={() => router.push("/odeme")}
              />
              <QuickStats
                memories={memories}
                conversations={conversations}
                usage={usage}
              />
            </div>

            {/* Main grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              <UpcomingEvents memories={memories} />
              <BusinessInsights memories={memories} />
            </div>

            <UsageStats usage={usage} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <RecentActivity conversations={conversations} />
          </motion.div>
        )}

        {/* Support footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-border bg-surface p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-accent">Destek</h3>
              <p className="mt-1 text-xs text-muted">
                Asistanınıza Telegram uzerinden ulasabilirsiniz.
              </p>
            </div>
            <a
              href="mailto:contact@biyikgokhan.com"
              className="rounded-full border border-border px-4 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              Iletisim
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
