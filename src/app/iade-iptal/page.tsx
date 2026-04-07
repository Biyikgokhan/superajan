import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İade ve İptal Politikası — Superajan",
  description: "AI Asistan hizmetine ilişkin iade ve iptal koşulları",
};

export default function IadeIptalPage() {
  return (
    <LegalLayout
      title="İade ve İptal Politikası"
      subtitle="Abonelik Yönetimi"
      lastUpdated="Nisan 2026"
    >
      <h2>Hizmet Süresi</h2>
      <p>
        Hizmet sözleşmesi, imza tarihinden itibaren 1 (bir) ay süreyle
        geçerlidir ve taraflardan birinin yazılı sona erdirme bildirimi
        yapmaması halinde aynı süreyle otomatik olarak yenilenir.
      </p>

      <h2>İptal ve Fesih</h2>
      <p>
        Taraflardan her biri, yazılı bildirimde bulunarak sözleşmeyi sona
        erdirebilir. Sözleşme, fesih bildirimi yapılan sözleşme dönemi
        sonunda sona erer.
      </p>
      <p>
        Örneğin: Sözleşme başlangıç tarihi 01/01/2026 ve fesih bildirimi
        tarihi 10/01/2026 ise sözleşme 01/02/2026 tarihinde sona erer.
        Tarafların sözleşme sona erme tarihine kadar hak ve yükümlülükleri
        devam eder.
      </p>

      <h2>Derhal Fesih Koşulları</h2>
      <p>Aşağıdaki hallerde sözleşme derhal feshedilebilir:</p>
      <ul>
        <li>Taraflardan birinin sözleşme yükümlülüklerini ihlal etmesi</li>
        <li>
          Kullanıcının sistemi yetkisiz amaclarla kullanması veya sistemi
          kopyalama/tersine mühendislik girişiminde bulunması
        </li>
        <li>Hizmet bedelinin 10 günü asan surede ödenmemesi</li>
      </ul>

      <h2>Cayma Hakkı</h2>
      <p>
        AB ve Türkiye&apos;de ikamet eden kullanıcılar, dijital içerik
        tüketilmemişse, satın alma tarihinden itibaren 14 gün içinde
        herhangi bir gerekçe göstermeksizin sözleşmeden cayma hakkına
        sahiptir.
      </p>

      <h2>İade Koşulları</h2>
      <p>
        Hizmet Sağlayıcının kontrolü dısındaki sebeplerle (üçüncü taraf
        hizmet sağlayıcıların hizmeti durdurması, API erişiminin kalıcı
        olarak kesilmesi, teknolojik altyapının kullanılamaz hale gelmesi
        vb.) hizmetin sürdürülememesi durumunda:
      </p>
      <ul>
        <li>Hizmet Sağlayıcı, kullanıcıyı derhal bilgilendirir</li>
        <li>
          Alternatif çözüm uretmek için makul sure tanınır (en fazla 15 gün)
        </li>
        <li>
          Alternatif çözüm sağlanamaması halinde, ilgili ayın
          kullanılmamış kalan kısmının ücreti gün bazında hesaplanarak
          kullanıcıya iade edilir
        </li>
      </ul>
      <p>
        <strong>İade hesabı:</strong> (aylık bedel / 30) &times; kalan gün
        sayısı
      </p>

      <h2>Fesih Sonrası Veriler</h2>
      <p>Sözleşmenin sona ermesi halinde:</p>
      <ul>
        <li>
          Kullanıcı verileri, üretilen içerikler ve hafıza kayıtları,
          kullanıcının tercihine göre teslim edilir veya kalıcı olarak
          silinir
        </li>
        <li>
          Teslim/silme islemi, sözleşme bitiminden itibaren 30 gün içinde
          tamamlanır
        </li>
        <li>
          Silme işlemi tüm katmanları kapsar: sunucu, veritabanı
          ve yedekler. Müşterinin kendi Google Workspace hesabındaki
          veriler müşteriye ait olup Hizmet Sağlayıcı tarafından silinmez
        </li>
      </ul>

      <h2>İletişim</h2>
      <p>
        İptal ve iade talepleriniz için:
        <br />
        <strong>E-posta:</strong> contact@biyikgokhan.com
      </p>
    </LegalLayout>
  );
}
