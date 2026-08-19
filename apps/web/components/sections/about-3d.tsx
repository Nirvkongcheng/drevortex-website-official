"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 1, unit: "项", label: "知识资本·十年发展经验积累" },
  { value: 10, unit: "年", label: "十年沉淀·深耕发展经验" },
  { value: 30, unit: "万", label: "服务客户企业上市工程超过30万" },
  { value: 300, unit: "家", label: "超过300家合作企业客户" },
];

const concepts = [
  {
    title: "中文名称：梦启新创",
    desc: "以梦想为起点，以创新为驱动，开启科技与商业的新征程",
    items: [
      "梦启：从每一个微小的梦想出发，为用户、行业与未来创造新的可能",
      "新创：持续创新、勇于突破，用技术与创意重构行业规则",
    ],
  },
  {
    title: "英文名称：Drevortex",
    desc: "Dream + Vortex，即\"梦想的漩涡\"，象征能量聚合与科技引力",
    items: [
      "Dre：取自\"Dream\"，传递品牌的人文温度与理想主义",
      "Vortex：意为\"漩涡\"，代表技术聚合与创新迭代动力",
    ],
  },
  {
    title: "品牌价值",
    items: [
      "以梦为启：始终以用户需求与行业愿景为导向",
      "以创为核：坚持技术突破与模式创新",
      "以涡为势：聚合资源、迭代升级，形成持续影响力",
    ],
  },
];

const advantages = [
  { icon: "fa-lightbulb", title: "技术创新能力", desc: "持续跟踪前沿技术，为客户提供创新解决方案" },
  { icon: "fa-users", title: "专业服务团队", desc: "经验丰富的技术团队，提供专业高效的服务" },
  { icon: "fa-project-diagram", title: "全流程解决方案", desc: "从咨询到实施，提供一站式服务" },
  { icon: "fa-heart", title: "客户导向理念", desc: "以客户需求为核心，提供定制化服务" },
  { icon: "fa-chart-line", title: "行业经验丰富", desc: "深耕多个行业领域，积累丰富实战经验" },
  { icon: "fa-shield-alt", title: "质量保障体系", desc: "完善的质量管理体系，确保项目成功交付" },
];

