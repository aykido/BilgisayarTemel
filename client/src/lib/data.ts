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
    isLocked: true,
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
    isLocked: true,
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
    isLocked: true,
    icon: "description",
    lessons: []
  },
  {
    id: "modul-5",
    title: "Microsoft Excel",
    description: "Microsoft Excel temel kullanımı",
    order: 5,
    isLocked: true,
    icon: "table_chart",
    lessons: []
  },
  {
    id: "modul-6",
    title: "Microsoft PowerPoint",
    description: "Microsoft PowerPoint temel kullanımı",
    order: 6,
    isLocked: true,
    icon: "slideshow",
    lessons: []
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
  let completedLessons = 0;
  let totalLessons = 0;
  
  courseData.forEach(module => {
    module.lessons.forEach(lesson => {
      totalLessons++;
      if (lesson.isComplete) {
        completedLessons++;
      }
    });
  });
  
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
