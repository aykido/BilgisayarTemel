import { Module } from "./types";

export const courseData: Module[] = [
  {
    id: "modul-1",
    title: "Temel Bilgisayar Bilgisi",
    description: "Bilgisayar donanım ve yazılım bileşenlerinin temelleri",
    order: 1,
    isLocked: false,
    icon: "school",
    lessons: [
      {
        id: "donanim-bilesenleri",
        title: "Donanım Bileşenleri",
        description: "Bilgisayarın temel donanım bileşenlerini öğrenin",
        moduleId: "modul-1",
        order: 1,
        duration: 15,
        isComplete: true,
        content: {
          sections: [
            {
              type: "heading",
              content: "Bilgisayar Donanım Bileşenleri"
            },
            {
              type: "paragraph",
              content: "Bilgisayar, çeşitli donanım bileşenlerinden oluşan bir elektronik cihazdır. Bu bölümde, temel donanım parçalarını tanıyacaksınız."
            },
            {
              type: "card",
              content: [
                {
                  icon: "memory",
                  title: "İşlemci (CPU)",
                  description: "Bilgisayarın beyni olarak kabul edilir. Tüm hesaplamaları ve veri işleme görevlerini yapar."
                },
                {
                  icon: "sd_storage",
                  title: "RAM (Bellek)",
                  description: "Geçici veri depolama alanıdır. Bilgisayar çalışırken açık programlar ve veriler burada tutulur."
                },
                {
                  icon: "storage",
                  title: "Sabit Disk (HDD/SSD)",
                  description: "Kalıcı veri depolama birimidir. İşletim sistemi, programlar ve dosyalar burada saklanır."
                },
                {
                  icon: "developer_board",
                  title: "Anakart",
                  description: "Tüm bileşenleri birbirine bağlayan ana devre kartıdır."
                }
              ]
            },
            {
              type: "info",
              content: {
                icon: "info",
                title: "Bilginizi Kontrol Edin",
                description: "Bilgisayarınızın özelliklerini görmek için Windows'ta 'Bu Bilgisayar'a sağ tıklayıp 'Özellikler'i seçebilirsiniz."
              }
            }
          ],
          exercises: [
            {
              id: "donanim-eslestirme",
              type: "matching",
              title: "Donanım Bileşenlerini Eşleştir",
              description: "Aşağıdaki donanım bileşenlerini doğru açıklamalarla eşleştirin:",
              items: [
                {
                  id: "match-1",
                  question: "Anakart",
                  answer: "Tüm bileşenleri bağlayan ana kart"
                },
                {
                  id: "match-2",
                  question: "İşlemci",
                  answer: "Bilgisayarın hesaplama yapan beyni"
                },
                {
                  id: "match-3",
                  question: "RAM",
                  answer: "Geçici veri depolama birimi"
                }
              ]
            }
          ],
          quiz: null
        }
      },
      {
        id: "yazilim-turleri",
        title: "Yazılım Türleri",
        description: "Bilgisayar yazılımları ve türlerini öğrenin",
        moduleId: "modul-1",
        order: 2,
        duration: 15,
        isComplete: true,
        content: {
          sections: [
            {
              type: "heading",
              content: "Yazılım Türleri"
            },
            {
              type: "paragraph",
              content: "Yazılım, bilgisayarların çalışmasını sağlayan komut ve programlardır. Bu bölümde, farklı yazılım türlerini öğreneceksiniz."
            },
            {
              type: "card",
              content: [
                {
                  icon: "desktop_windows",
                  title: "İşletim Sistemi Yazılımları",
                  description: "Windows, macOS ve Linux gibi bilgisayarın temel işleyişini sağlayan yazılımlardır."
                },
                {
                  icon: "apps",
                  title: "Uygulama Yazılımları",
                  description: "MS Office, internet tarayıcıları gibi belirli işlevleri yerine getiren programlardır."
                },
                {
                  icon: "build",
                  title: "Yardımcı Yazılımlar",
                  description: "Antivirüs, disk temizleyici gibi sistemi koruyan ve optimize eden programlardır."
                }
              ]
            }
          ],
          exercises: [],
          quiz: null
        }
      },
      {
        id: "isletim-sistemi-temelleri",
        title: "İşletim Sistemi Temelleri",
        description: "İşletim sistemlerinin temel yapısını ve görevlerini öğrenin",
        moduleId: "modul-1",
        order: 3,
        duration: 20,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "İşletim Sistemi Temelleri"
            },
            {
              type: "paragraph",
              content: "İşletim sistemi, bilgisayarın donanımı ile kullanıcı arasında bir arayüz görevi gören temel yazılımdır. Bu bölümde işletim sisteminin temel bileşenlerini ve fonksiyonlarını öğreneceksiniz."
            },
            {
              type: "heading",
              title: "İşletim Sisteminin Temel Görevleri",
              content: "İşletim Sisteminin Temel Görevleri"
            },
            {
              type: "card",
              content: [
                {
                  icon: "memory",
                  title: "Bellek Yönetimi",
                  description: "RAM belleğin verimli kullanımını sağlar ve programlar arasında bellek alanını paylaştırır."
                },
                {
                  icon: "storage",
                  title: "Depolama Yönetimi",
                  description: "Dosya sistemi aracılığıyla verilerin sabit diskte organize edilmesini sağlar."
                },
                {
                  icon: "settings",
                  title: "İşlem Yönetimi",
                  description: "Uygulamaların çalıştırılmasını ve CPU kaynaklarının paylaşımını kontrol eder."
                },
                {
                  icon: "device_hub",
                  title: "Donanım Yönetimi",
                  description: "Yazıcı, klavye, fare gibi çevre birimlerinin kontrolünü ve sürücülerini yönetir."
                }
              ]
            },
            {
              type: "heading",
              title: "Popüler İşletim Sistemleri",
              content: "Popüler İşletim Sistemleri"
            },
            {
              type: "table",
              content: {
                headers: ["İşletim Sistemi", "Şirket", "Kullanım Alanı"],
                rows: [
                  ["Windows", "Microsoft", "Kişisel bilgisayarlar, iş istasyonları"],
                  ["macOS", "Apple", "Apple bilgisayarları"],
                  ["Linux", "Açık kaynak", "Sunucular, geliştirme ortamları"],
                  ["Android", "Google", "Mobil cihazlar, tabletler"]
                ]
              }
            },
            {
              type: "heading",
              title: "İşletim Sistemi Arayüzü",
              content: "İşletim Sistemi Arayüzü"
            },
            {
              type: "paragraph",
              content: "İşletim sistemleri, kullanıcıya kolay erişim için Grafiksel Kullanıcı Arayüzü (GUI) sunar:"
            },
            {
              type: "info",
              content: {
                icon: "info",
                title: "Bilgisayarınızın İşletim Sistemini Kontrol Etmek",
                description: "Windows'ta Ayarlar > Sistem > Hakkında bölümüne giderek işletim sistemi bilgilerinizi görebilirsiniz."
              }
            }
          ],
          exercises: [
            {
              id: "isletim-sistemi-eslestirme",
              type: "matching",
              title: "Hızlı Alıştırma",
              description: "Aşağıdaki terimleri uygun açıklamalarla eşleştirin:",
              items: [
                {
                  id: "match-1",
                  question: "İşletim Sistemi",
                  answer: "Donanım ile kullanıcı arasındaki arayüz"
                },
                {
                  id: "match-2",
                  question: "Dosya Sistemi",
                  answer: "Veri depolama ve organizasyon yöntemi"
                },
                {
                  id: "match-3",
                  question: "Çok Görevlilik",
                  answer: "Birden fazla uygulamanın aynı anda çalışması"
                }
              ]
            }
          ],
          quiz: {
            id: "modul-1-quiz",
            title: "Modül 1 Quiz",
            description: "Temel Bilgisayar Bilgisi modülünü tamamlamak için testi çözün.",
            questions: [
              {
                id: "q1",
                question: "Bilgisayarın beyni olarak adlandırılan donanım bileşeni hangisidir?",
                options: ["İşlemci (CPU)", "RAM", "Sabit Disk", "Anakart"],
                correctAnswer: 0
              },
              {
                id: "q2",
                question: "Aşağıdakilerden hangisi bir işletim sistemi değildir?",
                options: ["Windows", "Excel", "Linux", "Android"],
                correctAnswer: 1
              },
              {
                id: "q3",
                question: "İşletim sisteminin temel görevlerinden biri değildir?",
                options: ["Bellek yönetimi", "Donanım yönetimi", "Web sayfalarını görüntülemek", "Depolama yönetimi"],
                correctAnswer: 2
              },
              {
                id: "q4",
                question: "Programlar çalışırken verilerin geçici olarak tutulduğu donanım bileşeni hangisidir?",
                options: ["Sabit Disk", "RAM", "İşlemci", "Ekran Kartı"],
                correctAnswer: 1
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: "modul-2",
    title: "Bilgi Güvenliği",
    description: "Siber güvenlik ve güvenli internet kullanımı",
    order: 2,
    isLocked: false, // Kilidi kaldırıldı
    icon: "lock",
    lessons: [
      {
        id: "siber-guvenlik-temelleri",
        title: "Siber Güvenliğin Temel Kavramları",
        description: "Siber güvenliğin temel kavramlarını öğrenin",
        moduleId: "modul-2",
        order: 1,
        duration: 25,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "Siber Güvenliğin Temel Kavramları"
            },
            {
              type: "paragraph",
              content: "Siber güvenlik, bilgisayar sistemlerini, ağları ve verileri dijital saldırılardan koruma pratiğidir. Bu bölümde, siber güvenliğin temel kavramlarını öğreneceksiniz."
            },
            {
              type: "heading",
              title: "Siber Güvenlik Nedir?",
              content: "Siber Güvenlik Nedir?"
            },
            {
              type: "paragraph",
              content: "Siber güvenlik, bilgisayar sistemlerini, ağları, programları ve verileri dijital saldırılardan, izinsiz erişimden, değiştirilmeden ve yok edilmekten koruma pratiğini ifade eder."
            },
            {
              type: "card",
              content: [
                {
                  icon: "shield",
                  title: "Gizlilik (Confidentiality)",
                  description: "Bilginin sadece yetkili kişiler tarafından erişilebilir olmasıdır."
                },
                {
                  icon: "sync",
                  title: "Bütünlük (Integrity)",
                  description: "Bilginin eksiksiz, doğru ve güvenilir olması ve yetkisiz değişikliklere karşı korunmasıdır."
                },
                {
                  icon: "access_time",
                  title: "Erişilebilirlik (Availability)",
                  description: "Bilginin ve sistemlerin ihtiyaç duyulduğunda kullanılabilir olmasıdır."
                }
              ]
            },
            {
              type: "heading",
              title: "Güvenlik Tehdit Türleri",
              content: "Güvenlik Tehdit Türleri"
            },
            {
              type: "card",
              content: [
                {
                  icon: "bug_report",
                  title: "Kötücül Yazılımlar (Malware)",
                  description: "Virüsler, solucanlar, truva atları, fidye yazılımları gibi sistemlere zarar veren veya veri çalan yazılımlardır."
                },
                {
                  icon: "fishing",
                  title: "Oltalama Saldırıları (Phishing)",
                  description: "Kullanıcıları kandırarak kişisel bilgilerini veya kimlik bilgilerini ele geçirmeye yönelik saldırılardır."
                },
                {
                  icon: "people",
                  title: "Sosyal Mühendislik",
                  description: "İnsanları kandırarak bilgi edinme veya güvenlik ihlallerine neden olma tekniğidir."
                },
                {
                  icon: "network_check",
                  title: "Ortadaki Adam Saldırıları",
                  description: "Saldırganın, iki tarif arasındaki iletişimi gizlice izlediği veya değiştirdiği saldırılardır."
                }
              ]
            },
            {
              type: "heading",
              title: "Temel Koruma Yöntemleri",
              content: "Temel Koruma Yöntemleri"
            },
            {
              type: "table",
              content: {
                headers: ["Koruma Yöntemi", "Açıklama"],
                rows: [
                  ["Güçlü Şifreler", "En az 12 karakter uzunluğunda, karışık karakterler içeren şifreler kullanmak"],
                  ["İki Faktörlü Doğrulama", "Şifrenin yanında ikinci bir doğrulama yöntemi kullanmak"],
                  ["Güncel Yazılım", "İşletim sistemi ve uygulamaları düzenli olarak güncellemek"],
                  ["Antivirüs Yazılımı", "Güncel bir antivirüs programı kullanmak"],
                  ["Veri Yedekleme", "Önemli verileri düzenli olarak yedeklemek"],
                  ["Güvenli İnternet Kullanımı", "Şüpheli bağlantılardan ve e-postalardan kaçınmak"]
                ]
              }
            },
            {
              type: "info",
              content: {
                icon: "info",
                title: "Güvenli Şifre İpucu",
                description: "Güçlü bir şifre oluşturmak için küçük/büyük harfler, rakamlar ve özel karakterler içeren, kolayca tahmin edilemeyen şifreler kullanın. Şifrelerinizi düzenli olarak değiştirin ve aynı şifreyi birden fazla hesapta kullanmaktan kaçının."
              }
            }
          ],
          exercises: [
            {
              id: "siber-guvenlik-eslestirme",
              type: "matching",
              title: "Siber Güvenlik Kavramlarını Eşleştirin",
              description: "Aşağıdaki siber güvenlik kavramlarını doğru açıklamalarla eşleştirin:",
              items: [
                {
                  id: "match-1",
                  question: "Fidye Yazılımı",
                  answer: "Dosyaları şifreleyen ve karşılığında para isteyen yazılım"
                },
                {
                  id: "match-2",
                  question: "Oltalama",
                  answer: "Sahte iletişimlerle kişisel bilgi toplama yöntemi"
                },
                {
                  id: "match-3",
                  question: "İki Faktörlü Doğrulama",
                  answer: "Şifreden sonra ikinci bir doğrulama adımı kullanmak"
                }
              ]
            }
          ],
          quiz: {
            id: "modul-2-quiz",
            title: "Bilgi Güvenliği Quiz",
            description: "Bilgi Güvenliği modülünü tamamlamak için testi çözün.",
            questions: [
              {
                id: "q1",
                question: "Aşağıdakilerden hangisi siber güvenliğin üç temel prensibinden biri değildir?",
                options: ["Gizlilik", "Esneklik", "Bütünlük", "Erişilebilirlik"],
                correctAnswer: 1
              },
              {
                id: "q2",
                question: "Güçlü bir şifrede aşağıdakilerden hangisi olmalıdır?",
                options: ["Sadece rakamlar", "Kişisel bilgileriniz", "Karışık karakter türleri", "Sözlükteki kelimeler"],
                correctAnswer: 2
              },
              {
                id: "q3",
                question: "Aşağıdakilerden hangisi oltalama (phishing) saldırısı değildir?",
                options: ["Sahte banka e-postaları göndermek", "Yazılım güncellemesi yapmak", "Sahte giriş sayfaları oluşturmak", "Acil durum mesajları göndermek"],
                correctAnswer: 1
              },
              {
                id: "q4",
                question: "Bilgisayarınızı korumak için aşağıdakilerden hangisini yapmamalısınız?",
                options: ["Düzenli yedekleme yapmak", "Yazılımları güncel tutmak", "Şifreleri bir kağıda yazıp ekrana yapıştırmak", "Güvenlik duvarını aktif tutmak"],
                correctAnswer: 2
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: "modul-3",
    title: "İnternet ve E-posta",
    description: "İnternet kullanımı ve e-posta yönetimi",
    order: 3,
    isLocked: false,
    icon: "language",
    lessons: [
      {
        id: "internet-temelleri",
        title: "İnternet Temelleri",
        description: "İnternetin temel kavramları ve çalışma prensibi",
        moduleId: "modul-3",
        order: 1,
        duration: 20,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "İnternet Temelleri"
            },
            {
              type: "paragraph",
              content: "İnternet, dünya çapında bilgisayarları birbirine bağlayan devasa bir ağ sistemidir. Bu bölümde internetin temel kavramları, çalışma prensibi ve güvenli internet kullanımı hakkında bilgi edineceksiniz."
            },
            {
              type: "heading",
              title: "İnternet Nedir?",
              content: "İnternet Nedir?"
            },
            {
              type: "paragraph",
              content: "İnternet, milyarlarca bilgisayarı ve cihazı birbirine bağlayan, protokoller aracılığıyla iletişim kurmalarını sağlayan global bir ağdır. World Wide Web (www), e-posta, dosya transferi ve diğer hizmetlere erişim sağlar."
            },
            {
              type: "card",
              content: [
                {
                  icon: "public",
                  title: "World Wide Web (WWW)",
                  description: "Web sayfalarının görüntülenmesini sağlayan internet üzerindeki bilgi sistemidir."
                },
                {
                  icon: "language",
                  title: "Web Tarayıcılar",
                  description: "Chrome, Firefox, Edge gibi web sayfalarını görüntülemeye yarayan yazılımlardır."
                },
                {
                  icon: "link",
                  title: "URL (Uniform Resource Locator)",
                  description: "İnternet üzerindeki kaynakların adreslerini belirten standart formattır."
                },
                {
                  icon: "dns",
                  title: "DNS (Domain Name System)",
                  description: "Alan adlarını IP adreslerine çeviren sistemdir."
                }
              ]
            },
            {
              type: "heading",
              title: "İnternete Bağlanma Yöntemleri",
              content: "İnternete Bağlanma Yöntemleri"
            },
            {
              type: "table",
              content: {
                headers: ["Bağlantı Türü", "Özellikler"],
                rows: [
                  ["DSL", "Telefon hatları üzerinden sağlanan bağlantı"],
                  ["Fiber", "Yüksek hızlı, fiber optik kablolar üzerinden sağlanan bağlantı"],
                  ["Mobil İnternet", "4G/5G teknolojisi ile kablosuz bağlantı"],
                  ["Uydu", "Uzak bölgeler için uydu üzerinden sağlanan bağlantı"]
                ]
              }
            },
            {
              type: "info",
              content: {
                icon: "info",
                title: "Güvenli İnternet Kullanımı",
                description: "İnterneti kullanırken her zaman güvenli web sitelerini tercih edin. URL'in 'https://' ile başlaması ve adres çubuğunda kilit simgesinin olması, o sitenin güvenli olduğunu gösterir."
              }
            }
          ],
          exercises: [
            {
              id: "internet-eslestirme",
              type: "matching",
              title: "İnternet Terimlerini Eşleştirin",
              description: "Aşağıdaki internet terimlerini doğru açıklamalarla eşleştirin:",
              items: [
                {
                  id: "match-1",
                  question: "URL",
                  answer: "Web sitelerinin adresi"
                },
                {
                  id: "match-2",
                  question: "HTTP",
                  answer: "Web sayfalarının iletim protokolü"
                },
                {
                  id: "match-3",
                  question: "HTML",
                  answer: "Web sayfalarının yazıldığı dil"
                }
              ]
            }
          ],
          quiz: null
        }
      },
      {
        id: "e-posta-kullanimi",
        title: "E-Posta Kullanımı",
        description: "E-posta oluşturma ve yönetme teknikleri",
        moduleId: "modul-3",
        order: 2,
        duration: 15,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "E-Posta Kullanımı"
            },
            {
              type: "paragraph",
              content: "E-posta (elektronik posta), internet üzerinden mesaj gönderip almanın en yaygın yoludur. Bu bölümde e-posta hesabı oluşturma, e-posta gönderme ve yönetme teknikleri öğreneceksiniz."
            },
            {
              type: "heading",
              title: "E-Posta Nasıl Çalışır?",
              content: "E-Posta Nasıl Çalışır?"
            },
            {
              type: "paragraph",
              content: "E-posta, internet üzerinde SMTP (Simple Mail Transfer Protocol) protokolü aracılığıyla iletilir. Gönderilen e-postalar, alıcının posta sunucusunda saklanır ve alıcı e-posta programını açtığında indirilir."
            },
            {
              type: "card",
              content: [
                {
                  icon: "email",
                  title: "E-Posta Adresi",
                  description: "kullanici@domain.com formatında, @ işareti ile ayrılmış kullanıcı adı ve domain adından oluşur."
                },
                {
                  icon: "attachment",
                  title: "Dosya Ekleri",
                  description: "E-postalara eklenebilen belge, resim veya başka dosya türleridir."
                },
                {
                  icon: "move_to_inbox",
                  title: "Gelen Kutusu",
                  description: "Alınan e-postaların görüntülendiği ana klasördür."
                },
                {
                  icon: "drafts",
                  title: "Taslaklar",
                  description: "Henüz gönderilmemiş ve üzerinde çalışılan e-postaların saklandığı klasördür."
                }
              ]
            },
            {
              type: "heading",
              title: "Profesyonel E-Posta Yazma İpuçları",
              content: "Profesyonel E-Posta Yazma İpuçları"
            },
            {
              type: "list",
              content: [
                "Net ve açıklayıcı bir konu satırı kullanın",
                "Kibar bir selamlama ile başlayın",
                "Anlaşılır ve kısa paragraflar kullanın",
                "İmla kurallarına dikkat edin",
                "Profesyonel bir kapanış ve imza ekleyin",
                "Göndermeden önce e-postayı gözden geçirin"
              ]
            },
            {
              type: "info",
              content: {
                icon: "info",
                title: "E-Posta Güvenliği",
                description: "Tanımadığınız kişilerden gelen e-postalardaki bağlantılara tıklamayın ve dosya eklerini açmayın. Şüpheli e-postaları spam/önemsiz klasörüne taşıyın veya silin."
              }
            }
          ],
          exercises: [],
          quiz: {
            id: "modul-3-quiz",
            title: "İnternet ve E-posta Quiz",
            description: "İnternet ve E-posta modülünü tamamlamak için testi çözün.",
            questions: [
              {
                id: "q1",
                question: "Aşağıdakilerden hangisi geçerli bir e-posta adresi formatıdır?",
                options: ["www.ornek.com", "kullanici@domain.com", "http://email.com", "kullanici@"],
                correctAnswer: 1
              },
              {
                id: "q2",
                question: "E-posta ile büyük dosyalar göndermek istediğinizde aşağıdakilerden hangisini yapmalısınız?",
                options: ["Dosyayı sıkıştırma", "Dosyayı parçalayarak birden fazla e-posta gönderme", "Dosya paylaşım servisi kullanma", "Sadece geceleri gönderme"],
                correctAnswer: 2
              },
              {
                id: "q3",
                question: "İnternet tarayıcısında 'https://' ile başlayan bir adres ne anlama gelir?",
                options: ["Hızlı yüklenen site", "Güvenli bağlantı", "Ücretsiz site", "Devlet sitesi"],
                correctAnswer: 1
              },
              {
                id: "q4",
                question: "E-posta gönderirken 'CC' alanının işlevi nedir?",
                options: ["E-postayı şifreler", "Dosya eklemek için kullanılır", "Ana alıcı dışında kopya alacak kişileri belirtir", "E-postayı planlar"],
                correctAnswer: 2
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: "modul-4",
    title: "Microsoft Word",
    description: "Microsoft Word temel kullanımı",
    order: 4,
    isLocked: false,
    icon: "description",
    lessons: [
      {
        id: "word-arayuzu",
        title: "Microsoft Word Arayüzü",
        description: "Word'ün arayüzünü ve temel bileşenlerini tanıma",
        moduleId: "modul-4",
        order: 1,
        duration: 20,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "Microsoft Word Arayüzü"
            },
            {
              type: "paragraph",
              content: "Microsoft Word, metin belgeleri oluşturmak, düzenlemek ve biçimlendirmek için kullanılan profesyonel bir kelime işlemci programıdır. Bu bölümde, Word'ün arayüzünü ve temel bileşenlerini öğreneceksiniz."
            },
            {
              type: "heading",
              title: "Word Penceresi Bileşenleri",
              content: "Word Penceresi Bileşenleri"
            },
            {
              type: "card",
              content: [
                {
                  icon: "menu",
                  title: "Şerit (Ribbon)",
                  description: "Word'ün üst kısmında yer alan ve komutları kategorilere ayrılmış sekmelerde sunan menü sistemi."
                },
                {
                  icon: "tab",
                  title: "Sekmeler",
                  description: "Dosya, Giriş, Ekle, Tasarım, Düzen gibi farklı işlevlere erişim sağlayan kategoriler."
                },
                {
                  icon: "article",
                  title: "Belge Alanı",
                  description: "Metni yazdığınız ve düzenlediğiniz ana çalışma alanı."
                },
                {
                  icon: "rule",
                  title: "Cetveller",
                  description: "Belgedeki metin kenar boşluklarını ve sekmeleri ayarlamaya yardımcı olur."
                }
              ]
            },
            {
              type: "heading",
              title: "Giriş Sekmesi Bileşenleri",
              content: "Giriş Sekmesi Bileşenleri"
            },
            {
              type: "table",
              content: {
                headers: ["Grup", "İçerdiği Araçlar"],
                rows: [
                  ["Pano", "Kes, Kopyala, Yapıştır, Biçim Boyacısı"],
                  ["Yazı Tipi", "Yazı tipi, boyut, renk, kalın, italik, altı çizili"],
                  ["Paragraf", "Madde işaretleri, numaralandırma, girintiler, hizalama"],
                  ["Stiller", "Önceden tanımlanmış biçimlendirme stilleri"],
                  ["Düzenleme", "Bul, Değiştir, Seç"]
                ]
              }
            },
            {
              type: "heading",
              title: "Dosya Operasyonları",
              content: "Dosya Operasyonları"
            },
            {
              type: "list",
              content: [
                "Yeni Belge Oluşturma: Dosya > Yeni",
                "Belgeyi Kaydetme: Dosya > Kaydet veya Ctrl+S",
                "Belgeyi Farklı Kaydetme: Dosya > Farklı Kaydet",
                "Belgeyi Açma: Dosya > Aç veya Ctrl+O",
                "Belgeyi Yazdırma: Dosya > Yazdır veya Ctrl+P"
              ]
            },
            {
              type: "info",
              content: {
                icon: "save",
                title: "Otomatik Kaydetme",
                description: "Word, düzenli aralıklarla çalışmanızı otomatik olarak kaydeder. Ancak önemli değişikliklerden sonra manuel olarak Ctrl+S ile kaydetmek iyi bir alışkanlıktır."
              }
            }
          ],
          exercises: [
            {
              id: "word-arayuz-eslestirme",
              type: "matching",
              title: "Word Arayüz Bileşenlerini Eşleştirin",
              description: "Aşağıdaki Word arayüz bileşenlerini işlevleriyle eşleştirin:",
              items: [
                {
                  id: "match-1",
                  question: "Şerit (Ribbon)",
                  answer: "Komutları kategorilere ayrılmış sekmelerde sunan menü sistemi"
                },
                {
                  id: "match-2",
                  question: "Hızlı Erişim Araç Çubuğu",
                  answer: "En sık kullanılan komutlara hızlı erişim sağlayan araç çubuğu"
                },
                {
                  id: "match-3",
                  question: "Durum Çubuğu",
                  answer: "Belge hakkında bilgi veren ve görünüm kontrollerini içeren alt çubuk"
                }
              ]
            }
          ],
          quiz: null
        }
      },
      {
        id: "temel-duzenleme",
        title: "Temel Metin Düzenleme",
        description: "Metin girme, düzenleme ve biçimlendirme",
        moduleId: "modul-4",
        order: 2,
        duration: 25,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "Temel Metin Düzenleme"
            },
            {
              type: "paragraph",
              content: "Microsoft Word'de temel metin düzenleme işlemleri, belge oluşturmanın en önemli parçasıdır. Bu bölümde, metin girme, düzenleme ve biçimlendirme tekniklerini öğreneceksiniz."
            },
            {
              type: "heading",
              title: "Metin Girme ve Düzenleme",
              content: "Metin Girme ve Düzenleme"
            },
            {
              type: "paragraph",
              content: "Belge alanına tıklayıp metin yazmaya başlayabilirsiniz. Word, satır sonuna geldiğinizde otomatik olarak alt satıra geçer. Paragraf oluşturmak için Enter tuşuna basın. Metni silmek için Backspace (geriye) veya Delete (ileriye) tuşlarını kullanabilirsiniz."
            },
            {
              type: "card",
              content: [
                {
                  icon: "content_copy",
                  title: "Kes, Kopyala, Yapıştır",
                  description: "Metni seçin ve Ctrl+X (kes), Ctrl+C (kopyala), Ctrl+V (yapıştır) kısayollarını kullanın."
                },
                {
                  icon: "undo",
                  title: "Geri Al ve Yinele",
                  description: "Hata yaptığınızda Ctrl+Z (geri al) veya Ctrl+Y (yinele) kısayollarını kullanın."
                },
                {
                  icon: "find_replace",
                  title: "Bul ve Değiştir",
                  description: "Ctrl+F (bul) veya Ctrl+H (değiştir) ile belge içinde arama yapabilirsiniz."
                }
              ]
            },
            {
              type: "heading",
              title: "Metin Biçimlendirme",
              content: "Metin Biçimlendirme"
            },
            {
              type: "paragraph",
              content: "Metni biçimlendirerek belgenizin görünümünü iyileştirebilirsiniz. Bunun için önce biçimlendirilecek metni seçmeniz gerekir."
            },
            {
              type: "table",
              content: {
                headers: ["Biçimlendirme", "Kısayol", "Şerit Konumu"],
                rows: [
                  ["Kalın", "Ctrl+B", "Giriş > Yazı Tipi"],
                  ["İtalik", "Ctrl+I", "Giriş > Yazı Tipi"],
                  ["Altı Çizili", "Ctrl+U", "Giriş > Yazı Tipi"],
                  ["Yazı Tipi Değiştirme", "-", "Giriş > Yazı Tipi"],
                  ["Yazı Boyutu Değiştirme", "-", "Giriş > Yazı Tipi"],
                  ["Metin Rengi Değiştirme", "-", "Giriş > Yazı Tipi"]
                ]
              }
            },
            {
              type: "heading",
              title: "Paragraf Biçimlendirme",
              content: "Paragraf Biçimlendirme"
            },
            {
              type: "list",
              content: [
                "Hizalama: Sola, Sağa, Ortaya, İki Yana Yasla (Giriş > Paragraf)",
                "Girinti: Paragrafın Sol ve Sağ Girintileri (Giriş > Paragraf)",
                "Satır Aralığı: Paragraf içi ve paragraflar arası boşluk (Giriş > Paragraf)",
                "Madde İşaretleri ve Numaralandırma: Liste oluşturma (Giriş > Paragraf)"
              ]
            },
            {
              type: "info",
              content: {
                icon: "format_paint",
                title: "Biçim Boyacısı",
                description: "Bir metnin biçimini başka bir metne hızlıca uygulamak için Biçim Boyacısı aracını kullanabilirsiniz. Biçimlendirmesini kopyalamak istediğiniz metni seçin, Biçim Boyacısına tıklayın ve ardından biçimlendirilecek metni seçin."
              }
            }
          ],
          sections: [
            {
              type: "heading",
              content: "Word Uygulama Projeleri"
            },
            {
              type: "heading",
              title: "Proje 1: Profesyonel CV Hazırlama",
              content: "Proje 1: Profesyonel CV Hazırlama"
            },
            {
              type: "paragraph",
              content: "Kendiniz veya hayali bir kişi için profesyonel bir CV hazırlayın. Bu proje, Word becerilerinizi geliştirmenize yardımcı olacaktır. CV'nizde şu bölümler bulunmalıdır: Başlık, kişisel bilgiler, eğitim geçmişi, iş deneyimi, beceriler ve referanslar. Farklı yazı tipleri, stilleri, tablolar ve madde işaretleri kullanarak belgeyi profesyonel görünümlü hale getirin. Tamamladığınızda belgeyi PDF olarak da kaydedin."
            },
            {
              type: "heading",
              title: "Proje 2: Seyahat Broşürü Tasarlama",
              content: "Proje 2: Seyahat Broşürü Tasarlama"
            },
            {
              type: "paragraph",
              content: "Sevdiğiniz bir şehir veya ülke için iki sayfalık bir seyahat broşürü hazırlayın. Broşürünüzde başlık, alt başlıklar, görüntüler için yer tutucular, en az iki sütunlu bir bölüm, madde işaretli listeler ve çekici bir renk şeması bulunmalıdır. Çok sütunlu düzen, görseller için yer tutucular ekleme, renk şemaları uygulama ve metni çerçeveleme gibi becerileri kullanın. Sayfa kenar boşluklarını ve stil özelliklerini özelleştirerek profesyonel görünümlü bir broşür oluşturun."
            }
          ],
          exercises: [],
          quiz: {
            id: "modul-4-quiz",
            title: "Microsoft Word Quiz",
            description: "Microsoft Word modülünü tamamlamak için testi çözün.",
            questions: [
              {
                id: "q1",
                question: "Microsoft Word'de metni kalın yapmak için hangi kısayol tuşu kullanılır?",
                options: ["Ctrl+K", "Ctrl+I", "Ctrl+B", "Ctrl+U"],
                correctAnswer: 2
              },
              {
                id: "q2",
                question: "Aşağıdakilerden hangisi Word'de paragraf hizalama seçeneklerinden biri değildir?",
                options: ["Sola Yasla", "Ortala", "Dikey Yasla", "İki Yana Yasla"],
                correctAnswer: 2
              },
              {
                id: "q3",
                question: "Word'de bir belgeyi kaydetmek için kullanılan kısayol nedir?",
                options: ["Ctrl+P", "Ctrl+S", "Ctrl+O", "Ctrl+N"],
                correctAnswer: 1
              },
              {
                id: "q4",
                question: "Word'de yaptığınız son işlemi geri almak için hangi kısayol kullanılır?",
                options: ["Ctrl+Z", "Ctrl+Y", "Ctrl+X", "Ctrl+A"],
                correctAnswer: 0
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: "modul-5",
    title: "Microsoft Excel",
    description: "Microsoft Excel temel kullanımı",
    order: 5,
    isLocked: false,
    icon: "table_chart",
    lessons: [
      {
        id: "excel-arayuzu",
        title: "Microsoft Excel Arayüzü",
        description: "Excel'in temel arayüzünü ve bileşenlerini tanıma",
        moduleId: "modul-5",
        order: 1,
        duration: 20,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "Microsoft Excel Arayüzü"
            },
            {
              type: "paragraph",
              content: "Microsoft Excel, elektronik tablolar oluşturmak, verileri düzenlemek ve analiz etmek için kullanılan güçlü bir programdır. Bu bölümde, Excel'in arayüzünü ve temel bileşenlerini öğreneceksiniz."
            },
            {
              type: "heading",
              title: "Excel Penceresi Bileşenleri",
              content: "Excel Penceresi Bileşenleri"
            },
            {
              type: "card",
              content: [
                {
                  icon: "menu",
                  title: "Şerit (Ribbon)",
                  description: "Excel'in üst kısmında yer alan ve komutları kategorilere ayrılmış sekmelerde sunan menü sistemi."
                },
                {
                  icon: "grid_3x3",
                  title: "Çalışma Alanı",
                  description: "Hücrelerden oluşan ve verileri girdiğiniz ana tablo alanı."
                },
                {
                  icon: "tab",
                  title: "Çalışma Sayfası Sekmeleri",
                  description: "Aynı dosya içinde birden fazla çalışma sayfası oluşturmanızı sağlayan sekmeler."
                },
                {
                  icon: "functions",
                  title: "Formül Çubuğu",
                  description: "Hücrelere veri ve formül girişi yapabileceğiniz alan."
                }
              ]
            },
            {
              type: "heading",
              title: "Hücre, Satır ve Sütunlar",
              content: "Hücre, Satır ve Sütunlar"
            },
            {
              type: "paragraph",
              content: "Excel, satır ve sütunlardan oluşan bir tablo yapısına sahiptir. Satırlar 1, 2, 3... şeklinde numaralandırılırken, sütunlar A, B, C... harfleriyle isimlendirilir. Her bir hücre, bir sütun harfi ve satır numarasının birleşimiyle adlandırılır (örneğin A1, B5, C10)."
            },
            {
              type: "table",
              content: {
                headers: ["Terim", "Açıklama"],
                rows: [
                  ["Hücre", "Veri girebileceğiniz her bir kare alan (Örneğin: A1, B2)"],
                  ["Satır", "Yatay hücre dizisi, 1'den başlayarak numaralandırılır"],
                  ["Sütun", "Dikey hücre dizisi, A'dan başlayarak harflendirilir"],
                  ["Hücre Aralığı", "Birden fazla hücrenin seçilmiş hali (Örneğin: A1:C3)"],
                  ["Çalışma Sayfası", "Her bir sekmedeki tablo yapısı"]
                ]
              }
            },
            {
              type: "heading",
              title: "Veri Girişi ve Düzenleme",
              content: "Veri Girişi ve Düzenleme"
            },
            {
              type: "paragraph",
              content: "Excel'de bir hücreye tıklayarak veri girişi yapabilirsiniz. Veri türleri sayı, metin, tarih, saat veya formül olabilir. Bir hücreye giriş yapmak için hücreye tıklayın ve yazın, ardından Enter tuşuna basın veya başka bir hücreye tıklayın."
            },
            {
              type: "info",
              content: {
                icon: "tips_and_updates",
                title: "Hızlı Gezinme İpuçları",
                description: "Hücreler arasında hızlıca gezinmek için ok tuşlarını kullanabilirsiniz. Bir satırın sonuna gitmek için End + sağ ok, bir sütunun sonuna gitmek için End + aşağı ok tuş kombinasyonlarını kullanabilirsiniz."
              }
            }
          ],
          exercises: [
            {
              id: "excel-arayuz-eslestirme",
              type: "matching",
              title: "Excel Arayüz Bileşenlerini Eşleştirin",
              description: "Aşağıdaki Excel arayüz bileşenlerini işlevleriyle eşleştirin:",
              items: [
                {
                  id: "match-1",
                  question: "Formül Çubuğu",
                  answer: "Hücrelere formüller ve veriler girmek için kullanılan alan"
                },
                {
                  id: "match-2",
                  question: "Sütun Başlıkları",
                  answer: "A, B, C şeklinde harflerle isimlendirilen dikey bölümler"
                },
                {
                  id: "match-3",
                  question: "Sayfa Sekmeleri",
                  answer: "Aynı dosyada birden fazla tablo oluşturmayı sağlayan sekmeler"
                }
              ]
            }
          ],
          quiz: null
        }
      },
      {
        id: "veri-girisi-duzenleme",
        title: "Temel Veri Girişi ve Düzenleme",
        description: "Excel'de veri girişi, düzenleme ve yönetme teknikleri",
        moduleId: "modul-5",
        order: 2,
        duration: 25,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "Temel Veri Girişi ve Düzenleme"
            },
            {
              type: "paragraph",
              content: "Excel'de veri girişi, elektronik tablolarda çalışmanın temelidir. Bu bölümde, Excel'de nasıl veri girebileceğinizi, düzenleyebileceğinizi ve yönetebileceğinizi öğreneceksiniz. Doğru veri girişi teknikleri, verimli çalışmanın ve hatasız sonuçlar elde etmenin anahtarıdır."
            },
            {
              type: "heading",
              title: "Veri Türleri",
              content: "Veri Türleri"
            },
            {
              type: "paragraph",
              content: "Excel'de çalışırken karşılaşacağınız temel veri türleri şunlardır:"
            },
            {
              type: "card",
              content: [
                {
                  icon: "text_format",
                  title: "Metin",
                  description: "Metin verileri, harfler, rakamlar ve özel karakterlerden oluşabilir. Excel'de metin verileri varsayılan olarak hücrenin sol tarafına hizalanır. Örnek: 'Satış Raporu', 'İstanbul', 'A123'"
                },
                {
                  icon: "calculate",
                  title: "Sayılar",
                  description: "Sayısal veriler, matematiksel hesaplamalarda kullanılabilen rakamlardan oluşur. Excel'de sayısal veriler varsayılan olarak hücrenin sağ tarafına hizalanır. Örnek: 123, 45.67, -89"
                },
                {
                  icon: "date_range",
                  title: "Tarih ve Saat",
                  description: "Excel, tarih ve saat verilerini özel bir sayısal format olarak saklar. Bu, tarihler üzerinde hesaplama yapabilmenizi sağlar. Örnek: 01.01.2025, 15:30, 01.01.2025 15:30"
                },
                {
                  icon: "toggle_on",
                  title: "Mantıksal (Boolean)",
                  description: "Mantıksal veriler, DOĞRU (TRUE) veya YANLIŞ (FALSE) değerlerini alabilir. Genellikle formüllerde ve koşullu ifadelerde kullanılır."
                }
              ]
            },
            {
              type: "heading",
              title: "Veri Girişi Yöntemleri",
              content: "Veri Girişi Yöntemleri"
            },
            {
              type: "paragraph",
              content: "Excel'de veri girişi için birkaç yöntem bulunmaktadır:"
            },
            {
              type: "list",
              content: [
                "Doğrudan Giriş: Bir hücreye tıklayıp veriyi yazın. Enter, Tab veya ok tuşlarına basarak veya başka bir hücreye tıklayarak girişi tamamlayın.",
                "Formül Çubuğu Kullanımı: Formül çubuğuna veri girerek, özellikle uzun metinler veya karmaşık formüller için kullanışlıdır.",
                "Otomatik Tamamlama: Excel, daha önce girdiğiniz verilere benzer girişler yaparken otomatik tamamlama önerileri sunar.",
                "Seri Oluşturma: Başlangıç değerini bir hücreye girip, doldurma kolunu kullanarak otomatik seriler oluşturabilirsiniz."
              ]
            },
            {
              type: "info",
              content: {
                icon: "tips_and_updates",
                title: "Seri Oluşturma İpucu",
                description: "Excel, girdiğiniz değere bağlı olarak seriyi otomatik olarak devam ettirir:\n- Sayılar: 1, 2, 3, ...\n- Aylar: Ocak, Şubat, Mart, ...\n- Günler: Pazartesi, Salı, Çarşamba, ...\n- Tarihler: 01.01.2025, 02.01.2025, 03.01.2025, ..."
              }
            },
            {
              type: "heading",
              title: "Veri Düzenleme",
              content: "Veri Düzenleme"
            },
            {
              type: "table",
              content: {
                headers: ["İşlem", "Nasıl Yapılır"],
                rows: [
                  ["Hücre İçeriğini Düzenleme", "Hücreye çift tıklayın, F2 tuşuna basın veya formül çubuğunda düzenleme yapın"],
                  ["Hücre İçeriğini Silme", "Hücreyi seçip Delete tuşuna basın veya sağ tıklayıp 'Temizle' seçeneğini kullanın"],
                  ["Kopyalama", "Hücreyi seçin, Ctrl+C tuşlarına basın, hedef hücreyi seçin, Ctrl+V tuşlarına basın"],
                  ["Taşıma", "Hücreyi seçin, Ctrl+X tuşlarına basın, hedef hücreyi seçin, Ctrl+V tuşlarına basın"]
                ]
              }
            },
            {
              type: "heading",
              title: "Özel Yapıştırma",
              content: "Özel Yapıştırma"
            },
            {
              type: "paragraph",
              content: "Özel Yapıştırma (Paste Special) seçeneği, kopyalanan verilerin belirli özelliklerini yapıştırmanıza olanak tanır: Değerler, Biçimlendirme, Formüller veya matematiksel işlemler uygulayabilirsiniz."
            },
            {
              type: "info",
              content: {
                icon: "lightbulb",
                title: "Özel Yapıştırmaya Erişim",
                description: "- Giriş > Yapıştır > Özel Yapıştırma\n- Sağ tıklayın > Özel Yapıştırma\n- Ctrl+Alt+V kısayolu"
              }
            },
            {
              type: "heading",
              title: "Büyük Veri Setleriyle Çalışma",
              content: "Büyük Veri Setleriyle Çalışma"
            },
            {
              type: "list",
              content: [
                "Çoklu Hücre Seçimi: Bitişik hücreler için Shift+tıklama, bitişik olmayan hücreler için Ctrl+tıklama kullanın.",
                "Bul ve Değiştir: Ctrl+F (Bul) veya Ctrl+H (Değiştir) kısayollarını kullanarak büyük veri setlerinde arama yapın.",
                "Veri Doğrulama: Hücrelere girilecek veri türlerini sınırlamak için Veri > Veri Doğrulama menüsünü kullanın.",
                "Veri İçe Aktarma: CSV, TXT dosyaları, web sayfaları ve veritabanlarından veri aktarabilirsiniz.",
                "Veri Temizleme: Yinelenen değerleri kaldırma, metni sütunlara dönüştürme ve boşlukları temizleme."
              ]
            }
          ],
          exercises: [
            {
              id: "veri-girisi-alistirma",
              type: "matching",
              title: "Veri Girişi ve Düzenleme Alıştırması",
              description: "Aşağıdaki işlemleri doğru yöntemlerle eşleştirin:",
              items: [
                {
                  id: "veri-1",
                  question: "Tarih Serisi Oluşturma",
                  answer: "Başlangıç tarihi girin ve doldurma kolunu kullanarak sürükleyin"
                },
                {
                  id: "veri-2",
                  question: "Sayısal Değerleri Kopyalama",
                  answer: "Hücreleri seçip Ctrl+C, hedef hücreyi seçip Ctrl+V veya Özel Yapıştırma"
                },
                {
                  id: "veri-3",
                  question: "Veri Setinde Belirli Değerleri Bulma",
                  answer: "Ctrl+F tuşlarını kullanarak Bul ve Değiştir penceresini açın"
                }
              ]
            }
          ],
          quiz: null
        }
      },
      {
        id: "temel-formuller",
        title: "Temel Formüller ve Fonksiyonlar",
        description: "Excel'de formül oluşturma ve temel fonksiyonları kullanma",
        moduleId: "modul-5",
        order: 3,
        duration: 30,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "Temel Formüller ve Fonksiyonlar"
            },
            {
              type: "paragraph",
              content: "Excel'in en güçlü özelliklerinden biri, formüller kullanarak hesaplamalar yapabilme yeteneğidir. Formüller, Excel'i basit bir tablo programından güçlü bir analiz aracına dönüştürür. Bu bölümde, Excel'de temel formülleri nasıl oluşturacağınızı ve kullanacağınızı öğreneceksiniz."
            },
            {
              type: "heading",
              title: "Formül Temelleri",
              content: "Formül Temelleri"
            },
            {
              type: "paragraph",
              content: "Excel'de formül, bir hücrede hesaplama yapmak için kullanılan bir ifadedir. Tüm formüller eşittir (=) işareti ile başlar ve Excel'e bu hücrede bir hesaplama yapılacağını bildirir. Formüller şunları içerebilir: Sayılar (örn. 123, 45.67), Hücre referansları (örn. A1, B5), İşleçler (örn. +, -, *, /), Fonksiyonlar (örn. TOPLA, ORTALAMA), Sabitler (örn. DOĞRU, YANLIŞ)."
            },
            {
              type: "info",
              content: {
                icon: "tips_and_updates",
                title: "Formül Oluşturma Adımları",
                description: "1. Formülü girmek istediğiniz hücreyi seçin\n2. Eşittir (=) işaretini yazın\n3. Formülü oluşturun (sayılar, hücre referansları, işleçler, fonksiyonlar kullanarak)\n4. Enter tuşuna basın"
              }
            },
            {
              type: "heading",
              title: "Basit Formül Örneği",
              content: "Basit Formül Örneği"
            },
            {
              type: "paragraph",
              content: "A1: 10\nB1: 20\nC1: =A1+B1\n\nC1 hücresinde formülün sonucu 30 olarak görüntülenir."
            },
            {
              type: "heading",
              title: "Formül Yazma Temelleri",
              content: "Formül Yazma Temelleri"
            },
            {
              type: "paragraph",
              content: "Excel'de tüm formüller eşittir (=) işareti ile başlar. Formüller hücre referansları, işlemciler, fonksiyonlar ve sabit değerler içerebilir. Örneğin: =A1+B1 veya =TOPLA(A1:A10)"
            },
            {
              type: "card",
              content: [
                {
                  icon: "add",
                  title: "Aritmetik İşlemciler",
                  description: "+ (toplama), - (çıkarma), * (çarpma), / (bölme), ^ (üs alma)"
                },
                {
                  icon: "compare_arrows",
                  title: "Karşılaştırma İşlemcileri",
                  description: "= (eşittir), > (büyüktür), < (küçüktür), >= (büyük eşittir), <= (küçük eşittir), <> (eşit değildir)"
                },
                {
                  icon: "cell_tower",
                  title: "Hücre Referansları",
                  description: "A1 (tek hücre), A1:C5 (hücre aralığı), $A$1 (mutlak referans)"
                }
              ]
            },
            {
              type: "heading",
              title: "Sık Kullanılan Fonksiyonlar",
              content: "Sık Kullanılan Fonksiyonlar"
            },
            {
              type: "table",
              content: {
                headers: ["Fonksiyon", "Açıklama", "Örnek"],
                rows: [
                  ["TOPLA", "Belirtilen hücreleri toplar", "=TOPLA(A1:A10)"],
                  ["ORTALAMA", "Belirtilen hücrelerin ortalamasını alır", "=ORTALAMA(B1:B20)"],
                  ["MIN", "En küçük değeri bulur", "=MIN(C1:C15)"],
                  ["MAKS", "En büyük değeri bulur", "=MAKS(D1:D15)"],
                  ["EĞER", "Belirtilen koşula göre farklı değerler döndürür", "=EĞER(A1>10,\"Yüksek\",\"Düşük\")"],
                  ["SAY", "Sayısal değer içeren hücreleri sayar", "=SAY(A1:A20)"]
                ]
              }
            },
            {
              type: "heading",
              title: "Hücre Referansları",
              content: "Hücre Referansları"
            },
            {
              type: "list",
              content: [
                "Göreceli Referans: A1, B2 - formül kopyalandığında referans değişir",
                "Mutlak Referans: $A$1, $B$2 - formül kopyalandığında referans değişmez",
                "Karma Referans: $A1, B$2 - ya satır ya da sütun sabittir"
              ]
            },
            {
              type: "info",
              content: {
                icon: "info",
                title: "Formül Kopyalama",
                description: "Bir formülü diğer hücrelere kopyalamak için, formülü içeren hücrenin sağ alt köşesindeki doldurma kolunu (fill handle) tutup sürükleyebilirsiniz. Göreceli referanslar otomatik olarak güncellenecektir."
              }
            },
            {
              type: "heading",
              title: "İşlem Önceliği",
              content: "İşlem Önceliği"
            },
            {
              type: "paragraph",
              content: "Excel, matematiksel işlem önceliği kurallarını takip eder:\n\n1. Parantez içindeki işlemler\n2. Üs alma (^)\n3. Çarpma (*) ve bölme (/)\n4. Toplama (+) ve çıkarma (-)\n\nAynı önceliğe sahip işleçler soldan sağa doğru değerlendirilir."
            },
            {
              type: "info",
              content: {
                icon: "calculate",
                title: "İşlem Önceliği Örneği",
                description: "=5+2*3\nSonuç: 11 (önce 2*3=6, sonra 5+6=11)\n\n=(5+2)*3\nSonuç: 21 (önce 5+2=7, sonra 7*3=21)"
              }
            },
            {
              type: "heading",
              title: "Formül Hataları ve Denetleme",
              content: "Formül Hataları ve Denetleme"
            },
            {
              type: "table",
              content: {
                headers: ["Hata", "Açıklama", "Olası Nedenleri"],
                rows: [
                  ["#DEĞER!", "Değer hatası", "Yanlış veri türü kullanımı (örn. metin yerine sayı bekleniyor)"],
                  ["#BÖLÜ/0!", "Sıfıra bölme hatası", "Formül sıfıra bölme işlemi içeriyor"],
                  ["#ADI?", "Ad hatası", "Tanımlanmamış bir ad veya fonksiyon kullanıldı"],
                  ["#BAŞV!", "Başvuru hatası", "Geçersiz hücre referansı (örn. silinmiş hücre)"],
                  ["#SAYI!", "Sayı hatası", "Sayısal bir sorun var (örn. çok büyük veya küçük sayı)"]
                ]
              }
            }
          ],
          exercises: [
            {
              id: "excel-proje-1",
              type: "matching",
              title: "Proje 1: Aile Bütçe Planı",
              description: "Aylık gelir-gider takibi için bir aile bütçe tablosu oluşturun. Bu proje, Excel becerilerinizi geliştirmenize yardımcı olacaktır.",
              items: [
                {
                  id: "butce-1",
                  question: "Gereken Beceriler",
                  answer: "Temel formüller (TOPLA, ORTALAMA), hücre biçimlendirme, koşullu biçimlendirme, basit grafik oluşturma"
                },
                {
                  id: "butce-2",
                  question: "İçermesi Gerekenler",
                  answer: "Gelir kaynakları, gider kategorileri, aylık toplam hesaplamaları, gelir-gider farkı formülü, basit sütun veya pasta grafik"
                }
              ]
            },
            {
              id: "excel-proje-2",
              type: "matching",
              title: "Proje 2: Öğrenci Not Takip Sistemi",
              description: "Bir sınıfın öğrenci notlarını takip edebileceğiniz bir tablo oluşturun. Bu proje, Excel'deki formül ve fonksiyon becerilerinizi geliştirmenize yardımcı olacaktır.",
              items: [
                {
                  id: "not-1",
                  question: "Gereken Beceriler",
                  answer: "Formül oluşturma, EĞER fonksiyonu kullanımı, sıralama, filtreleme, koşullu biçimlendirme"
                },
                {
                  id: "not-2",
                  question: "İçermesi Gerekenler",
                  answer: "Öğrenci adları, sınav notları, ödev notları, ortalama hesaplama, başarı durumu (EĞER fonksiyonu ile), en yüksek/düşük not hesaplama"
                }
              ]
            }
          ],
          quiz: {
            id: "modul-5-quiz",
            title: "Microsoft Excel Quiz",
            description: "Microsoft Excel modülünü tamamlamak için testi çözün.",
            questions: [
              {
                id: "q1",
                question: "Excel'de bir formül hangi karakterle başlar?",
                options: ["#", "=", "@", "$"],
                correctAnswer: 1
              },
              {
                id: "q2",
                question: "A1'den A10'a kadar olan hücrelerin toplamını almak için hangi formül kullanılır?",
                options: ["=TOPLA(A1,A10)", "=TOPLA(A1:A10)", "=TOPLAM(A1-A10)", "=A1+A2+A3+A4+A5+A6+A7+A8+A9+A10"],
                correctAnswer: 1
              },
              {
                id: "q3",
                question: "Excel'de $B$5 ifadesi neyi ifade eder?",
                options: ["B5 hücresinin para birimi formatında olduğunu", "B5 hücresine metin girilmesi gerektiğini", "B5 hücresinin mutlak referans olduğunu", "B5 hücresinin kilitli olduğunu"],
                correctAnswer: 2
              },
              {
                id: "q4",
                question: "Aşağıdakilerden hangisi Excel'de bir satır ve bir sütunun kesişim noktasına verilen addır?",
                options: ["Hücre", "Kesişim", "Referans", "Aralık"],
                correctAnswer: 0
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: "modul-6",
    title: "Microsoft PowerPoint",
    description: "Microsoft PowerPoint temel kullanımı",
    order: 6,
    isLocked: false,
    icon: "slideshow",
    lessons: [
      {
        id: "powerpoint-arayuzu",
        title: "PowerPoint Arayüzü",
        description: "PowerPoint'in temel arayüzünü ve bileşenlerini tanıma",
        moduleId: "modul-6",
        order: 1,
        duration: 20,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "PowerPoint Arayüzü"
            },
            {
              type: "paragraph",
              content: "Microsoft PowerPoint, etkileyici sunumlar oluşturmak ve sunmak için kullanılan profesyonel bir sunum programıdır. Bu bölümde, PowerPoint'in arayüzünü ve temel bileşenlerini öğreneceksiniz."
            },
            {
              type: "heading",
              title: "PowerPoint Penceresi Bileşenleri",
              content: "PowerPoint Penceresi Bileşenleri"
            },
            {
              type: "card",
              content: [
                {
                  icon: "menu",
                  title: "Şerit (Ribbon)",
                  description: "PowerPoint'in üst kısmında yer alan ve komutları kategorilere ayrılmış sekmelerde sunan menü sistemi."
                },
                {
                  icon: "slideshow",
                  title: "Slayt Görünümü",
                  description: "Slaytlarınızı düzenleyebileceğiniz ana çalışma alanı."
                },
                {
                  icon: "view_carousel",
                  title: "Slayt Bölmesi",
                  description: "Sol tarafta tüm slaytların küçük resimlerini gösteren panel."
                },
                {
                  icon: "note_alt",
                  title: "Notlar Bölmesi",
                  description: "Slaytla ilgili notlar ekleyebileceğiniz alan."
                }
              ]
            },
            {
              type: "heading",
              title: "Görünüm Seçenekleri",
              content: "Görünüm Seçenekleri"
            },
            {
              type: "table",
              content: {
                headers: ["Görünüm", "Açıklama"],
                rows: [
                  ["Normal", "Standart düzenleme görünümü"],
                  ["Slayt Sıralayıcısı", "Tüm slaytları yan yana görüntüler"],
                  ["Okuma Görünümü", "Sunumu tam ekran gösterir"],
                  ["Slayt Gösterisi", "Tam ekran sunum başlatır"]
                ]
              }
            },
            {
              type: "heading",
              title: "Dosya İşlemleri",
              content: "Dosya İşlemleri"
            },
            {
              type: "list",
              content: [
                "Yeni Sunum Oluşturma: Dosya > Yeni",
                "Sunumu Kaydetme: Dosya > Kaydet veya Ctrl+S",
                "Sunumu Açma: Dosya > Aç veya Ctrl+O",
                "Sunumu Yazdırma: Dosya > Yazdır veya Ctrl+P",
                "Sunumu PDF olarak Dışa Aktarma: Dosya > Dışa Aktar > PDF/XPS Belgesi Oluştur"
              ]
            },
            {
              type: "info",
              content: {
                icon: "auto_awesome",
                title: "Tasarım Fikirleri",
                description: "PowerPoint'in Tasarım Fikirleri özelliği, slaytlarınıza içerik ekledikçe otomatik olarak profesyonel düzen önerileri sunar. Tasarım sekmesindeki 'Tasarım Fikirleri' düğmesine tıklayarak bu önerileri görebilirsiniz."
              }
            }
          ],
          exercises: [
            {
              id: "powerpoint-arayuz-eslestirme",
              type: "matching",
              title: "PowerPoint Arayüz Bileşenlerini Eşleştirin",
              description: "Aşağıdaki PowerPoint arayüz bileşenlerini işlevleriyle eşleştirin:",
              items: [
                {
                  id: "match-1",
                  question: "Slayt Sıralayıcısı",
                  answer: "Tüm slaytları küçük resimler olarak yan yana görüntüler"
                },
                {
                  id: "match-2",
                  question: "Notlar Bölmesi",
                  answer: "Sunum sırasında hatırlamak istediğiniz bilgileri yazabileceğiniz alan"
                },
                {
                  id: "match-3",
                  question: "Animasyon Bölmesi",
                  answer: "Nesnelere uygulanan animasyonları düzenleme ve zamanlamayı ayarlama alanı"
                }
              ]
            }
          ],
          quiz: null
        }
      },
      {
        id: "slayt-olusturma",
        title: "Slayt Oluşturma ve Düzenleme",
        description: "Slayt oluşturma, metin ve nesneler ekleme",
        moduleId: "modul-6",
        order: 2,
        duration: 25,
        isComplete: false,
        content: {
          sections: [
            {
              type: "heading",
              content: "Slayt Oluşturma ve Düzenleme"
            },
            {
              type: "paragraph",
              content: "Etkili bir sunum oluşturmak için, iyi tasarlanmış slaytlar gereklidir. Bu bölümde, slayt oluşturma, metin ve nesneler ekleme, düzenleme tekniklerini öğreneceksiniz."
            },
            {
              type: "heading",
              title: "Yeni Slayt Ekleme",
              content: "Yeni Slayt Ekleme"
            },
            {
              type: "paragraph",
              content: "Yeni bir slayt eklemek için Giriş sekmesinde 'Yeni Slayt' düğmesine tıklayabilirsiniz. Düğmenin alt kısmındaki ok işaretine tıklayarak farklı slayt düzenleri arasından seçim yapabilirsiniz."
            },
            {
              type: "heading",
              title: "Metin Ekleme ve Düzenleme",
              content: "Metin Ekleme ve Düzenleme"
            },
            {
              type: "card",
              content: [
                {
                  icon: "title",
                  title: "Başlık ve Alt Başlık",
                  description: "Slaytın üst kısmındaki metin kutularına tıklayarak başlık ve alt başlık ekleyebilirsiniz."
                },
                {
                  icon: "format_list_bulleted",
                  title: "Madde İşaretli Listeler",
                  description: "Metni seçip Giriş sekmesindeki madde işaretleri düğmesine tıklayarak liste oluşturabilirsiniz."
                },
                {
                  icon: "text_fields",
                  title: "Metin Kutusu",
                  description: "Ekle > Metin Kutusu seçeneğiyle istediğiniz yere metin kutusu ekleyebilirsiniz."
                }
              ]
            },
            {
              type: "heading",
              title: "Nesne Ekleme",
              content: "Nesne Ekleme"
            },
            {
              type: "table",
              content: {
                headers: ["Nesne Türü", "Ekleme Yolu"],
                rows: [
                  ["Resim", "Ekle > Resimler > Bu Cihazdan"],
                  ["Şekil", "Ekle > Şekiller"],
                  ["SmartArt", "Ekle > SmartArt"],
                  ["Grafik", "Ekle > Grafik"],
                  ["Tablo", "Ekle > Tablo"]
                ]
              }
            },
            {
              type: "heading",
              title: "Slayt Geçişleri ve Animasyonlar",
              content: "Slayt Geçişleri ve Animasyonlar"
            },
            {
              type: "paragraph",
              content: "Slayt geçişleri, bir slayttan diğerine geçerken uygulanan görsel efektlerdir. Animasyonlar ise slayt içindeki nesnelerin hareket etmesini sağlayan efektlerdir."
            },
            {
              type: "list",
              content: [
                "Slayt Geçişi Ekleme: Geçişler sekmesi > istediğiniz geçiş efektini seçin",
                "Animasyon Ekleme: Animasyonlar sekmesi > nesneyi seçin > istediğiniz animasyonu seçin",
                "Zamanlama Ayarları: Geçiş veya animasyon sekmesinde süre ve zamanlama seçeneklerini ayarlayın",
                "Animasyon Sırası: Animasyon Bölmesi'ni kullanarak animasyonların sırasını düzenleyin"
              ]
            },
            {
              type: "info",
              content: {
                icon: "warning",
                title: "Dikkat!",
                description: "Aşırı geçiş ve animasyon kullanımı sunumun profesyonelliğini azaltabilir. Sade ve tutarlı bir yaklaşım izleyin. Tüm sunumda aynı geçiş stilini kullanmak daha profesyonel bir görünüm sağlar."
              }
            }
          ],
          exercises: [
            {
              id: "powerpoint-proje-1",
              type: "matching",
              title: "Proje 1: Şirket Tanıtım Sunumu",
              description: "Hayali veya gerçek bir şirket için profesyonel bir tanıtım sunumu hazırlayın. Bu proje, PowerPoint becerilerinizi geliştirmenize yardımcı olacaktır.",
              items: [
                {
                  id: "sunum-1",
                  question: "Gereken Beceriler",
                  answer: "Slayt düzeni seçimi, tema uygulaması, metin biçimlendirme, görseller ekleme, şekil ve grafikler kullanma"
                },
                {
                  id: "sunum-2",
                  question: "İçermesi Gerekenler",
                  answer: "Kapak slaytı, şirket hakkında bilgi, ürün/hizmet tanıtımı, ekip tanıtımı, iletişim bilgileri, en az bir grafik ve SmartArt diyagram"
                }
              ]
            },
            {
              id: "powerpoint-proje-2",
              type: "matching",
              title: "Proje 2: Eğitim Sunumu",
              description: "İlgi duyduğunuz bir konuda eğitim amaçlı bir sunum hazırlayın. Bu proje, etkili sunum tasarımı becerilerinizi geliştirmenize yardımcı olacaktır.",
              items: [
                {
                  id: "egitim-1",
                  question: "Gereken Beceriler",
                  answer: "Slayt tasarımı, görsel-metin dengesi, animasyon ve geçiş efektleri, medya (ses/video) ekleme, notlar ekleme"
                },
                {
                  id: "egitim-2",
                  question: "İçermesi Gerekenler",
                  answer: "Giriş slaytı, konu başlıkları, içerik slaytları, özet, görsel destekli açıklamalar, etkileşimli öğeler (bağlantılar veya tetikleyiciler)"
                }
              ]
            },
            {
              type: "heading",
              content: "PowerPoint Uygulama Projeleri"
            },
            {
              type: "heading",
              title: "Proje 1: Şirket Tanıtım Sunumu",
              content: "Proje 1: Şirket Tanıtım Sunumu"
            },
            {
              type: "paragraph",
              content: "Hayali bir şirket için 10-15 slaytlık profesyonel bir tanıtım sunumu hazırlayın. Sunumunuzda şirket misyonu, vizyonu, ürün/hizmetler, ekip ve iletişim bilgileri bölümleri olmalıdır. Şirket logosu için bir görsel, ürün/hizmetler için görseller, ve en az bir grafik veya tablo ekleyin. Tutarlı bir tema, profesyonel yazı tipleri ve renk şeması kullanarak profesyonel bir görünüm elde edin. Slaytlar arasında uygun geçiş efektleri ekleyin ve en az bir animasyon kullanın."
            },
            {
              type: "heading",
              title: "Proje 2: Eğitim Sunumu",
              content: "Proje 2: Eğitim Sunumu"
            },
            {
              type: "paragraph",
              content: "İlgilendiğiniz bir konu hakkında 8-10 slaytlık eğitim amaçlı bir sunum hazırlayın. Sunumunuzda giriş, ana konu başlıkları, görsellerle desteklenmiş açıklamalar ve özet bölümleri olmalıdır. SmartArt grafiklerini kullanarak en az bir kavram şeması veya süreç akışı ekleyin. En az bir video veya ses dosyası yerleştirin (veya bunlar için yer tutucu ekleyin). Notlar bölümüne konuşma notları ekleyin ve slaytı gösteren kişiye sunum ipuçları verin. Sunum sonuna bir quiz slaytı ekleyerek interaktif bir bölüm oluşturun."
            }
          ],
          quiz: {
            id: "modul-6-quiz",
            title: "Microsoft PowerPoint Quiz",
            description: "Microsoft PowerPoint modülünü tamamlamak için testi çözün.",
            questions: [
              {
                id: "q1",
                question: "PowerPoint'te yeni bir slayt eklemek için hangi sekme kullanılır?",
                options: ["Dosya", "Giriş", "Tasarım", "Geçişler"],
                correctAnswer: 1
              },
              {
                id: "q2",
                question: "Aşağıdakilerden hangisi PowerPoint'te bir görünüm türü değildir?",
                options: ["Normal", "Slayt Sıralayıcısı", "Slayt Düzenleyici", "Okuma Görünümü"],
                correctAnswer: 2
              },
              {
                id: "q3",
                question: "PowerPoint'te slaytlar arasındaki geçiş efektleri hangi sekmeden ayarlanır?",
                options: ["Giriş", "Animasyonlar", "Geçişler", "Efektler"],
                correctAnswer: 2
              },
              {
                id: "q4",
                question: "PowerPoint sunumunu başlatmak için kullanılan kısayol tuşu hangisidir?",
                options: ["F1", "F5", "Ctrl+P", "Ctrl+S"],
                correctAnswer: 1
              }
            ]
          }
        }
      }
    ]
  }
];

