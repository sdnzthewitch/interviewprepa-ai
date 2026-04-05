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
  const inputLower = answerDraft.toLowerCase();
  
  // Keyword based intents for AI Chatbot feel
  if (inputLower.includes("merhaba") || inputLower.includes("selam")) {
    return `Merhaba! Hazırlık sürecinde sana destek olmak için buradayım. Bugün hangi konuya odaklanmak istersin? Belirli bir soru üzerinden pratik yapabiliriz, bana bir mülakat sorusuna verdiğin cevabı atabilirsin veya genel süreç yönetimi üzerine konuşabiliriz.`;
  }

  if (inputLower.includes("teknik soru") || inputLower.includes("zor bir soru sor")) {
    if (profile.sector === "technology" || profile.interviewType === "technical") {
      return `Harika. Hadi seni biraz zorlayalım. Farz edelim ki yüksek trafikli (high-traffic) bir e-ticaret sitesi için sipariş sistemi tasarlıyorsun. "Kara Cuma" (Black Friday) gibi aşırı yük altında sistemin çökmemesi ve veritabanı kilitlenmesi (lock) yaşamamak için mimaride hangi pattern'leri (kuyruk yapıları, caching, microservices) kullanırdın?\n\nBu soruya nasıl yaklaşacağını adım adım anlatır mısın?`;
    } else {
      return `Tabii! Kendi alanın üzerine bir soru sorayım. Farz edelim ki yöneticin senden tamamen yeni bir strateji kurmanı istedi ama bütçen %40 kısıtlandı. \n\nBu senaryoda projenin teknik adımlarını, önceliklendirme stratejini ve paydaş iletişimini nasıl yönetirsin? Yanıtını STAR formatında yapılandırmanı bekliyorum.`;
    }
  }

  if (inputLower.includes("davranışsal") || inputLower.includes("soru sor")) {
    return `Peki, en sık elenilen sorulardan biriyle başlayalım:\n\n"Bana iş hayatınızda aldığınız çok ciddi bir eleştiriyi ve bu eleştiri karşısında ne yaptığınızı anlatın."\n\nBu sorudaki amacım eleştiriyi alıp alamadığını değil, profesyonel egonu nasıl yönettiğini görmek. Cevabını buraya yazabilirsin, nasıl daha güçlü bir hale getirebileceğimizi birlikte inceleyelim.`;
  }

  if (inputLower.length < 20 && !inputLower.includes("soru")) {
    return `Söylediğin şeyi anlıyorum ancak mülakat formatında buna bir cevap verebilmem veya geri bildirim oluşturabilmem için cümleni biraz daha açman gerekiyor. Bana pratik yapmak istediğin konuyu ya da doğrudan bir "cevap taslağını" yazabilirsin.`;
  }

  const words = answerDraft.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const isLong = wordCount > 130;
  const isShort = wordCount < 25;
  const hasResult =
    inputLower.includes("result") ||
    inputLower.includes("outcome") ||
    inputLower.includes("led to") ||
    inputLower.includes("sonuç") ||
    inputLower.includes("başarı") ||
    inputLower.includes("elde ett") ||
    inputLower.includes("kazandırd") ||
    inputLower.includes("düştü") ||
    inputLower.includes("arttı");
  const hasAction =
    inputLower.includes(" i ") ||
    inputLower.includes(" ben ") ||
    inputLower.includes("yaptım") ||
    inputLower.includes("karar verdim") ||
    inputLower.includes("önerdim") ||
    inputLower.includes("çözdüm") ||
    inputLower.includes("yaklaşımım");

  const { interviewType, targetRole } = profile;
  const role = targetRole || "bu rol";

  if (isShort) {
    return `Gönderdiğin taslak yaklaşık ${wordCount} kelime. ${interviewType} formatı için rekabetçi olamayacak kadar kısa. Kısa cevaplar genellikle adayın pozisyonun gerektirdiği derinliğe inmediğine ya da özgüven eksikliğine işaret eder. Aksiyonunu biraz detaylandır: Spesifik sorun neydi? Sen tam olarak neye karar verdin? Sen konuşurken ortalama 60-90 saniye (80-120 kelime) aralığını hedeflemeliyiz.`;
  }

  if (isLong && interviewType === "phone") {
    return `Telefon odaklı bir görüşme için ${wordCount} kelimelik bu metin fazla uzun. Telefon mülakatlarında görsel iletişim kısıtlı olduğundan 60 saniyeden sonra dikkat ciddi anlamda dağılır. Yapman gereken şey detayları atmak değil, ana fikri hızla baştan vermektir (Front-load stratejisi). 80-100 kelimeye indirip, sonucunu ilk cümle olarak sunmayı dener misin?`;
  }

  if (isLong) {
    return `Bu taslak (${wordCount} kelime) canlı bir mülakat atmosferi için fazlasıyla uzun. En güçlü argümanlarını bu kadar yoğun bir açıklamanın içinde boğmamalısın. Odaklanmış 90 kelimelik bir yanıt, upuzun 200 kelimeden her zaman daha akılda kalıcıdır. Lütfen gereksiz "durum/bağlam" özetlerini çıkarıp bu metni yeniden yapılandır.`;
  }

  if (!hasResult && (interviewType === "behavioral" || interviewType === "mixed")) {
    return `Hikayeyi çok iyi anlatmışsın; ancak cevabında belirgin bir "Sonuç (Result)" göremiyorum. Mülakatçı bu çabanın projeye, ekibe veya ciroya nasıl bir katkısı olduğunu net olarak duymak ister. Lütfen metnin sonuna, aldığın eylemin nasıl bir "sayısal" veya "somut" başarı doğurduğunu bir iki cümle ile ekle.`;
  }

  if (!hasAction) {
    return `Metnin genel durumu anlatıyor ama *"Senin"* sürece kişisel olarak ne kattığını ve inisiyatifini yansıtmıyor. Şirketler edilgen takım oyuncularını değil, çözüm üretenleri işe alır. Lütfen "Biz yaptık" dilinden ziyade, "Ben şu kararı aldım, şunu önerdim" şeklinde birinci tekil şahıs diline geçiş yap ve kilit aksiyonunun altını çiz.`;
  }

  return `Taslağın çok güçlü bir iskelete sahip, tebrikler! Gerekli verileri ve yaklaşımını (STAR) net olarak yansıtıyor. \n\nBir sonraki seviyeye geçmek için sana bir Mentör tavsiyesi: Cevabını noktalarken edindiğin bu güçlü kasın (örneğin kriz yönetimi) ${role} pozisyonunda şirket için neden çok değerli olacağını da tek cümleyle eklersen, mülakatçı üzerinde harika bir "profesyonel hazırbulunuşluk" izlenimi bırakırsın. Bunu sesli şekilde 90 saniye tutarak pratik yapmaya devam edebilirsin.`;
}
