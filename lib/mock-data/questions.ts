import type { Question } from "../types";

// ───────────────────────────────────────────────────────────────
//  Question Bank — Mock Data (Turkish & Expanded)
// ───────────────────────────────────────────────────────────────

export const questionBank: Question[] = [
  // ── BEHAVIORAL (Davranışsal) ──────────────────────────────────
  {
    id: "b-001",
    text: "Doğrudan yetkiniz olmayan birini ikna etmeniz veya yönlendirmeniz gereken bir zamanı anlatır mısınız?",
    category: "behavioral",
    difficulty: "intermediate",
    whyAsked:
      "Mülakatçılar bunu, özellikle çapraz fonksiyonlu (cross-functional) rollerde hayati olan iletişim, ikna ve kişilerarası becerilerinizi ölçmek için kullanır.",
    structureTip:
      "STAR formatını kullanın: Durum → Görev → Aksiyon → Sonuç. 90 saniyenin altında tutun. Olayın arka planıyla değil, elde ettiğiniz sonuçla söze başlayın.",
    exampleAnswer:
      "Son sınıf projemizde, bir ekip arkadaşım veritabanı mimarisini değiştirmeye direniyordu. Endişesini anlamak için birebir bir toplantı ayarladım ve bu değişikliğin onun iş yükünü nasıl azaltacağını göstererek durumu yeniden çerçeveledim. Kabul etti ve projeyi iki gün erken teslim ettik.",
    coachNote:
      "Telefon mülakatıysa, ne olduğuna dair tek cümlelik bir özetle başlayın, aksiyonlarınızı ve sonucu ekleyin. Bağlamı (Situation) 20 saniyeden uzun tutmayın.",
    tags: ["iletişim", "ikna", "liderlik", "ekip çalışması"],
  },
  {
    id: "b-002",
    text: "Başarısız olduğunuz bir durumu ve bundan ne öğrendiğinizi anlatın.",
    category: "behavioral",
    difficulty: "intermediate",
    whyAsked:
      "Bu soru, güçlü adayları zayıflardan ayıran öz farkındalığı, dayanıklılığı ve gelişim odaklı zihniyeti ölçer.",
    structureTip:
      "Başarı kılığına girmiş bir sahte başarısızlık seçmeyin (örn. 'çok çalışırım'). Gerçek bir başarısızlık veya hata seçin, sorumluluğu üstlenin ve zamanınızın çoğunu aldığınız derse ayırın.",
    exampleAnswer:
      "Bir özelliğin karmaşıklığını hafife aldım ve yöneticime iyimser bir teslimat süresi verdim. Son tarih geçtiğinde riskleri yeterince erken iletmemiştim. Artık kapsamla ilgili belirsizlikleri 7. gün yerine 2. gün raporlamam gerektiğini öğrendim.",
    coachNote:
      "'Çok çalıştım' veya 'çok fazla umursadım' demekten kaçının. Mülakatçılar bunları hep duyar. Gerçek ama iyi yönetilmiş küçük bir hata, çok daha etkileyicidir.",
    tags: ["öz-farkındalık", "gelişim", "adaptasyon"],
  },
  {
    id: "b-003",
    text: "Yüksek baskı altındaki bir teslim tarihini (deadline) nasıl yönettiğinize dair bir örnek verin.",
    category: "behavioral",
    difficulty: "beginner",
    whyAsked:
      "Stres altındaki sakinliğinizi, önceliklendirme becerilerinizi ve gerçekçi iş koşulları altında teslimat yapıp yapamayacağınızı test eder.",
    structureTip:
      "Sadece 'çok çalıştığınızı' söylemek yerine, zamanınızı ve iş yükünüzü yönetmek için attığınız spesifik adımlara odaklanın. Neleri elediğinizi veya devrettiğinizi belirtin.",
    exampleAnswer:
      "Bitirme tezi teslimimden önceki hafta iki önemli sınavım daha vardı. Her görevi haritalandırdım, acil olmayan okumaları eledim ve sabahları sadece derin çalışma (deep work) için bloke ettim. Tezimi zamanında verdim ve iyi bir derece aldım.",
    coachNote:
      "Sadece 'Bütün gece uyumadım' demeyin. Bir metodunuz olduğunu gösterin. Yöneticiler kahramanlık değil, sistematik bir yaklaşım görmek ister.",
    tags: ["zaman yönetimi", "baskı", "önceliklendirme"],
  },

  // ── MOTIVATION (Motivasyon) ───────────────────────────────────
  {
    id: "m-001",
    text: "Neden özellikle bizim şirketimizde çalışmak istiyorsunuz?",
    category: "motivation",
    difficulty: "beginner",
    whyAsked:
      "Gerçekten araştırma yapıp yapmadığınızı ve rastgele başvuru mu yoksa bilinçli bir tercih mi yaptığınızı test eder.",
    structureTip:
      "Spesifik referanslar verin: Bir ürün, bir misyon beyanı, yeni teknolojik geçişleri veya vizyonları. 'Şirketiniz çok büyük ve başarılı' gibi jenerik cevaplar burada başarısız olur.",
    exampleAnswer:
      "Geçen yıl açık kaynaklı altyapıya geçişinizi yakından takip ettim. API'nizi herkesin erişimine açma kararınız, gerçekten saygı duyduğum 'müşteri odaklı' bir felsefeyi yansıtıyor ve vizyonunuzun bir parçası olmak istememin ana nedeni bu.",
    coachNote:
      "Henüz belirli bir şirket seçmediyseniz, şu formülü hazırlayın: 1- Şirketin yaptığı ilginç bir hareket. 2- Sizin yeteneklerinizle olan bağı. 3- Pozisyonun hedeflerinizi nasıl desteklediği.",
    tags: ["motivasyon", "araştırma", "kültürel-uyum"],
  },
  {
    id: "m-002",
    text: "Kendinizi üç yıl içinde nerede görüyorsunuz?",
    category: "motivation",
    difficulty: "beginner",
    whyAsked:
      "Hedeflerinizin pozisyonun büyüme yoluyla örtüşüp örtüşmediğini ve geleceğiniz hakkında vizyoner düşünüp düşünmediğinizi test eder.",
    structureTip:
      "Sadece unvanlara değil, kazanmak istediğiniz yetkinliklere dayanın. Gelişiminizi, şirketin gerçekten sunabileceği bir şeye bağlayın.",
    exampleAnswer:
      "Üç yıl içinde, baştan sona en az bir kritik ürün inisiyatifine liderlik etmiş biri olmak istiyorum. Paydaş iletişimi ve veri analizi konularında kendimi daha da geliştirmeyi hedefliyorum. Bu pozisyonu, söz konusu vizyonun temeli olarak görüyorum.",
    coachNote:
      "'Kendi işimi kuracağım' veya çok alakasız hedeflerden kaçının. Sektördeki dikey büyümenize odaklanın.",
    tags: ["büyüme", "vizyon", "uyum"],
  },

  // ── ROLE-SPECIFIC / SITUATIONAL (Durumsal) ────────────────────
  {
    id: "r-001",
    text: "Her şeyin acil göründüğü bir anda, birbiriyle yarışan görevleri nasıl önceliklendirirsiniz?",
    category: "role-specific",
    difficulty: "intermediate",
    whyAsked:
      "Birden fazla paydaşı olan her rol için kritik bir sorudur. Sadece eforunuzu değil, karar alma çerçevenizi test eder.",
    structureTip:
      "Kullandığınız belirli bir yöntemi söyleyin (örn. etki vs efor, Eisenhower matrisi veya başkasını engelleyen görev). Ardından gerçek bir örnekle bunu gösterin.",
    exampleAnswer:
      "Basit bir iki aşamalı filtre kullanırım: Önce zaman kısıtlaması kesin olanlarla esnek olanları ayırırım. Sonra, hangi görevin bir başkasının işini bloke ettiğine (darboğaz yaratıp yaratmadığına) bakarım. Bu genellikle bana net bir öncelik verir.",
    coachNote:
      "En iyi cevaplar spesifik bir metodoloji dillendirir. Sistematik bir yaklaşımınız olduğunu hissettirin.",
    tags: ["önceliklendirme", "organizasyon"],
  },
  {
    id: "s-001",
    text: "Bir ekip arkadaşınız ortak projede performans göstermez ve işini aksatırsa nasıl davranırsınız?",
    category: "situational",
    difficulty: "intermediate",
    whyAsked:
      "Profesyonelliğinizi, çatışma çözme olgunluğunu ve dedikodu yerine rasyonel süreçleri izleyip izlemediğinizi ölçer.",
    structureTip:
      "Asla doğrudan yöneticiye şikayet edeceğinizi söylemeyin; önce doğrudan iletişim, sonra yardım teklifi, en son çare olarak eskalasyon.",
    exampleAnswer:
      "Öncelikle durumu şahsileştirmeden birebir, özel bir konuşma yaparım. 'Bu kısmın ilerlemediğini fark ettim, takıldığın veya yardımcı olabileceğim bir şey var mı?' derim. Sorun çözülmez ve projenin kaderini etkilemeye devam ederse proje liderini durumdan haberdar ederim.",
    coachNote:
      "Kişilerarası iletişimdeki özgüveninizi gösterin. İş bitiricilik kadar takım psikolojisini yönetmek de kritiktir.",
    tags: ["çatışma", "ekip çalışması", "profesyonellik"],
  },

  // ── TECHNICAL (Sıkı Teknik Sorular) ───────────────────────────
  {
    id: "t-001",
    text: "Mimarisini kurgularken gurur duyduğun bir projeyi ve yapmak zorunda kaldığın teknik 'trade-off'ları (ödünleşimleri) anlatır mısın?",
    category: "technical",
    difficulty: "advanced",
    whyAsked:
      "Teknik derinliğinizi, kararlarınızı kelimelere dökme yeteneğinizi ve mimari tasarım vizyonunuzu test eder. 'Sadece kodu yazıp çıkan' birisi olup olmadığınızı belirler.",
    structureTip:
      "Gerçekten seçim yapmak zorunda kaldığınız bir anı seçin (örn. NoSQL vs SQL, SSR vs CSR, Microservices vs Monolith). Kısıtlamaları, neden o yolu seçtiğinizi ve şimdi olsa neyi farklı yapacağınızı detaylandırın.",
    exampleAnswer:
      "Bir veri görselleştirme projesinde, canlı veriyi doğrudan her seferinde API'den mi çekeceğim yoksa önbelleğe (cache) mi alacağım konusunda bir karar vermem gerekti. Anlık doğruluk istesem de limitlere takılmamak için 5 dakikalık TTL (Time to Live) ile bir Redis cache kurguladım. İlk başta veri tazeliğinden (freshness) ödün vermiş oldum ama sistem çökmelerini %100 engelledim.",
    coachNote:
      "Sadece ne kullandığınızı (teknoloji yığınını) sayıp durmayın. Mülakatçı bu teknolojiyi 'neden' seçtiğinizi veya hangi alternatifleri neden elediğinizi duymak ister.",
    tags: ["teknik", "mimari", "karar-verme", "trade-off"],
  },
  {
    id: "t-002",
    text: "Bir web uygulamasında sayfa yüklenme (page load) süresi çok uzun ve kullanıcılar şikayet ediyor. Performansı iyileştirmek için süreci nasıl analiz eder ve hangi adımları izlersin?",
    category: "technical",
    difficulty: "advanced",
    whyAsked:
      "Sistematik hata ayıklama (debugging) sürecini ve web performans optimizasyonu hakkındaki gerçek donanımınızı ölçmek içindir.",
    structureTip:
      "Doğrudan 'resimleri küçültürüm' demek yerine, sorunu önce network panelinde / Lighthouse'da analiz edeceğinizi söyleyerek sistematik ilerlediğinizi kanıtlayın. Darboğazı frontend (bundle size vs) veya backend (yavaş sorgular) olarak ayırın.",
    exampleAnswer:
      "Öncelikle Chrome DevTools (Network ve Performance) veya Lighthouse kullanarak darboğazın nerede olduğunu ölçerim. Eğer sorun Frontend tarafındaysa; bundle boyutunu inceler, code-splitting/lazy-loading yapılıp yapılmadığına ve görsel boyutlarına bakarım. Eğer sunucu (TTFB) yavaş yanıt veriyorsa; backend veritabanı sorgularının (N+1 problemi vb.) analizine ve gerekiyorsa indekslemeye/caching stratejilerine (Redis/Memcached) yönelirim.",
    coachNote:
      "Harika bir cevap! Ölçmeden optimizasyon yapılmaz kuralını hissettirdin. Bu, kıdemli (senior) bir yazılımcı zihniyetini yansıtır.",
    tags: ["optimizasyon", "performans", "debugging", "teknik"],
  },
  {
    id: "t-003",
    text: "REST API tasarlarken geriye dönük uyumluluğu (backward compatibility) korumak için nasıl bir versiyonlama stratejisi izlersin?",
    category: "technical",
    difficulty: "advanced",
    whyAsked:
      "Canlı sistemlerde mevcut kullanıcıları (mobil app'ler, dış servisler) bozmadan yenilik yapabilme vizyonunuzu test eder.",
    structureTip:
      "URL bazlı, header bazlı veya GraphQL approachları gibi spesifik metotlara değinin ve nedenini açıklayın.",
    exampleAnswer:
      "Genellikle URL bazlı (/api/v1/users) veya Accept Header üzerinden versiyonlama stratejisi tercih ederim. Mobil bir uygulama güncellenmese bile eski versiyon (v1) endpointine atılan isteklerin çalışmaya devam etmesi gerekir. Eski özellikleri hemen silmek yerine 'deprecated' ilan edip loglardan kullanımı izler, kullanım 0'a yaklaşana kadar eski versiyonu ayakta tutarım.",
    coachNote:
      "Deprecation sürecinden (sürekli kullanım loglarını izlediğinden) bahsetmen senin gerçekten 'canlıya alınmış' büyük ürünlerde tecrübeli olduğunu hissettirir. Şahane.",
    tags: ["api-dizayn", "backend", "versiyonlama"],
  },
  {
    id: "t-004",
    text: "Event Loop (Olay Döngüsü) nedir ve 'Blocking the Main Thread' kavramını gerçek hayattan bir senaryoyla nasıl açıklarsın?",
    category: "technical",
    difficulty: "intermediate",
    whyAsked:
      "Javascript gibi single-threaded dillerin temel çalışma mekanizmasını derinlemesine anlayıp anlamadığınızı test eder.",
    structureTip:
      "Teorik dille başlayıp hemen pratik bir hatayla örneklendirin. Call Stack, Web API ve Task Queue üçlüsünü hikayenin içine yerleştirin.",
    exampleAnswer:
      "Event Loop, JavaScript'in tek iş parçacıklı (single-threaded) olmasına rağmen asenkron işlemleri yönetmesini sağlayan yapıdır. Eğer Call Stack içerisinde milyarlarca dönüşlük bir matematik hesabı yaparsam (synchronous task), bu bitene kadar tarayıcı buton tıklamalarına veya animasyonlara cevap veremez; işte bu 'ana iş parçacığını bloke etmektir'. Bunu engellemek için ağır hesaplamaları Web Workerlara taşır veya asenkron (Promise/setTimeout) işlemlere bölerim ki tarayıcı nefes alabilsin.",
    coachNote:
      "Örneğindeki 'tarayıcının nefes alabilmesi' metaforu konuyu çok iyi bildiğini gösteriyor. Röportajcının aradığı şey tam olarak bu pratik açıklamadır.",
    tags: ["javascript", "event-loop", "performans", "front-end"],
  }
];

/**
 * Get questions filtered by the user's profile.
 */
export function getFilteredQuestions(
  role: string,
  sector: string,
  interviewType: string,
  count = 6
): Question[] {
  // Daha dinamik bir filtreleme stratejisi
  const priorityMap: Record<string, string[]> = {
    behavioral: ["b-001", "b-002", "b-003", "s-001", "m-001", "m-002"],
    technical: ["t-001", "t-002", "t-003", "t-004", "r-001", "b-002"],
    "case-study": ["r-001", "s-001", "t-002", "b-002", "m-001", "t-001"],
    mixed: ["b-001", "t-001", "r-001", "s-001", "m-001", "b-003"],
    phone: ["m-001", "m-002", "b-003", "b-001", "s-001", "r-001"],
    panel: ["b-001", "b-002", "t-001", "s-001", "r-001", "t-003"],
  };

  const ids = priorityMap[interviewType] ?? priorityMap["mixed"];
  return ids
    .map((id) => questionBank.find((q) => q.id === id)!)
    .filter(Boolean)
    .slice(0, count);
}
