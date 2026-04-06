import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iade ve Iptal Politikasi — Superajan",
  description: "AI Asistan hizmetine iliskin iade ve iptal kosulları",
};

export default function IadeIptalPage() {
  return (
    <LegalLayout
      title="Iade ve Iptal Politikasi"
      subtitle="Abonelik Yonetimi"
      lastUpdated="Nisan 2026"
    >
      <h2>Hizmet Suresi</h2>
      <p>
        Hizmet sozlesmesi, imza tarihinden itibaren 1 (bir) ay sureyle
        gecerlidir ve taraflardan birinin yazılı sona erdirme bildirimi
        yapmaması halinde aynı sureyle otomatik olarak yenilenir.
      </p>

      <h2>Iptal ve Fesih</h2>
      <p>
        Taraflardan her biri, yazılı bildirimde bulunarak sozlesmeyi sona
        erdirebilir. Sozlesme, fesih bildirimi yapılan sozlesme donemi
        sonunda sona erer.
      </p>
      <p>
        Ornegin: Sozlesme baslangıc tarihi 01/01/2026 ve fesih bildirimi
        tarihi 10/01/2026 ise sozlesme 01/02/2026 tarihinde sona erer.
        Tarafların sozlesme sona erme tarihine kadar hak ve yukumlulukleri
        devam eder.
      </p>

      <h2>Derhal Fesih Kosulları</h2>
      <p>Asagıdaki hallerde sozlesme derhal feshedilebilir:</p>
      <ul>
        <li>Taraflardan birinin sozlesme yukumluluklerini ihlal etmesi</li>
        <li>
          Kullanıcının sistemi yetkisiz amaclarla kullanması veya sistemi
          kopyalama/tersine muhendislik girisiminde bulunması
        </li>
        <li>Hizmet bedelinin 10 gunu asan surede odenmemesi</li>
      </ul>

      <h2>Iade Kosulları</h2>
      <p>
        Hizmet Saglayıcının kontrolu dısındaki sebeplerle (ucuncu taraf
        hizmet saglayıcıların hizmeti durdurması, API erisiminin kalıcı
        olarak kesilmesi, teknolojik altyapının kullanılamaz hale gelmesi
        vb.) hizmetin surdurulememesi durumunda:
      </p>
      <ul>
        <li>Hizmet Saglayıcı, kullanıcıyı derhal bilgilendirir</li>
        <li>
          Alternatif cozum uretmek icin makul sure tanınır (en fazla 15 gun)
        </li>
        <li>
          Alternatif cozum saglanamaması halinde, ilgili ayın
          kullanılmamıs kalan kısmının ucreti gun bazında hesaplanarak
          kullanıcıya iade edilir
        </li>
      </ul>
      <p>
        <strong>Iade hesabı:</strong> (aylık bedel / 30) &times; kalan gun
        sayısı
      </p>

      <h2>Fesih Sonrası Veriler</h2>
      <p>Sozlesmenin sona ermesi halinde:</p>
      <ul>
        <li>
          Kullanıcı verileri, uretilen icerikler ve hafıza kayıtları,
          kullanıcının tercihine gore teslim edilir veya kalıcı olarak
          silinir
        </li>
        <li>
          Teslim/silme islemi, sozlesme bitiminden itibaren 30 gun icinde
          tamamlanır
        </li>
        <li>
          Silme islemi tum katmanları kapsar: sunucu, veritabanı ve
          yedekler
        </li>
        <li>
          Google Drive&apos;daki dosyalar kullanıcının hesabında kalır
        </li>
      </ul>

      <h2>Iletisim</h2>
      <p>
        Iptal ve iade talepleriniz icin:
        <br />
        <strong>E-posta:</strong> contact@biyikgokhan.com
      </p>
    </LegalLayout>
  );
}
