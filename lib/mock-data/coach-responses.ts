import type { UserProfile } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
//  AI Coach Responses — Refined & Localized (Turkish)
//  Rule: Every response must explain *why* the advice works, not just *what*
//  to do. Language should be direct, role-aware, practical, and act as a Mentor.
// ─────────────────────────────────────────────────────────────────────────────

export interface CoachTip {
  id: string;
  title: string;
  body: string;
}

/**
 * Dashboard insight: one focused, role-aware piece of coaching.
 */
export function getDashboardInsight(profile: UserProfile): string {
  const { interviewType, urgency, englishLevel, userType, targetRole, sector } = profile;
  const role = targetRole || "bu pozisyon";

  if (urgency === "this-week") {
    if (interviewType === "behavioral") {
      return `Zamanın daralmışken her soruya ayrı bir hikaye bulmaya çalışmak yanlış bir stratejidir. Bunun yerine en güçlü 3 deneyimini (bir süreci yönettiğin, bir sorunu çözdüğün ya da kritik bir şey öğrendiğin anlar) seç. Bu 3 güçlü hikaye, farklı açılardan anlatıldığında 5-8 farklı "davranışsal" soruya cevap verebilir. 15 yüzeysel cevap ezberlemektense, 3 sağlam hikayeyi derinlemesine sahiplenmek çok daha etkilidir.`;
    }
    if (interviewType === "phone") {
      return `Telefon mülakatlarında adayların en çok elenme sebebi sadede geç gelmeleridir. Mülakatçı beden dilini göremediği için kurduğun ilk cümle tüm ağırlığı taşır. Bu hafta, cevaplarına hep bir cümlelik "özet" ile başlamayı pratik et. Sonra kanıtını sun ve bitir. Sen görünmezken bile karşı tarafın ilgisini canlı tutmanın tek yolu bu yapıdır.`;
    }
    if (interviewType === "technical") {
      return `Bu hafta, sadece "doğru cevabı" bulmaktan ziyade düşünce yapını aktarmaya odaklan. Teknik mülakatçılar sadece sonuca değil, problem çözme yaklaşımına bakar. Tıkandığında sessiz kalmak en büyük hatadır; bildiklerini, nerelerde belirsizlik yaşadığını ve o an nasıl bir yol izleyeceğini sesli düşünerek anlat.`;
    }
    return `Bu mülakat için bu hafta yüzeye değil, derinliğe odaklan. İyi hazırlanmış 3 hikaye, ezberlenmiş 10 hikayeden daha iyidir. Her hikayende açık bir problem, aldığın spesifik aksiyon ve ölçülebilir bir sonuç (başarı) olmalı. Bu üçlü kombinasyon, yüzeysel cevapların bırakamayacağı kadar güçlü bir izlenim bırakır.`;
  }

  if (interviewType === "behavioral") {
    return `Davranışsal (Behavioral) mülakatlar, geçmiş tecrübelerinin ${role} için ne kadar aktarılabilir olduğunu test eder. Adayların en sık yaptığı hata, kendi kararlarını açıklamak yerine sadece yaşananları hikaye gibi anlatmaktır. Mülakatçı her soruda şunu duymak ister: "Sen spesifik olarak ne yaptın, bu işin zorluğu neydi ve senin sayende ne değişti?" Hikayelerini bu üç soruya cevap verecek şekilde kurgula.`;
  }

  if (interviewType === "technical") {
    return `${role} için teknik mülakatlar iki şeyi aynı anda test eder: Alan bilgin ve baskı altındayken iletişim kurabilme yeteneğin. Birçok aday donanımına güvenirken, onu nasıl ifade edeceğini çalışmayı ihmal eder. Her pratik seansına sesli düşünerek çözüme giderek başla; mümkünse kendini kaydet. Fikirlerini nasıl gerekçelendirdiğin, çoğu zaman ulaştığın doğru cevap kadar değerlidir.`;
  }

  if (interviewType === "case-study") {
    return `${sector} sektöründeki vaka (case) mülakatları, elinde eksik bilgi varken nasıl düşündüğünü görmek için tasarlanmıştır — ki gerçek iş hayatı da böyledir. Soruyu aldığında cevap vermeden önceki 5 saniyelik duraksaman bir zayıflık değil, stratejik bir güçtür. Önce "Bunu yapılandırmama izin verin" de ve yaklaşımının iskeletini kur. ${sector} mülakatçılarının tam olarak aradığı şey budur: Baskı altında yapılandırılmış düşünce.`;
  }

  if (userType === "career-switcher") {
    return `Kariyer değiştiren adaylar genellikle eski özgeçmişleri için anlamsız bir savunma içine girerler. Bunu yapma. Eski tecrübelerin, ${role} pozisyonu için değerlendirilebilir bağlamlardır. Senden duymak istedikleri şey, önceki sektöründen edindiğin yetkinliklerle yeni rolün talepleri arasındaki net çizgidir. Her cevapta zımnen şu mesajı vermelisin: "Bunu daha önce farklı bir alanda başardım, burada da rahatlıkla yapabilirim." Bu bağlantı noktalarını netleştir.`;
  }

  if (userType === "student" || userType === "new-graduate") {
    return `Kapsamlı bir iş geçmişinin olmaması bir dezavantaj değil; ancak elindeki okul projeleri, kulüp faaliyetleri veya staj deneyimlerini profesyonel bir dille sunman şarttır. "Grup ödevi" demek yerine, "3 haftalık kritik bir süreçte bir ekibin teknik teslimatını yönettim" şeklinde ifade etmelisin. Deneyim aynıdır, fakat onu ${role} mülakatında öne çıkaran şey senin bu çerçevelemeyi nasıl yaptığındır.`;
  }

  if (englishLevel === "intermediate" || englishLevel === "beginner") {
    return `İngilizce mülakatlarda cümlenin yapısındaki netlik, kelime dağarcığının eksikliğini büyük ölçüde kapatır. Düzenli bir şablon izlersen (Bağlam, Aksiyon, Sonuç), cümlende bazı kelimeleri unutmuş olsan bile dinleyici ana fikri çok rahat kavrar. "What I did was...", "The outcome was..." gibi geçiş/bağlantı kalıplarını ezberle. Bu kalıplar konuşurken sana zaman kazandıracak köprülerdir.`;
  }

  return `En iyi hazırlanan adaylar cevap metnini ezberlemez, hikayelerini sahiplenirler. Mülakat öncesinde yaşanmış gerçek bir olayı alıp 3 farklı şekilde (liderlik, problem çözme ve ekip çalışması odaklı) anlatmayı pratik et. Hangi açıyı öne çıkardığına bağlı olarak aynı hikaye onlarca farklı mülakat sorusuna kusursuz yanıt olabilir. Seni çevik kılan şey bu stratejidir.`;
}

