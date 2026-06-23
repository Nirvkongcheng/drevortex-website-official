"use client";

import { useLayoutEffect } from "react";

export function CasesParity() {
  useLayoutEffect(() => {
    const pageRoot = document.getElementById("casesPageRoot");
    const navbar = document.getElementById("navbar");
    const heroFeatures = document.getElementById("casesHeroFeatures");
    const heroBg = document.getElementById("casesHeroBg");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      heroFeatures?.classList.add("show");
    }, 240);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      navbar?.classList.toggle("scrolled", scrollY > 40);
      heroBg?.classList.toggle("scrolled", scrollY > 60);
      if (heroBg && !prefersReducedMotion) {
        heroBg.style.backgroundPosition = `center calc(50% + ${scrollY * 0.04}px)`;
      }
    };

    const revealTargets = pageRoot
      ? Array.from(
          pageRoot.querySelectorAll<HTMLElement>(
            ".hero-overlay h1, .hero-overlay p, .feature-item p, .case-info h3, .case-meta",
          ),
        )
      : [];
    revealTargets.forEach((element, index) => {
      element.classList.add("text-reveal-on-scroll");
      element.classList.remove("visible");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 60}ms`);
    });

    let observer: IntersectionObserver | null = null;
    let revealFrame = 0;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -6% 0px",
        },
      );

      revealFrame = window.requestAnimationFrame(() => {
        revealFrame = window.requestAnimationFrame(() => {
          revealTargets.forEach((element) => observer?.observe(element));
        });
      });
    } else {
      revealTargets.forEach((element) => element.classList.add("visible"));
    }

    const filterBtns = Array.from(document.querySelectorAll<HTMLButtonElement>(".filter-btn"));
    const caseCards = Array.from(document.querySelectorAll<HTMLElement>(".case-card"));
    const filterCleanups = filterBtns.map((btn) => {
      const onClick = () => {
        filterBtns.forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        let visibleIndex = 0;

        caseCards.forEach((card) => {
          const shouldShow = filter === "all" || card.dataset.category === filter;
          if (shouldShow) {
            card.classList.remove("hidden");
            card.classList.add("fade-in");
            card.classList.remove("visible");
            window.setTimeout(() => card.classList.add("visible"), visibleIndex * 80);
            visibleIndex += 1;
          } else {
            card.classList.add("hidden");
            card.classList.remove("fade-in", "visible");
          }
        });
      };

      btn.addEventListener("click", onClick);
      return () => btn.removeEventListener("click", onClick);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(timer);
      if (revealFrame) {
        window.cancelAnimationFrame(revealFrame);
      }
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
      filterCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div id="casesPageRoot">
      <section className="hero">
        <div className="hero-bg" id="casesHeroBg">
          <div className="hero-overlay">
            <h1>案例展示</h1>
            <p>我们的成功案例</p>
          </div>
        </div>
        <div className="hero-features" id="casesHeroFeatures">
          <div className="feature-item">
            <i className="fas fa-trophy" />
            <p>100+成功案例</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-users" />
            <p>50+合作伙伴</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-thumbs-up" />
            <p>客户满意度98%</p>
          </div>
        </div>
      </section>

      <section className="section cases-section">
        <div className="container">
          <div className="filter-buttons">
            <button className="filter-btn active" data-filter="all" type="button">
              全部案例
            </button>
            <button className="filter-btn" data-filter="development" type="button">
              开发类
            </button>
            <button className="filter-btn" data-filter="web" type="button">
              网页&小程序
            </button>
            <button className="filter-btn" data-filter="design" type="button">
              Logo商标＆商用图片设计
            </button>
          </div>

          <div className="cases-grid">
            <div className="case-card card animate-on-scroll" data-category="development">
              <div className="case-image">
                <i className="fas fa-laptop-code" />
              </div>
              <div className="case-info">
                <h3>企业管理系统</h3>
                <p className="case-meta">软件开发 / 为某制造企业开发的全流程管理系统，提升运营效率30%</p>
              </div>
            </div>

            <div className="case-card card animate-on-scroll" data-category="web">
              <div className="case-image">
                <i className="fas fa-globe" />
              </div>
              <div className="case-info">
                <h3>电商平台网站</h3>
                <p className="case-meta">网页制作 / 响应式电商网站，支持多端访问，月访问量超10万</p>
              </div>
            </div>

            <div className="case-card card animate-on-scroll" data-category="web">
              <div className="case-image">
                <i className="fas fa-mobile-alt" />
              </div>
              <div className="case-info">
                <h3>预约服务小程序</h3>
                <p className="case-meta">
                  小程序开发 / 为连锁美容机构开发的预约管理小程序，用户超5000人
                </p>
              </div>
            </div>

            <div className="case-card card animate-on-scroll" data-category="design">
              <div className="case-image">
                <i className="fas fa-palette" />
              </div>
              <div className="case-info">
                <h3>品牌VI设计</h3>
                <p className="case-meta">Logo商标设计 / 为科技公司打造完整品牌视觉识别系统</p>
              </div>
            </div>

            <div className="case-card card animate-on-scroll" data-category="development">
              <div className="case-image">
                <i className="fas fa-chart-line" />
              </div>
              <div className="case-info">
                <h3>数据分析平台</h3>
                <p className="case-meta">软件开发 / 企业级数据可视化分析平台，支持多维度数据展示</p>
              </div>
            </div>

            <div className="case-card card animate-on-scroll" data-category="web">
              <div className="case-image">
                <i className="fas fa-desktop" />
              </div>
              <div className="case-info">
                <h3>企业官网重构</h3>
                <p className="case-meta">网页制作 / 为传统企业打造现代化官网，提升品牌形象</p>
              </div>
            </div>

            <div className="case-card card animate-on-scroll" data-category="design">
              <div className="case-image">
                <i className="fas fa-image" />
              </div>
              <div className="case-info">
                <h3>商用图片设计</h3>
                <p className="case-meta">商用图片设计 / 为电商平台设计系列产品宣传图，提升转化率20%</p>
              </div>
            </div>

            <div className="case-card card animate-on-scroll" data-category="development">
              <div className="case-image">
                <i className="fas fa-cogs" />
              </div>
              <div className="case-info">
                <h3>智能仓储系统</h3>
                <p className="case-meta">软件开发 / 物流企业智能仓储管理系统，实现自动化调度</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
