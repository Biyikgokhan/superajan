import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — Superajan",
  description: "Kişisel verilerin işlenmesine ilişkin aydınlatma metni (KVKK)",
};

export default function GizlilikPage() {
  return (
    <LegalLayout
      title="Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni"
      subtitle="Gizlilik Politikası"
      lastUpdated="Nisan 2026"
    >
      <p>
        <strong>Veri İşleyen:</strong> Gökhan Bıyık (Hizmet Sağlayıcı)
        <br />
        <strong>VKN:</strong> 1680372767
        <br />
        <strong>Adres:</strong> Koca Mustafapaşa Mah. Org. Abdurrahman Nafiz
        Gürman Cad. Akyüz No: 32 İç Kapı No: 7 Fatih/İstanbul
      </p>

      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
        uyarınca, AI Asistan Sistemi kapsamında kişisel verilerinizin
        işlenmesine ilişkin aşağıdaki bilgilendirmeyi sunarız.
      </p>

      <h2>1. İşlenen Kişisel Veriler</h2>
      <table>
        <thead>
          <tr>
            <th>Veri Kategorisi</th>
            <th>Veri Türleri</th>
            <th>İşleme Amaçı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kimlik bilgileri</td>
            <td>Ad, soyad, Telegram kullanıcı bilgileri</td>
            <td>Kullanıcı tanımlama, iletişim</td>
          </tr>
          <tr>
            <td>İletişim verileri</td>
            <td>Telegram mesajları, sesli mesajlar</td>
            <td>Asistan hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Görsel veriler</td>
            <td>Ürün fotografları, üretilen görseller</td>
            <td>Görsel üretim hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Takvim verileri</td>
            <td>Etkinlik bilgileri, hatırlatmalar</td>
            <td>Takvim yönetimi hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Dosya verileri</td>
            <td>Google Drive&apos;da saklanan belgeler</td>
            <td>Dosya yönetimi hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Tercih verileri</td>
            <td>Kullanım tercihleri, notlar</td>
            <td>Hizmet kişiselleştirme</td>
          </tr>
          <tr>
            <td>Kullanım analitiği</td>
            <td>
              Özellik kullanım sıklığı, saatler, başarı oranları (anonim,
              içerik içermez)
            </td>
            <td>Hizmet geliştirme ve iyileştirme</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Kişisel Verilerin İşleme Amaçı</h2>
      <ul>
        <li>AI asistan hizmetinin sunulması ve yürütülmesi</li>
        <li>Görsel üretim taleplerinin karşılanması</li>
        <li>Takvim ve hatırlatma hizmetlerinin sağlanması</li>
        <li>Dosya yönetimi ve arşivleme hizmetlerinin sunulması</li>
        <li>Sistem bakımı, hata tespiti ve performans iyileştirmesi</li>
        <li>Hizmet kalitesinin artırılması</li>
        <li>
          Anonim kullanım istatistikleri ile hizmetin kullanıcının
          ihtiyaçlarına göre geliştirilmesi
        </li>
      </ul>

      <h2>3. Kişisel Verilerin Aktarılması</h2>
      <p>
        Kişisel verileriniz, hizmetin sunulması amacıyla aşağıdaki
        kategorilerdeki üçüncü taraf hizmet sağlayıcılarına aktarılmaktadır:
      </p>
      <table>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Ülke</th>
            <th>Aktarılan Veri</th>
            <th>Amaç</th>
            <th>Hukuki Dayanak</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Yapay zeka işleme</td>
            <td>ABD</td>
            <td>Metin mesajları</td>
            <td>Asistanın düşünme ve yanıt üretmesi</td>
            <td>Standart Sözleşme</td>
          </tr>
          <tr>
            <td>Görsel ve video üretim</td>
            <td>Çin</td>
            <td>Ürün fotografları</td>
            <td>Görsel ve video oluşturma</td>
            <td>Standart Sözleşme</td>
          </tr>
          <tr>
            <td>Ses işleme</td>
            <td>ABD</td>
            <td>Metin ve ses içerikleri</td>
            <td>Sesli mesaj üretimi, ses tanıma</td>
            <td>Standart Sözleşme</td>
          </tr>
          <tr>
            <td>Bulut depolama</td>
            <td>ABD</td>
            <td>Takvim verileri, dosyalar</td>
            <td>Takvim ve dosya yönetimi</td>
            <td>Standart Sözleşme</td>
          </tr>
          <tr>
            <td>Veri saklama</td>
            <td>ABD</td>
            <td>Tercihler, ozetler, kullanım metrikleri</td>
            <td>Uzun süreli hafıza ve hizmet geliştirme</td>
            <td>Standart Sözleşme</td>
          </tr>
          <tr>
            <td>Sunucu barındırma</td>
            <td>Finlandiya</td>
            <td>Tüm sistem verileri</td>
            <td>Sistem altyapısı</td>
            <td>Standart Sözleşme</td>
          </tr>
        </tbody>
      </table>

      <h3>İletişim Arayüzü</h3>
      <p>
        Hizmet su asamada Telegram Messenger uygulaması üzerinden
        sunulmaktadır. Telegram&apos;ın kendi gizlilik politikası ve veri
        saklama koşulları geçerlidir.
      </p>

      <h3>Altyapı Yönetimi</h3>
      <p>
        Üçüncü taraf hizmet hesapları ve abonelikleri Hizmet Sağlayıcı
        tarafından yönetilmekte olup, maliyetleri aylık hizmet bedeli
        kapsamında karşılanmaktadır. Hizmet Sağlayıcı, hizmet kalitesini
        korumak amacıyla altyapı bileşenlerini değiştirme hakkını saklı
        tutar.
      </p>
      <p>
        Yurt dısına veri aktarımı, KVKK madde 9 kapsamında acık rızanıza
        istinaden gerceklestirilmektedir.
      </p>

      <h2>4. Hukuki Sebep</h2>
      <ul>
        <li>
          <strong>KVKK madde 5/1:</strong> Acık rızanız
        </li>
        <li>
          <strong>KVKK madde 5/2-c:</strong> Bir sözleşmenin kurulması veya
          ifasıyla doğrudan ilgili olması
        </li>
      </ul>

      <h2>5. Saklama Süresi</h2>
      <table>
        <thead>
          <tr>
            <th>Veri Türü</th>
            <th>Saklama Yeri</th>
            <th>Saklama Süresi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anlık konuşma geçmişi</td>
            <td>Sunucu (session)</td>
            <td>Session süresince</td>
          </tr>
          <tr>
            <td>Sistem ve teknik loglar</td>
            <td>Sunucu (dosya)</td>
            <td>90 gün, otomatik silinir</td>
          </tr>
          <tr>
            <td>Uzun süreli hafıza</td>
            <td>Veritabanı</td>
            <td>Hizmet süresi boyunca</td>
          </tr>
          <tr>
            <td>Konusma arşivi</td>
            <td>Veritabanı</td>
            <td>Hizmet süresi boyunca</td>
          </tr>
          <tr>
            <td>Üretilen görseller ve videolar</td>
            <td>Sunucu + Google Drive</td>
            <td>Hizmet süresi boyunca</td>
          </tr>
          <tr>
            <td>Takvim ve hatırlatma verileri</td>
            <td>Google Calendar</td>
            <td>Hizmet süresi boyunca</td>
          </tr>
          <tr>
            <td>Dosyalar ve belgeler</td>
            <td>Google Drive</td>
            <td>Hizmet süresi boyunca</td>
          </tr>
        </tbody>
      </table>

      <h3>Otomatik Hafıza Kaydı</h3>
      <p>
        Asistan, hizmet kalitesini artırmak amacıyla konuşmalarınızdan onemli
        bilgileri otomatik olarak filtreleyip uzun süreli hafızasına kaydeder.
        Günlük nezaket ifadeleri ve düşük onemli içerikler kaydedilmez.
      </p>

      <h3>Veri Silme Haklarınız</h3>
      <ul>
        <li>
          <strong>Tam silme:</strong> Tüm kişisel verilerinizin, hafıza
          kayıtlarının ve konuşma arşivinin silinmesi
        </li>
        <li>
          <strong>Kısmi silme:</strong> Yalnızca hafıza kayıtları veya
          yalnızca konuşma arşivinin silinmesi
        </li>
        <li>
          <strong>Belirli kayıt silme:</strong> Belirli bir bilgi veya kaydın
          silinmesi
        </li>
      </ul>
      <p>
        Silme talebi Asistan aracılığıyla veya doğrudan Hizmet Sağlayıcıya
        bildirilerek yapılabilir. Talepler 30 gün içinde yerine getirilir.
      </p>
      <p>
        Hizmet sözleşmesinin sona ermesi halinde, tüm kişisel verileriniz
        tercihinize göre tarafınıza teslim edilir veya 30 gün içinde kalıcı
        olarak silinir.
      </p>

      <h2>6. Admin Erişimi</h2>
      <p>
        Hizmet Sağlayıcı, Sistemin teknik yönetimi için sunucuya tam erişim
        yetkisine sahiptir. Bu erişim yalnızca teknik arıza giderme, planlı
        bakım ve güvenlik tehdidi müdahalesi için kullanılır.
      </p>
      <p>
        Hizmet Sağlayıcı, Asistan ile olan yazışmalarınızı içerik izleme
        amacıyla incelemez.
      </p>

      <h2>7. Veri Güvenliği Önlemleri</h2>
      <ul>
        <li>Sunucu erişimi SSH anahtarı ile korunmaktadır</li>
        <li>API anahtarları şifreli ortamda saklanmaktadır</li>
        <li>Sunucu güvenlik duvarı yapılandırılmıştır</li>
        <li>Sistem logları belirli sure sonra otomatik silinmektedir</li>
        <li>Admin erişimi yalnızca Hizmet Sağlayıcı ile sınırlıdır</li>
        <li>
          Veritabanı erişimi Row Level Security ile izole edilmiştir — her
          kullanıcının verileri birbirinden ayrıdır
        </li>
        <li>
          Veri silme talepleri kayıt altına alınır ve doğrulanabilir şekilde
          yerine getirilir
        </li>
      </ul>

      <h2>8. Veri Sahibinin Hakları</h2>
      <p>KVKK madde 11 uyarınca aşağıdaki haklara sahipsiniz:</p>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>
          İşleme amacını ve amacına uygün kullanılıp kullanılmadığını
          öğrenme
        </li>
        <li>
          Yurt içinde veya yurt dısında aktarıldığı üçüncü kisileri bilme
        </li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
        <li>
          Islenmesini gerektiren sebeplerin ortadan kalkması halinde
          silinmesini isteme
        </li>
        <li>
          Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi sonucu
          aleyhinize bir sonucun ortaya çıkmasına itiraz etme
        </li>
      </ul>

      <h2>9. İletişim</h2>
      <p>Kişisel verilerinize ilişkin talepleriniz için:</p>
      <p>
        <strong>Veri İşleyen:</strong> Gökhan Bıyık
        <br />
        <strong>VKN:</strong> 1680372767
        <br />
        <strong>Adres:</strong> Koca Mustafapaşa Mah. Org. Abdurrahman Nafiz
        Gürman Cad. Akyüz No: 32 İç Kapı No: 7 Fatih/İstanbul
        <br />
        <strong>E-posta:</strong> contact@biyikgokhan.com
      </p>
    </LegalLayout>
  );
}