/**
 * Coaching tips for the full AI Coach page.
 */
export function getCoachTips(profile: UserProfile): CoachTip[] {
  const { interviewType, userType, sector, englishLevel, targetRole } = profile;
  const role = targetRole || "hedeflediğiniz rol";
  const tips: CoachTip[] = [];

  tips.push({
    id: "opening",
    title: "İlk cümlen neden tüm cevabının kaderini belirler?",
    body:
      interviewType === "phone"
        ? `Telefonda, mülakatçı senin hakkında ilk 10 saniye içinde bir izlenim oluşturur. Mimiklerini veya vücut dilini göremediği için sadece ses tonun ve ilk söylediklerine güvenir. Adayların çoğu doğrudan bağlama girer ki bu vurucu noktayı gizler. Bunun yerine, direkt sonuç veya fikirle söze başla: "Bu durumu şöyle çözdüm; süreci kısaca özetliyim." Bu yapı kendinden emin olduğunun en net sinyalidir.`
        : `En sık yapılan mülakat hatası, asıl konuya gelmeyi geciktirmektir. İK uzmanları günde onlarca cevap dinler; ve ne yaptığınıza hemen gelmezseniz koparlar. Kendini her cevaba net bir özet cümlesiyle başlamaya alıştır. Ardından hikayenin detaylarını destekleyici kanıt olarak sun. Bu sadece bir yapı tavsiyesi değil, soruyu anlayıp anlamadığının en net göstergesidir.`,
  });

  if (interviewType === "behavioral" || interviewType === "mixed") {
    tips.push({
      id: "star",
      title: "STAR bir senaryo değil, iskelettir: Farkı anlayın",
      body: `STAR (Durum, Görev, Aksiyon, Sonuç) metodunu herkes bilir. Ancak çoğu adayın atladığı nokta; mülakatçının asıl ilgilendiği kısmın sadece Aksiyon ve Sonuç olduğudur. Durum ve Görev kısımlarını hikayenin %20'si civarında, kısa tutmalısın. Geri kalan %80'i sen ne karar aldın, nasıl düşündün ve günün sonunda nasıl bir somut sonuç (veri veya çıktı) elde ettin konusuna ayır. ${role} pozisyonu için başarı her zaman kanıtlanabilir olmalıdır.`,
    });
  }

  if (interviewType === "technical") {
    tips.push({
      id: "technical-talk",
      title: "Teknik mülakatlarda düşünce yapını nasıl pazarlarsın?",
      body: `Teknik mülakatçılar, problemi pat diye çözenlerle "problemi nasıl çözdüğünü adım adım anlatanları" birbirinden ayırırlar. Tıkandığında sessizliğe bürünmek yerine süreci sese dök: "Şu an X'i analiz ettim, Y kısmında emin değilim. Gerçek bir senaryo olsaydı ilk olarak Z dökümantasyonunu incelerdim." Bunu yapmak yetenek seviyeni dürüstçe yansıttığı gibi, takım için harika bir "çalışma arkadaşı" olacağını gösterir.`,
    });
  }

  if (userType === "student" || userType === "new-graduate") {
    tips.push({
      id: "no-experience",
      title: "Akademik ve proje deneyimini 'iş dili' ile sunmak",
      body: `${role} için mülakat yapanlar senin yıllar süren bir kurumsal geçmişin olmadığını biliyor. Ancak deneyimlerini okul diliyle değil "profesyonel bir dille" çerçevelemeni beklerler. "Veritabanını ayarladığım bir grup ödeviydi" yerine, "Teknik limitlerin yüksek olduğu 3 haftalık bir projede veritabanı mimarisini ben modelledim" deyin. Okul veya stajdaki projende aldığın sorumluluğun iş dünyasındaki gerçek karşılığını aktarın.`,
    });
  }

  if (userType === "career-switcher") {
    tips.push({
      id: "switcher",
      title: "Alan değiştirenler kendilerini nasıl kredilendirmeli?",
      body: `Alan değiştirmenin en büyük riski, eski vizyonunun işe yaramaz olduğunu düşünmendir (veya bunu öyle yansıtlandır). Mülakatçının görmek istediği şey, geçmişte sahip olduğun hangi becerilerin ${role} ihtiyacına entegre edilebileceğidir. "Daha önce farklı bir alandaydım, ancak orada sıkça geliştirdiğim [X] kası, doğrudan bu roldeki [Y] krizini çözmeye yarayacak." Böyle 2-3 güçlü mental "köprü" hazırlamalısın.`,
    });
  }

  if (englishLevel === "intermediate" || englishLevel === "beginner") {
    tips.push({
      id: "english",
      title: "Dil eksikliğini net bir iskeletle nasıl telafi edersin?",
      body: `Mülakatçılar için kelime dağarcığın kadar, o kelimeleri ne kadar mantıklı bir akışta sunduğun da önemlidir. Özellikle yabancı dil mülakatlarında, kısa, iskeleti sağlam cümleler her zaman uzun ama nereye gittiği belli olmayan cümleleri yener. Sunum sırasında kaybolmamak ve dinleyiciyi yanında tutmak için 5-6 köprü kalıbını hatasız kullanmayı öğren: "The situation was...", "My measurable result was..." gibi.`,
    });
  }

  if (profile.prepLanguage === "turkish") {
    tips.push({
      id: "turkish",
      title: "Türkçe mülakatta güçlü izlenim bırakmak",
      body: `Türkçe iletişimde asıl fikri konuşmanın sonuna saklamak (tümevarım) doğal hissettirir, ancak mülakatta bu adayda zayıf bir algı yaratır. Bunun tersini yapın: Odaklandığınız yanıtı veya başarıyı önce söyleyin, ardından detaylandırın. Ayrıca mülakatlarda çok sık kullandığımız "biz yaptık, ekipte hallettik" kültürünü bir kenara bırakın; inisiyatif aldığınızı kanıtlamak isterseniz "ben yönettim, ben önerdim" diyebilmelisiniz.`,
    });
  }

  if (sector === "finance" || sector === "consulting") {
    tips.push({
      id: "finance-consulting",
      title: `${sector === "finance" ? "Finans" : "Danışmanlık"} uzmanları aslında neyi duymak ister?`,
      body: `Bu sektörler rakamları, varsayımları ve metrikleri ödüllendirir çünkü işin kendi doğası böyledir. Başarınızı dile getirirken her zaman oran konuşun. "İşlemleri hızlandırdım" yerine, "Bunu yaparak sürecin yaklaşık %30 hızlanmasını sağladım ki bu da bize haftalık en az X saat kazandırdı." deyin. Tahmini de olsa arka planda mantikli bir temele dayanan rakamlar liderlik duruşunuzu keskinleştirir.`,
    });
  }

  tips.push({
    id: "closing",
    title: "Konuşmayı mülakatçının hafızasına kazınacak şekilde kapatmak",
    body: `Çoğu aday sözlerini bitirirken aniden "kısaca böyleydi..." diyerek sesini alçaltır. Tam tersine, son cümlen senin iz bıraktığın yerdir. Hikayeni sonlandırırken aldığın spesifik dersi pozisyona bağla: "...bundan çıkardığım ders buydu, ki bu vizyonun ${role} pozisyonunda karşılaşabileceğim benzer bir dinamikte bana çok fayda sağlayacağına inanıyorum." Bu kapanış sizi edilgen bir anlatıcıdan, kendinden emin bir adaya dönüştürür.`,
  });

  return tips.slice(0, 6);
}

