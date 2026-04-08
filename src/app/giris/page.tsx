"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function GirisPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Giriş başarısız.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="w-full max-w-md"
      >
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-accent"
          >
            superajan
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-accent">
            Giriş Yapın
          </h1>
          <p className="mt-3 text-sm text-muted">
            Hesabınıza erişmek için bilgilerinizi girin.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-[0.15em] text-muted"
            >
              E-posta
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@sirket.com"
              className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-[0.15em] text-muted"
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-background transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-5 w-5 rounded-full border-2 border-background/30 border-t-background"
              />
            ) : (
              "Giriş Yap"
            )}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-muted"
        >
          Hesabınız yok mu?{" "}
          <Link
            href="/iletisim"
            className="text-accent transition-opacity hover:opacity-70"
          >
            İletişime geçin
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
