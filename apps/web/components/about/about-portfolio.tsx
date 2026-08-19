"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FadeIn, AnimatedText, ContactButton, LiveProjectButton } from "./motion-primitives";

// ── 数据：现有文字内容 ──
const stats = [
  { value: "1", unit: "项", label: "知识资本·十年发展经验积累" },
  { value: "10", unit: "年", label: "十年沉淀·深耕发展经验" },
  { value: "30", unit: "万", label: "服务客户企业上市工程超过30万" },
  { value: "300", unit: "家", label: "超过300家合作企业客户" },
];

const localImgs = [
  "/legacy/home/sw-0.jpg",
  "/legacy/home/sw-1.jpg",
  "/legacy/home/sw-2.jpg",
  "/legacy/home/sw-3.jpg",
  "/legacy/home/sw-4.jpg",
  "/legacy/home/hero-bg.jpg",
  "/legacy/home/flip-page-0.jpg",
  "/legacy/home/flip-page-1-raw.jpg",
  "/legacy/home/company-icon.png",
  "/legacy/home/sw-0.jpg",
];

const concepts = [
  {
    num: "01",
    name: "梦启新创",
    category: "中文名称",
    desc: "以梦想为起点，以创新为驱动，开启科技与商业的新征程。梦启：从每一个微小的梦想出发，为用户、行业与未来创造新的可能；新创：持续创新、勇于突破，用技术与创意重构行业规则。",
    images: [localImgs[0], localImgs[1], localImgs[2]],
  },
  {
    num: "02",
    name: "Drevortex",
    category: "英文名称",
    desc: "Dream + Vortex，即\"梦想的漩涡\"，象征能量聚合与科技引力。Dre：取自Dream，传递品牌的人文温度与理想主义；Vortex：意为漩涡，代表技术聚合与创新迭代动力。",
    images: [localImgs[3], localImgs[4], localImgs[5]],
  },
  {
    num: "03",
    name: "品牌价值",
    category: "核心理念",
    desc: "以梦为启：始终以用户需求与行业愿景为导向；以创为核：坚持技术突破与模式创新；以涡为势：聚合资源、迭代升级，形成持续影响力。",
    images: [localImgs[6], localImgs[7], localImgs[8]],
  },
];

const advantages = [
  { num: "01", name: "技术创新能力", desc: "持续跟踪前沿技术，为客户提供创新解决方案" },
  { num: "02", name: "专业服务团队", desc: "经验丰富的技术团队，提供专业高效的服务" },
  { num: "03", name: "全流程解决方案", desc: "从咨询到实施，提供一站式服务" },
  { num: "04", name: "客户导向理念", desc: "以客户需求为核心，提供定制化服务" },
  { num: "05", name: "行业经验丰富", desc: "深耕多个行业领域，积累丰富实战经验" },
  { num: "06", name: "质量保障体系", desc: "完善的质量管理体系，确保项目成功交付" },
];

const marqueeImages = [
  "/legacy/home/sw-0.jpg",
  "/legacy/home/sw-1.jpg",
  "/legacy/home/sw-2.jpg",
  "/legacy/home/sw-3.jpg",
  "/legacy/home/sw-4.jpg",
  "/legacy/home/hero-bg.jpg",
  "/legacy/home/flip-page-0.jpg",
  "/legacy/home/flip-page-1-raw.jpg",
  "/legacy/home/company-icon.png",
  "/legacy/home/sw-0.jpg",
];

// ── Hero Section ──
function HeroSection() {
  return (
    <section className="pf-hero" id="aboutHeroRoot">
      <div className="pf-hero-bg" id="aboutHeroBg">
        <div className="pf-hero-grid-lines" aria-hidden="true">
          <span className="pf-gl pf-gl-v pf-gl-1" />
          <span className="pf-gl pf-gl-v pf-gl-2" />
          <span className="pf-gl pf-gl-v pf-gl-3" />
          <span className="pf-gl pf-gl-h pf-gl-4" />
          <span className="pf-gl pf-gl-h pf-gl-5" />
        </div>
        <div className="pf-hero-overlay">
          <FadeIn delay={0.15} y={30}>
            <span className="pf-hero-eyebrow">ABOUT US · 关于我们</span>
          </FadeIn>
          <FadeIn delay={0.3} y={50}>
            <h1 className="pf-hero-heading hero-heading">
              关于<span className="pf-hero-accent">我们</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.45} y={30}>
            <p className="pf-hero-desc">
              梦启新创 · <span className="text-blue">Drevortex</span>
              <span className="pf-hero-sep">·</span>
              <span className="pf-hero-tag">以梦为启</span>
              <span className="pf-hero-tag">以创为核</span>
              <span className="pf-hero-tag">以涡为势</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.6} y={20}>
            <div className="pf-hero-cta">
              <ContactButton label="联系我们" />
            </div>
          </FadeIn>
        </div>
        <div className="pf-hero-features" id="aboutHeroFeatures">
          <FadeIn delay={0.75} y={20} className="pf-feature-item">
            <i className="fas fa-lightbulb" />
            <span>创新驱动发展</span>
          </FadeIn>
          <FadeIn delay={0.85} y={20} className="pf-feature-item">
            <i className="fas fa-handshake" />
            <span>诚信合作共赢</span>
          </FadeIn>
          <FadeIn delay={0.95} y={20} className="pf-feature-item">
            <i className="fas fa-star" />
            <span>追求卓越品质</span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Marquee Section ──
