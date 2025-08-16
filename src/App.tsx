import React, { useMemo, useState } from "react";

/**
 * Arabic / Middle-East focused one-page landing (TypeScript + Tailwind)
 * - RTL layout (dir="rtl")
 * - Arabic copy (Modern Standard Arabic)
 * - School color palette: deep blue (primary) + golden yellow (accent) + soft neutrals
 * - No resume preview; hero is a clear marketplace CTA
 * - Types added (noImplicitAny safe)
 */

/* ----------------------- WhatsApp Config ----------------------- */
const WHATSAPP_NUMBER = "00966507267217";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const openWhatsApp = (message?: string): void => {
  const url = message
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_URL;
  if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
};

/* ----------------------- Subjects (const -> derive keys) ----------------------- */
const SUBJECTS = [
  { key: "math", label: "الرياضيات", icon: "➗" },
  { key: "physics", label: "الفيزياء", icon: "🧪" },
  { key: "chemistry", label: "الكيمياء", icon: "⚗️" },
  { key: "biology", label: "الأحياء", icon: "🧬" },
  { key: "english", label: "اللغة الإنجليزية", icon: "📚" },
  { key: "arabic", label: "اللغة العربية", icon: "📝" },
  { key: "programming", label: "البرمجة", icon: "💻" },
  { key: "history", label: "التاريخ", icon: "🏺" },
  { key: "geography", label: "الجغرافيا", icon: "🗺️" },
  { key: "art", label: "الفن", icon: "🎨" },
  { key: "daily", label: "المتابعة اليومية", icon: "📖" }, // new option
  { key: "university", label: "مواد جامعية", icon: "🎓" }, // ✅ added as requested
] as const;

type SubjectKey = typeof SUBJECTS[number]["key"];
type Subject = { key: SubjectKey; label: string; icon: string };

/* -------------------------- Sort key union -------------------------- */
type SortKey = "rating" | "price" | "reviews";

/* -------------------------- Session / Mode types -------------------------- */
type SessionMode = "all" | "online" | "offline";
type TeacherMode = "online" | "offline";

/* -------------------------- School type filter -------------------------- */
type SchoolType = "international" | "ahli" | "government"; // انترناشونال / أهلي / حكومي
 type SchoolFilter = "all" | SchoolType;

/* ----------------------------- Teacher type ----------------------------- */
type Teacher = {
  id: number;
  name: string;
  subjects: SubjectKey[];
  rating: number;
  reviews: number;
  price: number;
  blurb: string;
  tags: string[];
  languages: string[];
  photoBg: string;
  timezones: string[];
  mode: TeacherMode;
  school: SchoolType; // ✅ new
};

