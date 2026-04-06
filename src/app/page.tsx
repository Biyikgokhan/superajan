"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const features = [
  {
    number: "01",
    title: "Gorsel Uretim",
    description:
      "Urun fotograflarınızdan profesyonel katalog gorselleri. Taban degisimi, renk alternatifleri, tasarım varyasyonları.",
  },
  {
    number: "02",
    title: "Video Uretim",
    description:
      "Urun tanıtım videoları. Statik gorselleriniz hareketli icerige donusur.",
  },
  {
    number: "03",
    title: "Takvim Yonetimi",
    description:
      "Toplantılar, fuarlar, uretim takvimleri. Hatırlatmalar ve program takibi.",
  },
  {
    number: "04",
    title: "Dosya Yonetimi",
    description:
      "Belgelerinizin duzenlenmesi, arsivlenmesi, bulunması. Bulut depolama dahil.",
  },
  {
    number: "05",
    title: "Sesli Iletisim",
    description:
      "Asistanınız sesli mesajlarla yanıt verir. Dogal ve akıcı iletisim.",
  },
  {
    number: "06",
    title: "Akıllı Hafıza",
    description:
      "Tercihlerinizi, kararlarınızı, notlarınızı hatırlar. Her gorusmede sıfırdan baslamaz.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {/* Grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-muted"
          >
            Yapay Zeka Asistan Hizmeti
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="text-5xl font-bold leading-[1.1] tracking-tight text-accent md:text-7xl lg:text-8xl"
          >
            Isinizi
            <br />
            <span className="text-muted">yoneten</span>
            <br />
            asistan.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-muted"
          >
            Gorsel uretim, takvim, dosya yonetimi ve daha fazlası.
            Telegram uzerinden erisebileceginiz kisisel is asistanınız.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/iletisim"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-accent px-8 text-sm font-medium text-background transition-transform hover:scale-105"
            >
              <span className="relative z-10">Hemen Baslayın</span>
            </Link>
            <Link
              href="/#ozellikler"
              className="inline-flex h-14 items-center justify-center rounded-full border border-border px-8 text-sm text-muted transition-all hover:border-accent hover:text-accent"
            >
              Ozellikleri Kesfet
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border border-border p-1"
          >
            <div className="h-2 w-full rounded-full bg-muted" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="ozellikler" className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
              Ozellikler
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">
              Tek asistan,
              <br />
              <span className="text-muted">tum isler.</span>
            </h2>
          </motion.div>

          <div className="mt-20 grid gap-0 md:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.number}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="group border-t border-border p-8 transition-colors hover:bg-surface-hover md:border-l md:first:border-l-0 md:[&:nth-child(odd)]:border-l-0"
              >
                <span className="font-mono text-xs text-muted">
                  {feature.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-accent">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="text-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
              Fiyatlandırma
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">
              Basit ve seffaf.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mx-auto mt-16 max-w-lg rounded-2xl border border-border bg-surface p-10"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
              Aylık Paket
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-accent">
                $1.000
              </span>
              <span className="text-muted">/ay</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tum ozellikler, altyapı maliyetleri ve teknik destek dahil.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Aylık 1.000 gorsel uretim hakkı",
                "Sesli mesaj destegi",
                "Takvim ve dosya yonetimi",
                "15 GB bulut depolama",
                "7/24 teknik destek",
                "Surekli guncelleme ve iyilestirme",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/iletisim"
              className="mt-10 flex h-14 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              Iletisime Gecin
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-accent md:text-5xl">
            Hazır mısınız?
          </h2>
          <p className="mt-6 text-lg text-muted">
            Yapay zeka asistanınız sizi bekliyor.
          </p>
          <Link
            href="/iletisim"
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Hemen Baslayın
          </Link>
        </motion.div>
      </section>
    </>
  );
}
