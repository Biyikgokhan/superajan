import Link from "next/link";

const legalLinks = [
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/hizmet-sartlari", label: "Hizmet Şartları" },
  { href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli Satış Sözleşmesi" },
  { href: "/iade-iptal", label: "İade ve İptal" },
  { href: "/iletisim", label: "İletişim" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold tracking-tight text-accent">
              superajan
            </p>
            <p className="mt-2 text-sm text-muted">
              Yapay zeka destekli kişisel iş asistanınız.
            </p>
          </div>

          {/* Legal links */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Yasal
            </p>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              İletişim
            </p>
            <p className="text-sm text-muted">+90 531 600 23 07</p>
            <p className="mt-1 text-sm text-muted">contact@biyikgokhan.com</p>
            <p className="mt-1 text-sm text-muted">İstanbul, Türkiye</p>
            <a href="https://biyikgokhan.com/" className="mt-1 block text-sm text-muted transition-colors hover:text-accent">biyikgokhan.com</a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Gökhan Bıyık. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