export function getModuleById(moduleId: string): Module | undefined {
  return courseData.find(module => module.id === moduleId);
}

export function getLessonById(moduleId: string, lessonId: string) {
  const module = getModuleById(moduleId);
  if (!module) return undefined;
  return module.lessons.find(lesson => lesson.id === lessonId);
}

export function getNextLesson(currentModuleId: string, currentLessonId: string) {
  const currentModule = getModuleById(currentModuleId);
  if (!currentModule) return null;
  
  const currentLessonIndex = currentModule.lessons.findIndex(lesson => lesson.id === currentLessonId);
  
  // If there's a next lesson in the current module
  if (currentLessonIndex < currentModule.lessons.length - 1) {
    return {
      moduleId: currentModuleId,
      lessonId: currentModule.lessons[currentLessonIndex + 1].id,
      title: currentModule.lessons[currentLessonIndex + 1].title
    };
  }
  
  // If not, check the next module
  const currentModuleIndex = courseData.findIndex(module => module.id === currentModuleId);
  if (currentModuleIndex < courseData.length - 1) {
    const nextModule = courseData[currentModuleIndex + 1];
    if (nextModule.lessons.length > 0) {
      return {
        moduleId: nextModule.id,
        lessonId: nextModule.lessons[0].id,
        title: nextModule.lessons[0].title
      };
    }
  }
  
  return null;
}

