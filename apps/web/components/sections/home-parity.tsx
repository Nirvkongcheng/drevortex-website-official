"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const flipPages = [
  {
    bg: "/legacy/home/flip-page-0.jpg",
    title: "软件开发",
    desc: "定制化技术解决方案，赋能企业数字化升级",
    bars: [
      "全栈技术能力，覆盖 Web / 移动端 / 后端",
      "敏捷开发流程，高效迭代与持续交付",
      "企业级安全架构，数据防护与合规保障",
    ],
    sideTitle: "全栈覆盖",
    sideDesc:
      "从前端到后端，从 Web 到移动端，提供一站式技术解决方案，助力企业快速实现数字化转型。",
    sideList: ["Web 前端开发", "后端系统架构", "移动端 App 开发"],
  },
  {
    bg: "/legacy/home/flip-page-1-raw.jpg",
    title: "网页制作",
    desc: "响应式设计，为品牌打造卓越的线上形象",
    bars: ["全端适配，从桌面到移动的完美体验", "SEO 深度优化，让品牌被更多人发现", "极致性能，毫秒级加载与流畅交互"],
    sideTitle: "品牌官网",
    sideDesc: "为企业量身打造高端品牌官网，融合设计与技术，让您的品牌在数字世界中脱颖而出。",
    sideList: ["企业品牌官网", "响应式设计", "高性能优化"],
  },
  {
    bg: "/legacy/home/hero-bg.jpg",
    title: "小程序开发",
    desc: "深耕微信生态，释放 10 亿用户的商业价值",
    bars: ["微信生态深度集成，流量高效转化", "商用工具类小程序，提升业务运营效率", "一键审核上线，快速触达目标用户群"],
    sideTitle: "微信生态",
    sideDesc: "深度整合微信支付、客服消息、订阅通知等开放能力，打造完整的商业闭环。",
    sideList: ["微信支付集成", "客服消息系统", "订阅通知推送"],
  },
];

const serviceBlocks = [
  {
    title: "软件开发",
    desc: "定制化技术解决方案，赋能企业数字化升级。全栈技术能力覆盖 Web、移动端、后端，为企业提供一站式数字化解决方案，助力企业快速实现数字化转型。",
    features: ["Web 前端开发", "后端系统架构", "移动端 App 开发", "企业级安全架构", "API 接口设计", "持续集成交付"],
    tags: ["React", "Vue", "Node.js", "云原生"],
  },
  {
    title: "网页制作",
    desc: "响应式设计，为品牌打造卓越的线上形象。全端适配，从桌面到移动的完美体验，SEO 深度优化，让品牌被更多人发现。",
    features: ["企业品牌官网", "响应式设计", "高性能优化", "SEO 深度优化", "动效交互设计", "CMS 内容管理"],
    tags: ["HTML5", "CSS3", "动效设计", "SEO"],
  },
  {
    title: "微信小程序开发",
    desc: "深耕微信生态，释放 10 亿用户的商业价值。深度整合微信支付、客服消息、订阅通知等开放能力，打造完整商业闭环。",
    features: ["微信支付集成", "客服消息系统", "订阅通知推送", "一键审核上线", "数据统计分析", "多端同步开发"],
    tags: ["微信生态", "Taro", "云开发", "支付集成"],
  },
  {
    title: "Logo商标＆设计",
    desc: "专业的 Logo 商标和商用图片设计服务，为您的品牌打造独特的视觉形象与完整的品牌识别系统，让品牌深入人心。",
    features: ["企业 Logo 设计", "品牌视觉识别系统", "商用图片设计", "宣传物料制作", "包装设计", "UI 界面设计"],
    tags: ["品牌设计", "VI 系统", "Figma", "商用授权"],
  },
  {
    title: "互联网咨询",
    desc: "行业技术方案与数字化规划咨询，帮助企业制定清晰的数字化转型路径，提升核心竞争力，实现业务增长。",
    features: ["数字化战略规划", "技术选型咨询", "行业解决方案", "项目管理支持", "竞品分析报告", "增长策略制定"],
    tags: ["战略咨询", "数字化转型", "增长黑客", "行业洞察"],
  },
];

