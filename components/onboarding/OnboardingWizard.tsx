"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import type {
  UserProfile,
  UserType,
  InterviewType,
  PrepLanguage,
  EnglishLevel,
  Urgency,
  CompanyType,
} from "@/lib/types";
import { CheckCircle2, ArrowRight, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

// ── Step config ─────────────────────────────────────────────────
type Step = {
  id: string;
  question: string;
  subtext?: string;
  field: keyof UserProfile;
  options?: { value: string; label: string; description?: string }[];
  type: "choice" | "text";
  optional?: boolean;
};

const steps: Step[] = [
  {
    id: "userType",
    question: "Şu anki durumunuzu en iyi hangisi tanımlıyor?",
    subtext: "Bu bilgiyi mülakat koçluğunu kişiselleştirmek için kullanıyoruz.",
    field: "userType",
    type: "choice",
    options: [
      { value: "student", label: "Öğrenci", description: "Hala okuyorum, ilk profesyonel rolüme hazırlanıyorum" },
      { value: "new-graduate", label: "Yeni Mezun", description: "Yeni mezun oldum, iş pazarına giriyorum" },
      { value: "young-professional", label: "Genç Profesyonel", description: "Çalışıyorum, yeni bir rol veya terfi hedefliyorum" },
      { value: "career-switcher", label: "Kariyer Değiştiren", description: "Farklı bir sektöre veya fonksiyona geçiş yapıyorum" },
    ],
  },
  {
    id: "targetRole",
    question: "Hangi pozisyon için mülakata hazırlanıyorsun?",
    subtext: "Spesifik olun — örn. 'Ürün Yöneticisi', 'Yazılım Mühendisi', 'Pazarlama Uzmanı'",
    field: "targetRole",
    type: "text",
  },
  {
    id: "sector",
    question: "Hedeflediğiniz şirket hangi sektörde faaliyet gösteriyor?",
    subtext: "Bu durum karşınıza çıkacak soruları ve koçluk stilimizi şekillendirecek.",
    field: "sector",
    type: "choice",
    options: [
      { value: "technology", label: "Teknoloji" },
      { value: "finance", label: "Finans & Bankacılık" },
      { value: "consulting", label: "Danışmanlık" },
      { value: "healthcare", label: "Sağlık" },
      { value: "marketing", label: "Pazarlama & Medya" },
      { value: "operations", label: "Operasyon & Tedarik Zinciri" },
      { value: "public-sector", label: "Kamu / STK" },
      { value: "other", label: "Diğer" },
    ],
  },
  {
    id: "interviewType",
    question: "Ne tür bir mülakata hazırlanıyorsunuz?",
    subtext: "Farklı formatlar farklı hazırlık stratejileri gerektirir.",
    field: "interviewType",
    type: "choice",
    options: [
      { value: "behavioral", label: "Davranışsal (Behavioral)", description: "Yetkinlik bazlı sorular, STAR formatı" },
      { value: "technical", label: "Teknik Mülakat", description: "Kodlama, vaka veya alan bilgisi testi" },
      { value: "case-study", label: "Vaka Çalışması (Case)", description: "Problemlere rasyonel çözümler üretme" },
      { value: "phone", label: "Telefon Mülakatı", description: "İlk aşama ön görüşme (screening)" },
      { value: "panel", label: "Panel Mülakatı", description: "Aynı anda birden fazla mülakatçı" },
      { value: "mixed", label: "Karışık — Emin değilim", description: "Tüm türlerden parça parça olabilir" },
    ],
  },
  {
    id: "prepLanguage",
    question: "Mülakatınız hangi dilde gerçekleşecek?",
    field: "prepLanguage",
    type: "choice",
    options: [
      { value: "turkish", label: "Türkçe" },
      { value: "english", label: "İngilizce" },
      { value: "german", label: "Almanca" },
      { value: "other", label: "Diğer" },
    ],
  },
  {
    id: "englishLevel",
    question: "İngilizce yetkinlik seviyeniz nedir?",
    subtext: "Bu bilgi, İngilizce mülakatlarda koçluk desteğini ayarlamamızı sağlar.",
    field: "englishLevel",
    type: "choice",
    options: [
      { value: "native", label: "Anadil veya İki Dilli" },
      { value: "advanced", label: "İleri Seviye (C1/C2)" },
      { value: "intermediate", label: "Orta Seviye (B1/B2)" },
      { value: "beginner", label: "Başlangıç (A1/A2)" },
    ],
  },
  {
    id: "biggestChallenge",
    question: "Mülakatlarda karşılaştığınız en büyük zorluk nedir?",
    subtext: "Dürüst olun — mentörlüğünüz doğrudan buna göre şekillenecek.",
    field: "biggestChallenge",
    type: "choice",
    options: [
      { value: "structuring-answers", label: "Cevaplarımı doğru şekilde yapılandırmak" },
      { value: "nerves", label: "Heyecanımı yönetmek ve özgüven" },
      { value: "english-communication", label: "İngilizceyi akıcı iletişimde kullanmak" },
      { value: "no-experience", label: "Bahsedecek yeterince profesyonel tecrübem olmaması" },
      { value: "specific-examples", label: "Geçmişten spesifik ve güçlü örnekler bulamamak" },
      { value: "technical-knowledge", label: "Teknik bilgi eksiklikleri ve algoritma / vaka soruları" },
    ],
  },
  {
    id: "urgency",
    question: "Mülakatınız ortalama ne zaman?",
    subtext: "Hazırlık planınızı belirlerken tempomuzu hızlandırıp yavaşlatmamızı sağlayacak.",
    field: "urgency",
    type: "choice",
    options: [
      { value: "this-week", label: "Bu Hafta", description: "Çok acil — hemen ana noktaları toparlamam gerek" },
      { value: "this-month", label: "Bu Ay", description: "Hazırlanmak ve derinleşmek için birkaç haftam var" },
      { value: "next-month", label: "Gelecek Ay veya Daha Sonra", description: "Acelem yok, uzun vadeye yayabilirim" },
      { value: "exploring", label: "Sadece Araştırıyorum", description: "Şu an planlanmış net bir mülakatım yok" },
    ],
  },
  {
    id: "companyType",
    question: "Ne tür bir şirket hedefliyorsunuz?",
    field: "companyType",
    type: "choice",
    options: [
      { value: "startup", label: "Startup" },
      { value: "scale-up", label: "Scale-up / Büyüme aşamasında" },
      { value: "corporate", label: "Büyük Kurumsal Şirket" },
      { value: "public-sector", label: "Kamu Sektörü" },
      { value: "consulting", label: "Danışmanlık Firması" },
    ],
  },
  {
    id: "companyName",
    question: "Şu anda görüşmekte olduğunuz mülakat şirketi hangisi? (İsteğe bağlı)",
    subtext: "Bizimle paylaşırsanız koçluk profillerinde bu veriyi dikkate alabiliriz.",
    field: "companyName",
    type: "text",
    optional: true,
  },
];

export default function OnboardingWizard() {
  const router = useRouter();
  const { setProfile } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserProfile>>({});
  const [textInput, setTextInput] = useState("");

  const step = steps[currentStep];
  const total = steps.length;
  const progress = ((currentStep) / total) * 100;
  const isLast = currentStep === total - 1;
  const currentValue = answers[step.field] as string | undefined;

  function handleChoice(value: string) {
    setAnswers((prev) => ({ ...prev, [step.field]: value }));
  }

  function handleNext() {
    if (step.type === "text") {
      if (!textInput.trim() && !step.optional) return;
      setAnswers((prev) => ({
        ...prev,
        [step.field]: textInput.trim() || undefined,
      }));
      setTextInput("");
    }

    if (isLast) {
      const finalAnswers = step.type === "text"
        ? { ...answers, [step.field]: textInput.trim() || undefined }
        : answers;

      setProfile(finalAnswers as UserProfile);
      router.push("/dashboard");
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      const prevStep = steps[currentStep - 1];
      if (prevStep.type === "text") {
        setTextInput((answers[prevStep.field] as string) ?? "");
      }
    }
  }

  const canProceed =
    step.type === "text"
      ? step.optional || textInput.trim().length > 0
      : !!currentValue;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            Interview Prep AI
          </Link>
          <span className="text-sm text-muted-foreground">
            Adım {currentStep + 1} / {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-border">
          <div
            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-2xl animate-fade-up" key={step.id}>
          {/* Question */}
          <div className="mb-8">
            <p className="text-sm text-indigo-400 font-medium mb-3 uppercase tracking-wider">
              {currentStep + 1} / {total}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {step.question}
            </h1>
            {step.subtext && (
               <p className="text-muted-foreground">{step.subtext}</p>
            )}
          </div>

          {/* Choices */}
          {step.type === "choice" && step.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {step.options.map((opt) => {
                const selected = currentValue === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`option-${opt.value}`}
                    onClick={() => handleChoice(opt.value)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-150 ${
                      selected
                        ? "border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/10"
                        : "border-border bg-card hover:border-indigo-500/40 hover:bg-card/80"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          selected
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-muted-foreground/40"
                        }`}
                      >
                        {selected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${selected ? "text-foreground" : "text-foreground/80"}`}>
                           {opt.label}
                        </p>
                        {opt.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {opt.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Text input */}
          {step.type === "text" && (
            <div className="mb-8">
              <input
                id={`input-${step.id}`}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canProceed) handleNext();
                }}
                placeholder={
                  step.optional
                    ? "İsteğe bağlı — atlayabilirsiniz"
                    : "Cevabınızı yazın..."
                }
                className="w-full px-5 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-lg transition-colors"
                autoFocus
              />
              {step.optional && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Bu alan isteğe bağlıdır. Doğrudan 'Devam Et'e tıklayıp geçebilirsiniz.
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-3 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-xl hover:bg-white/5"
            >
              <ArrowLeft size={16} />
              Geri Dön
            </button>

            <button
              id="onboarding-next"
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 hover:scale-[1.02]"
            >
              {isLast ? (
                <>
                  <CheckCircle2 size={16} />
                  Panelimi Oluştur
                </>
              ) : (
                <>
                  Devam Et
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
