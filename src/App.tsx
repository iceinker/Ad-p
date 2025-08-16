import React, { useMemo, useState } from "react";

/**
 * صفحة هبوط عصرية لسوق تعليمي/دروس خصوصية.
 * - صفحة واحدة (بدون react-router)، تستخدم روابط داخلية.
 * - اختيار المادة → فلترة بطاقات المعلمين.
 * - ماذا نقدم، كيف يعمل، الأسئلة الشائعة، CTA، وتذييل.
 * - TailwindCSS فقط؛ بدون مكتبات خارجية.
 * - كل المكونات هنا.
 */

// بيانات المواد الدراسية
const subjects = [
  "الرياضيات",
  "اللغة العربية",
  "اللغة الإنجليزية",
  "العلوم",
  "الفيزياء",
  "الكيمياء",
  "الأحياء",
  "التاريخ",
  "الجغرافيا",
  "البرمجة",
];

// بيانات المعلمين
const teachers = [
  { name: "أ. أحمد", subject: "الرياضيات", bio: "خبرة ١٠ سنوات في تدريس الرياضيات." },
  { name: "أ. سارة", subject: "اللغة العربية", bio: "معلمة متخصصة في قواعد اللغة والأدب." },
  { name: "أ. يوسف", subject: "الفيزياء", bio: "يشرح المفاهيم الفيزيائية بطرق سهلة وممتعة." },
  { name: "أ. ليلى", subject: "اللغة الإنجليزية", bio: "دورات محادثة وقواعد لجميع المستويات." },
];

// قسم البطل (Hero)
const Hero: React.FC = () => (
  <section
    id="home"
    className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-900 to-blue-700 text-white px-4"
    dir="rtl"
  >
    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[Tajawal]">
      منصّة تعليمية حديثة للطلاب والمعلمين
    </h1>
    <p className="text-lg md:text-2xl mb-8 max-w-2xl font-[Tajawal]">
      تعلم بطرق عصرية مع أفضل المعلمين في الشرق الأوسط. اختر معلمك
      حسب المادة التي تحتاجها.
    </p>
    <div className="flex gap-4 flex-wrap justify-center">
      <a
        href="#subjects"
        className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-2xl shadow-lg hover:bg-yellow-500 font-semibold transition"
      >
        ابدأ الآن
      </a>
      <a
        href="#teachers"
        className="border-2 border-yellow-400 px-6 py-3 rounded-2xl shadow-lg hover:bg-yellow-400 hover:text-blue-900 font-semibold transition"
      >
        تصفح المعلمين
      </a>
    </div>
  </section>
);

// اختيار المواد
const SubjectChooser: React.FC<{ onSelect: (s: string) => void }> = ({
  onSelect,
}) => (
  <section
    id="subjects"
    className="py-16 bg-gray-100 text-center"
    dir="rtl"
  >
    <h2 className="text-3xl font-bold mb-8 font-[Tajawal]">اختر المادة</h2>
    <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => onSelect(subject)}
          className="bg-blue-800 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition font-[Tajawal]"
        >
          {subject}
        </button>
      ))}
    </div>
  </section>
);

