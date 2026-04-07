"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface Tenant {
  id: string;
  company_name?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

function getTodayFormatted() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function ContractModal({
  user,
  tenant,
  onClose,
}: {
  user: User;
  tenant: Tenant | null;
  onClose: () => void;
}) {
  const buyerName =
    tenant?.contact_name || user.user_metadata?.full_name || user.email || "—";
  const buyerEmail = tenant?.contact_email || user.email || "—";
  const buyerPhone = tenant?.contact_phone || "—";
  const buyerCompany = tenant?.company_name || "—";
  const contractDate = getTodayFormatted();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease }}
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold tracking-tight text-accent">
          Mesafeli Satış Sözleşmesi
        </h2>
        <p className="mt-1 text-xs text-muted">
          Sözleşme Tarihi: {contractDate}
        </p>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted">
          {/* Taraflar */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              Taraflar
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted">
                  Satıcı (Hizmet Sağlayıcı)
                </p>
                <p className="mt-1 text-sm text-accent">Gökhan Bıyık</p>
                <p className="text-xs">Fatih VD - 1680372767</p>
                <p className="text-xs">contact@biyikgokhan.com</p>
                <p className="text-xs">+90 531 600 23 07</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">
                  Alıcı (Kullanıcı)
                </p>
                <p className="mt-1 text-sm text-accent">{buyerName}</p>
                {buyerCompany !== "—" && (
                  <p className="text-xs">{buyerCompany}</p>
                )}
                <p className="text-xs">{buyerEmail}</p>
                {buyerPhone !== "—" && (
                  <p className="text-xs">{buyerPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Hizmet Bilgileri */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              Satın Alınan Hizmet
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <span>Hizmet Adı</span>
                <span className="text-accent">
                  Superajan AI İş Asistanı — Aylık Plan
                </span>
              </div>
              <div className="flex justify-between">
                <span>Aylık Tutar</span>
                <span className="text-accent">$1.000</span>
              </div>
              <div className="flex justify-between">
                <span>KDV (%20)</span>
                <span className="text-accent">$200</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span className="text-foreground">KDV Dahil Toplam</span>
                <span className="text-accent">$1.200</span>
              </div>
              <div className="flex justify-between">
                <span>Ödeme Yöntemi</span>
                <span className="text-accent">Online POS</span>
              </div>
              <div className="flex justify-between">
                <span>Sözleşme Tarihi</span>
                <span className="text-accent">{contractDate}</span>
              </div>
            </div>
          </div>

          {/* Sözleşme Maddeleri */}
          <div className="space-y-3">
            <p>
              <strong className="text-accent">1. Konu —</strong> İşbu sözleşme,
              6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
              Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve
              yükümlülüklerini düzenler. Sözleşmenin konusu, belirsiz süreli
              aylık olarak faturalandırılan abonelik hizmeti satın alınması
              karşılığında yukarıda belirtilen hizmetlerin sağlanmasıdır.
            </p>
            <p>
              <strong className="text-accent">2. Hizmet Kapsamı —</strong> Yapay
              zeka destekli kişisel asistan (Telegram bot arayüzü), aylık 1.000
              görsel ve 50 video üretim hakkı, sesli mesaj ile iletişim, takvim yönetimi ve
              hatırlatmalar, müşterinin kendi Google Workspace hesabının yönetimi
              (Drive, Takvim, Gmail — OAuth izniyle erişim), not alma, hafıza ve
              bilgi kayıt sistemi, araştırma ve analiz desteği.
            </p>
            <p>
              <strong className="text-accent">3. Ödeme —</strong> Belirtilen
              fiyatlara KDV dahil değildir. Ödeme sırasında %20 KDV ayrıca
              hesaplanarak toplam tutara eklenir. Aylık abonelik, ALICI iptal
              etmediği müddetçe her ay otomatik olarak yenilenir.
            </p>
            <p>
              <strong className="text-accent">4. Hizmetin İfası —</strong>{" "}
              Hizmet, ödemenin onaylanmasını takiben 48 saat içinde aktif hale
              getirilir. Dijital hizmet niteliğinde olup fiziksel teslimat söz
              konusu değildir.
            </p>
            <p>
              <strong className="text-accent">5. Cayma Hakkı —</strong> ALICI,
              sözleşme tarihinden itibaren 14 gün içinde herhangi bir gerekçe
              göstermeksizin cayma hakkını kullanabilir. Cayma bildirimi
              contact@biyikgokhan.com adresine yazılı olarak yapılır. Hizmet
              bedeli 14 gün içinde iade edilir. Ancak, 6502 sayılı Kanun ve
              Mesafeli Sözleşmeler Yönetmeliği gereğince, ALICI&apos;nın onayı
              ile hizmetin fiilen kullanılmaya başlanması halinde cayma hakkı
              kullanılamaz.
            </p>
            <p>
              <strong className="text-accent">6. İptal —</strong> Cayma süresi
              dışında ALICI aboneliğini her zaman iptal edebilir. İptal mevcut
              dönemin sonunda geçerli olur. Kısmi iade yapılmaz.
            </p>
            <p>
              <strong className="text-accent">7. Kişisel Veriler —</strong>{" "}
              ALICI&apos;nın kişisel verileri 6698 sayılı KVKK kapsamında
              işlenir. Detaylar için{" "}
              <a href="/gizlilik" className="text-accent hover:underline">
                Gizlilik Politikası
              </a>{" "}
              sayfasını inceleyiniz.
            </p>
            <p>
              <strong className="text-accent">8. Uyuşmazlık —</strong> Tüketici
              Hakem Heyetleri ve ALICI&apos;nın veya SATICI&apos;nın yerleşim
              yerindeki Tüketici Mahkemeleri yetkilidir.
            </p>
            <p>
              <strong className="text-accent">9. Yürürlük —</strong> ALICI,
              ödemeyi tamamlayarak işbu sözleşmenin tüm şartlarını kabul etmiş
              sayılır.
            </p>
          </div>

          <p className="text-xs italic">
            Tam sözleşme metni için{" "}
            <a
              href="/mesafeli-satis-sozlesmesi"
              className="text-accent hover:underline"
            >
              Mesafeli Satış Sözleşmesi
            </a>{" "}
            sayfasını inceleyiniz.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-full border border-border text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Kapat
        </button>
      </motion.div>
    </motion.div>
  );
}

export function OdemeClient({
  user,
  tenant,
}: {
  user: User;
  tenant: Tenant | null;
}) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [showContract, setShowContract] = useState(false);

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
    if (!contractAccepted) return;
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
                    "1.000 görsel ve 50 video üretim hakkı",
                    "Sesli mesaj desteği",
                    "Takvim ve dosya yönetimi",
                    "Google Workspace entegrasyonu",
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

                {/* Sözleşme onay */}
                <div className="rounded-lg border border-border bg-background p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={contractAccepted}
                      onChange={(e) => setContractAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-accent"
                    />
                    <span className="text-xs leading-relaxed text-muted">
                      <button
                        type="button"
                        onClick={() => setShowContract(true)}
                        className="text-accent underline transition-opacity hover:opacity-70"
                      >
                        Mesafeli Satış Sözleşmesi
                      </button>
                      &apos;ni okudum ve kabul ediyorum. Satın alınan hizmet:
                      Superajan AI İş Asistanı — Aylık Plan, KDV dahil toplam
                      $1.200, ödeme yöntemi: Online POS.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !contractAccepted}
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

      {/* Sözleşme Modal */}
      <AnimatePresence>
        {showContract && (
          <ContractModal
            user={user}
            tenant={tenant}
            onClose={() => setShowContract(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
