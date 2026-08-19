"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeIn, Magnet } from "../about/motion-primitives";

gsap.registerPlugin(ScrollTrigger);

// ── 现有文字内容：案例数据 ──
const cases = [
  {
    num: "01",
    title: "企业管理系统",
    category: "开发类",
    filter: "development",
    meta: "软件开发",
    desc: "为某制造企业开发的全流程管理系统，提升运营效率30%",
    span: 7,
    img: "/legacy/home/sw-0.jpg",
  },
  {
    num: "02",
    title: "电商平台网站",
    category: "网页&小程序",
    filter: "web",
    meta: "网页制作",
    desc: "响应式电商网站，支持多端访问，月访问量超10万",
    span: 5,
    img: "/legacy/home/sw-1.jpg",
  },
  {
    num: "03",
    title: "预约服务小程序",
    category: "网页&小程序",
    filter: "web",
    meta: "小程序开发",
    desc: "为连锁美容机构开发的预约管理小程序，用户超5000人",
    span: 5,
    img: "/legacy/home/sw-2.jpg",
  },
  {
    num: "04",
    title: "品牌VI设计",
    category: "设计类",
    filter: "design",
    meta: "Logo商标设计",
    desc: "为科技公司打造完整品牌视觉识别系统",
    span: 7,
    img: "/legacy/home/sw-3.jpg",
  },
  {
    num: "05",
    title: "数据分析平台",
    category: "开发类",
    filter: "development",
    meta: "软件开发",
    desc: "企业级数据可视化分析平台，支持多维度数据展示",
    span: 7,
    img: "/legacy/home/sw-4.jpg",
  },
  {
    num: "06",
    title: "企业官网重构",
    category: "网页&小程序",
    filter: "web",
    meta: "网页制作",
    desc: "为传统企业打造现代化官网，提升品牌形象",
    span: 5,
    img: "/legacy/home/hero-bg.jpg",
  },
  {
    num: "07",
    title: "商用图片设计",
    category: "设计类",
    filter: "design",
    meta: "商用图片设计",
    desc: "为电商平台设计系列产品宣传图，提升转化率20%",
    span: 5,
    img: "/legacy/home/flip-page-0.jpg",
  },
  {
    num: "08",
    title: "智能仓储系统",
    category: "开发类",
    filter: "development",
    meta: "软件开发",
    desc: "物流企业智能仓储管理系统，实现自动化调度",
    span: 7,
    img: "/legacy/home/flip-page-1-raw.jpg",
  },
];

const filters = [
  { label: "全部案例", value: "all" },
  { label: "开发类", value: "development" },
  { label: "网页&小程序", value: "web" },
  { label: "Logo商标＆商用图片设计", value: "design" },
];

const journal = [
  {
    title: "全流程管理系统升级实践",
    img: "/legacy/home/sw-0.jpg",
    date: "2024.10",
    read: "5 min read",
  },
  {
    title: "响应式电商网站架构设计",
    img: "/legacy/home/sw-1.jpg",
    date: "2024.08",
    read: "4 min read",
  },
  {
    title: "小程序预约系统用户体验优化",
    img: "/legacy/home/sw-2.jpg",
    date: "2024.06",
    read: "6 min read",
  },
  {
    title: "品牌视觉识别系统构建思路",
    img: "/legacy/home/sw-3.jpg",
    date: "2024.04",
    read: "3 min read",
  },
];

const explorations = [
  { img: "/legacy/home/sw-0.jpg", title: "系统架构" },
  { img: "/legacy/home/sw-1.jpg", title: "电商体验" },
  { img: "/legacy/home/sw-2.jpg", title: "小程序设计" },
  { img: "/legacy/home/sw-3.jpg", title: "品牌视觉" },
  { img: "/legacy/home/sw-4.jpg", title: "数据可视化" },
  { img: "/legacy/home/hero-bg.jpg", title: "官网重构" },
];