function MarqueeSection() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!row1Ref.current) return;
      const sectionTop = row1Ref.current.offsetTop;
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(scrollOffset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1 = [...marqueeImages.slice(0, 5), ...marqueeImages.slice(0, 5), ...marqueeImages.slice(0, 5)];
  const row2 = [...marqueeImages.slice(5), ...marqueeImages.slice(5), ...marqueeImages.slice(5)];

  return (
    <section className="pf-marquee">
      <div className="pf-marquee-row" ref={row1Ref} style={{ transform: `translateX(${offset - 200}px)` }}>
        {row1.map((src, i) => (
          <img key={i} src={src} alt="" className="pf-marquee-img" loading="lazy" />
        ))}
      </div>
      <div className="pf-marquee-row" style={{ transform: `translateX(-${offset - 200}px)` }}>
        {row2.map((src, i) => (
          <img key={i} src={src} alt="" className="pf-marquee-img" loading="lazy" />
        ))}
      </div>
    </section>
  );
}

// ── About Section ──
function AboutSection() {
  return (
    <section className="pf-about" id="about">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="pf-deco pf-deco-tl">
        <i className="fas fa-moon" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="pf-deco pf-deco-bl">
        <i className="fas fa-cube" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="pf-deco pf-deco-tr">
        <i className="fas fa-shapes" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="pf-deco pf-deco-br">
        <i className="fas fa-layer-group" />
      </FadeIn>

      <div className="pf-about-content">
        <FadeIn delay={0} y={40}>
          <h2 className="pf-section-heading hero-heading">认识仁励</h2>
        </FadeIn>
        <AnimatedText
          className="pf-about-text"
          text="梦启新创网络科技有限公司，是一家专注于数字化技术服务的创新型企业。我们致力于为客户提供全方位的互联网解决方案，涵盖软件开发、网页制作、小程序开发、品牌设计等多个领域。公司秉承以梦为启、以创为核、以涡为势的核心理念，通过技术创新和专业服务，助力企业实现数字化转型。"
        />

        <div className="pf-stats">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} y={30} className="pf-stat">
              <div className="pf-stat-num">
                {s.value}
                <span className="pf-stat-unit">{s.unit}</span>
              </div>
              <p className="pf-stat-label">{s.label}</p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton label="了解更多" />
        </FadeIn>
      </div>
    </section>
  );
}

// ── Services Section (核心优势) ──
function ServicesSection() {
  return (
    <section className="pf-services" id="services">
      <FadeIn delay={0} y={40}>
        <h2 className="pf-services-heading">核心优势</h2>
      </FadeIn>
      <div className="pf-services-list">
        {advantages.map((adv, i) => (
          <FadeIn key={adv.num} delay={i * 0.1} y={30} className="pf-service-item">
            <span className="pf-service-num">{adv.num}</span>
            <div className="pf-service-body">
              <h3 className="pf-service-name">{adv.name}</h3>
              <p className="pf-service-desc">{adv.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Projects Section (品牌理念 sticky stacking) ──
function ProjectsSection() {
  return (
    <section className="pf-projects" id="projects">
      <div className="pf-projects-inner">
        <FadeIn delay={0} y={40}>
          <h2 className="pf-section-heading hero-heading">品牌理念</h2>
        </FadeIn>
        <div className="pf-projects-stack">
          {concepts.map((concept, i) => (
            <ProjectCard key={concept.num} concept={concept} index={i} total={concepts.length} />
          ))}
        </div>
      </div>
      <div className="pf-contact-bottom" id="contact">
        <FadeIn delay={0} y={30}>
          <ContactButton label="开启合作" />
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectCard({
  concept,
  index,
  total,
}: {
  concept: (typeof concepts)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div className="pf-card-container" style={{ top: `${index * 28}px` }}>
      <motion.div ref={ref} style={{ scale }} className="pf-card">
        <div className="pf-card-top">
          <span className="pf-card-num">{concept.num}</span>
          <div className="pf-card-info">
            <span className="pf-card-cat">{concept.category}</span>
            <h3 className="pf-card-name">{concept.name}</h3>
          </div>
          <LiveProjectButton label="查看详情" />
        </div>
        <p className="pf-card-desc">{concept.desc}</p>
        <div className="pf-card-images">
          <div className="pf-card-col-left">
            <img src={concept.images[0]} alt="" className="pf-card-img pf-card-img-sm" loading="lazy" />
            <img src={concept.images[1]} alt="" className="pf-card-img pf-card-img-lg" loading="lazy" />
          </div>
          <div className="pf-card-col-right">
            <img src={concept.images[2]} alt="" className="pf-card-img pf-card-img-tall" loading="lazy" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── 主组件 ──
export function AboutPortfolio() {
  useEffect(() => {
    const heroBg = document.getElementById("aboutHeroBg");
    const onScroll = () => {
      heroBg?.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pf-root">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