/* ------------------------------- Data -------------------------------- */
const TEACHERS: Teacher[] = [
  {
    id: 1,
    name: "عفاف جيلاني", // ✅ replaced
    subjects: ["english", "arabic", "daily", "university"],
    rating: 4.9,
    reviews: 132,
    price: 18,
    blurb: "معلمة معتمدة في اللغة الإنجليزية، تحضير للامتحانات والمحادثة.",
    tags: ["IELTS", "TOEFL", "طلاب", "بالغين"],
    languages: ["العربية", "الإنجليزية"],
    photoBg: "bg-rose-100",
    timezones: ["EET", "GMT+3"],
    mode: "online",
    school: "international",
  },
  {
    id: 2,
    name: "دينا صلاح", // ✅ replaced
    subjects: ["math", "physics", "daily", "university"],
    rating: 4.8,
    reviews: 98,
    price: 22,
    blurb: "مدرس رياضيات بمقاربات بديهية ومشروحة خطوة بخطوة.",
    tags: ["IGCSE", "SAT", "مسابقات"],
    languages: ["العربية", "الإنجليزية"],
    photoBg: "bg-blue-100",
    timezones: ["EET"],
    mode: "offline",
    school: "ahli",
  },
  {
    id: 3,
    name: "ليلى فتحي",
    subjects: ["chemistry", "biology"],
    rating: 4.7,
    reviews: 76,
    price: 16,
    blurb: "فهم العلوم عبر تجارب مرئية وتمارين من امتحانات سابقة.",
    tags: ["IGCSE", "Edexcel"],
    languages: ["العربية", "الإنجليزية"],
    photoBg: "bg-emerald-100",
    timezones: ["EET", "CET"],
    mode: "online",
    school: "international",
  },
  {
    id: 4,
    name: "يوسف نبيل",
    subjects: ["programming", "daily", "university"],
    rating: 5.0,
    reviews: 45,
    price: 25,
    blurb: "مشاريع عملية من أساسيات الويب إلى الواجهات المتقدمة.",
    tags: ["React", "Node", "Python"],
    languages: ["العربية", "الإنجليزية"],
    photoBg: "bg-indigo-100",
    timezones: ["EET"],
    mode: "online",
    school: "ahli",
  },
  {
    id: 5,
    name: "منى عادل",
    subjects: ["history", "geography"],
    rating: 4.6,
    reviews: 51,
    price: 14,
    blurb: "دروس سردية مصوّرة تربط الحدث بالسياق والخرائط.",
    tags: ["IB", "GCSE"],
    languages: ["العربية", "الإنجليزية"],
    photoBg: "bg-amber-100",
    timezones: ["EET"],
    mode: "offline",
    school: "government",
  },
  {
    id: 6,
    name: "كريم شاكر",
    subjects: ["art"],
    rating: 4.8,
    reviews: 29,
    price: 12,
    blurb: "من الرسم الكلاسيكي إلى الرسم الرقمي وبناء بورتفوليو.",
    tags: ["مبتدئ", "متوسط"],
    languages: ["العربية", "الإنجليزية"],
    photoBg: "bg-fuchsia-100",
    timezones: ["EET"],
    mode: "offline",
    school: "ahli",
  },
];