const stats = [
  { value: "100", suffix: "+", label: "成功案例" },
  { value: "50", suffix: "+", label: "合作伙伴" },
  { value: "98", suffix: "%", label: "客户满意度" },
];

const roles = ["企业管理系统", "电商平台网站", "预约服务小程序", "品牌VI设计"];

// ── Hero Section ──
function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = window.setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cp-hero-name", {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
        duration: 1.2,
        delay: 0.1,
        ease: "power3.out",
      });
      gsap.from(".cp-hero-blur", {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cp-hero" ref={heroRef}>
      <div className="cp-hero-bg" />
      <div className="cp-hero-overlay" />

      <div className="cp-hero-content">
        <motion.p
          className="cp-hero-eyebrow cp-hero-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          COLLECTION &apos;26
        </motion.p>

        <h1 className="cp-hero-name">案例展示</h1>

        <p className="cp-hero-role cp-hero-blur">
          <span className="cp-hero-role-prefix">A</span>{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="cp-hero-role-word"
            >
              {roles[roleIdx]}
            </motion.span>
          </AnimatePresence>{" "}
          <span>lives in Drevortex.</span>
        </p>

        <p className="cp-hero-desc cp-hero-blur">
          我们的成功案例 · 以梦为启、以创为核、以涡为势，持续为客户创造价值
        </p>

        <div className="cp-hero-cta cp-hero-blur">
          <a href="#works" className="cp-btn cp-btn-solid">
            查看作品
          </a>
          <a href="#contact" className="cp-btn cp-btn-outline">
            联系我们
          </a>
        </div>
      </div>

      <div className="cp-hero-scroll">
        <span>SCROLL</span>
        <div className="cp-hero-scroll-line">
          <div className="cp-hero-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

// ── Selected Works (Bento Grid) ──
function WorksSection() {
  const [filter, setFilter] = useState("all");

  const visible = cases.filter((c) => filter === "all" || c.filter === filter);

  return (
    <section className="cp-section cp-works" id="works">
      <div className="cp-container">
        <FadeIn className="cp-section-header">
          <div className="cp-eyebrow">
            <span className="cp-eyebrow-line" />
            <span>Selected Work</span>
          </div>
          <h2 className="cp-section-title">
            精选 <em>案例</em>
          </h2>
          <p className="cp-section-sub">A selection of projects we&apos;ve worked on, from concept to launch.</p>
        </FadeIn>

        <FadeIn delay={0.1} className="cp-filters">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`cp-filter-btn ${filter === f.value ? "active" : ""}`}
              onClick={() => setFilter(f.value)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </FadeIn>

        <div className="cp-bento">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                key={c.num}
                layout
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="cp-card"
                data-category={c.filter}
                style={{ gridColumn: `span ${c.span}` }}
              >
                <div className="cp-card-img-wrap">
                  <img src={c.img} alt={c.title} className="cp-card-img" loading="lazy" />
                  <div className="cp-card-halftone" />
                  <div className="cp-card-hover">
                    <span className="cp-card-hover-label">
                      View — <em>{c.title}</em>
                    </span>
                  </div>
                </div>
                <div className="cp-card-info">
                  <div className="cp-card-meta">
                    <span className="cp-card-num">{c.num}</span>
                    <span className="cp-card-tag">{c.meta}</span>
                  </div>
                  <h3 className="cp-card-title">{c.title}</h3>
                  <p className="cp-card-desc">{c.desc}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ── Journal Section ──
function JournalSection() {
  return (
    <section className="cp-section cp-journal">
      <div className="cp-container">
        <FadeIn className="cp-section-header">
          <div className="cp-eyebrow">
            <span className="cp-eyebrow-line" />
            <span>Journal</span>
          </div>
          <h2 className="cp-section-title">
            项目 <em>日志</em>
          </h2>
          <p className="cp-section-sub">Recent thoughts and notes from our project practice.</p>
        </FadeIn>

        <div className="cp-journal-list">
          {journal.map((j, i) => (
            <FadeIn key={j.title} delay={i * 0.05} className="cp-journal-item">
              <div className="cp-journal-img-wrap">
                <img src={j.img} alt={j.title} className="cp-journal-img" loading="lazy" />
              </div>
              <div className="cp-journal-content">
                <h3 className="cp-journal-title">{j.title}</h3>
                <div className="cp-journal-meta">
                  <span>{j.date}</span>
                  <span className="cp-dot" />
                  <span>{j.read}</span>
                </div>
              </div>
              <span className="cp-journal-arrow">↗</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Explorations (Parallax Gallery) ──
function ExplorationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (colLeftRef.current) {
        gsap.to(colLeftRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (colRightRef.current) {
        gsap.to(colRightRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cp-explorations" ref={sectionRef}>
      <div className="cp-explorations-pin">
        <FadeIn className="cp-section-header cp-center">
          <div className="cp-eyebrow">
            <span className="cp-eyebrow-line" />
            <span>Explorations</span>
          </div>
          <h2 className="cp-section-title">
            视觉 <em>实验场</em>
          </h2>
          <p className="cp-section-sub">A visual playground of our creative practice.</p>
        </FadeIn>
      </div>

      <div className="cp-explorations-cols">
        <div className="cp-explorations-col" ref={colLeftRef}>
          {explorations.slice(0, 3).map((e, i) => (
            <div key={i} className="cp-explorations-card" style={{ rotate: `${(i - 1) * 3}deg` }}>
              <img src={e.img} alt={e.title} loading="lazy" />
              <span className="cp-explorations-label">{e.title}</span>
            </div>
          ))}
        </div>
        <div className="cp-explorations-col" ref={colRightRef}>
          {explorations.slice(3).map((e, i) => (
            <div key={i} className="cp-explorations-card" style={{ rotate: `${(i - 1) * -3}deg` }}>
              <img src={e.img} alt={e.title} loading="lazy" />
              <span className="cp-explorations-label">{e.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Stats Section ──
function StatsSection() {
  return (
    <section className="cp-section cp-stats">
      <div className="cp-container">
        <div className="cp-stats-grid">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="cp-stat">
              <div className="cp-stat-value">
                {s.value}
                <span className="cp-stat-suffix">{s.suffix}</span>
              </div>
              <div className="cp-stat-label">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact / Footer ──
function ContactSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const marqueeText = "BUILDING THE FUTURE • ";
  const marqueeItems = Array.from({ length: 10 }, () => marqueeText).join("");

  return (
    <section className="cp-contact" id="contact">
      <div className="cp-contact-bg" />

      <div className="cp-marquee">
        <div className="cp-marquee-inner" ref={marqueeRef}>
          <span>{marqueeItems}</span>
          <span>{marqueeItems}</span>
        </div>
      </div>

      <div className="cp-container cp-contact-content">
        <FadeIn>
          <h2 className="cp-contact-title">
            一起 <em>合作</em>
          </h2>
          <p className="cp-contact-sub">Available for project · 随时准备开启新的合作</p>
          <div className="cp-contact-cta">
            <Magnet padding={80} strength={3}>
              <a href="mailto:hello@drevortex.com" className="cp-btn cp-btn-solid cp-btn-lg">
                hello@drevortex.com ↗
              </a>
            </Magnet>
          </div>
          <div className="cp-footer-bar">
            <div className="cp-footer-socials">
              <span>Twitter</span>
              <span>LinkedIn</span>
              <span>Dribbble</span>
              <span>GitHub</span>
            </div>
            <div className="cp-footer-status">
              <span className="cp-pulse-dot" />
              <span>Available for project</span>
            </div>
          </div>
          <div className="cp-footer-copy">
            © 2026 Drevortex · 梦启新创
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── 主组件 ──
export function CasesPortfolio() {
  return (
    <div className="cp-root">
      <HeroSection />
      <WorksSection />
      <JournalSection />
      <ExplorationsSection />
      <StatsSection />
      <ContactSection />
    </div>
  );
}
