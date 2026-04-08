"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const contactInfo = [
  { label: "Telefon", value: "+90 531 600 23 07", href: "tel:+905316002307" },
  { label: "E-posta", value: "contact@biyikgokhan.com", href: "mailto:contact@biyikgokhan.com" },
  { label: "Konum", value: "İstanbul, Türkiye", href: null },
  { label: "Web", value: "biyikgokhan.com", href: "https://biyikgokhan.com/" },
];

export default function IletisimPage() {
  return (
    <div className="px-6 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
            İletişim
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">
            Görüşelim.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Hizmetimiz hakkında bilgi almak, demo talep etmek veya sorularınız
            için bizimle iletişime gecin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
              className="rounded-xl border border-border bg-surface p-8"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {info.label}
              </p>
              {info.href ? (
                <a
                  href={info.href}
                  className="mt-3 block text-lg text-accent transition-opacity hover:opacity-70"
                >
                  {info.value}
                </a>
              ) : (
                <p className="mt-3 text-lg text-accent">{info.value}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-16 rounded-xl border border-border bg-surface p-8"
        >
          <h2 className="text-xl font-semibold tracking-tight text-accent">
            Hizmet Sağlayıcı Bilgileri
          </h2>
          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>
              <span className="text-foreground">Ad Soyad:</span> Gökhan
              Bıyık
            </p>
            <p>
              <span className="text-foreground">VKN:</span> 1680372767
            </p>
            <p>
              <span className="text-foreground">Adres:</span> Koca
              Mustafapaşa Mah. Org. Abdurrahman Nafiz Gürman Cad. Akyüz No:
              32 İç Kapı No: 7 Fatih/İstanbul
            </p>
            <p>
              <span className="text-foreground">E-posta:</span>{" "}
              <a
                href="mailto:contact@biyikgokhan.com"
                className="text-accent transition-opacity hover:opacity-70"
              >
                contact@biyikgokhan.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