export function HomeParity() {
  const skipIntroDecisionRef = useRef<{
    skipIntroFlag: boolean;
    shouldSkipIntroAnimation: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    const HOME_SKIP_INTRO_KEY = "home-skip-intro-once";
    const cleanupFns: Array<() => void> = [];
    const timers: number[] = [];

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));
    const remap = (
      value: number,
      inMin: number,
      inMax: number,
      outMin: number,
      outMax: number,
    ) => outMin + clamp((value - inMin) / (inMax - inMin), 0, 1) * (outMax - outMin);
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;

    const navbar = document.getElementById("navbar") as HTMLElement | null;
    const introStage = document.getElementById("introStage") as HTMLElement | null;
    const introContent = document.getElementById("introContent") as HTMLElement | null;
    const introTitle = document.getElementById("introTitle") as HTMLElement | null;
    const introBrand = document.getElementById("introBrand") as HTMLElement | null;
    const lightBeam = document.getElementById("lightBeam") as HTMLElement | null;
    const lightBeamGlow = document.getElementById("lightBeamGlow") as HTMLElement | null;
    const karmanLine = document.getElementById("karmanLine") as HTMLElement | null;
    const heroStageWrapper = document.getElementById("heroStageWrapper") as HTMLElement | null;
    const heroStage = document.getElementById("heroStage") as HTMLElement | null;
    const heroBlock = document.getElementById("heroBlock") as HTMLElement | null;
    const heroBlockContent = document.getElementById("heroBlockContent") as HTMLElement | null;
    const heroMainTitle = document.getElementById("heroMainTitle") as HTMLElement | null;
    const heroBgLayer = heroBlock?.querySelector(".hero-block-bg") as HTMLElement | null;
    const heroCards = document.getElementById("heroCards") as HTMLElement | null;
    const sideContent = document.getElementById("sideContent") as HTMLElement | null;
    const sideHeading = sideContent?.querySelector(".side-heading") as HTMLElement | null;
    const sideReasons = sideContent
      ? Array.from(sideContent.querySelectorAll<HTMLElement>(".side-reason"))
      : [];
    const squeezeSection = document.getElementById("squeezeSection") as HTMLElement | null;
    const bridgeSection = document.getElementById("bridgeSection") as HTMLElement | null;
    const ctaReveal = document.getElementById("ctaReveal") as HTMLElement | null;
    const ctaLayer1 = ctaReveal?.querySelector(".cta-layer-1") as HTMLElement | null;
    const ctaBtn = ctaReveal?.querySelector(".cta-reveal-btn") as HTMLElement | null;
    const flipStage = document.getElementById("flipStage") as HTMLElement | null;
    const flipViewport = document.getElementById("flipViewport") as HTMLElement | null;
    const flipPageEls = flipViewport
      ? Array.from(flipViewport.querySelectorAll<HTMLElement>(".flip-page"))
      : [];
    const flipDots = document.getElementById("flipDots") as HTMLElement | null;
    const dotEls = flipDots
      ? Array.from(flipDots.querySelectorAll<HTMLElement>(".flip-dot"))
      : [];
    const swStage = document.getElementById("swStage") as HTMLElement | null;
    const swWheel = document.getElementById("swWheel") as HTMLElement | null;
    const swList = document.getElementById("swList") as HTMLElement | null;
    const swDetail = document.getElementById("swDetail") as HTMLElement | null;
    const swImageCol = document.getElementById("swImageCol") as HTMLElement | null;
    const swScrollHint = document.getElementById("swScrollHint") as HTMLElement | null;
    const swStepCurrent = document.getElementById("swStepCurrent") as HTMLElement | null;
    const swStepRingProgress = document.getElementById(
      "swStepRingProgress",
    ) as SVGCircleElement | null;
    const swItems = swList
      ? Array.from(swList.querySelectorAll<HTMLElement>(".sw-item"))
      : [];
    const swContents = swDetail
      ? Array.from(swDetail.querySelectorAll<HTMLElement>(".sw-content"))
      : [];
    const swImages = swImageCol
      ? Array.from(swImageCol.querySelectorAll<HTMLElement>(".sw-img"))
      : [];
    const swSegs = swWheel
      ? Array.from(swWheel.querySelectorAll<HTMLElement>(".sw-seg"))
      : [];
    const animateItems = Array.from(
      document.querySelectorAll<HTMLElement>(".animate-on-scroll"),
    );

    const heroP = heroBlockContent?.querySelector("p") as HTMLElement | null;
    const heroCta = heroBlockContent?.querySelector(".hero-cta") as HTMLElement | null;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (skipIntroDecisionRef.current === null) {
      const skipIntroFlag = window.sessionStorage.getItem(HOME_SKIP_INTRO_KEY) === "true";
      if (skipIntroFlag) {
        window.sessionStorage.removeItem(HOME_SKIP_INTRO_KEY);
      }
      skipIntroDecisionRef.current = {
        skipIntroFlag,
        shouldSkipIntroAnimation: prefersReducedMotion || skipIntroFlag,
      };
    }
    const { shouldSkipIntroAnimation } = skipIntroDecisionRef.current;

    if (navbar && !shouldSkipIntroAnimation) {
      navbar.style.opacity = "0";
    }

    let navbarScrollActive = false;
    let navbarCooldownUntil = 0;
    const setNavbar = (scrolled: boolean) => {
      navbar?.classList.toggle("scrolled", scrolled);
    };
    const onNavbarScroll = () => {
      if (!navbarScrollActive) {
        return;
      }
      if (performance.now() < navbarCooldownUntil) {
        return;
      }
      setNavbar(window.scrollY > 40);
    };
    const enableNavbarScroll = () => {
      navbarScrollActive = true;
      navbarCooldownUntil = performance.now() + 200;
    };
    window.addEventListener("scroll", onNavbarScroll, { passive: true });
    cleanupFns.push(() => window.removeEventListener("scroll", onNavbarScroll));
    setNavbar(window.scrollY > 40);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    animateItems.forEach((item) => observer.observe(item));

    let squeezeObserver: IntersectionObserver | null = null;
    if (squeezeSection) {
      squeezeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              squeezeSection.classList.add("revealed");
              squeezeObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 },
      );
    }
    if (squeezeObserver && squeezeSection) {
      squeezeObserver.observe(squeezeSection);
      cleanupFns.push(() => squeezeObserver.disconnect());
    }

    if (!heroStage || !heroBlock || !heroBlockContent || !heroCards) {
      introStage?.remove();
      if (heroBlockContent) {
        heroBlockContent.style.opacity = "1";
        heroBlockContent.style.transform = "";
      }
      if (heroCards) {
        heroCards.style.opacity = "1";
        heroCards.style.transform = "translateX(-50%)";
      }
      if (squeezeSection) {
        squeezeSection.classList.add("revealed");
      }
      if (navbar) {
        navbar.style.opacity = "1";
      }
      observer.disconnect();
      return () => {
        cleanupFns.forEach((cleanup) => cleanup());
      };
    }

    if (!shouldSkipIntroAnimation) {
      document.documentElement.style.overflow = "hidden";
      cleanupFns.push(() => {
        document.documentElement.style.overflow = "";
      });

      heroBlockContent.style.opacity = "0";
      heroCards.style.opacity = "0";
      heroCards.style.transform = "translateX(-50%) translateY(30px)";
      [heroP, heroCta].forEach((element) => {
        if (!element) {
          return;
        }
        element.style.opacity = "0";
        element.style.transform = "translateY(28px)";
      });
    }

    const spawnKarmanParticles = () => {
      const container = document.getElementById("karmanParticles");
      if (!container) {
        return;
      }
      const count = 24;
      for (let index = 0; index < count; index += 1) {
        const particleTimer = window.setTimeout(() => {
          const particle = document.createElement("div");
          particle.className = "karman-particle";
          particle.style.right = `${Math.random() * 80 + 10}%`;
          particle.style.top = `${Math.random() * 60 + 20}%`;
          particle.style.setProperty("--dx", `${(Math.random() - 0.5) * 30}px`);
          particle.style.setProperty("--dy", `${(Math.random() - 1) * 20}px`);
          const size = Math.random() * 2 + 1;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.animationDuration = `${Math.random() * 2 + 2}s`;
          container.appendChild(particle);
          requestAnimationFrame(() => {
            particle.classList.add("active");
          });
          window.setTimeout(() => {
            particle.remove();
          }, 4500);
        }, index * 120 + Math.random() * 200);
        timers.push(particleTimer);
      }
    };

    const initEarthParticles = () => {
      const canvas = document.getElementById("earthParticlesCanvas") as HTMLCanvasElement | null;
      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext("2d");
      const container = canvas.parentElement;
      if (!ctx || !container) {
        return;
      }

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        baseRadius: number;
        opacity: number;
        baseOpacity: number;
        pulsePhase: number;
        pulseSpeed: number;
        orbitAngle: number;
        orbitRadius: number;
        orbitSpeed: number;
      }> = [];
      const mouse = { x: 0, y: 0, active: false };
      const particleCount = 100;
      const connectionDistance = 100;
      const mouseRadius = 150;

      const resize = () => {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      resize();
      window.addEventListener("resize", resize);
      cleanupFns.push(() => window.removeEventListener("resize", resize));

      const onMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        mouse.active = true;
      };
      const onMouseLeave = () => {
        mouse.active = false;
      };
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
      cleanupFns.push(() => {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      });

      const createParticle = () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 0.5 + 0.5;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.8,
          vx: Math.cos(angle) * 0.4 * distance,
          vy: Math.sin(angle) * 0.3 * distance - 0.15,
          radius: Math.random() * 2 + 0.8,
          baseRadius: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.7 + 0.3,
          baseOpacity: Math.random() * 0.7 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitRadius: Math.random() * 20 + 10,
          orbitSpeed: (Math.random() - 0.5) * 0.02,
        };
      };

      for (let index = 0; index < particleCount; index += 1) {
        particles.push(createParticle());
      }

      let frame = 0;
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let index = 0; index < particles.length; index += 1) {
          const particle = particles[index];
          particle.pulsePhase += particle.pulseSpeed;
          const pulse = Math.sin(particle.pulsePhase) * 0.4 + 0.6;
          particle.radius = particle.baseRadius * (0.7 + pulse * 0.6);
          particle.opacity = particle.baseOpacity * pulse;

          particle.orbitAngle += particle.orbitSpeed;
          const orbitX = Math.cos(particle.orbitAngle) * particle.orbitRadius * 0.3;
          const orbitY = Math.sin(particle.orbitAngle) * particle.orbitRadius * 0.2;

          if (mouse.active) {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouseRadius && distance > 1) {
              const force = (1 - distance / mouseRadius) * 2.5;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          particle.x += particle.vx + orbitX * 0.1;
          particle.y += particle.vy + orbitY * 0.1;
          particle.vx *= 0.98;
          particle.vy *= 0.98;

          if (particle.x < -20) particle.x = canvas.width + 20;
          if (particle.x > canvas.width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = canvas.height + 20;
          if (particle.y > canvas.height + 20) particle.y = -20;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${particle.opacity * 0.1})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 240, 255, ${particle.opacity})`;
          ctx.fill();

          if (particle.baseRadius > 1.5) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
            ctx.fill();
          }
        }

        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
              const alpha = (1 - distance / connectionDistance) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }

        if (mouse.active) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(147, 197, 253, 0.03)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        frame = window.requestAnimationFrame(draw);
      };

      frame = window.requestAnimationFrame(draw);
      cleanupFns.push(() => window.cancelAnimationFrame(frame));
    };
    initEarthParticles();

    const mouseGlow = document.getElementById("mouseGlow") as HTMLElement | null;
    const mouseGlowTrail = document.getElementById("mouseGlowTrail") as HTMLElement | null;
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let trailX = 0;
    let trailY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    cleanupFns.push(() => document.removeEventListener("mousemove", onMouseMove));
    let glowFrame = 0;
    const animateGlow = () => {
      if (mouseGlow) {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        mouseGlow.style.left = `${glowX}px`;
        mouseGlow.style.top = `${glowY}px`;
      }
      if (mouseGlowTrail) {
        trailX += (mouseX - trailX) * 0.06;
        trailY += (mouseY - trailY) * 0.06;
        mouseGlowTrail.style.left = `${trailX}px`;
        mouseGlowTrail.style.top = `${trailY}px`;
      }
      glowFrame = window.requestAnimationFrame(animateGlow);
    };
    glowFrame = window.requestAnimationFrame(animateGlow);
    cleanupFns.push(() => window.cancelAnimationFrame(glowFrame));

    const isDark = () => document.body.classList.contains("dark-mode");
    const cachedCubeScene = document.getElementById("cubeScene") as HTMLElement | null;
    const cachedCube = document.getElementById("cube") as HTMLElement | null;
    const cachedEarthBackdrop = document.getElementById("earthBackdrop") as HTMLElement | null;
    const cachedSideDecor = document.getElementById("sideDecor") as HTMLElement | null;
    const cachedGearMechanism = document.getElementById("gearMechanism") as HTMLElement | null;
    const cachedGearLarge = document.querySelector(".gear-large") as HTMLElement | null;
    const cachedGearSmall = document.querySelector(".gear-small") as HTMLElement | null;
    const cachedGearTiny = document.querySelector(".gear-tiny") as HTMLElement | null;
    const morphRange = vh();
    let morphVal = 0;
    let morphTarget = 0;
    let morphAnim: number | null = null;
    let morphStarted = false;
    let morphDone = false;
    const smooth = 0.08;

    const updateMorph = (sp: number) => {
      const ease = sp < 0.5 ? 2 * sp * sp : 1 - ((-2 * sp + 2) ** 2) / 2;
      const targetR = isDark() ? 6 : 248;
      const targetG = isDark() ? 6 : 248;
      const targetB = isDark() ? 8 : 246;
      heroStage.style.background = `rgb(${Math.round(lerp(6, targetR, ease))},${Math.round(
        lerp(6, targetG, ease),
      )},${Math.round(lerp(8, targetB, ease))})`;

      const screenW = vw();
      const screenH = vh();
      let finalW = 0;
      let finalH = 0;
      let finalLeft = 0;
      let finalTop = 0;

      if (screenW <= 640) {
        finalW = screenW * 0.88;
        finalH = screenH * 0.32;
        finalLeft = screenW * 0.06;
        finalTop = screenH * 0.04;
      } else if (screenW <= 920) {
        finalW = screenW * 0.52;
        finalH = screenH * 0.36;
        finalLeft = screenW * 0.24;
        finalTop = screenH * 0.04;
      } else if (screenW <= 1180) {
        finalW = clamp(screenW * 0.36, 320, 520);
        finalH = clamp(screenH * 0.78, 400, 760);
        finalLeft = screenW * 0.1;
        finalTop = screenH * 0.08;
      } else {
        finalW = clamp(screenW * 0.38, 360, 640);
        finalH = clamp(screenH * 0.82, 460, 860);
        finalLeft = screenW * 0.12;
        finalTop = screenH * 0.09;
      }

      heroBlock.style.width = `${lerp(screenW, finalW, ease)}px`;
      heroBlock.style.height = `${lerp(screenH, finalH, ease)}px`;
      heroBlock.style.left = `${lerp(0, finalLeft, ease)}px`;
      heroBlock.style.top = `${lerp(0, finalTop, ease)}px`;
      heroBlock.style.borderRadius = `${lerp(0, 20, ease)}px`;
      heroBlock.classList.toggle("boxed", sp > 0.35);

      const contentScale = lerp(screenW, finalW, ease) / screenW;
      heroBlockContent.style.transform = `scale(${contentScale})`;
      heroBlockContent.style.transformOrigin = "center center";
      heroBlockContent.style.width = `${100 / contentScale}%`;

      heroBgLayer?.style.setProperty("--grad-opacity", String(1 - ease));
      if (heroP) heroP.style.opacity = String(1 - remap(sp, 0.15, 0.45, 0, 1));
      if (heroCta) heroCta.style.opacity = String(1 - remap(sp, 0.1, 0.4, 0, 1));
      // 标题在 morph 后期随其他内容一起淡出，避免缩小后文字飘出屏幕外
      if (heroMainTitle) heroMainTitle.style.opacity = String(1 - remap(sp, 0.5, 0.85, 0, 1));

      heroCards.style.opacity = String(1 - remap(sp, 0, 0.25, 0, 1));
      heroCards.style.transform = `translateX(-50%) translateY(${remap(sp, 0, 0.3, 0, 50)}px)`;

      if (sideHeading) {
        const visibility = remap(sp, 0.45, 0.75, 0, 1);
        sideHeading.style.opacity = String(visibility);
        sideHeading.style.transform = `translateY(${lerp(25, 0, visibility)}px)`;
      }

      if (sideContent) {
        sideContent.style.opacity = String(remap(sp, 0.4, 0.8, 0, 1));
        sideContent.style.pointerEvents = sp > 0.6 ? "auto" : "none";
      }

      sideReasons.forEach((reason, index) => {
        const start = 0.52 + index * 0.1;
        const visibility = remap(sp, start, start + 0.28, 0, 1);
        reason.style.opacity = String(visibility);
        reason.style.transform = `translateY(${lerp(20, 0, visibility)}px)`;
      });

      heroStage.classList.toggle("grid-visible", sp > 0.3);

      if (cachedEarthBackdrop && cachedEarthBackdrop.dataset.earthReady === "true") {
        cachedEarthBackdrop.style.transform = `translateY(${sp * 15}px)`;
      }

      if (cachedCubeScene && cachedCube && vw() > 768) {
        if (sp > 0.1) {
          cachedCubeScene.classList.add("visible");
          const rotX = -15 + sp * 30;
          const rotY = 25 + sp * 180;
          cachedCube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        } else {
          cachedCubeScene.classList.remove("visible");
        }
      } else if (cachedCubeScene) {
        cachedCubeScene.classList.remove("visible");
        cachedCubeScene.style.display = "none";
      }

      if (cachedSideDecor) {
        cachedSideDecor.style.opacity = sp > 0.5 ? String(Math.min((sp - 0.5) * 4, 1)) : "0";
      }

      if (cachedGearMechanism) {
        if (sp > 0.2) {
          cachedGearMechanism.style.opacity = String(Math.min((sp - 0.2) * 2, 0.6));
          const rotation = sp * 360;
          if (cachedGearLarge) cachedGearLarge.style.transform = `rotate(${rotation}deg)`;
          if (cachedGearSmall) cachedGearSmall.style.transform = `rotate(${-rotation * 1.5}deg)`;
          if (cachedGearTiny) cachedGearTiny.style.transform = `rotate(${rotation * 2}deg)`;
        } else {
          cachedGearMechanism.style.opacity = "0";
        }
      }
    };

    const tickSmooth = () => {
      morphVal += (morphTarget - morphVal) * smooth;
      if (Math.abs(morphVal - morphTarget) < 0.0005) {
        morphVal = morphTarget;
      }
      updateMorph(morphVal);

      if (Math.abs(morphVal - morphTarget) > 0.0005) {
        morphAnim = window.requestAnimationFrame(tickSmooth);
      } else {
        morphAnim = null;
        if (morphVal >= 0.999 && !morphDone) {
          morphDone = true;
          if (ctaReveal?.classList.contains("cta-hidden")) {
            ctaSetState("cta-entering");
          }
        } else if (morphVal <= 0.001 && morphDone) {
          morphDone = false;
          morphTarget = 0;
          morphVal = 0;
          setNavbar(false);
          if (ctaReveal) {
            ctaSetState("cta-hidden");
          }
        }
      }
    };

    const setMorphTarget = (target: number) => {
      morphTarget = clamp(target, 0, 1);
      if (morphAnim === null) {
        morphAnim = window.requestAnimationFrame(tickSmooth);
      }
    };

    const startMorphPhase = () => {
      document.documentElement.style.overflow = "";
      morphStarted = true;
      enableNavbarScroll();
      updateMorph(0);
    };

    const onMorphScroll = () => {
      if (!morphStarted || !heroStageWrapper) {
        return;
      }
      const wrapperTop = heroStageWrapper.getBoundingClientRect().top + window.scrollY;
      const raw = clamp((window.scrollY - wrapperTop) / morphRange, 0, 1);
      if (morphDone && raw >= 0.999) {
        return;
      }
      setMorphTarget(raw);
    };
    window.addEventListener("scroll", onMorphScroll, { passive: true });
    cleanupFns.push(() => window.removeEventListener("scroll", onMorphScroll));

    // ── morph 完成后，继续滚动时淡出 side-content，避免文字飘到屏幕外 ──
    const onSideContentScroll = () => {
      if (!morphDone || !heroStageWrapper || !sideContent) {
        return;
      }
      const wrapperTop = heroStageWrapper.getBoundingClientRect().top + window.scrollY;
      const stageTop = window.scrollY - wrapperTop;
      // morph 完成后 0-0.5vh 内保持显示，0.5vh-1.5vh 逐渐淡出
      const fadeStart = morphRange + vh() * 0.5;
      const fadeEnd = morphRange + vh() * 1.5;
      if (stageTop < fadeStart) {
        sideContent.style.opacity = "1";
      } else if (stageTop < fadeEnd) {
        const fadeProgress = (stageTop - fadeStart) / (fadeEnd - fadeStart);
        sideContent.style.opacity = String(1 - fadeProgress);
      } else {
        sideContent.style.opacity = "0";
        sideContent.style.pointerEvents = "none";
      }
    };
    window.addEventListener("scroll", onSideContentScroll, { passive: true });
    cleanupFns.push(() => window.removeEventListener("scroll", onSideContentScroll));

    const ctaClasses = [
      "cta-hidden",
      "cta-entering",
      "cta-visible",
      "cta-collapsed",
      "cta-leaving",
    ];
    const ctaSetState = (state: string) => {
      if (!ctaReveal) {
        return;
      }
      ctaReveal.classList.remove(...ctaClasses);
      ctaReveal.classList.add(state);
    };
    if (ctaReveal) {
      ctaSetState("cta-hidden");
      const onCtaAnimationEnd = (event: AnimationEvent) => {
        if (ctaReveal.classList.contains("cta-entering") && event.target === ctaBtn) {
          ctaSetState("cta-visible");
        } else if (
          ctaReveal.classList.contains("cta-leaving") &&
          event.target === ctaLayer1
        ) {
          ctaSetState("cta-hidden");
        }
      };
      ctaReveal.addEventListener("animationend", onCtaAnimationEnd);
      cleanupFns.push(() => ctaReveal.removeEventListener("animationend", onCtaAnimationEnd));

      const onCtaScroll = () => {
        if (!morphDone || !heroStageWrapper) {
          return;
        }
        const wrapperTop = heroStageWrapper.getBoundingClientRect().top + window.scrollY;
        const stageTop = window.scrollY - wrapperTop;
        const pastShow = stageTop >= morphRange;
        const pastCollapse = stageTop >= morphRange + vh() * 0.7;

        if (pastShow && ctaReveal.classList.contains("cta-hidden")) {
          ctaSetState("cta-entering");
        } else if (pastCollapse && ctaReveal.classList.contains("cta-visible")) {
          ctaSetState("cta-collapsed");
        } else if (!pastCollapse && ctaReveal.classList.contains("cta-collapsed")) {
          ctaSetState(pastShow ? "cta-visible" : "cta-hidden");
        } else if (!pastShow && ctaReveal.classList.contains("cta-visible")) {
          ctaSetState("cta-leaving");
        } else if (!pastShow && ctaReveal.classList.contains("cta-collapsed")) {
          ctaSetState("cta-hidden");
        }
      };
      window.addEventListener("scroll", onCtaScroll, { passive: true });
      cleanupFns.push(() => window.removeEventListener("scroll", onCtaScroll));
    }

    if (flipStage && flipPageEls.length > 0) {
      let stageHeight = flipStage.offsetHeight;
      let currentFlipIndex = -1;
      let flipFrame: number | null = null;
      let flipSeen = false;
      // ── 平滑插值状态：让翻页有阻尼感 ──
      let smoothRaw = 0;
      let targetRaw = 0;
      let smoothFrame: number | null = null;

      const setMobileFlipState = () => {
        flipPageEls.forEach((page, index) => {
          page.style.clipPath = "none";
          page.style.setProperty("-webkit-clip-path", "none");
          page.style.transform = "none";
          page.style.zIndex = "";
          page.classList.add("active");
          page
            .querySelectorAll<HTMLElement>(".flip-bar")
            .forEach((bar) => {
              bar.style.opacity = "1";
              bar.style.transform = "none";
            });
          const side = page.querySelector<HTMLElement>(".flip-side");
          if (side) {
            side.style.opacity = "1";
            side.style.transform = "none";
          }
          dotEls[index]?.classList.toggle("active", index === 0);
        });
      };

      const updateFlip = (scrollIn: number) => {
        const maxScroll = Math.max(0, stageHeight - window.innerHeight);
        const buffer = maxScroll * 0.15;
        const flipRange = Math.max(maxScroll - buffer * 2, 1);
        // 目标值：滚动驱动的原始进度
        targetRaw =
          clamp((scrollIn - buffer) / flipRange, 0, 1) *
          (flipPageEls.length - 1);
      };

      // ── 平滑插值动画循环：lerp 实现阻尼感 ──
      const smoothLoop = () => {
        // lerp 系数 0.06 = 慢速阻尼，值越小越丝滑越慢
        const lerpFactor = 0.06;
        smoothRaw += (targetRaw - smoothRaw) * lerpFactor;

        // 当差距足够小时直接对齐，避免无限计算
        if (Math.abs(targetRaw - smoothRaw) < 0.0005) {
          smoothRaw = targetRaw;
        }

        const raw = smoothRaw;
        const index = clamp(
          Math.floor(raw),
          0,
          Math.max(flipPageEls.length - 1, 0),
        );

        flipPageEls.forEach((page, pageIndex) => {
          const reveal = clamp(raw - pageIndex, 0, 1);
          const clipPercent = reveal * 100;
          // 位移幅度从 -12 加大到 -24（翻倍）
          const pushX = reveal * -24;
          // 旋转角度增加张力（3D 翻转感）
          const rotateY = reveal * -8;
          // 缩放让退场页面有深度感
          const scale = 1 - reveal * 0.08;

          page.style.clipPath = `inset(0 ${clipPercent}% 0 0)`;
          page.style.setProperty(
            "-webkit-clip-path",
            `inset(0 ${clipPercent}% 0 0)`,
          );
          page.style.transform = `translateX(${pushX}%) rotateY(${rotateY}deg) scale(${scale})`;
          // 添加平滑过渡（阻尼感）
          page.style.transition = "transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)";
          page.style.transformOrigin = "left center";
          page.style.zIndex = String(flipPageEls.length - pageIndex);
          page.classList.toggle("active", reveal < 0.5 && flipSeen);

          page
            .querySelectorAll<HTMLElement>(".flip-bar")
            .forEach((bar) => {
              if (reveal < 0.5 && flipSeen) {
                bar.style.opacity = "";
                bar.style.transform = "";
              } else {
                bar.style.opacity = "0";
                bar.style.transform = "translateY(24px)";
              }
            });
        });

        const dotProgress = raw / Math.max(flipPageEls.length - 1, 1);
        dotEls.forEach((dot, dotIndex) => {
          const dotPosition = dotIndex / Math.max(flipPageEls.length - 1, 1);
          const distance =
            1 -
            Math.abs(dotProgress - dotPosition) * (flipPageEls.length - 1);
          dot.style.opacity = String(clamp(distance, 0.25, 1));
          dot.style.transform = `scale(${clamp(distance, 0.7, 1.4)})`;
          dot.classList.toggle("active", dotIndex === index);
        });

        if (index !== currentFlipIndex) {
          flipPageEls.forEach((page, pageIndex) => {
            if (Math.abs(pageIndex - raw) > 1.5) {
              page
                .querySelectorAll<HTMLElement>(".flip-bar")
                .forEach((bar) => {
                  bar.style.opacity = "0";
                  bar.style.transform = "translateY(24px)";
                });
            }
          });
          currentFlipIndex = index;
        }

        // 持续运行直到完全对齐
        if (smoothRaw !== targetRaw) {
          smoothFrame = window.requestAnimationFrame(smoothLoop);
        } else {
          smoothFrame = null;
        }
      };

      const startSmoothLoop = () => {
        if (smoothFrame === null) {
          smoothFrame = window.requestAnimationFrame(smoothLoop);
        }
      };

      const onFlipScroll = () => {
        if (window.innerWidth <= 768) {
          setMobileFlipState();
          return;
        }

        stageHeight = flipStage.offsetHeight;
        const scrollIn = -flipStage.getBoundingClientRect().top;
        if (!flipSeen && scrollIn > -window.innerHeight * 0.8) {
          flipSeen = true;
        }

        if (flipFrame === null) {
          flipFrame = window.requestAnimationFrame(() => {
            updateFlip(scrollIn);
            flipFrame = null;
            startSmoothLoop();
          });
        }
      };

      const onFlipResize = () => {
        stageHeight = flipStage.offsetHeight;
        onFlipScroll();
      };

      window.addEventListener("scroll", onFlipScroll, { passive: true });
      window.addEventListener("resize", onFlipResize);
      onFlipScroll();

      cleanupFns.push(() => {
        if (flipFrame !== null) {
          window.cancelAnimationFrame(flipFrame);
        }
        if (smoothFrame !== null) {
          window.cancelAnimationFrame(smoothFrame);
        }
        window.removeEventListener("scroll", onFlipScroll);
        window.removeEventListener("resize", onFlipResize);
      });
    }

    if (swStage && swItems.length > 0) {
      const total = swItems.length;
      let currentServiceIndex = -1;

      const setServiceIndex = (index: number) => {
        if (index === currentServiceIndex) {
          return;
        }

        currentServiceIndex = index;
        swItems.forEach((item, itemIndex) => {
          item.classList.toggle("active", itemIndex === index);
        });
        swContents.forEach((content, contentIndex) => {
          content.classList.toggle("active", contentIndex === index);
        });
        swImages.forEach((image, imageIndex) => {
          image.classList.toggle("active", imageIndex === index);
        });
        swSegs.forEach((segment, segmentIndex) => {
          segment.classList.toggle("active", segmentIndex === index);
        });

        swScrollHint?.classList.toggle("hidden", index > 0);

        if (swStepCurrent) {
          swStepCurrent.textContent = `${index + 1}`.padStart(2, "0");
        }

        if (swStepRingProgress) {
          const circumference = 125.6;
          const stepProgress = index / Math.max(total - 1, 1);
          const offset = circumference * (1 - stepProgress);
          swStepRingProgress.style.strokeDashoffset = String(offset);
        }

        const segmentAngle = -72 + (index / Math.max(total - 1, 1)) * 144;
        const rotation = 90 - segmentAngle;
        if (swWheel) {
          swWheel.style.transform = `rotate(${rotation}deg)`;
        }

        swSegs.forEach((segment) => {
          const baseTransform = `rotate(${-rotation}deg)`;
          segment.style.transform = segment.classList.contains("active")
            ? `scale(1.25) ${baseTransform}`
            : baseTransform;
        });
      };

      const positionSegments = () => {
        const radius = window.innerHeight * 0.28;
        swSegs.forEach((segment, index) => {
          const angle = -72 + (index / Math.max(total - 1, 1)) * 144;
          const radians = (angle * Math.PI) / 180;
          segment.style.setProperty("--cx", `${Math.sin(radians) * radius}px`);
          segment.style.setProperty(
            "--cy",
            `${-Math.cos(radians) * radius}px`,
          );
        });
      };

      const onServiceScroll = () => {
        if (window.innerWidth <= 768) {
          return;
        }

        const stageTop = swStage.getBoundingClientRect().top + window.scrollY;
        const scrollIn = window.scrollY - stageTop;
        const viewportHeight = window.innerHeight;
        const itemScroll = scrollIn - viewportHeight * 0.3;
        const raw = itemScroll / viewportHeight;
        const index = clamp(Math.floor(raw), 0, total - 1);
        setServiceIndex(index);

        if (swStepRingProgress) {
          const circumference = 125.6;
          const stepRaw = raw - index;
          const stepProgress =
            (index + clamp(stepRaw, 0, 1)) / Math.max(total - 1, 1);
          const offset = circumference * (1 - stepProgress);
          swStepRingProgress.style.strokeDashoffset = String(offset);
        }
      };

      const itemClickCleanups = swItems.map((item, index) => {
        const onClick = () => setServiceIndex(index);
        item.addEventListener("click", onClick);
        return () => item.removeEventListener("click", onClick);
      });

      const onServiceResize = () => {
        if (window.innerWidth > 768) {
          positionSegments();
          onServiceScroll();
        }
      };

      if (window.innerWidth > 768) {
        positionSegments();
        onServiceScroll();
      } else {
        setServiceIndex(0);
      }

      window.addEventListener("scroll", onServiceScroll, { passive: true });
      window.addEventListener("resize", onServiceResize);

      cleanupFns.push(() => {
        itemClickCleanups.forEach((cleanup) => cleanup());
        window.removeEventListener("scroll", onServiceScroll);
        window.removeEventListener("resize", onServiceResize);
      });
    }

    const runIntroAnimation = () => {
      if (!introStage) {
        startMorphPhase();
        return;
      }
      timers.push(
        window.setTimeout(() => {
          lightBeam?.classList.add("active");
          lightBeamGlow?.classList.add("active");
          karmanLine?.classList.add("active");
          spawnKarmanParticles();
        }, 100),
      );
      timers.push(
        window.setTimeout(() => {
          if (introContent) introContent.style.opacity = "1";
          introTitle?.classList.add("reveal");
        }, 1200),
      );
      timers.push(
        window.setTimeout(() => {
          introTitle?.classList.add("wipe-out");
        }, 2600),
      );
      timers.push(
        window.setTimeout(() => {
          introBrand?.classList.add("reveal");
        }, 2800),
      );
      timers.push(
        window.setTimeout(() => {
          introBrand?.classList.add("wipe-out");
        }, 4500),
      );
      timers.push(
        window.setTimeout(() => {
          introStage.classList.add("fade-out");
          // ── 在 introStage 开始淡出的同时，立即初始化首屏位置并启动首屏动画 ──
          // 这样首屏元素在 introStage 渐隐过程中同步渐现，避免"画面外执行后突然出现"
          const ease = "cubic-bezier(0.22,0.61,0.36,1)";
          // 先确保 heroBlock 处于正确的初始 morph 位置（sp=0）
          updateMorph(0);
          // 首屏内容开始渐现
          heroBlockContent.style.transition = "opacity 0.8s ease";
          heroBlockContent.style.opacity = "1";
          heroMainTitle?.classList.add("animate");

          // 首屏卡片渐现
          timers.push(
            window.setTimeout(() => {
              heroCards.style.transition =
                "opacity 1s cubic-bezier(0.22,0.61,0.36,1), transform 1s cubic-bezier(0.22,0.61,0.36,1)";
              heroCards.style.opacity = "1";
              heroCards.style.transform = "translateX(-50%) translateY(0)";
            }, 300),
          );

          // 首屏副标题和按钮渐现
          timers.push(
            window.setTimeout(() => {
              [heroP, heroCta].forEach((element) => {
                if (!element) {
                  return;
                }
                element.style.transition = `opacity 1.2s ${ease}, transform 1.2s ${ease}`;
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
              });
            }, 600),
          );

          // 标题分割动画
          timers.push(
            window.setTimeout(() => {
              heroMainTitle?.classList.add("split");
            }, 3400),
          );

          // 标题动画完成
          timers.push(
            window.setTimeout(() => {
              heroMainTitle?.classList.add("done");
            }, 4500),
          );

          // 地球背景渐现
          timers.push(
            window.setTimeout(() => {
              const earthBackdrop = document.getElementById("earthBackdrop") as HTMLElement | null;
              if (!earthBackdrop) {
                return;
              }
              earthBackdrop.style.opacity = "0";
              earthBackdrop.style.transform = "translateY(50px)";
              const start = performance.now();
              const duration = 2000;
              const animateEarth = (now: number) => {
                const elapsed = now - start;
                const t = Math.min(elapsed / duration, 1);
                const eased = 1 - (1 - t) ** 3;
                earthBackdrop.style.opacity = String(eased);
                earthBackdrop.style.transform = `translateY(${50 * (1 - eased)}px)`;
                if (t < 1) {
                  window.requestAnimationFrame(animateEarth);
                } else {
                  earthBackdrop.dataset.earthReady = "true";
                }
              };
              window.requestAnimationFrame(animateEarth);
            }, 2800),
          );
        }, 5500),
      );
      timers.push(
        window.setTimeout(() => {
          introStage.classList.add("hidden");
          introStage.style.display = "none";
          if (navbar) {
            navbar.style.opacity = "1";
          }

          timers.push(
            window.setTimeout(() => {
              heroBlockContent.style.transition = "";
              heroCards.style.transition = "";
              [heroP, heroCta].forEach((element) => {
                if (element) {
                  element.style.transition = "";
                }
              });
              document.documentElement.style.overflow = "";
              startMorphPhase();
            }, 500),
          );
        }, 6300),
      );
    };
    const showHomeImmediately = () => {
      introStage?.remove();
      document.documentElement.style.overflow = "";
      document.documentElement.removeAttribute("data-home-skip-intro");
      if (navbar) {
        navbar.style.opacity = "1";
      }
      heroBlockContent.style.opacity = "1";
      heroBlockContent.style.transform = "";
      heroCards.style.opacity = "1";
      heroCards.style.transform = "translateX(-50%) translateY(0)";
      [heroP, heroCta].forEach((element) => {
        if (!element) {
          return;
        }
        element.style.transition = "";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });
      heroCards.style.transition = "";
      heroMainTitle?.classList.remove("animate", "split");
      heroMainTitle?.classList.add("instant", "done");
      heroMainTitle?.style.setProperty("opacity", "1");
      const earthBackdrop = document.getElementById("earthBackdrop") as HTMLElement | null;
      if (earthBackdrop) {
        earthBackdrop.style.opacity = "1";
        earthBackdrop.style.transform = "translateY(0)";
        earthBackdrop.dataset.earthReady = "true";
      }
      startMorphPhase();
    };

    if (shouldSkipIntroAnimation) {
      showHomeImmediately();
    } else {
      document.documentElement.removeAttribute("data-home-skip-intro");
      runIntroAnimation();
    }

    if (bridgeSection) {
      const bridgeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            entry.target.classList.add("visible");
            const nums = entry.target.querySelectorAll<HTMLElement>(".bridge-stat-num[data-count]");
            nums.forEach((num) => {
              const target = Number.parseInt(num.dataset.count ?? "0", 10);
              const duration = 2000;
              const start = performance.now();
              const tick = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - (1 - progress) ** 4;
                num.textContent = `${Math.round(target * eased)}`;
                if (progress < 1) {
                  window.requestAnimationFrame(tick);
                }
              };
              window.requestAnimationFrame(tick);
            });
            bridgeObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.3 },
      );
      bridgeObserver.observe(bridgeSection);
      cleanupFns.push(() => bridgeObserver.disconnect());
    }

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "section.brand-values, section.services-overview, section.featured-section, section.cases-preview, .hero-stats, .value-card, .service-card, .case-card, .stat-item, .featured-content, .featured-image, .bridge-section",
      ),
    );
    revealTargets.forEach((element, index) => {
      if (!element.classList.contains("animate-on-scroll")) {
        element.classList.add("animate-on-scroll");
      }
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
      observer.observe(element);
    });

    const valueCards = Array.from(document.querySelectorAll<HTMLElement>(".value-card"));
    valueCards.forEach((card) => {
      const onCardMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        card.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${
          -dy * 8
        }deg) translateZ(10px)`;
        card.style.transition = "transform 0.15s ease-out";
      };
      const onCardLeave = () => {
        card.style.transform =
          "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
        card.style.transition = "transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)";
      };
      card.addEventListener("mousemove", onCardMove);
      card.addEventListener("mouseleave", onCardLeave);
      cleanupFns.push(() => {
        card.removeEventListener("mousemove", onCardMove);
        card.removeEventListener("mouseleave", onCardLeave);
      });
    });

    const caseCards = Array.from(document.querySelectorAll<HTMLElement>(".case-card"));
    caseCards.forEach((card) => {
      const shine = document.createElement("div");
      shine.className = "case-shine";
      shine.style.cssText =
        "position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0;transition:opacity 0.4s ease;";
      card.appendChild(shine);
      const onCardMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 50%)`;
        shine.style.opacity = "1";
      };
      const onCardLeave = () => {
        shine.style.opacity = "0";
      };
      card.addEventListener("mousemove", onCardMove);
      card.addEventListener("mouseleave", onCardLeave);
      cleanupFns.push(() => {
        card.removeEventListener("mousemove", onCardMove);
        card.removeEventListener("mouseleave", onCardLeave);
        shine.remove();
      });
    });

    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText =
      "position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#2563eb,#60a5fa);z-index:10001;transform-origin:left;transition:transform 0.1s linear;will-change:transform;";
    document.body.appendChild(progressBar);
    const onProgressScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", onProgressScroll, { passive: true });
    onProgressScroll();
    cleanupFns.push(() => {
      window.removeEventListener("scroll", onProgressScroll);
      progressBar.remove();
    });

    if (caseCards.length > 0) {
      const parallaxObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            (entry.target as HTMLElement).dataset.parallaxActive = entry.isIntersecting
              ? "true"
              : "false";
          });
        },
        { threshold: 0.1 },
      );
      caseCards.forEach((card) => parallaxObserver.observe(card));
      const onParallaxScroll = () => {
        caseCards.forEach((card) => {
          if (card.dataset.parallaxActive !== "true") {
            return;
          }
          const image = card.querySelector<HTMLElement>(".case-image");
          if (!image) {
            return;
          }
          const rect = card.getBoundingClientRect();
          const offset = (rect.top / window.innerHeight) * 20 - 10;
          image.style.transform = `translateY(${offset}px) scale(1.05)`;
        });
      };
      window.addEventListener("scroll", onParallaxScroll, { passive: true });
      cleanupFns.push(() => {
        window.removeEventListener("scroll", onParallaxScroll);
        parallaxObserver.disconnect();
      });
    }

    document.querySelectorAll<HTMLElement>(".section-title, section h2").forEach((target) => {
      if (target.dataset.revealReady === "true") {
        return;
      }
      if (target.closest(".flip-stage") || target.closest(".side-content")) {
        return;
      }
      const text = target.textContent?.trim() ?? "";
      if (!text || target.children.length > 0) {
        return;
      }
      const words = text.split(/\s+/);
      target.textContent = "";
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "reveal-line";
        span.style.setProperty("--line-index", `${index}`);
        span.textContent = `${word}${index === words.length - 1 ? "" : " "}`;
        target.appendChild(span);
      });
      target.dataset.revealReady = "true";
    });

    const ctaCanvas = document.getElementById("ctaParticles") as HTMLCanvasElement | null;
    if (ctaCanvas) {
      const ctx = ctaCanvas.getContext("2d");
      const resizeCanvas = () => {
        const rect = ctaCanvas.parentElement?.getBoundingClientRect();
        if (!rect) {
          return;
        }
        ctaCanvas.width = rect.width;
        ctaCanvas.height = rect.height;
      };
      resizeCanvas();
      if (ctx) {
        const particles = Array.from({ length: 40 }, () => ({
          x: Math.random() * ctaCanvas.width,
          y: Math.random() * ctaCanvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        }));
        let ctaAnimating = true;
        let ctaFrame = 0;
        const ctaBanner = document.querySelector(".cta-banner-inner");
        let ctaObserver: IntersectionObserver | null = null;
        if (ctaBanner) {
          ctaObserver = new IntersectionObserver((entries) => {
            ctaAnimating = entries[0]?.isIntersecting ?? false;
          });
          ctaObserver.observe(ctaBanner);
        }
        const drawParticles = () => {
          if (!ctaAnimating) {
            ctaFrame = window.requestAnimationFrame(drawParticles);
            return;
          }
          ctx.clearRect(0, 0, ctaCanvas.width, ctaCanvas.height);
          for (let i = 0; i < particles.length; i += 1) {
            const particle = particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.x < 0 || particle.x > ctaCanvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > ctaCanvas.height) particle.vy *= -1;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
            ctx.fill();
          }
          for (let i = 0; i < particles.length; i += 1) {
            for (let j = i + 1; j < particles.length; j += 1) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
          ctaFrame = window.requestAnimationFrame(drawParticles);
        };
        ctaFrame = window.requestAnimationFrame(drawParticles);
        window.addEventListener("resize", resizeCanvas);
        cleanupFns.push(() => {
          window.removeEventListener("resize", resizeCanvas);
          window.cancelAnimationFrame(ctaFrame);
          ctaObserver?.disconnect();
        });
      }
    }

    const rippleButtons = Array.from(
      document.querySelectorAll<HTMLElement>(".btn-primary, .btn-ghost, .btn-outline"),
    );
    rippleButtons.forEach((button) => {
      const onButtonClick = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        button.appendChild(ripple);
        const rippleTimer = window.setTimeout(() => {
          ripple.remove();
        }, 600);
        timers.push(rippleTimer);
      };
      button.addEventListener("click", onButtonClick);
      cleanupFns.push(() => button.removeEventListener("click", onButtonClick));
    });

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    anchors.forEach((anchor) => {
      const onAnchorClick = (event: MouseEvent) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") {
          return;
        }
        const target = document.querySelector<HTMLElement>(targetId);
        if (!target) {
          return;
        }
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      anchor.addEventListener("click", onAnchorClick);
      cleanupFns.push(() => anchor.removeEventListener("click", onAnchorClick));
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (morphAnim !== null) {
        window.cancelAnimationFrame(morphAnim);
      }
      cleanupFns.forEach((cleanup) => cleanup());
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-page">
      <div className="intro-stage" id="introStage">
        <div className="light-beam" id="lightBeam" />
        <div className="light-beam-glow" id="lightBeamGlow" />
        <div className="karman-line" id="karmanLine">
          <svg className="karman-svg" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="karmanGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(60,130,220,0)" />
                <stop offset="40%" stopColor="rgba(100,180,255,0.15)" />
                <stop offset="70%" stopColor="rgba(140,210,255,0.35)" />
                <stop offset="100%" stopColor="rgba(180,230,255,0.55)" />
              </linearGradient>
              <linearGradient id="karmanGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(50,120,210,0)" />
                <stop offset="35%" stopColor="rgba(90,170,245,0.1)" />
                <stop offset="65%" stopColor="rgba(130,200,255,0.25)" />
                <stop offset="100%" stopColor="rgba(170,225,255,0.4)" />
              </linearGradient>
              <linearGradient id="karmanGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(40,110,200,0)" />
                <stop offset="30%" stopColor="rgba(80,160,240,0.06)" />
                <stop offset="60%" stopColor="rgba(120,195,255,0.15)" />
                <stop offset="100%" stopColor="rgba(160,220,255,0.28)" />
              </linearGradient>
              <filter id="karmanBlur" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="karmanBlurStrong" x="-30%" y="-80%" width="160%" height="260%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
            </defs>
            <path className="karman-path karman-path-3" d="M0,220 Q600,80 1200,180" fill="none" stroke="url(#karmanGrad3)" strokeWidth="18" filter="url(#karmanBlurStrong)" />
            <path className="karman-path karman-path-2" d="M0,200 Q600,60 1200,160" fill="none" stroke="url(#karmanGrad2)" strokeWidth="10" filter="url(#karmanBlur)" />
            <path className="karman-path karman-path-1" d="M0,180 Q600,40 1200,140" fill="none" stroke="url(#karmanGrad1)" strokeWidth="4" />
            <path className="karman-path karman-horizon" d="M0,180 Q600,40 1200,140" fill="none" stroke="rgba(200,235,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="karman-particles" id="karmanParticles" />
        </div>
        <div className="intro-content" id="introContent">
          <h1 className="intro-title" id="introTitle">
            <span className="dre-part">Dre</span>
            <span className="vortex-blue">vortex</span>
          </h1>
          <div className="intro-brand" id="introBrand">
            <img
              src="/legacy/home/company-icon.png"
              className="intro-logo"
              id="introLogo"
              alt="梦启新创"
            />
            <span className="intro-brand-text" id="introBrandText">
              梦启新创
            </span>
          </div>
        </div>
      </div>

      <div className="hero-stage-wrapper" id="heroStageWrapper">
        <div className="hero-stage" id="heroStage">
          <section className="hero" id="hero">
            <div className="hero-grid-lines" id="heroGridLines">
              <div className="grid-line grid-line-v gl-1" />
              <div className="grid-line grid-line-v gl-2" />
              <div className="grid-line grid-line-v gl-3" />
              <div className="grid-line grid-line-h gl-4" />
              <div className="grid-line grid-line-h gl-5" />
              <div className="grid-line grid-line-h gl-6" />
              <div className="grid-orbit orbit-1" />
              <div className="grid-orbit orbit-2" />
            </div>

            <div className="mouse-glow" id="mouseGlow" />
            <div className="mouse-glow-trail" id="mouseGlowTrail" />

            <div className="hero-block" id="heroBlock">
              <div className="hero-block-bg" />
              <div className="earth-backdrop" id="earthBackdrop">
                <div className="earth-glow" />
                <div className="earth-atmosphere" />
                <div className="earth-body" />
                <div className="earth-terminator" />
                <canvas className="earth-particles-canvas" id="earthParticlesCanvas" />
              </div>

              <div className="cube-scene" id="cubeScene">
                <div className="cube" id="cube">
                  <div className="cube-face cube-front" />
                  <div className="cube-face cube-back" />
                  <div className="cube-face cube-right" />
                  <div className="cube-face cube-left" />
                  <div className="cube-face cube-top" />
                  <div className="cube-face cube-bottom" />
                </div>
              </div>

              <div className="hero-block-content" id="heroBlockContent">
                <h1 className="hero-main-title" id="heroMainTitle">
                  <span className="ht-left">
                    <span className="ht-cn">梦启新创</span>
                  </span>
                  <span className="ht-dot">·</span>
                  <span className="ht-en">Drevortex</span>
                </h1>
                <p>以梦想为起点，以创新为驱动，开启科技与商业的新征程</p>
                <Link href="/contact" className="btn hero-cta">
                  立即咨询
                </Link>
              </div>
            </div>

            <div className="hero-cards" id="heroCards">
              <div className="hero-card">
                <i className="fas fa-code" />
                <div>
                  <h3>软件开发</h3>
                  <p>定制化技术解决方案</p>
                </div>
              </div>
              <div className="hero-card">
                <i className="fas fa-mobile-alt" />
                <div>
                  <h3>小程序开发</h3>
                  <p>商用工具类小程序</p>
                </div>
              </div>
              <div className="hero-card">
                <i className="fas fa-palette" />
                <div>
                  <h3>设计服务</h3>
                  <p>品牌视觉设计</p>
                </div>
              </div>
            </div>

            <div className="side-content" id="sideContent">
              <div className="side-header">
                <span className="side-eyebrow">WHY CHOOSE US</span>
                <h2 className="side-heading">
                  <span className="accent-text">3 个理由</span>
                  <br />
                  选择梦启新创
                </h2>
                <div className="side-divider" />
              </div>
              <div className="side-reasons">
                <div className="side-reason">
                  <div className="reason-num">01</div>
                  <div className="reason-content">
                    <h3>技术驱动</h3>
                    <p>全栈技术能力覆盖 Web、移动端、后端，为企业提供一站式数字化解决方案</p>
                  </div>
                </div>
                <div className="side-reason">
                  <div className="reason-num">02</div>
                  <div className="reason-content">
                    <h3>品质交付</h3>
                    <p>敏捷开发流程，高效迭代与持续交付，确保每一个项目的高品质落地</p>
                  </div>
                </div>
                <div className="side-reason">
                  <div className="reason-num">03</div>
                  <div className="reason-content">
                    <h3>创新设计</h3>
                    <p>以用户体验为核心，打造具有商业价值的品牌视觉与产品设计</p>
                  </div>
                </div>
              </div>
              <div className="side-footer">
                <div className="side-stats">
                  <div className="side-stat">
                    <span className="side-stat-num">200+</span>
                    <span className="side-stat-label">服务客户</span>
                  </div>
                  <div className="side-stat">
                    <span className="side-stat-num">98%</span>
                    <span className="side-stat-label">满意度</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="side-decor" id="sideDecor">
              <div className="decor-line" />
              <div className="decor-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="decor-text">DREVORTEX</div>
              <div className="decor-ring" />
            </div>

            <div className="gear-mechanism" id="gearMechanism">
              <svg className="gear gear-large" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="20" stroke="rgba(96,165,250,0.3)" strokeWidth="2" />
                <circle cx="60" cy="60" r="12" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />
                <path d="M60 20 L60 30 M60 90 L60 100 M20 60 L30 60 M90 60 L100 60 M32 32 L39 39 M81 81 L88 88 M32 88 L39 81 M81 39 L88 32" stroke="rgba(96,165,250,0.25)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg className="gear gear-small" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="15" stroke="rgba(96,165,250,0.3)" strokeWidth="2" />
                <circle cx="40" cy="40" r="8" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />
                <path d="M40 10 L40 18 M40 62 L40 70 M10 40 L18 40 M62 40 L70 40 M22 22 L28 28 M52 52 L58 58 M22 58 L28 52 M52 28 L58 22" stroke="rgba(96,165,250,0.25)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg className="gear gear-tiny" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="10" stroke="rgba(96,165,250,0.3)" strokeWidth="2" />
                <circle cx="30" cy="30" r="5" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />
                <path d="M30 8 L30 14 M30 46 L30 52 M8 30 L14 30 M46 30 L52 30 M16 16 L20 20 M40 40 L44 44 M16 44 L20 40 M40 20 L44 16" stroke="rgba(96,165,250,0.25)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="gear-connect-line" />
            </div>
          </section>
        </div>
      </div>

      <div className="cta-reveal" id="ctaReveal">
        <div className="cta-reveal-layer cta-layer-1" />
        <div className="cta-reveal-layer cta-layer-2" />
        <Link href="/contact" className="cta-reveal-btn">
          <i className="fas fa-comment-dots cta-icon-collapsed" />
          <span className="cta-text">立即咨询</span>
          <i className="fas fa-arrow-right cta-arrow" />
        </Link>
      </div>

      <section className="squeeze-section" id="squeezeSection">
        <div className="container">
          <div className="squeeze-row" id="squeezeRow">
            <div className="squeeze-icons">
              <i className="fas fa-rocket" />
              <i className="fas fa-shield-alt" />
              <i className="fas fa-bolt" />
              <i className="fas fa-code" />
            </div>
            <p className="squeeze-text">以技术为引擎，以创意为燃料，驱动每一次商业进化</p>
          </div>
        </div>
      </section>

      <section className="bridge-section" id="bridgeSection">
        <div className="container">
          <div className="bridge-header">
            <span className="bridge-eyebrow">OUR IMPACT</span>
            <h2 className="bridge-title">用数字说话</h2>
            <p className="bridge-subtitle">持续为客户创造可量化的商业价值</p>
          </div>
          <div className="bridge-stats animate-on-scroll">
            <div className="bridge-stat">
              <div className="bridge-stat-num" data-count="200">0</div>
              <div className="bridge-stat-suffix">+</div>
              <div className="bridge-stat-label">服务客户</div>
            </div>
            <div className="bridge-stat-divider" />
            <div className="bridge-stat">
              <div className="bridge-stat-num" data-count="98">0</div>
              <div className="bridge-stat-suffix">%</div>
              <div className="bridge-stat-label">客户满意度</div>
            </div>
            <div className="bridge-stat-divider" />
            <div className="bridge-stat">
              <div className="bridge-stat-num" data-count="50">0</div>
              <div className="bridge-stat-suffix">+</div>
              <div className="bridge-stat-label">技术专家</div>
            </div>
            <div className="bridge-stat-divider" />
            <div className="bridge-stat">
              <div className="bridge-stat-num" data-count="36">0</div>
              <div className="bridge-stat-suffix">个月</div>
              <div className="bridge-stat-label">最长合作周期</div>
            </div>
          </div>
          <div className="bridge-values">
            {[
              ["fas fa-lightbulb", "创新驱动", "以前沿技术为基石，不断探索数字化转型的无限可能，为客户打造具有竞争力的产品"],
              ["fas fa-handshake", "诚信合作", "透明沟通，信守承诺，以长期伙伴关系为目标，与客户共同成长"],
              ["fas fa-chart-line", "结果导向", "聚焦业务目标，以数据衡量成效，确保每一分投入都能产生可感知的价值"],
            ].map(([icon, title, desc]) => (
              <div className="bridge-value-card animate-on-scroll" key={title}>
                <div className="bridge-value-icon">
                  <i className={icon} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flip-stage" id="flipStage">
        <div className="flip-dots" id="flipDots">
          <span className="flip-dot active" />
          <span className="flip-dot" />
          <span className="flip-dot" />
        </div>
        <div className="flip-viewport" id="flipViewport">
          {flipPages.map((page, index) => (
            <div className="flip-page" id={`flipPage${index}`} key={page.title}>
              <div className="flip-bg" style={{ backgroundImage: `url('${page.bg}')` }} />
              <div className="flip-overlay" />
              <div className="flip-content">
                <div className="flip-main">
                  <p className="flip-label">核心业务</p>
                  <h2 className="flip-title">{page.title}</h2>
                  <p className="flip-desc">{page.desc}</p>
                  <div className="flip-bars">
                    {page.bars.map((bar) => (
                      <div className="flip-bar" key={bar}>
                        <i className="fas fa-check" />
                        <span>{bar}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flip-side">
                  <h3 className="flip-side-title">{page.sideTitle}</h3>
                  <p className="flip-side-desc">{page.sideDesc}</p>
                  <ul className="flip-side-list">
                    {page.sideList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-stats" id="heroStats">
        {[
          ["fas fa-briefcase", "100+", "成功案例"],
          ["fas fa-users", "50+", "合作客户"],
          ["fas fa-award", "5年+", "行业经验"],
        ].map(([icon, count, label]) => (
          <div className="stat-item animate-on-scroll" key={label}>
            <div className="stat-icon">
              <i className={icon} />
            </div>
            <h3>{count}</h3>
            <p>{label}</p>
            <span className="stat-line" />
          </div>
        ))}
      </div>

      <section className="section brand-values">
        <div className="container">
          <h2 className="section-title animate-on-scroll">品牌价值</h2>
          <div className="values-container">
            {[
              ["fas fa-rocket", "以梦为启", "从每一个微小的梦想出发，为用户、行业与未来创造新的可能。"],
              ["fas fa-lightbulb", "以创为核", "坚持技术突破与模式创新，为用户提供更高效、更具价值的解决方案。"],
              ["fas fa-sync-alt", "以涡为势", "聚合资源、迭代升级，形成持续的行业影响力与生态引力。"],
            ].map(([icon, title, desc]) => (
              <div className="value-card card animate-on-scroll" key={title}>
                <div className="value-icon">
                  <i className={icon} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sw-stage" id="swStage">
        <section className="sw-panel" id="swPanel">
          <div className="sw-wheel-wrap" id="swWheelWrap">
            <div className="sw-wheel" id="swWheel">
              {["fa-code", "fa-globe", "fa-mobile-alt", "fa-palette", "fa-chart-line"].map((icon, index) => (
                <div className={`sw-seg ${index === 0 ? "active" : ""}`} data-index={index} key={icon}>
                  <i className={`fas ${icon}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="sw-list-col">
            <p className="sw-eyebrow">核心业务</p>
            <ul className="sw-list" id="swList">
              {serviceBlocks.map((item, index) => (
                <li className={`sw-item ${index === 0 ? "active" : ""}`} data-index={index} key={item.title}>
                  <span className="sw-num">{`${index + 1}`.padStart(2, "0")}</span>
                  <span className="sw-name">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sw-detail" id="swDetail">
            {serviceBlocks.map((item, index) => (
              <div
                className={`sw-content ${index === 0 ? "active" : ""}`}
                data-index={index}
                key={item.title}
              >
                <p className="sw-step-badge">{`${index + 1}`.padStart(2, "0")} / 05 &nbsp;核心业务</p>
                <h2 className="sw-title">{item.title}</h2>
                <p className="sw-desc">{item.desc}</p>
                <ul className="sw-features">
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <i className="fas fa-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="sw-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link href="/services" className="sw-cta">
                  了解详情 <i className="fas fa-arrow-right" />
                </Link>
              </div>
            ))}
          </div>

          <div className="sw-image-col" id="swImageCol">
            <div className="sw-img-wrap">
              {[0, 1, 2, 3, 4].map((seed, index) => (
                <div
                  className={`sw-img ${index === 0 ? "active" : ""}`}
                  data-index={index}
                  key={seed}
                  style={{ backgroundImage: `url('/legacy/home/sw-${seed}.jpg')` }}
                />
              ))}
            </div>
          </div>

          <div className="sw-step-indicator" id="swStepIndicator">
            <div className="sw-step-current" id="swStepCurrent">
              01
            </div>
            <div className="sw-step-divider" />
            <div className="sw-step-total">05</div>
            <div className="sw-step-ring" id="swStepRing">
              <svg viewBox="0 0 44 44">
                <circle className="sw-step-ring-bg" cx="22" cy="22" r="20" />
                <circle
                  className="sw-step-ring-progress"
                  id="swStepRingProgress"
                  cx="22"
                  cy="22"
                  r="20"
                />
              </svg>
            </div>
          </div>

          <div className="sw-scroll-hint" id="swScrollHint">
            <span>滚动切换</span>
            <div className="sw-scroll-hint-line" />
          </div>
        </section>
      </div>

      <section className="section featured-section">
        <div className="container">
          <div className="featured-container">
            <div className="featured-content animate-on-scroll">
              <h2>
                Logo商标＆商用图片设计
                <br />
                <span>特色服务</span>
              </h2>
              <p>专业的Logo商标和商用图片设计服务，为您的品牌打造独特的视觉形象。</p>
              <ul className="features-list">
                <li>企业Logo设计与品牌标识</li>
                <li>品牌视觉识别系统(VIS)设计</li>
                <li>商用图片拍摄与后期处理</li>
                <li>宣传物料设计与制作</li>
              </ul>
              <Link href="/services" className="btn">
                了解更多
              </Link>
            </div>
            <div className="featured-image animate-on-scroll">
              <div className="design-logo">DESIGN</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cases-preview">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-eyebrow">SELECTED WORKS</span>
            <h2 className="section-title">精选案例</h2>
            <p className="section-desc">每一个项目都是对卓越的承诺，见证我们与客户共同创造的数字价值</p>
          </div>
          <div className="cases-container">
            {[
              ["智云科技品牌官网", "企业官网", "React", "为人工智能初创企业打造的高端品牌官网，融合动态数据可视化与沉浸式滚动体验，上线首月获客量提升 240%", "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", "2025"],
              ["悦享生活电商平台", "小程序", "电商", "微信小程序电商解决方案，集成微信支付、会员系统与智能推荐，日均活跃用户突破 3 万", "linear-gradient(135deg, #2d132c 0%, #801336 50%, #c72c41 100%)", "2025"],
              ["数联云管理系统", "SaaS", "后台系统", "企业级 SaaS 管理平台，支持多租户架构与实时数据看板，服务超过 200 家企业客户", "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", "2024"],
              ["蓝海创投品牌全案", "品牌设计", "VI系统", "从 Logo 设计到完整视觉识别系统的品牌升级方案，助力投资机构塑造专业可信的品牌形象", "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%)", "2024"],
            ].map(([title, tag1, tag2, desc, bg, year]) => (
              <div className="case-card card animate-on-scroll" key={title}>
                <div className="case-image" style={{ background: bg }}>
                  <div className="case-image-overlay" />
                  <div className="case-tags">
                    <span>{tag1}</span>
                    <span>{tag2}</span>
                  </div>
                </div>
                <div className="case-content">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="case-meta">
                    <span>
                      <i className="fas fa-calendar" /> {year}
                    </span>
                    <span>
                      <i className="fas fa-arrow-right" /> 查看详情
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cases-actions animate-on-scroll">
            <Link href="/cases" className="btn btn-outline">
              <span>查看更多案例</span>
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section cta-banner">
        <div className="container">
          <div className="cta-banner-inner animate-on-scroll">
            <canvas className="cta-particles" id="ctaParticles" />
            <div className="cta-banner-content">
              <span className="cta-banner-eyebrow">START YOUR PROJECT</span>
              <h2>
                准备好开启您的
                <br />
                数字化之旅了吗？
              </h2>
              <p>无论您是需要一个全新的品牌官网、一款高效的业务小程序，还是完整的数字化解决方案，我们都期待与您交流。</p>
              <div className="cta-banner-actions">
                <Link href="/contact" className="btn btn-primary" id="ctaPrimaryBtn">
                  <span>立即咨询</span>
                  <i className="fas fa-arrow-right" />
                </Link>
                <Link href="/services" className="btn btn-ghost">
                  <span>了解服务</span>
                  <i className="fas fa-chevron-right" />
                </Link>
              </div>
            </div>
            <div className="cta-banner-visual">
              <div className="cta-orb" />
              <div className="cta-ring" />
              <div className="cta-ring cta-ring-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