export function getPreviousLesson(currentModuleId: string, currentLessonId: string) {
  const currentModule = getModuleById(currentModuleId);
  if (!currentModule) return null;
  
  const currentLessonIndex = currentModule.lessons.findIndex(lesson => lesson.id === currentLessonId);
  
  // If there's a previous lesson in the current module
  if (currentLessonIndex > 0) {
    return {
      moduleId: currentModuleId,
      lessonId: currentModule.lessons[currentLessonIndex - 1].id,
      title: currentModule.lessons[currentLessonIndex - 1].title
    };
  }
  
  // If not, check the previous module
  const currentModuleIndex = courseData.findIndex(module => module.id === currentModuleId);
  if (currentModuleIndex > 0) {
    const prevModule = courseData[currentModuleIndex - 1];
    if (prevModule.lessons.length > 0) {
      const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
      return {
        moduleId: prevModule.id,
        lessonId: lastLesson.id,
        title: lastLesson.title
      };
    }
  }
  
  return null;
}

export function getOverallProgress(): number {
  // Sadece açık modülleri hesaba kat
  let completedLessons = 0;
  let totalLessons = 0;
  
  courseData.forEach(module => {
    // Sadece açık (kilitli olmayan) modülleri hesaba kat
    if (!module.isLocked) {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (lesson.isComplete) {
          completedLessons++;
        }
      });
    }
  });
  
  // İlk modül her zaman açık olduğundan, bu hesaplamayla yeni başlayanlar için de mantıklı bir sonuç elde edilir
  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
}

export function getModuleProgress(moduleId: string): number {
  const module = getModuleById(moduleId);
  if (!module) return 0;
  
  let completedLessons = 0;
  module.lessons.forEach(lesson => {
    if (lesson.isComplete) {
      completedLessons++;
    }
  });
  
  return module.lessons.length > 0 ? Math.round((completedLessons / module.lessons.length) * 100) : 0;
}
