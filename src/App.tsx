/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Heart, Stars, Sparkles, Anchor, ChevronDown, CheckCircle2, AlertCircle, Target, Camera, Plus, Trash2, Calendar, Menu, X } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const FloatingHearts = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {[...Array(15)].map((_, i) => (
        <HeartMover key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

const HeartMover = ({ index, mouseX, mouseY }: any) => {
  const x = useSpring(useTransform(mouseX, [0, window.innerWidth], [index * 5, index * 10]), { stiffness: 50, damping: 20 });
  const y = useSpring(useTransform(mouseY, [0, window.innerHeight], [index * 2, index * 5]), { stiffness: 50, damping: 20 });
  
  const initialX = useRef(Math.random() * 100);
  const initialY = useRef(Math.random() * 100);
  const size = useRef(Math.random() * 20 + 10);
  const delay = useRef(Math.random() * 5);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${initialX.current}%`,
        top: `${initialY.current}%`,
        x,
        y,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        delay: delay.current,
      }}
    >
      <Heart 
        size={size.current} 
        className="text-accent-gold fill-accent-gold/20 opacity-30" 
      />
    </motion.div>
  );
};

const MESSHE_UPS = [
  {
    id: 1,
    title: "عندما كنت عنيداً جداً للاعتراف بخطئي.",
    description: "سمحت لكبريائي بالوقوف في طريق سلامنا. أنا آسف لأنني جعلتك تشعرين بأن صوتك غير مسموع.",
    category: "التواصل"
  },
  {
    id: 2,
    title: "عندما نسيت ذلك الشيء المهم الذي أخبرتني به.",
    description: "لم يكن ذلك لأنني لا أهتم، لكنني أعلم أنه بدا كذلك. أنا أعمل على أن أكون أكثر حضوراً.",
    category: "الاهتمام"
  },
  {
    id: 3,
    title: "التأخر وعدم إبلاغك بذلك.",
    description: "وقتك ثمين، وعدم دقتي في المواعيد أظهر قلة احترام لا تستحقينها.",
    category: "الالتزام بالمواعيد"
  }
];

const PROMISES = [
  {
    id: 1,
    text: "سأستمع لأفهم، وليس فقط لأرد.",
    detail: "منحك اهتمامي الكامل عندما تتحدثين هو أولويتي."
  },
  {
    id: 2,
    text: "سأكون دائماً أكبر مشجع لك.",
    detail: "بغض النظر عن الطريق الذي تختارينه، سأكون دائماً خلفك."
  },
  {
    id: 3,
    text: "سأختار 'نحن' على كبريائي في كل مرة.",
    detail: "العلاقات تدور حول الشراكة، وليس حول كسب الجدال."
  },
  {
    id: 4,
    text: "سأقدر اللحظات الصغيرة بقدر الكبيرة.",
    detail: "من قهوة الصباح إلى أحاديث وقت متأخر من الليل."
  }
];

const SMART_COMMITMENTS = [
  {
    id: 1,
    title: "وقت عالي الجودة ومخصص",
    description: "كل يوم أحد من الساعة 6 مساءً حتى 10 مساءً سيكون وقتنا 'الخالي من التكنولوجيا'. لا هواتف، لا مشتتات، فقط تواصل وانسجام.",
    goals: {
      s: "وقت خالٍ من التكنولوجيا لنا.",
      m: "4 ساعات كل أسبوع.",
      a: "أيام الأحد هي عادةً أهدأ أيامنا.",
      r: "لإعادة بناء المودة والاستماع العميق.",
      t: "بدءاً من يوم الأحد القادم."
    }
  },
  {
    id: 2,
    title: "جلسات تواصل دورية",
    description: "سأبدأ جلسة حديث من القلب يومياً. بدلاً من مجرد السؤال 'كيف كان يومك'، سأسأل 'كيف كان قلبك اليوم؟'",
    goals: {
      s: "جلسة تواصل عاطفي يومياً.",
      m: "مرة واحدة كل مساء قبل النوم.",
      a: "تستغرق فقط 5-10 دقائق.",
      r: "لمعالجة المشاكل الصغيرة قبل أن تكبر.",
      t: "يومياً، بدءاً من الليلة."
    }
  },
  {
    id: 3,
    title: "الدقة في المواعيد والاحترام",
    description: "سأرسل رسالة قبل 15 دقيقة من أي موعد إذا كنت سأتأخر حتى لو لدقيقتين، احتراماً لجدولك.",
    goals: {
      s: "تنبيهات مسبقة عن التأخير.",
      m: "100% من المرات التي أتأخر فيها.",
      a: "إرسال نص سريع ممكن دائماً.",
      r: "لإظهار أن وقتك ثمين بالنسبة لي.",
      t: "يبدأ العمل بهذا فوراً."
    }
  }
];

interface EvidenceItem {
  id: string;
  type: 'action' | 'description' | 'photo';
  content: string;
  date: string;
  note?: string;
}

const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: '1',
    type: 'action',
    content: "بدأت استخدام تقويم مشترك لجميع خططنا.",
    date: "2026-05-04",
    note: "لا مزيد من الوعود المنسية أو تداخل المواعيد."
  },
  {
    id: '2',
    type: 'description',
    content: "قرأت كتاب 'التواصل غير العنيف' لتحسين كيفية التعبير عن احتياجاتي.",
    date: "2026-05-06",
    note: "أتعلم التحدث دون لوم."
  }
];

const LOVELY_MESSAGES = [
  "أنتِ أجمل ما حدث لي في هذا العالم.",
  "كل دقة في قلبي تناديكِ يا نور.",
  "وجودكِ معي هو جنتي الصغيرة.",
  "أعدكِ أن أحاول دائماً جاعلاً إياكِ أسعد إنسانة.",
  "نور، أنتِ الضوء الذي ينير عتمتي دائماً.",
  "كل يوم معكِ هو يوم جديد من السعادة التي لم أتخيلها.",
  "أنتِ لستِ فقط حبيبتي، أنتِ موطني وأماني."
];

export default function App() {
  const containerRef = useRef(null);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [newEvidence, setNewEvidence] = useState({ content: '', note: '' });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [lovelyMessage, setLovelyMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/evidence')
      .then(res => res.json())
      .then(data => setEvidence(data))
      .catch(err => console.error("Failed to load evidence:", err));
  }, []);

  const showRandomMessage = () => {
    const random = LOVELY_MESSAGES[Math.floor(Math.random() * LOVELY_MESSAGES.length)];
    setLovelyMessage(random);
    setTimeout(() => setLovelyMessage(null), 5000); // Hide after 5s
  };

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMemoryImage = async () => {
    try {
      setIsGenerating(true);
      const prompt = "A cute, romantic cartoon illustration of a young couple, a man and a woman named Noor, sharing a sweet and sincere moment of apology and love. Soft pastel colors, whimsical art style, expressive faces, cozy atmosphere.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      const candidates = response.candidates;
      if (candidates && candidates[0]?.content?.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Image generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvidence.content) return;
    
    try {
      const response = await fetch('/api/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'action',
          content: newEvidence.content,
          note: newEvidence.note
        })
      });
      
      if (response.ok) {
        const newItem = await response.json();
        setEvidence([newItem, ...evidence]);
        setNewEvidence({ content: '', note: '' });
      }
    } catch (err) {
      console.error("Failed to add evidence:", err);
    }
  };

  const removeEvidence = async (id: string) => {
    try {
      const response = await fetch(`/api/evidence/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setEvidence(evidence.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error("Failed to remove evidence:", err);
    }
  };
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen selection:bg-accent-gold/30 bg-bg-dark text-text-main relative">
      <FloatingHearts />
      
      {/* Navigation Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-dark/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsNavOpen(false)}
              className="absolute top-8 left-8 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col gap-8 text-center">
              {['البداية', 'الأخطاء', 'الوعود', 'الالتزامات', 'أدلة التغيير', 'لحظاتنا'].map((item, i) => {
                const ids = ['hero', 'regrets', 'promises', 'commitments', 'evidence', 'ai-moments'];
                return (
                  <button
                    key={item}
                    onClick={() => {
                      document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' });
                      setIsNavOpen(false);
                    }}
                    className="serif text-4xl md:text-6xl text-white/40 hover:text-accent-gold hover:italic transition-all"
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsNavOpen(true)}
        className="fixed top-8 left-8 z-40 bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
      >
        <Menu className="w-5 h-5 text-accent-gold" />
      </button>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=2000" 
            alt="Soft romantic background" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-bg-dark" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center max-w-3xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="mb-8 flex justify-center"
          >
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-full border border-white/10">
              <Heart className="w-10 h-10 text-accent-gold fill-accent-gold/20" />
            </div>
          </motion.div>

          <h2 className="text-xs uppercase tracking-[0.4em] font-semibold text-white/40 mb-4 px-4">تفكير شخصي</h2>
          <h1 className="serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-tight italic">
            إلى نور
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-serif max-w-lg mx-auto leading-relaxed italic border-y border-white/10 py-6">
            "الخطوة الأولى نحو الأفضل هي معرفة أين فشلت."
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-16 text-accent-gold/60 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => document.getElementById('regrets')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">اسحبي لرؤية ما في قلبي</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* The Mess Ups Section */}
      <section id="regrets" className="py-32 px-6 md:px-12 bg-surface-dark relative">
        <div className="max-w-5xl mx-auto">
          <header className="mb-24 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-red-900/40 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              <AlertCircle className="w-3 h-3" />
              الظلال
            </motion.div>
            <h2 className="serif text-5xl md:text-7xl text-white text-center italic border-r-4 border-red-900/50 pr-8">الأوقات التي أخطأت فيها</h2>
          </header>

          <div className="grid gap-20">
            {MESSHE_UPS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-12 items-start">
                   <div className="serif text-8xl md:text-[12rem] text-white/5 absolute -top-16 -right-8 select-none group-hover:text-white/10 transition-colors tabular-nums">
                    0{item.id}
                  </div>
                  <div className="relative z-10 pt-4 flex-1">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4 block">المرجع: {item.category}</span>
                    <h3 className="serif text-3xl md:text-4xl text-white/90 mb-6 group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-text-main/60 leading-relaxed max-w-3xl text-xl font-serif italic border-r border-white/5 pr-8">
                      "{item.description}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Promises Section */}
      <section id="promises" className="bg-surface-light py-32 px-6 relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 left-0 p-32 opacity-5 -rotate-12 transition-transform hover:-rotate-45 duration-1000">
          <Stars className="w-96 h-96 text-accent-gold" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <header className="mb-24">
             <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-border-gold text-accent-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              <CheckCircle2 className="w-3 h-3" />
              النور
            </motion.div>
            <h2 className="serif text-5xl md:text-7xl text-white italic border-r-4 border-accent-gold pr-8">كيف سأكون أفضل</h2>
            <p className="text-white/40 mt-8 max-w-xl text-lg font-serif italic">"العمل هو اللغة الوحيدة التي تشفي."</p>
          </header>

          <div className="grid md:grid-cols-2 gap-1px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
            {PROMISES.map((promise, index) => (
              <motion.div
                key={promise.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-light p-10 flex gap-6 group hover:bg-white/5 transition-colors"
              >
                <div className="serif italic text-3xl accent-gold opacity-30 pt-1">0{promise.id}</div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-3 tracking-wide">{promise.text}</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-sans">
                    {promise.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Commitments (SMART) */}
      <section id="commitments" className="py-32 px-6 bg-surface-dark border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <header className="mb-24 flex flex-col items-start px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-accent-gold/40 text-accent-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              <Target className="w-3 h-3" />
              أهداف ذكية
            </motion.div>
            <h2 className="serif text-5xl md:text-7xl text-white italic underline decoration-accent-gold/20 decoration-8 underline-offset-[12px]">التزامات المستقبل</h2>
            <p className="text-white/40 mt-10 max-w-2xl text-lg leading-relaxed">
              الوعود الغامضة سهلة؛ الأهداف الملموسة صعبة. أنا أضع خارطة طريقي للنمو واضحة لكِ لترينها وتحاسبيني عليها.
            </p>
          </header>

          <div className="space-y-24">
            {SMART_COMMITMENTS.map((commitment, index) => (
              <motion.div
                key={commitment.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row gap-16">
                  <div className="lg:w-1/3">
                    <h3 className="serif text-3xl text-white mb-4 italic">{commitment.title}</h3>
                    <p className="text-white/60 leading-relaxed font-serif text-lg italic">
                      {commitment.description}
                    </p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { l: 'S', v: commitment.goals.s, t: 'محدد' },
                      { l: 'M', v: commitment.goals.m, t: 'قابل للقياس' },
                      { l: 'A', v: commitment.goals.a, t: 'قابل للتحقيق' },
                      { l: 'R', v: commitment.goals.r, t: 'ذو صلة' },
                      { l: 'T', v: commitment.goals.t, t: 'محدد بزمن' }
                    ].map((goal, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-sm flex flex-col justify-between group hover:border-accent-gold/40 transition-colors text-right">
                        <span className="serif italic text-2xl accent-gold opacity-40 mb-4 block">{goal.l}</span>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 block mb-2">{goal.t}</span>
                          <p className="text-xs text-white/70 leading-relaxed">{goal.v}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence of Growth Section */}
      <section id="evidence" className="py-32 px-6 bg-bg-dark">
        <div className="max-w-5xl mx-auto">
          <header className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-8">
            <div>
               <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-accent-gold/40 text-accent-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
              >
                <Camera className="w-3 h-3" />
                تقدم ملموس
              </motion.div>
              <h2 className="serif text-5xl md:text-7xl text-white italic">أدلة على التغيير</h2>
            </div>
            
            {/* Simple Growth Logger */}
            <form onSubmit={addEvidence} className="w-full lg:w-auto bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4 text-right">
              <div className="flex flex-col gap-2">
                 <input 
                  type="text" 
                  dir="rtl"
                  value={newEvidence.content}
                  onChange={e => setNewEvidence({...newEvidence, content: e.target.value})}
                  placeholder="صفي لحظة من التغيير..."
                  className="bg-transparent border-b border-white/20 pb-2 text-sm focus:border-accent-gold outline-none transition-colors w-full lg:w-80"
                />
                 <input 
                  type="text" 
                  dir="rtl"
                  value={newEvidence.note}
                  onChange={e => setNewEvidence({...newEvidence, note: e.target.value})}
                  placeholder="تفاصيل إضافية/ملاحظة..."
                  className="bg-transparent border-b border-white/10 italic text-white/40 pb-2 text-xs focus:border-accent-gold/40 outline-none transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="bg-accent-gold text-bg-dark px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-3 h-3" />
                تسجيل التغيير
              </button>
            </form>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {evidence.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-surface-light border border-white/5 p-8 rounded-sm group relative flex flex-col justify-between text-right"
                >
                  <button 
                    onClick={() => removeEvidence(item.id)}
                    className="absolute top-4 left-4 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-6 justify-end">
                      <span className="text-[10px] font-mono text-white/30 uppercase">{item.date}</span>
                      <Calendar className="w-3 h-3 text-accent-gold opacity-50" />
                    </div>
                    <p className="text-white/80 font-serif italic text-lg leading-relaxed mb-4">"{item.content}"</p>
                    {item.note && (
                      <div className="pr-4 border-r border-accent-gold/30">
                        <p className="text-xs text-white/40 italic">{item.note}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex justify-start">
                    <Sparkles className="w-4 h-4 text-accent-gold opacity-10" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* AI Memory Generator Section */}
      <section id="ai-moments" className="py-32 px-6 bg-surface-light border-y border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-accent-gold/40 text-accent-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              <Sparkles className="w-3 h-3" />
              سحر الذكاء الاصطناعي
            </motion.div>
            <h2 className="serif text-5xl md:text-7xl text-white italic">لحظاتنا الكرتونية</h2>
            <p className="text-white/40 mt-8 max-w-xl mx-auto text-lg font-serif italic">
              ضغطة زر واحدة لتوليد صورة كرتونية تعبر عن حبنا واعتذاري لكِ.
            </p>
          </header>

          <div className="flex flex-col items-center gap-12">
            <div className="relative w-full max-w-md aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center group shadow-2xl">
              {generatedImage ? (
                <motion.img 
                  src={generatedImage} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full object-cover"
                  alt="Generated memory"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-white/20 flex flex-col items-center gap-4">
                  <Camera className="w-16 h-16 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                  <span className="text-xs uppercase tracking-widest">اضغطي بالأسفل لتوليد اللحظة</span>
                </div>
              )}
              
              {isGenerating && (
                <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-accent-gold/20 border-t-accent-gold rounded-full"
                  />
                  <span className="text-accent-gold text-[10px] uppercase tracking-widest animate-pulse">جاري رسم ذكرياتنا...</span>
                </div>
              )}
            </div>

            <button
              onClick={generateMemoryImage}
              disabled={isGenerating}
              className="group relative px-12 py-5 bg-accent-gold text-bg-dark text-sm font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isGenerating ? "جاري الرسم..." : "توليد صورة كرتونية"}
                <Sparkles className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
            </button>
          </div>
        </div>
        
        <div className="absolute -bottom-24 -left-24 opacity-5 pointer-events-none">
          <Heart className="w-96 h-96 text-accent-gold fill-accent-gold" />
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-40 px-6 text-center bg-bg-dark">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-px h-24 bg-gradient-to-b from-accent-gold/50 to-transparent mx-auto mb-12" />
          <h2 className="serif text-5xl md:text-6xl text-white mb-10 italic">
            أنتِ مكاني الآمن، يا نور.
          </h2>
          <p className="text-white/60 leading-loose mb-16 text-xl font-serif italic px-8">
            أنا في رحلة تطور مستمر، بكنني أتطور من أجلك. شكراً لصبركِ، ولطفكِ، وحبكِ. أحبكِ أكثر مما يمكن بكلمات أن تعبر على شاشة.
          </p>
          
          <div className="inline-flex flex-col items-center gap-6 relative">
             <button 
              onClick={showRandomMessage}
              className="px-10 py-5 border border-accent-gold text-xs uppercase tracking-[0.4em] text-white/80 hover:bg-white hover:text-bg-dark cursor-pointer transition-all duration-500 rounded-sm active:scale-95"
            >
                أحبك يا نور
              </button>
              
              <AnimatePresence>
                {lovelyMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute -top-16 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-accent-gold/30 text-white/90 serif italic text-lg whitespace-nowrap z-20 shadow-xl"
                  >
                    {lovelyMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="serif italic text-xl text-accent-gold opacity-60">
                مخلص لكِ دائماً
              </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="p-12 py-10 bg-footer-dark flex flex-col md:flex-row justify-between items-center border-t border-white/10 gap-8">
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-white/20"></div>
          <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase italic text-center md:text-right">
            لأنكِ تستحقين النسخة التي وعدت بأن أكونها.
          </p>
        </div>
        <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-semibold">
          REF: NOOR-2026-STAY
        </p>
      </footer>
    </div>
  );
}

