import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmet Sartlari — Superajan",
  description: "AI Asistan Hizmet ve Lisans Sozlesmesi kosulları",
};

export default function HizmetSartlariPage() {
  return (
    <LegalLayout
      title="Hizmet Sartlari"
      subtitle="AI Asistan Hizmet ve Lisans Sozlesmesi"
      lastUpdated="Nisan 2026"
    >
      <h2>1. Sozlesmenin Konusu</h2>
      <p>
        Isbu kosullar, Hizmet Saglayıcı tarafından gelistirilen yapay zeka
        asistan sisteminin (&quot;Sistem&quot;) kullanıcıya sunulması, kullanım
        kosulları, tarafların hak ve yukumlulukleri ile kisisel verilerin
        korunmasına iliskin esasları duzenler.
      </p>
      <p>
        Sistem, kullanıcıya Telegram Messenger uygulaması bot arayuzu
        uzerinden erisim saglanan, yapay zeka destekli kisisel asistan
        hizmetini kapsar.
      </p>

      <h2>2. Tanımlar</h2>
      <ul>
        <li>
          <strong>Sistem:</strong> Hizmet Saglayıcı tarafından gelistirilen
          yapay zeka ajanlı platform ve tum bilesenleri
        </li>
        <li>
          <strong>Asistan:</strong> Sistem uzerinde calısan, kullanıcı ile
          Telegram aracılıgıyla iletisim kuran yapay zeka ajanı
        </li>
        <li>
          <strong>Kullanıcı Verileri:</strong> Kullanıcı tarafından sistem
          uzerinden paylasılan, uretilen veya saklanılan tum icerikler
        </li>
        <li>
          <strong>Uretilen Icerikler:</strong> Sistemin kullanıcı talebiyle
          olusturdugu cıktılar (gorseller, metinler, sesli mesajlar,
          raporlar)
        </li>
      </ul>

      <h2>3. Fikri Mulkiyet ve Sistem Sahipligi</h2>
      <p>
        Sistem, tum bilesenleri ile birlikte Hizmet Saglayıcının fikri hak ve
        mulkiyetindedir. Kullanıcıya, sozlesme kapsamında sistemi kullanma
        hakkı tanınır. Bu hak munhasır degildir, devredilemez ve surelidir.
      </p>
      <p>
        Kullanıcı, sistemi tersine muhendislik yapma, kopyalama, cogaltma,
        dagıtma, baska ortamlara aktarma veya turev eserler olusturma
        hakkına sahip degildir.
      </p>
      <p>
        Asistanın ismi ve karakter ozellikleri kullanıcı tarafından
        belirlenmis olup, bu tercihler kullanıcının kisisellestirme hakkı
        kapsamındadır. Ancak asistanı calıstıran yazılım altyapısı Hizmet
        Saglayıcının fikri mulkiyetinde kalır.
      </p>

      <h2>4. Veri Sahipligi</h2>
      <p>
        Kullanıcı verileri, munhasıran kullanıcıya aittir. Uretilen
        icerikler (gorseller, videolar, sesli mesajlar) kullanıcının
        mulkiyetindedir ve ticari dahil her turlu amacla serbestce
        kullanılabilir.
      </p>
      <p>Hizmet Saglayıcı, kullanıcı verilerini:</p>
      <ul>
        <li>Icerik izleme veya gozetim amacıyla incelemez</li>
        <li>
          Ucuncu taraflarla paylasmaz (hizmet icin zorunlu API saglayıcıları
          haric)
        </li>
        <li>Ticari veya pazarlama amacıyla kullanmaz</li>
        <li>Kendi projelerinde referans olarak kullanmaz</li>
      </ul>

      <h2>5. Hizmet Kapsamı</h2>
      <ul>
        <li>
          Gorsel uretim: Urun fotograflarından profesyonel katalog gorselleri
        </li>
        <li>Video uretim: Urun tanıtım videoları</li>
        <li>Sesli iletisim: Asistanın sesli mesaj ile yanıt vermesi</li>
        <li>Takvim yonetimi: Etkinlik ekleme, hatırlatma, program takibi</li>
        <li>Dosya yonetimi: Google Drive uzerinde duzenleme ve arsivleme</li>
        <li>Not alma ve hafıza: Tercih, karar ve bilgi kaydı</li>
      </ul>
      <p>
        Hizmet kapsamı dısındaki talepler ayrı bir mutabakat gerektirir.
      </p>

      <h2>6. Admin Erisimi ve Gizlilik</h2>
      <p>
        Hizmet Saglayıcı, sistemin saglıklı calısması icin tam teknik
        erisime sahiptir. Bu erisim munhasıran teknik bakım, hizmet
        surekliligi ve sistem gelistirme amacıyla kullanılır.
      </p>

      <h2>7. Ucuncu Taraf Hizmetler</h2>
      <p>
        Sistem, islevlerini yerine getirmek icin cesitli ucuncu taraf
        teknoloji hizmetlerinden faydalanır. Bu hizmet saglayıcıların kendi
        gizlilik politikaları ve veri isleme kosulları gecerlidir.
      </p>
      <p>
        Hizmet Saglayıcı, ucuncu taraf hizmetlerin veri guvenligi
        ihlallerinden dogrudan sorumlu degildir; ancak makul guvenlik
        onlemlerini almakla ve kullanıcıyı bilgilendirmekle yukumludur.
      </p>

      <h2>8. Veri Saklama ve Silme</h2>
      <p>
        Kullanıcı, tam silme, hafıza silme, konusma arsivi silme veya
        belirli kayıt silme talebinde bulunabilir. Talepler 30 gun icinde
        yerine getirilir.
      </p>
      <p>
        Sozlesmenin sona ermesi halinde kullanıcı verileri, tercihe gore
        teslim edilir veya 30 gun icinde kalıcı olarak silinir.
      </p>

      <h2>9. Hizmet Suresi ve Sona Erdirme</h2>
      <p>
        Sozlesme, imza tarihinden itibaren 1 (bir) ay sureyle gecerlidir ve
        taraflardan birinin yazılı sona erdirme bildirimi yapmaması halinde
        aynı sureyle otomatik olarak yenilenir.
      </p>
      <p>
        Taraflardan her biri, yazılı bildirimde bulunarak sozlesmeyi sona
        erdirebilir. Sozlesme, fesih bildirimi yapılan sozlesme donemi
        sonunda sona erer.
      </p>

      <h2>10. Ucret ve Odeme</h2>
      <p>
        Aylık hizmet bedeli tum ozellikleri, altyapı maliyetlerini ve teknik
        destegi kapsar. Odeme her ayın ilk 5 gunu icinde yapılır.
      </p>
      <p>
        Hizmet bedeli, altyapı maliyetlerindeki degisimlere baglı olarak
        guncellenebilir. Guncelleme en az 10 gun onceden yazılı olarak
        bildirilir.
      </p>

      <h2>11. Yapay Zeka Teknolojisi ve Sorumluluk Sınırlaması</h2>
      <p>
        Bu hizmet, yapay zeka teknolojisi uzerine kurulmustur. Yapay zeka
        sistemleri zaman zaman hatalı, eksik veya beklenmedik sonuclar
        uretebilir. Kullanıcı, uretilen icerikleri yayınlamadan veya ticari
        amacla kullanmadan once kontrol etmekle yukumludur.
      </p>

      <h2>12. Gizlilik</h2>
      <p>
        Taraflar, sozlesme kapsamında edindikleri ticari, teknik ve kisisel
        bilgileri gizli tutmakla yukumludur. Gizlilik yukumlulugu,
        sozlesmenin sona ermesinden itibaren 2 (iki) yıl sureyle devam eder.
      </p>

      <h2>13. Uyusmazlık Cozumu</h2>
      <p>
        Uyusmazlıklarda oncelikle dostane cozum yolu aranır. Dostane cozum
        saglanamaması halinde Istanbul Mahkemeleri ve Icra Daireleri
        yetkilidir. Sozlesme, Turkiye Cumhuriyeti hukukuna tabidir.
      </p>

      <h2>Iletisim</h2>
      <p>
        <strong>Hizmet Saglayıcı:</strong> Gokhan Bıyık
        <br />
        <strong>E-posta:</strong> contact@biyikgokhan.com
      </p>
    </LegalLayout>
  );
}