/* ---------------------------- App component ---------------------------- */
export default function App(): React.ReactElement {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800&display=swap');
    :root{
      --school-primary: #1e3a8a;
      --school-accent: #fbbf24;
      --school-soft: #f8fafc;
    }
    .font-tajawal { font-family: 'Tajawal', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
  `;

  const [activeSubject, setActiveSubject] = useState<"all" | SubjectKey>("all");
  const [sessionMode, setSessionMode] = useState<SessionMode>("all");
  const [schoolFilter, setSchoolFilter] = useState<SchoolFilter>("all"); // ✅
  const [search, setSearch] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("rating");

  const filteredTeachers = useMemo<Teacher[]>(() => {
    const q = search.trim().toLowerCase();
    return TEACHERS.filter((t: Teacher) => {
      const subjectOk = activeSubject === "all" || t.subjects.includes(activeSubject);
      const modeOk = sessionMode === "all" || t.mode === sessionMode;
      const schoolOk = schoolFilter === "all" || t.school === schoolFilter; // ✅
      const hay = `${t.name} ${t.blurb} ${t.tags.join(" ")}`.toLowerCase();
      const searchOk = q === "" || hay.includes(q);
      return subjectOk && searchOk && modeOk && schoolOk;
    }).sort((a: Teacher, b: Teacher) => {
      if (sortKey === "price") return a.price - b.price;
      if (sortKey === "reviews") return b.reviews - a.reviews;
      return b.rating - a.rating;
    });
  }, [activeSubject, sessionMode, schoolFilter, search, sortKey]);

  return (
    <div dir="rtl" className="font-tajawal" style={{ backgroundColor: "var(--school-soft)" }}>
      <style>{css}</style>

      <div className="min-h-screen flex flex-col text-gray-900">
        <Header />

        <main className="flex-grow">
          <Hero onExplore={() => scrollToId("subjects")} />

          {/* SUBJECTS */}
          <section id="subjects" className="px-6 sm:px-8 py-12 sm:py-16 relative">
            <DecorBackground />
            <div className="max-w-7xl mx-auto relative">
              <SectionHeading
                title="اختر المادة"
                subtitle="انقر على المادة لعرض المعلمين المتوفرين فوراً."
              />

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
                <SubjectPill
                  key="all"
                  label="الكل"
                  icon="✨"
                  active={activeSubject === "all"}
                  onClick={() => setActiveSubject("all")}
                />
                {SUBJECTS.map((s) => (
                  <SubjectPill
                    key={s.key}
                    label={s.label}
                    icon={s.icon}
                    active={activeSubject === s.key}
                    onClick={() => setActiveSubject(s.key)}
                  />
                ))}
              </div>

              {/* Session mode selector */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <SessionPill
                  label="الكل"
                  active={sessionMode === "all"}
                  onClick={() => setSessionMode("all")}
                />
                <SessionPill
                  label="أونلاين"
                  active={sessionMode === "online"}
                  onClick={() => setSessionMode("online")}
                />
                <SessionPill
                  label="حضوري"
                  active={sessionMode === "offline"}
                  onClick={() => setSessionMode("offline")}
                />
                <div className="text-sm text-gray-500 mr-3">نوع الجلسة:</div>
              </div>

              {/* School type selector */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <SessionPill
                  label="الكل"
                  active={schoolFilter === "all"}
                  onClick={() => setSchoolFilter("all")}
                />
                <SessionPill
                  label="انترناشونال"
                  active={schoolFilter === "international"}
                  onClick={() => setSchoolFilter("international")}
                />
                <SessionPill
                  label="أهلي"
                  active={schoolFilter === "ahli"}
                  onClick={() => setSchoolFilter("ahli")}
                />
                <SessionPill
                  label="حكومي"
                  active={schoolFilter === "government"}
                  onClick={() => setSchoolFilter("government")}
                />
                <div className="text-sm text-gray-500 mr-3">نوع المدرسة:</div>
              </div>
            </div>
          </section>

          {/* TEACHERS */}
          <section id="teachers" className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                    {activeSubject === "all"
                      ? "أفضل المعلمين"
                      : `المعلمون — ${labelFor(activeSubject, SUBJECTS)}`}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    قارن، اختَر، واحجز درسًا تجريبيًا مجانيًا.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="ابحث بالاسم أو الوسم أو الامتحان..."
                      className="w-full sm:w-72 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2"
                      aria-label="بحث المعلمين"
                    />
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
                  </div>

                  <select
                    value={sortKey}
                    onClick={() => openWhatsApp()} // ✅ redirect on click
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2"
                    aria-label="ترتيب النتائج"
                  >
                    <option value="rating">الترتيب: التقييم</option>
                    <option value="price">الترتيب: السعر</option>
                    <option value="reviews">الترتيب: عدد التقييمات</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachers.map((t: Teacher) => (
                  <TeacherCard key={t.id} t={t} />
                ))}
                {filteredTeachers.length === 0 && (
                  <div className="col-span-full rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-600">
                    لا يوجد معلمون مطابقون. جرِّب مادة أخرى أو نوع جلسة مختلف.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* OFFERS */}
          <section id="offers" className="px-6 sm:px-8 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between gap-6">
                <SectionHeading
                  title="ماذا نقدّم"
                  subtitle="كل ما تحتاجه لتعلّم فعال ومريح."
                />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center px-5 py-3 rounded-full bg-[var(--school-primary)] text-white text-sm font-semibold hover:opacity-95 transition"
                >
                  احجز درسًا تجريبيًا
                </a>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "معلمون موثوقون",
                    desc: "ملفات مُراجعة للتحقق من الشهادات وجودة التدريس.",
                  },
                  {
                    title: "جلسات 1:1 مرنة",
                    desc: "دروس أونلاين أو حضور حسب تفضيلك ومواعيدك.",
                  },
                  {
                    title: "متوافقة مع المناهج",
                    desc: "IB، IGCSE، SAT، مناهج وطنية، وأكثر.",
                  },
                  {
                    title: "متابعة التقدّم",
                    desc: "ملاحظات الدروس وأهداف واضحة ومسارات تطور.",
                  },
                  {
                    title: "أمان وخصوصية",
                    desc: "مدفوعات آمنة وسياسات خصوصية واضحة.",
                  },
                  {
                    title: "رضاكم مضمون",
                    desc: "تبديل المعلم مجانًا إن لم تكن الرؤية مناسبة.",
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl p-6 bg-gradient-to-b from-white to-gray-50 ring-1 ring-gray-200 hover:ring-gray-300 transition shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[var(--school-primary)] text-white flex items-center justify-center text-sm font-bold shadow mb-4">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-lg">{f.title}</h3>
                    <p className="text-gray-600 mt-2">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="how" className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <SectionHeading
                title="كيف تعمل المنصة"
                subtitle="خطوات بسيطة من اختيار المادة إلى بدء الدرس."
              />

              <ol className="mt-8 grid md:grid-cols-3 gap-6 relative">
                <svg
                  className="hidden md:block absolute top-16 left-0 right-0 mx-auto -z-10"
                  height="2"
                  viewBox="0 0 100 2"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="grad2" x1="0" x2="1">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="2" fill="url(#grad2)" rx="1" />
                </svg>

                {[
                  { n: 1, t: "اختر المادة", d: "حدّد ما تريد تعلّمه وهدفك." },
                  { n: 2, t: "قارن المعلمين", d: "بناءً على التقييم، السعر، واللغة." },
                  { n: 3, t: "احجز درسًا تجريبيًا", d: "التقي بالمعلم وحدِّد خطة التعلم." },
                ].map((s) => (
                  <li
                    key={s.n}
                    className="group rounded-2xl bg-white ring-1 ring-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[var(--school-primary)] text-white font-bold shadow">
                        {s.n}
                      </div>
                      <h3 className="text-lg font-semibold">{s.t}</h3>
                    </div>
                    <p className="mt-3 text-gray-600">{s.d}</p>
                    <div className="mt-4 h-24 rounded-xl bg-gray-50 ring-1 ring-gray-100 group-hover:ring-gray-200 transition-all" />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="px-6 sm:px-8 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold">الأسئلة الشائعة</h2>
              <div className="mt-6 divide-y divide-gray-200 rounded-2xl ring-1 ring-gray-200 bg-white">
                {[
                  {
                    q: "هل يتم التحقق من المعلمين؟",
                    a: "نعم — نراجع الشهادات، عينات الدروس، وتقييمات الطلبة قبل الموافقة.",
                  },
                  {
                    q: "هل يمكنني تبديل المعلم؟",
                    a: "نعم — إذا لم يكن الدرس مناسباً بعد الدرس التجريبي سنساعدك في التبديل مجانًا.",
                  },
                  {
                    q: "كيف يتم الدفع؟",
                    a: "الدفع لكل درس أو عبر باقات مخفضة بواسطة بوابات دفع آمنة.",
                  },
                ].map((item, i) => (
                  <details key={i} className="group p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <span className="font-medium">{item.q}</span>
                      <span className="transition group-open:rotate-45 text-gray-500">+</span>
                    </summary>
                    <p className="mt-3 text-gray-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section id="cta" className="px-6 sm:px-8 pb-20" aria-labelledby="cta-title">
            <div className="max-w-7xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-[var(--school-primary)] text-white p-8 sm:p-12">
                <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-[var(--school-accent)]/30 blur-2xl" />
                <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                <h2 id="cta-title" className="text-2xl sm:text-3xl font-extrabold">
                  جرّب درسًا تجريبيًا مجانيًا
                </h2>
                <p className="mt-2 text-white/90 max-w-xl">
                  شاركنا أهدافك وسنرشّح لك معلمين مناسبين خلال دقائق — بدون التزام.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#teachers"
                    className="inline-flex items-center px-7 py-4 rounded-full bg-white text-[var(--school-primary)] font-semibold shadow-lg hover:opacity-95 transition"
                  >
                    تصفّح المعلمين
                  </a>
                  <a
                    href="#subjects"
                    className="inline-flex items-center px-7 py-4 rounded-full bg-white/10 ring-1 ring-white/20 text-white font-semibold shadow hover:bg-white/5 transition"
                  >
                    اختر مادة
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

/* ------------------------- Components (typed) ------------------------- */

function Header(): React.ReactNode {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-[var(--school-primary)]">
          <Logo />
          <span className="text-lg">يلا ندرس</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a className="hover:text-[var(--school-primary)]" href="#subjects">المواد</a>
          <a className="hover:text-[var(--school-primary)]" href="#teachers">المعلمون</a>
          <a className="hover:text-[var(--school-primary)]" href="#offers">ما نقدّم</a>
          <a className="hover:text-[var(--school-primary)]" href="#how">كيف تعمل</a>
          <a className="hover:text-[var(--school-primary)]" href="#faq">الأسئلة</a>
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-[var(--school-primary)] text-white text-sm font-semibold px-4 py-2 hover:opacity-95 shadow-sm"
        >
          احجز درسًا
        </a>
      </div>
    </header>
  );
}

function Hero({ onExplore }: { onExplore: () => void }): React.ReactNode {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-br from-[var(--school-primary)]/6 to-[var(--school-accent)]/6" />
        <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full blur-3xl opacity-30 bg-[var(--school-primary)]/30" />
        <div className="absolute -bottom-24 -right-10 h-96 w-96 rounded-full blur-3xl opacity-30 bg-[var(--school-accent)]/30" />
      </div>

      <div className="pt-16 pb-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-black/5 mb-5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-700">اعثر على معلم يناسب أهدافك</span>
            </div>

            <h1 id="hero-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
              منصة تعليمية <span className="text-[var(--school-primary)]">مخصصة للمنطقة</span>
            </h1>

            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
              قرّر مستوى التعلّم، قارِن المعلمين حسب التقييم والسعر، واحجز درسًا تجريبيًا دون التزام.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#teachers"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--school-primary)] text-white font-semibold shadow hover:opacity-95 transition"
              >
                تصفّح المعلمين
              </a>
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[var(--school-primary)] font-semibold ring-1 ring-gray-200 hover:shadow-sm transition"
              >
                اختر مادة
              </button>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-3">موثوق من قبل مؤسسات تعليمية:</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 items-center opacity-80">
                {["المدرسة الدولية", "المدرسة البريطانية", "STEM مصر", "الجامعة الأمريكية", "جامعة النيل", "GUC"].map((brand) => (
                  <div
                    key={brand}
                    className="h-10 rounded-lg bg-white/80 flex items-center justify-center text-xs font-semibold"
                    aria-label={`موثوق من ${brand}`}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero visual simplified — not resume-like */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white ring-1 ring-gray-200 shadow-lg p-6">
              <div className="h-44 rounded-lg bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--school-primary)]">📘</div>
                  <div className="mt-2 text-sm text-gray-600">لوحة دروس — جدول مرن</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                <div>متابعة الأداء</div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  على المسار
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeacherCard({ t }: { t: Teacher }): React.ReactNode {
  return (
    <article className="group rounded-2xl bg-white ring-1 ring-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className={`h-14 w-14 ${t.photoBg} rounded-xl grid place-items-center text-xl font-bold text-gray-700`}>
          {initials(t.name)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-lg">{t.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <StarRating rating={t.rating} />
              <span className="text-gray-500">({t.reviews})</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600">{t.blurb}</p>

          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {t.subjects.map((s) => (
              <Badge key={s}>{pretty(s)}</Badge>
            ))}
            <Badge variant="soft">{t.languages.join(" · ")}</Badge>
            <Badge variant="soft">{t.mode === "online" ? "أونلاين" : "حضوري"}</Badge>
            <Badge variant="soft">{schoolLabel(t.school)}</Badge>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">${t.price}</span> / الساعة · {t.timezones.join(" ")}
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--school-primary)] text-white text-sm font-semibold hover:opacity-95"
            >
              احجز درسًا تجريبيًا
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function SessionPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}): React.ReactNode {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition
        ${active ? "bg-[var(--school-primary)] text-white" : "bg-white ring-1 ring-gray-200 text-gray-700 hover:ring-gray-300"}`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }): React.ReactNode {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function Badge({ children, variant = "solid" }: { children: React.ReactNode; variant?: "solid" | "soft" }): React.ReactNode {
  const base = "inline-flex items-center text-xs font-medium rounded-full px-2.5 py-1";
  const styles = variant === "soft" ? "bg-gray-100 text-gray-700 ring-1 ring-gray-200" : "bg-[var(--school-primary)] text-white";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

function StarRating({ rating = 0 }: { rating?: number }): React.ReactNode {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "☆";
    return "☆";
  });
  return <span aria-label={`${rating} من 5`} className="text-yellow-400">{stars.join("")}</span>;
}

