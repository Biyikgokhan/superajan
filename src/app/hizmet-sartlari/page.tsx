import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmet Şartları — Superajan",
  description: "AI Asistan Hizmet ve Lisans Sözleşmesi koşulları",
};

export default function HizmetSartlariPage() {
  return (
    <LegalLayout
      title="Hizmet Şartları"
      subtitle="AI Asistan Hizmet ve Lisans Sözleşmesi"
      lastUpdated="Nisan 2026"
    >
      <h2>1. Sözleşmenin Konusu</h2>
      <p>
        İşbu koşullar, Hizmet Sağlayıcı tarafından geliştirilen yapay zeka
        asistan sisteminin (&quot;Sistem&quot;) kullanıcıya sunulması, kullanım
        koşulları, tarafların hak ve yükümlülükleri ile kişisel verilerin
        korunmasına ilişkin esasları düzenler.
      </p>
      <p>
        Sistem, kullanıcıya Telegram Messenger uygulaması bot arayüzü
        üzerinden erişim sağlanan, yapay zeka destekli kişisel asistan
        hizmetini kapsar.
      </p>

      <h2>2. Tanımlar</h2>
      <ul>
        <li>
          <strong>Sistem:</strong> Hizmet Sağlayıcı tarafından geliştirilen
          yapay zeka ajanlı platform ve tüm bileşenleri
        </li>
        <li>
          <strong>Asistan:</strong> Sistem üzerinde çalışan, kullanıcı ile
          Telegram aracılığıyla iletişim kuran yapay zeka ajanı
        </li>
        <li>
          <strong>Kullanıcı Verileri:</strong> Kullanıcı tarafından sistem
          üzerinden paylaşılan, üretilen veya saklanılan tüm içerikler
        </li>
        <li>
          <strong>Üretilen İçerikler:</strong> Sistemin kullanıcı talebiyle
          oluşturduğu çıktılar (görseller, metinler, sesli mesajlar,
          raporlar)
        </li>
      </ul>

      <h2>3. Fikri Mülkiyet ve Sistem Sahipliği</h2>
      <p>
        Sistem, tüm bileşenleri ile birlikte Hizmet Sağlayıcının fikri hak ve
        mülkiyetindedir. Kullanıcıya, sözleşme kapsamında sistemi kullanma
        hakkı tanınır. Bu hak münhasır değildir, devredilemez ve sürelidir.
      </p>
      <p>
        Kullanıcı, sistemi tersine mühendislik yapma, kopyalama, çoğaltma,
        dağıtma, başka ortamlara aktarma veya türev eserler oluşturma
        hakkına sahip değildir.
      </p>
      <p>
        Asistanın ismi ve karakter özellikleri kullanıcı tarafından
        belirlenmiş olup, bu tercihler kullanıcının kişiselleştirme hakkı
        kapsamındadır. Ancak asistanı çalıştıran yazılım altyapısı Hizmet
        Sağlayıcının fikri mülkiyetinde kalır.
      </p>

      <h2>4. Veri Sahipliği</h2>
      <p>
        Kullanıcı verileri, münhasıran kullanıcıya aittir. Üretilen
        içerikler (görseller, videolar, sesli mesajlar) kullanıcının
        mülkiyetindedir ve ticari dahil her türlü amacla serbestce
        kullanılabilir.
      </p>
      <p>Hizmet Sağlayıcı, kullanıcı verilerini:</p>
      <ul>
        <li>İçerik izleme veya gözetim amacıyla incelemez</li>
        <li>
          Üçüncü taraflarla paylaşmaz (hizmet için zorunlu API sağlayıcıları
          haric)
        </li>
        <li>Ticari veya pazarlama amacıyla kullanmaz</li>
        <li>Kendi projelerinde referans olarak kullanmaz</li>
      </ul>

      <h2>5. Hizmet Kapsamı</h2>
      <ul>
        <li>
          Görsel üretim: Ürün fotograflarından profesyonel katalog görselleri
        </li>
        <li>Video üretim: Ürün tanıtım videoları</li>
        <li>Sesli iletişim: Asistanın sesli mesaj ile yanıt vermesi</li>
        <li>Takvim yönetimi: Etkinlik ekleme, hatırlatma, program takibi</li>
        <li>Dosya yönetimi: Google Drive üzerinde düzenleme ve arşivleme</li>
        <li>Not alma ve hafıza: Tercih, karar ve bilgi kaydı</li>
      </ul>
      <p>
        Hizmet kapsamı dısındaki talepler ayrı bir mutabakat gerektirir.
      </p>

      <h2>6. Admin Erişimi ve Gizlilik</h2>
      <p>
        Hizmet Sağlayıcı, sistemin sağlıklı çalışması için tam teknik
        erişime sahiptir. Bu erişim münhasıran teknik bakım, hizmet
        sürekliliği ve sistem geliştirme amacıyla kullanılır.
      </p>

      <h2>7. Üçüncü Taraf Hizmetler</h2>
      <p>
        Sistem, işlevlerini yerine getirmek için çeşitli üçüncü taraf
        teknoloji hizmetlerinden faydalanır. Bu hizmet sağlayıcıların kendi
        gizlilik politikaları ve veri işleme koşulları geçerlidir.
      </p>
      <p>
        Hizmet Sağlayıcı, üçüncü taraf hizmetlerin veri güvenliği
        ihlallerinden doğrudan sorumlu değildir; ancak makul güvenlik
        önlemlerini almakla ve kullanıcıyı bilgilendirmekle yükümlüdür.
      </p>

      <h2>8. Veri Saklama ve Silme</h2>
      <p>
        Kullanıcı, tam silme, hafıza silme, konuşma arşivi silme veya
        belirli kayıt silme talebinde bulunabilir. Talepler 30 gün içinde
        yerine getirilir.
      </p>
      <p>
        Sözleşmenin sona ermesi halinde kullanıcı verileri, tercihe göre
        teslim edilir veya 30 gün içinde kalıcı olarak silinir.
      </p>

      <h2>9. Hizmet Süresi ve Sona Erdirme</h2>
      <p>
        Sözleşme, imza tarihinden itibaren 1 (bir) ay süreyle geçerlidir ve
        taraflardan birinin yazılı sona erdirme bildirimi yapmaması halinde
        aynı süreyle otomatik olarak yenilenir.
      </p>
      <p>
        Taraflardan her biri, yazılı bildirimde bulunarak sözleşmeyi sona
        erdirebilir. Sözleşme, fesih bildirimi yapılan sözleşme dönemi
        sonunda sona erer.
      </p>

      <h2>10. Ücret ve Ödeme</h2>
      <p>
        Aylık hizmet bedeli tüm özellikleri, altyapı maliyetlerini ve teknik
        desteği kapsar. Ödeme her ayın ilk 5 günü içinde yapılır.
      </p>
      <p>
        Hizmet bedeli, altyapı maliyetlerindeki değişimlere bağlı olarak
        güncellenebilir. Güncelleme en az 10 gün önceden yazılı olarak
        bildirilir.
      </p>

      <h2>11. Yapay Zeka Teknolojisi ve Sorumluluk Sınırlaması</h2>
      <p>
        Bu hizmet, yapay zeka teknolojisi üzerine kurulmuştur. Yapay zeka
        sistemleri zaman zaman hatalı, eksik veya beklenmedik sonuçlar
        üretebilir. Kullanıcı, üretilen içerikleri yayınlamadan veya ticari
        amacla kullanmadan önce kontrol etmekle yükümlüdür.
      </p>

      <h2>12. Gizlilik</h2>
      <p>
        Taraflar, sözleşme kapsamında edindikleri ticari, teknik ve kişisel
        bilgileri gizli tutmakla yükümlüdür. Gizlilik yükümlülüğü,
        sözleşmenin sona ermesinden itibaren 2 (iki) yıl süreyle devam eder.
      </p>

      <h2>13. Uyuşmazlık Çözümü</h2>
      <p>
        Uyuşmazlıklarda öncelikle dostane çözüm yolu aranır. Dostane çözüm
        sağlanamaması halinde İstanbul Mahkemeleri ve Icra Daireleri
        yetkilidir. Sözleşme, Türkiye Cumhuriyeti hukukuna tabidir.
      </p>

      <h2>İletişim</h2>
      <p>
        <strong>Hizmet Sağlayıcı:</strong> Gökhan Bıyık
        <br />
        <strong>E-posta:</strong> contact@biyikgokhan.com
      </p>
    </LegalLayout>
  );
}
