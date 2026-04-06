"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function OdemePage() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    return cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Garanti BBVA sanal POS entegrasyonu
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="px-6 pt-32 pb-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
            Ödeme
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">
            Aboneliğinizi başlatın.
          </h1>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Plan özeti */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 rounded-2xl border border-border bg-surface p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Seçilen Plan
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-accent">
                Aylık Paket
              </h2>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-accent">$1.000</span>
                <span className="text-muted">/ay</span>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <ul className="flex flex-col gap-3">
                  {[
                    "1.000 görsel üretim hakkı",
                    "Sesli mesaj desteği",
                    "Takvim ve dosya yönetimi",
                    "15 GB bulut depolama",
                    "Teknik destek",
                    "Sürekli güncelleme",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Aylık tutar</span>
                  <span className="text-accent">$1.000</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted">KDV (%20)</span>
                  <span className="text-accent">$200</span>
                </div>
                <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
                  <span className="text-foreground">Toplam</span>
                  <span className="text-accent">$1.200</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ödeme formu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border bg-surface p-8">
              <h3 className="text-lg font-semibold tracking-tight text-accent">
                Kart Bilgileri
              </h3>
              <p className="mt-2 text-sm text-muted">
                Ödemeniz güvenli bağlantı üzerinden işlenir.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="cardName"
                    className="block text-xs font-medium uppercase tracking-[0.15em] text-muted"
                  >
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    id="cardName"
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Ad Soyad"
                    className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-xs font-medium uppercase tracking-[0.15em] text-muted"
                  >
                    Kart Numarası
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-muted"
                    >
                      Son Kullanma
                    </label>
                    <input
                      id="expiry"
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) =>
                        setExpiry(formatExpiry(e.target.value))
                      }
                      placeholder="AA/YY"
                      maxLength={5}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent font-mono"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-muted"
                    >
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                      }
                      placeholder="000"
                      maxLength={3}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-accent placeholder:text-muted/50 outline-none transition-colors focus:border-accent font-mono"
                    />
                  </div>
                </div>

                {/* Güvenlik bilgisi */}
                <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <p className="text-xs leading-relaxed text-muted">
                    Ödemeniz 256-bit SSL şifreleme ile korunmaktadır. Kart
                    bilgileriniz sunucularımızda saklanmaz.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-background transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
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
                    "Ödemeyi Tamamla — $1.200"
                  )}
                </button>

                <p className="text-center text-xs text-muted">
                  Ödeme yaparak{" "}
                  <Link
                    href="/hizmet-sartlari"
                    className="text-accent transition-opacity hover:opacity-70"
                  >
                    Hizmet Şartları
                  </Link>
                  {" "}ve{" "}
                  <Link
                    href="/gizlilik"
                    className="text-accent transition-opacity hover:opacity-70"
                  >
                    Gizlilik Politikası
                  </Link>
                  &apos;nı kabul etmiş olursunuz.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