function Footer(): React.ReactNode {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        <div>
          <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-[var(--school-primary)]">
            <Logo />
            <span>يلا ندرس</span>
          </a>
          <p className="mt-3 text-gray-600">نساعد الطلاب في العثور على المعلم المناسب منذ 2025.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">استكشف</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a className="hover:text-[var(--school-primary)]" href="#subjects">المواد</a></li>
            <li><a className="hover:text-[var(--school-primary)]" href="#teachers">المعلمون</a></li>
            <li><a className="hover:text-[var(--school-primary)]" href="#offers">ماذا نقدّم</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">الدعم</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a className="hover:text-[var(--school-primary)]" href="#faq">الأسئلة</a></li>
            <li><a className="hover:text-[var(--school-primary)]" href="#cta">اتصل بنا</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">قانوني</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a className="hover:text-[var(--school-primary)]" href="#">الشروط</a></li>
            <li><a className="hover:text-[var(--school-primary)]" href="#">الخصوصية</a></li>
          </ul>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} يلا ندرس. كل الحقوق محفوظة.</div>
    </footer>
  );
}

function Logo(): React.ReactNode {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--school-primary)] text-white text-sm shadow">
      م
    </span>
  );
}

function SubjectPill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}): React.ReactNode {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm ring-1 shadow-sm transition-all select-none
        ${active ? "bg-[var(--school-primary)] text-white ring-[var(--school-primary)] hover:opacity-95" : "bg-white text-gray-900 ring-gray-200 hover:ring-gray-300"}
      `}
      aria-pressed={active}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function DecorBackground(): React.ReactNode {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-12 -left-8 h-36 w-36 rounded-full blur-3xl opacity-30 bg-[var(--school-primary)]/30" />
      <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full blur-3xl opacity-30 bg-[var(--school-accent)]/30" />
    </div>
  );
}

/* ------------------------------- Utils -------------------------------- */

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function pretty(key: SubjectKey): string {
  const map: Record<SubjectKey, string> = {
    math: "الرياضيات",
    physics: "الفيزياء",
    chemistry: "الكيمياء",
    biology: "الأحياء",
    english: "اللغة الإنجليزية",
    arabic: "اللغة العربية",
    programming: "البرمجة",
    history: "التاريخ",
    geography: "الجغرافيا",
    art: "الفن",
    daily: "المتابعة اليومية",
    university: "مواد جامعية",
  } as const;
  return map[key] ?? (String(key) || "");
}

function schoolLabel(key: SchoolType): string {
  const map: Record<SchoolType, string> = {
    international: "انترناشونال",
    ahli: "أهلي",
    government: "حكومي",
  } as const;
  return map[key];
}

function labelFor(key: "all" | SubjectKey, subjects: ReadonlyArray<Subject>): string {
  if (key === "all") return "الكل";
  const found = subjects.find((s) => s.key === key);
  return found ? found.label : key;
}

function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