export function About3D() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // 非线性缓动函数
        const expo = "expo.out";
        const back = "back.out(1.7)";
        const elastic = "elastic.out(1, 0.5)";

        // ── Hero 区域 3D 入场动画 ──
        const heroTl = gsap.timeline({ defaults: { ease: expo } });
        heroTl
          .from(".hero-title-line", {
            yPercent: 120,
            rotateX: -80,
            opacity: 0,
            stagger: 0.12,
            duration: 1.4,
          })
          .from(
            ".hero-sub",
            { y: 30, opacity: 0, duration: 1, ease: back },
            "-=0.6",
          )
          .from(
            ".hero-feature",
            {
              y: 60,
              opacity: 0,
              rotateY: 45,
              stagger: 0.1,
              duration: 0.9,
              ease: back,
            },
            "-=0.4",
          );

        // ── Hero 背景视差与光晕 ──
        gsap.to(".hero-glow", {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // ── 3D 卡片倾斜跟随鼠标 ──
        const cards = gsap.utils.toArray<HTMLElement>(".tilt-card");
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect;
          card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, {
              rotateY: x * 18,
              rotateX: -y * 18,
              transformPerspective: 900,
              transformOrigin: "center",
              duration: 0.4,
              ease: "power2.out",
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.7,
              ease: elastic,
            });
          });
        });

        // ── 统计数字 3D 翻转入场 + 计数动画 ──
        stats.forEach((stat, i) => {
          const numEl = gsap.utils.toArray<HTMLElement>(".stat-number")[i];
          const counter = { v: 0 };
          gsap.to(counter, {
            v: stat.value,
            duration: 2,
            ease: expo,
            scrollTrigger: {
              trigger: numEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              numEl.textContent = String(Math.round(counter.v));
            },
          });
        });

        // ── 通用 3D 滚动入场动画 ──
        gsap.utils.toArray<HTMLElement>(".reveal-3d").forEach((el) => {
          gsap.from(el, {
            y: 80,
            opacity: 0,
            rotateX: -25,
            transformPerspective: 1000,
            duration: 1.1,
            ease: expo,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // ── 概念卡片错落入场 ──
        gsap.from(".concept-card-3d", {
          y: 100,
          opacity: 0,
          rotateY: 30,
          transformPerspective: 1200,
          stagger: 0.18,
          duration: 1.2,
          ease: expo,
          scrollTrigger: {
            trigger: ".concept-grid",
            start: "top 80%",
          },
        });

        // ── 优势卡片网格波浪入场 ──
        gsap.from(".advantage-card-3d", {
          y: 60,
          opacity: 0,
          scale: 0.85,
          rotateZ: -8,
          stagger: { each: 0.08, from: "center" },
          duration: 0.9,
          ease: back,
          scrollTrigger: {
            trigger: ".advantage-grid-3d",
            start: "top 85%",
          },
        });

        // ── 滚动驱动的 3D 场景旋转 ──
        gsap.to(".scene-rotate", {
          rotation: 0.5,
          transformPerspective: 1500,
          scrollTrigger: {
            trigger: ".brand-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }, container);
      return () => ctx.revert();
    },
    { scope: container },
  );

  return (
    <div ref={container} className="about-3d-root">
      {/* ── Hero 区域 ── */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-grid-bg" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-mask">
              <span className="hero-title-line">关于</span>
            </span>
            <span className="hero-title-mask">
              <span className="hero-title-line">我们</span>
            </span>
          </h1>
          <p className="hero-sub">
            梦启新创 · <span className="text-accent">Dre</span>
            <span className="text-blue">vortex</span>
          </p>
          <div className="hero-features-row">
            {["创新驱动发展", "诚信合作共赢", "追求卓越品质"].map((t, i) => (
              <div key={t} className="hero-feature tilt-card">
                <span className="feature-dot" />
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── 认识仁励 ── */}
      <section className="section-3d intro-section">
        <div className="container-3d">
          <h2 className="section-title-3d reveal-3d">认识仁励</h2>
          <p className="section-subtitle-3d reveal-3d">ABOUT RENLEE CONSULTING</p>
          <p className="intro-text-3d reveal-3d">
            梦启新创网络科技有限公司，是一家专注于数字化技术服务的创新型企业。我们致力于为客户提供全方位的互联网解决方案，涵盖软件开发、网页制作、小程序开发、品牌设计等多个领域。公司秉承&quot;以梦为启、以创为核、以涡为势&quot;的核心理念，通过技术创新和专业服务，助力企业实现数字化转型。
          </p>

          <div className="info-icons-3d">
            {[
              { icon: "fa-users", label: "百强服务" },
              { icon: "fa-user-tie", label: "人才建设" },
              { icon: "fa-award", label: "荣誉资质" },
            ].map((item) => (
              <div key={item.label} className="info-icon-3d tilt-card reveal-3d">
                <i className={`fas ${item.icon}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="stats-3d">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card-3d tilt-card reveal-3d">
                <div className="stat-number-wrap">
                  <span className="stat-number">0</span>
                  <span className="stat-unit">{stat.unit}</span>
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 品牌理念 ── */}
      <section className="section-3d brand-section scene-rotate">
        <div className="container-3d">
          <h2 className="section-title-3d reveal-3d">品牌理念</h2>
          <div className="concept-grid">
            {concepts.map((concept) => (
              <div key={concept.title} className="concept-card-3d tilt-card">
                <div className="card-glow" />
                <h3>{concept.title}</h3>
                {concept.desc && <p className="concept-desc">{concept.desc}</p>}
                <ul>
                  {concept.items.map((item) => (
                    <li key={item}>
                      <span className="bullet-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 公司定位 ── */}
      <section className="section-3d positioning-section">
        <div className="container-3d">
          <h2 className="section-title-3d reveal-3d">公司定位</h2>
          <div className="positioning-card-3d tilt-card reveal-3d">
            <div className="card-glow" />
            <p>
              梦启新创网络科技有限公司定位为数字化技术服务企业，致力于通过技术创新为企业提供数字化解决方案，助力客户在数字时代获得竞争优势。
            </p>
            <p>
              我们的团队由一群充满激情与创造力的专业人士组成，拥有丰富的行业经验和技术积累，能够为客户提供从战略咨询到技术实现的全流程服务。
            </p>
          </div>
        </div>
      </section>

      {/* ── 核心优势 ── */}
      <section className="section-3d advantages-section">
        <div className="container-3d">
          <h2 className="section-title-3d reveal-3d">核心优势</h2>
          <div className="advantage-grid-3d">
            {advantages.map((adv) => (
              <div key={adv.title} className="advantage-card-3d tilt-card">
                <div className="card-glow" />
                <i className={`fas ${adv.icon}`} />
                <h3>{adv.title}</h3>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
