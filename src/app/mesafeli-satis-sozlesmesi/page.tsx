import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi — Superajan",
  description:
    "Mesafeli satış sözleşmesi ön bilgilendirme formu ve sözleşme koşulları",
};

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <LegalLayout
      title="Mesafeli Satış Sözleşmesi"
      subtitle="Ön Bilgilendirme ve Sözleşme Koşulları"
      lastUpdated="Nisan 2026"
    >
      <h2>1. Taraflar</h2>
      <p>
        <strong>Satıcı (Hizmet Sağlayıcı):</strong>
        <br />
        Ad Soyad: Gökhan Bıyık
        <br />
        Adres: İstanbul, Türkiye
        <br />
        E-posta: contact@biyikgokhan.com
        <br />
        Telefon: +90 531 600 23 07
      </p>
      <p>
        <strong>Alıcı (Kullanıcı):</strong> Hizmeti satın alan gerçek veya
        tüzel kişi.
      </p>

      <h2>2. Sözleşmenin Konusu</h2>
      <p>
        İşbu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve
        Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve
        yükümlülüklerini düzenler.
      </p>
      <p>
        Sözleşmenin konusu, Satıcı tarafından Alıcıya sunulan yapay zeka
        destekli kişisel iş asistanı hizmetidir (&quot;Superajan&quot;). Hizmet,
        Telegram Messenger uygulaması üzerinden bot arayüzü ile sunulur.
      </p>

      <h2>3. Hizmet Bilgileri</h2>
      <p>
        <strong>Hizmet Adı:</strong> Superajan — AI İş Asistanı
        <br />
        <strong>Hizmet Kapsamı:</strong>
      </p>
      <ul>
        <li>Yapay zeka destekli kişisel asistan (Telegram bot arayüzü)</li>
        <li>Görsel ve video üretim (ürün fotoğrafı, tanıtım videosu)</li>
        <li>Sesli mesaj ile iletişim</li>
        <li>Takvim yönetimi ve hatırlatmalar</li>
        <li>Google Drive dosya yönetimi</li>
        <li>Not alma, hafıza ve bilgi kayıt sistemi</li>
        <li>Araştırma ve analiz desteği</li>
      </ul>
      <p>
        Aylık hizmet bedeli, tüm özellikleri, altyapı maliyetlerini ve teknik
        desteği kapsar.
      </p>

      <h2>4. Hizmet Bedeli ve Ödeme</h2>
      <p>
        Hizmet bedeli, sipariş sırasında belirtilen tutardır. Ödeme, kredi
        kartı veya banka kartı ile çevrimiçi olarak gerçekleştirilir. Aylık
        abonelik şeklinde sunulan hizmetlerde ödeme her ayın başında tahsil
        edilir.
      </p>
      <p>
        Belirtilen fiyatlara KDV dahil değildir. Ödeme sırasında %20 KDV
        ayrıca hesaplanarak toplam tutara eklenir. Hizmet bedeli değişikliği
        en az 10 gün önceden yazılı olarak bildirilir.
      </p>

      <h2>5. Hizmetin İfası ve Teslimatı</h2>
      <p>
        Hizmet, ödemenin onaylanmasını takiben 48 saat içinde aktif hale
        getirilir. Hizmet aktivasyonu Telegram üzerinden gerçekleştirilir ve
        kullanıcıya bildirim yapılır.
      </p>
      <p>
        Dijital hizmet niteliğinde olup fiziksel teslimat söz konusu değildir.
      </p>

      <h2>6. Cayma Hakkı</h2>
      <p>
        Alıcı, hizmetin aktif hale getirildiği tarihten itibaren 14 (on dört)
        gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart
        ödemeksizin sözleşmeden cayma hakkına sahiptir.
      </p>
      <p>
        Cayma hakkının kullanılması için bu süre içinde Satıcıya e-posta
        (contact@biyikgokhan.com) ile yazılı bildirimde bulunulması
        yeterlidir.
      </p>
      <p>
        Cayma hakkının kullanılması halinde, ödenen bedel 14 gün içinde
        Alıcının ödeme aracına iade edilir.
      </p>
      <p>
        Ancak, 6502 sayılı Kanun&apos;un 15. maddesi ve Mesafeli Sözleşmeler
        Yönetmeliği&apos;nin 15. maddesi gereğince, Alıcının onayı ile ifasına
        başlanan hizmetlerde, hizmetin fiilen kullanılmaya başlanması halinde
        cayma hakkı kullanılamaz.
      </p>

      <h2>7. İptal ve İade Koşulları</h2>
      <p>
        Cayma süresi dışında, Alıcı aboneliğini her zaman iptal edebilir.
        İptal talebi, mevcut ödeme döneminin sonunda geçerli olur. Dönem
        içinde kalan süre için kısmi iade yapılmaz.
      </p>
      <p>
        Teknik bir arıza nedeniyle hizmetin kesintisiz sunulamaması halinde,
        kesinti süresi kadar hizmet süresi uzatılır veya kısmi iade yapılır.
      </p>

      <h2>8. Kişisel Verilerin Korunması</h2>
      <p>
        Alıcının kişisel verileri, 6698 sayılı Kişisel Verilerin Korunması
        Kanunu (KVKK) kapsamında işlenir. Detaylı bilgi için{" "}
        <a href="/gizlilik" className="text-accent hover:underline">
          Gizlilik Politikası
        </a>{" "}
        sayfasını inceleyiniz.
      </p>

      <h2>9. Uyuşmazlık Çözümü</h2>
      <p>
        İşbu sözleşmeden doğan uyuşmazlıklarda Tüketici Hakem Heyetleri ve
        Tüketici Mahkemeleri yetkilidir. Başvurular, T.C. Ticaret Bakanlığı
        Tüketici Bilgi Sistemi (TÜBİS) üzerinden yapılabilir.
      </p>

      <h2>10. Yürürlük</h2>
      <p>
        Alıcı, hizmeti satın alarak işbu sözleşmenin tüm koşullarını kabul
        etmiş sayılır. Sözleşme, ödemenin onaylanması ile yürürlüğe girer.
      </p>

      <h2>İletişim</h2>
      <p>
        <strong>Hizmet Sağlayıcı:</strong> Gökhan Bıyık
        <br />
        <strong>E-posta:</strong> contact@biyikgokhan.com
        <br />
        <strong>Telefon:</strong> +90 531 600 23 07
      </p>
    </LegalLayout>
  );
}
