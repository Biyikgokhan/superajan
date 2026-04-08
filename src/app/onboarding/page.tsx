"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const sectors = [
  "E-Ticaret",
  "Perakende",
  "Üretim",
  "Hizmet",
  "Teknoloji",
  "Sağlık",
  "Eğitim",
  "Gıda",
  "Tekstil",
  "İnşaat",
  "Diğer",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim() || !company.trim()) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company, phone, sector }),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="w-full max-w-lg"
      >
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-accent"
          >
            superajan
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-accent">
            Hoş geldiniz
          </h1>
          <p className="mt-3 text-sm text-muted">
            Asistanınızı kurmak için birkaç bilgiye ihtiyacımız var.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-10 flex items-center gap-2">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Step 1: Name & Company */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease }}
            className="mt-8 space-y-6"
          >
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Adınız Soyadınız *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Gökhan Özdal"
                className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Şirket Adı *
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Marcomen"
                className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent"
              />
            </div>

            <button
              onClick={() => {
                if (!name.trim() || !company.trim()) {
                  setError("Lütfen adınızı ve şirket adınızı girin.");
                  return;
                }
                setError("");
                setStep(2);
              }}
              className="flex h-14 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-background transition-all hover:scale-[1.02]"
            >
              Devam Et
            </button>
          </motion.div>
        )}

        {/* Step 2: Phone & Sector */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease }}
            className="mt-8 space-y-6"
          >
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Telefon
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+90 5XX XXX XX XX"
                className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Sektör
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSector(sector === s ? "" : s)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      sector === s
                        ? "border-accent bg-accent text-background"
                        : "border-border text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex h-14 flex-1 items-center justify-center rounded-full border border-border text-sm font-medium text-muted transition-all hover:border-accent hover:text-accent"
              >
                Geri
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex h-14 flex-[2] items-center justify-center rounded-full bg-accent text-sm font-medium text-background transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="h-5 w-5 rounded-full border-2 border-background/30 border-t-background"
                  />
                ) : (
                  "Başlayın"
                )}
              </button>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-muted"
        >
          Devam ederek{" "}
          <Link
            href="/hizmet-sartlari"
            className="text-accent/70 transition-opacity hover:opacity-70"
          >
            Hizmet Şartları
          </Link>
          {" "}ve{" "}
          <Link
            href="/gizlilik"
            className="text-accent/70 transition-opacity hover:opacity-70"
          >
            Gizlilik Politikası
          </Link>
          &apos;nı kabul etmiş olursunuz.
        </motion.p>
      </motion.div>
    </div>
  );
}