/**
 * Coaching feedback on a draft answer.
 */
export function getMockCoachFeedback(
  questionText: string,
  answerDraft: string,
  profile: UserProfile
): string {
  const words = answerDraft.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const isLong = wordCount > 130;
  const isShort = wordCount < 25;
  const hasResult =
    answerDraft.toLowerCase().includes("result") ||
    answerDraft.toLowerCase().includes("outcome") ||
    answerDraft.toLowerCase().includes("led to") ||
    answerDraft.toLowerCase().includes("sonuç") ||
    answerDraft.toLowerCase().includes("başar") ||
    answerDraft.toLowerCase().includes("elde et");
  const hasAction =
    answerDraft.toLowerCase().includes(" i ") ||
    answerDraft.toLowerCase().includes("i decided") ||
    answerDraft.toLowerCase().includes(" ben ") ||
    answerDraft.toLowerCase().includes("yaptım") ||
    answerDraft.toLowerCase().includes("çözdüm") ||
    answerDraft.toLowerCase().includes("yaklaşımım");

  const { interviewType, targetRole } = profile;
  const role = targetRole || "bu rol";

  if (isShort) {
    return `Taslağın yaklaşık ${wordCount} kelime. ${interviewType} formatı için rekabetçi olamayacak kadar kısa. Kısa cevaplar genellikle adayın pozisyonun gerektirdiği derinliğe inmediğine ya da söyleyecek yeterli deneyimi olmadığına işaret eder. Aksiyonunu biraz detaylandır: Spesifik sorun neydi? Sen tam olarak neye karar verdin (ekip değil, doğrudan "sen")? Olması gereken ortalama kelime uzunluğu 80-120 kelime (yani konuşurken 60-90 saniye) bandındadır.`;
  }

  if (isLong && interviewType === "phone") {
    return `Taslağın ~${wordCount} kelime. Telefon odaklı bir görüşme için fazla uzun. Telefon mülakatlarında görsel iletişim kısıtlı olduğundan 60 saniyeden sonra dikkat ciddi anlamda dağılır. Yapman gereken detayları atmak değil, ana fikri hızla baştan vermektir (Front-load stratejisi). Giriş kısmında bağlam anlatmayı bırakıp, eylemini ve ulaştığın sonucu net bir şekilde ifade edecek 80-100 kelimelik bir formata çekmelisin.`;
  }

  if (isLong) {
    return `Bu taslak yaklaşık ${wordCount} kelime; canlı bir mülakat atmosferi için fazlasıyla uzun. Asıl sorun dinleyicinin odak kaybı yaşaması değil, en güçlü argümanlarını bu kadar yoğun bir açıklamanın içinde boğmandır. Yoğun ve hedefe odaklanmış 90 kelimelik bir yanıt, upuzun 200 kelimeden her zaman daha akılda kalıcıdır. Bu metne dön ve gereksiz "durum/bağlam" özetlerini çıkarıp, sadece kendi kritik eylemine ve o eylemin başarısına odaklan.`;
  }

  if (!hasResult && interviewType === "behavioral") {
    return `Cevabında henüz belirgin bir "soğuk gerçek", yani elde edilmiş bir "Sonuç (Result)" net olarak görünmüyor. Davranışsal mülakatlarda asıl puan alınan kısım anlattığın hikayenin nasıl bittiğidir. Süreci ne kadar iyi betimlersen betimle, eylemlerin sonucunda departmana, projeye veya sayısal metriklere ne fayda sağladığını bir cümle ile özetlemezsen cevap yarım kalır. Örneğin: "Bu süreç sonucunda, sorun kabaca %20 oranında azaldı" demek bile çok önemlidir.`;
  }

  if (!hasAction) {
    return `Taslağın yaşanan durumu anlatıyor ancak *"Senin"* spesifik olarak neyi devreye soktuğunu netleştirmiyor. Şirketler inisiyatif alan adayları duymak ister. Mümkün olduğunca birinci tekil şahıs dili kullan: "Fark ettiğim için şunu önerdim...", "Benim buradaki sürecim şöyleydi...". Grup başarıları elbette ki değerlidir, ancak bireysel katkın ve analizin ${role} pozisyonuna uygunluğunu gösterecek şey yalnız senin iradendir. Kendini sürecin merkezine koyarak bir iki cümleyi revize et.`;
  }

  return `Taslağın çok güçlü bir iskelete sahip. Gerekli verileri ve yaklaşımını net olarak yansıtıyor. Mülakata girmeden önce bunu sesli şekilde oku ve süre tut; idealinin 60-90 saniye arası olduğunu unutma. Eğer fazlası çıkarsa "Durum (Situation)" kısmından bir cümleyi eksilt. Son bir premium dokunuş: Cevabını noktalarken edindiğin bu güçlü kasın ${role} pozisyonunda sana nasıl fayda sağlayacağından bir kez daha bahsedersen çok daha profesyonel bir imza atmış olursun. Harika bir başlangıç!`;
}