// بطاقات المعلمين
const TeacherCards: React.FC<{ subject: string }> = ({ subject }) => {
  const filtered = useMemo(
    () => (subject ? teachers.filter((t) => t.subject === subject) : teachers),
    [subject]
  );

  return (
    <section id="teachers" className="py-16 bg-white" dir="rtl">
      <h2 className="text-3xl font-bold mb-8 text-center font-[Tajawal]">
        معلمونا
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {filtered.map((t) => (
          <div
            key={t.name}
            className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-right"
          >
            <h3 className="text-xl font-semibold mb-2 font-[Tajawal]">
              {t.name}
            </h3>
            <p className="text-blue-800 mb-2 font-[Tajawal]">{t.subject}</p>
            <p className="text-gray-700 font-[Tajawal]">{t.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ماذا نقدم
const WhatWeOffer: React.FC = () => (
  <section id="offer" className="py-16 bg-gray-100" dir="rtl">
    <h2 className="text-3xl font-bold mb-8 text-center font-[Tajawal]">
      ماذا نقدم؟
    </h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-center">
      <div className="p-6 bg-white rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-2 font-[Tajawal]">
          دروس مباشرة
        </h3>
        <p className="text-gray-700 font-[Tajawal]">
          تواصل مع المعلمين عبر الإنترنت بجلسات فردية.
        </p>
      </div>
      <div className="p-6 bg-white rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-2 font-[Tajawal]">مواد شاملة</h3>
        <p className="text-gray-700 font-[Tajawal]">
          مذكرات، تدريبات، وامتحانات تجريبية لمساعدتك على النجاح.
        </p>
      </div>
      <div className="p-6 bg-white rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-2 font-[Tajawal]">أسعار مناسبة</h3>
        <p className="text-gray-700 font-[Tajawal]">
          اختر الخطة التي تناسب ميزانيتك ووقتك.
        </p>
      </div>
    </div>
  </section>
);

// كيف يعمل
const HowItWorks: React.FC = () => (
  <section id="how" className="py-16 bg-white" dir="rtl">
    <h2 className="text-3xl font-bold mb-8 text-center font-[Tajawal]">
      كيف يعمل؟
    </h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-center">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 font-[Tajawal]">
          ١. اختر المادة
        </h3>
        <p className="text-gray-700 font-[Tajawal]">
          حدد المجال الذي تحتاج إلى دعم فيه.
        </p>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 font-[Tajawal]">
          ٢. اختر معلمك
        </h3>
        <p className="text-gray-700 font-[Tajawal]">
          تصفح ملفات المعلمين واختر المناسب لك.
        </p>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 font-[Tajawal]">
          ٣. ابدأ التعلم
        </h3>
        <p className="text-gray-700 font-[Tajawal]">
          ابدأ جلساتك مباشرة عبر منصتنا الآمنة.
        </p>
      </div>
    </div>
  </section>
);

// الأسئلة الشائعة
const FAQ: React.FC = () => (
  <section id="faq" className="py-16 bg-gray-100" dir="rtl">
    <h2 className="text-3xl font-bold mb-8 text-center font-[Tajawal]">
      الأسئلة الشائعة
    </h2>
    <div className="max-w-3xl mx-auto px-4 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-2 font-[Tajawal]">
          كيف أبدأ؟
        </h3>
        <p className="text-gray-700 font-[Tajawal]">
          اختر المادة ثم المعلم المناسب وابدأ التعلم فورًا.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-2 font-[Tajawal]">
          هل يمكنني تغيير المعلم لاحقًا؟
        </h3>
        <p className="text-gray-700 font-[Tajawal]">
          نعم، يمكنك اختيار معلم جديد في أي وقت.
        </p>
      </div>
    </div>
  </section>
);

// الدعوة إلى الإجراء (CTA)
const CTA: React.FC = () => (
  <section
    id="cta"
    className="py-16 bg-blue-900 text-white text-center"
    dir="rtl"
  >
    <h2 className="text-3xl font-bold mb-6 font-[Tajawal]">
      مستعد للبدء؟
    </h2>
    <p className="mb-8 font-[Tajawal]">
      انضم إلينا الآن وابدأ رحلتك التعليمية مع أفضل المعلمين.
    </p>
    <a
      href="#subjects"
      className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-2xl shadow-lg hover:bg-yellow-500 font-semibold transition"
    >
      ابدأ الآن
    </a>
  </section>
);

// التذييل
const Footer: React.FC = () => (
  <footer className="py-8 bg-gray-900 text-white text-center" dir="rtl">
    <p className="font-[Tajawal]">
      © {new Date().getFullYear()} منصّة التعليم. جميع الحقوق محفوظة.
    </p>
  </footer>
);

// الصفحة الرئيسية
const LandingPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <div className="font-sans font-[Tajawal]" dir="rtl">
      <Hero />
      <SubjectChooser onSelect={setSelectedSubject} />
      <TeacherCards subject={selectedSubject} />
      <WhatWeOffer />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
