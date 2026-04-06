import { LegalLayout } from "@/components/legal-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikasi — Superajan",
  description: "Kisisel verilerin islenmesine iliskin aydınlatma metni (KVKK)",
};

export default function GizlilikPage() {
  return (
    <LegalLayout
      title="Kisisel Verilerin Islenmesine Iliskin Aydınlatma Metni"
      subtitle="Gizlilik Politikasi"
      lastUpdated="Nisan 2026"
    >
      <p>
        <strong>Veri Isleyen:</strong> Gokhan Bıyık (Hizmet Saglayıcı)
        <br />
        <strong>VKN:</strong> 1680372767
        <br />
        <strong>Adres:</strong> Koca Mustafapasa Mah. Org. Abdurrahman Nafiz
        Gurman Cad. Akyuz No: 32 Ic Kapı No: 7 Fatih/Istanbul
      </p>

      <p>
        6698 sayılı Kisisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
        uyarınca, AI Asistan Sistemi kapsamında kisisel verilerinizin
        islenmesine iliskin asagıdaki bilgilendirmeyi sunarız.
      </p>

      <h2>1. Islenen Kisisel Veriler</h2>
      <table>
        <thead>
          <tr>
            <th>Veri Kategorisi</th>
            <th>Veri Turleri</th>
            <th>Isleme Amacı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kimlik bilgileri</td>
            <td>Ad, soyad, Telegram kullanıcı bilgileri</td>
            <td>Kullanıcı tanımlama, iletisim</td>
          </tr>
          <tr>
            <td>Iletisim verileri</td>
            <td>Telegram mesajları, sesli mesajlar</td>
            <td>Asistan hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Gorsel veriler</td>
            <td>Urun fotografları, uretilen gorseller</td>
            <td>Gorsel uretim hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Takvim verileri</td>
            <td>Etkinlik bilgileri, hatırlatmalar</td>
            <td>Takvim yonetimi hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Dosya verileri</td>
            <td>Google Drive&apos;da saklanan belgeler</td>
            <td>Dosya yonetimi hizmetinin sunulması</td>
          </tr>
          <tr>
            <td>Tercih verileri</td>
            <td>Kullanım tercihleri, notlar</td>
            <td>Hizmet kisisellestirme</td>
          </tr>
          <tr>
            <td>Kullanım analitigi</td>
            <td>
              Ozellik kullanım sıklıgı, saatler, basarı oranları (anonim,
              icerik icermez)
            </td>
            <td>Hizmet gelistirme ve iyilestirme</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Kisisel Verilerin Isleme Amacı</h2>
      <ul>
        <li>AI asistan hizmetinin sunulması ve yurutulmesi</li>
        <li>Gorsel uretim taleplerinin karsılanması</li>
        <li>Takvim ve hatırlatma hizmetlerinin saglanması</li>
        <li>Dosya yonetimi ve arsivleme hizmetlerinin sunulması</li>
        <li>Sistem bakımı, hata tespiti ve performans iyilestirmesi</li>
        <li>Hizmet kalitesinin artırılması</li>
        <li>
          Anonim kullanım istatistikleri ile hizmetin kullanıcının
          ihtiyaclarına gore gelistirilmesi
        </li>
      </ul>

      <h2>3. Kisisel Verilerin Aktarılması</h2>
      <p>
        Kisisel verileriniz, hizmetin sunulması amacıyla asagıdaki
        kategorilerdeki ucuncu taraf hizmet saglayıcılarına aktarılmaktadır:
      </p>
      <table>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Ulke</th>
            <th>Aktarılan Veri</th>
            <th>Amac</th>
            <th>Hukuki Dayanak</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Yapay zeka isleme</td>
            <td>ABD</td>
            <td>Metin mesajları</td>
            <td>Asistanın dusunme ve yanıt uretmesi</td>
            <td>Standart Sozlesme</td>
          </tr>
          <tr>
            <td>Gorsel ve video uretim</td>
            <td>Cin</td>
            <td>Urun fotografları</td>
            <td>Gorsel ve video olusturma</td>
            <td>Standart Sozlesme</td>
          </tr>
          <tr>
            <td>Ses isleme</td>
            <td>ABD</td>
            <td>Metin ve ses icerikleri</td>
            <td>Sesli mesaj uretimi, ses tanıma</td>
            <td>Standart Sozlesme</td>
          </tr>
          <tr>
            <td>Bulut depolama</td>
            <td>ABD</td>
            <td>Takvim verileri, dosyalar</td>
            <td>Takvim ve dosya yonetimi</td>
            <td>Standart Sozlesme</td>
          </tr>
          <tr>
            <td>Veri saklama</td>
            <td>ABD</td>
            <td>Tercihler, ozetler, kullanım metrikleri</td>
            <td>Uzun sureli hafıza ve hizmet gelistirme</td>
            <td>Standart Sozlesme</td>
          </tr>
          <tr>
            <td>Sunucu barındırma</td>
            <td>Finlandiya</td>
            <td>Tum sistem verileri</td>
            <td>Sistem altyapısı</td>
            <td>Standart Sozlesme</td>
          </tr>
        </tbody>
      </table>

      <h3>Iletisim Arayuzu</h3>
      <p>
        Hizmet su asamada Telegram Messenger uygulaması uzerinden
        sunulmaktadır. Telegram&apos;ın kendi gizlilik politikası ve veri
        saklama kosulları gecerlidir.
      </p>

      <h3>Altyapı Yonetimi</h3>
      <p>
        Ucuncu taraf hizmet hesapları ve abonelikleri Hizmet Saglayıcı
        tarafından yonetilmekte olup, maliyetleri aylık hizmet bedeli
        kapsamında karsılanmaktadır. Hizmet Saglayıcı, hizmet kalitesini
        korumak amacıyla altyapı bilesenlerini degistirme hakkını saklı
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
          <strong>KVKK madde 5/2-c:</strong> Bir sozlesmenin kurulması veya
          ifasıyla dogrudan ilgili olması
        </li>
      </ul>

      <h2>5. Saklama Suresi</h2>
      <table>
        <thead>
          <tr>
            <th>Veri Turu</th>
            <th>Saklama Yeri</th>
            <th>Saklama Suresi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anlık konusma gecmisi</td>
            <td>Sunucu (session)</td>
            <td>Session suresince</td>
          </tr>
          <tr>
            <td>Sistem ve teknik loglar</td>
            <td>Sunucu (dosya)</td>
            <td>90 gun, otomatik silinir</td>
          </tr>
          <tr>
            <td>Uzun sureli hafıza</td>
            <td>Veritabanı</td>
            <td>Hizmet suresi boyunca</td>
          </tr>
          <tr>
            <td>Konusma arsivi</td>
            <td>Veritabanı</td>
            <td>Hizmet suresi boyunca</td>
          </tr>
          <tr>
            <td>Uretilen gorseller ve videolar</td>
            <td>Sunucu + Google Drive</td>
            <td>Hizmet suresi boyunca</td>
          </tr>
          <tr>
            <td>Takvim ve hatırlatma verileri</td>
            <td>Google Calendar</td>
            <td>Hizmet suresi boyunca</td>
          </tr>
          <tr>
            <td>Dosyalar ve belgeler</td>
            <td>Google Drive</td>
            <td>Hizmet suresi boyunca</td>
          </tr>
        </tbody>
      </table>

      <h3>Otomatik Hafıza Kaydı</h3>
      <p>
        Asistan, hizmet kalitesini artırmak amacıyla konusmalarınızdan onemli
        bilgileri otomatik olarak filtreleyip uzun sureli hafızasına kaydeder.
        Gunluk nezaket ifadeleri ve dusuk onemli icerikler kaydedilmez.
      </p>

      <h3>Veri Silme Haklarınız</h3>
      <ul>
        <li>
          <strong>Tam silme:</strong> Tum kisisel verilerinizin, hafıza
          kayıtlarının ve konusma arsivinin silinmesi
        </li>
        <li>
          <strong>Kısmi silme:</strong> Yalnızca hafıza kayıtları veya
          yalnızca konusma arsivinin silinmesi
        </li>
        <li>
          <strong>Belirli kayıt silme:</strong> Belirli bir bilgi veya kaydın
          silinmesi
        </li>
      </ul>
      <p>
        Silme talebi Asistan aracılıgıyla veya dogrudan Hizmet Saglayıcıya
        bildirilerek yapılabilir. Talepler 30 gun icinde yerine getirilir.
      </p>
      <p>
        Hizmet sozlesmesinin sona ermesi halinde, tum kisisel verileriniz
        tercihinize gore tarafınıza teslim edilir veya 30 gun icinde kalıcı
        olarak silinir.
      </p>

      <h2>6. Admin Erisimi</h2>
      <p>
        Hizmet Saglayıcı, Sistemin teknik yonetimi icin sunucuya tam erisim
        yetkisine sahiptir. Bu erisim yalnızca teknik arıza giderme, planlı
        bakım ve guvenlik tehdidi mudahalesi icin kullanılır.
      </p>
      <p>
        Hizmet Saglayıcı, Asistan ile olan yazısmalarınızı icerik izleme
        amacıyla incelemez.
      </p>

      <h2>7. Veri Guvenligi Onlemleri</h2>
      <ul>
        <li>Sunucu erisimi SSH anahtarı ile korunmaktadır</li>
        <li>API anahtarları sifreli ortamda saklanmaktadır</li>
        <li>Sunucu guvenlik duvarı yapılandırılmıstır</li>
        <li>Sistem logları belirli sure sonra otomatik silinmektedir</li>
        <li>Admin erisimi yalnızca Hizmet Saglayıcı ile sınırlıdır</li>
        <li>
          Veritabanı erisimi Row Level Security ile izole edilmistir — her
          kullanıcının verileri birbirinden ayrıdır
        </li>
        <li>
          Veri silme talepleri kayıt altına alınır ve dogrulanabilir sekilde
          yerine getirilir
        </li>
      </ul>

      <h2>8. Veri Sahibinin Hakları</h2>
      <p>KVKK madde 11 uyarınca asagıdaki haklara sahipsiniz:</p>
      <ul>
        <li>Kisisel verilerinizin islenip islenmedigini ogrenme</li>
        <li>Islenmisse buna iliskin bilgi talep etme</li>
        <li>
          Isleme amacını ve amacına uygun kullanılıp kullanılmadıgını
          ogrenme
        </li>
        <li>
          Yurt icinde veya yurt dısında aktarıldıgı ucuncu kisileri bilme
        </li>
        <li>Eksik veya yanlıs islenmisse duzeltilmesini isteme</li>
        <li>
          Islenmesini gerektiren sebeplerin ortadan kalkması halinde
          silinmesini isteme
        </li>
        <li>
          Munhasıran otomatik sistemler vasıtasıyla analiz edilmesi sonucu
          aleyhinize bir sonucun ortaya cıkmasına itiraz etme
        </li>
      </ul>

      <h2>9. Iletisim</h2>
      <p>Kisisel verilerinize iliskin talepleriniz icin:</p>
      <p>
        <strong>Veri Isleyen:</strong> Gokhan Bıyık
        <br />
        <strong>VKN:</strong> 1680372767
        <br />
        <strong>Adres:</strong> Koca Mustafapasa Mah. Org. Abdurrahman Nafiz
        Gurman Cad. Akyuz No: 32 Ic Kapı No: 7 Fatih/Istanbul
        <br />
        <strong>E-posta:</strong> contact@biyikgokhan.com
      </p>
    </LegalLayout>
  );
}
