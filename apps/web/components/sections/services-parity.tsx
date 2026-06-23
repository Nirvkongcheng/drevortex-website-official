"use client";

import { useLayoutEffect } from "react";

export function ServicesParity() {
  useLayoutEffect(() => {
    const pageRoot = document.getElementById("servicesPageRoot");
    const navbar = document.getElementById("navbar");
    const heroFeatures = document.getElementById("servicesHeroFeatures");
    const heroBg = document.getElementById("servicesHeroBg");
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
            ".hero-overlay h1, .hero-overlay p, .feature-item p, .section-title, .service-item h3, .service-item p, .detail-card h3, .detail-card p, .detail-card li, .process-step h3, .process-step p",
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(timer);
      if (revealFrame) {
        window.cancelAnimationFrame(revealFrame);
      }
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div id="servicesPageRoot">
      <section className="hero">
        <div className="hero-bg" id="servicesHeroBg">
          <div className="hero-content">
            <h1>服务业务</h1>
            <p>专业的数字化解决方案</p>
          </div>
        </div>
        <div className="hero-features" id="servicesHeroFeatures">
          <div className="feature-item">
            <i className="fas fa-cogs" />
            <p>定制化开发服务</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-headset" />
            <p>全程技术支持</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-rocket" />
            <p>快速交付上线</p>
          </div>
        </div>
      </section>

      <section className="section core-services">
        <div className="container">
          <h2 className="section-title animate-on-scroll">核心业务</h2>
          <div className="services-grid">
            <div className="service-item card animate-on-scroll">
              <i className="fas fa-code" />
              <h3>软件开发</h3>
            </div>
            <div className="service-item card animate-on-scroll">
              <i className="fas fa-globe" />
              <h3>网页制作</h3>
            </div>
            <div className="service-item card animate-on-scroll">
              <i className="fas fa-mobile-alt" />
              <h3>微信小程序开发</h3>
            </div>
            <div className="service-item card animate-on-scroll">
              <i className="fas fa-palette" />
              <h3>Logo商标＆商用图片设计</h3>
            </div>
            <div className="service-item card animate-on-scroll">
              <i className="fas fa-chart-line" />
              <h3>互联网咨询</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-details">
        <div className="container">
          <h2 className="section-title animate-on-scroll">服务项目</h2>

          <div className="detail-card animate-on-scroll">
            <div className="detail-icon">
              <i className="fas fa-code" />
            </div>
            <div className="detail-content">
              <h3>软件开发</h3>
              <p>
                提供定制化软件开发服务，包括企业管理系统、业务流程自动化工具、数据分析平台等，满足企业个性化需求，提升运营效率。
              </p>
            </div>
          </div>

          <div className="detail-card animate-on-scroll">
            <div className="detail-icon">
              <i className="fas fa-globe" />
            </div>
            <div className="detail-content">
              <h3>网页制作</h3>
              <p>
                专业的网站设计与开发服务，打造响应式、高性能的企业官网和营销页面，提升品牌形象，增强用户体验。
              </p>
            </div>
          </div>

          <div className="detail-card animate-on-scroll">
            <div className="detail-icon">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="detail-content">
              <h3>微信小程序开发</h3>
              <p>
                为企业打造功能完善的微信小程序，包括商城、预约、展示等类型，助力移动端业务拓展，提升用户触达率。
              </p>
            </div>
          </div>

          <div className="detail-card animate-on-scroll">
            <div className="detail-icon">
              <i className="fas fa-palette" />
            </div>
            <div className="detail-content">
              <h3>Logo商标＆商用图片设计</h3>
              <p>
                专业的品牌视觉设计服务，为企业打造独特的品牌形象，包括Logo设计、VI系统、商用图片等，提升品牌识别度。
              </p>
            </div>
          </div>

          <div className="detail-card animate-on-scroll">
            <div className="detail-icon">
              <i className="fas fa-chart-line" />
            </div>
            <div className="detail-content">
              <h3>互联网咨询</h3>
              <p>
                提供专业的互联网技术咨询服务，包括数字化转型咨询、技术架构规划、产品策略咨询等，助力企业数字化升级。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-process">
        <div className="container">
          <h2 className="section-title animate-on-scroll">服务流程</h2>
          <div className="process-timeline">
            <div className="process-step animate-on-scroll">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>需求分析</h3>
                <p>深入了解客户需求，分析业务场景，制定初步方案</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>方案设计</h3>
                <p>制定详细技术方案，设计系统架构，确定实施计划</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>开发实施</h3>
                <p>按照方案进行开发，定期沟通进度，及时调整优化</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>测试验收</h3>
                <p>全面测试系统功能，确保质量达标，交付客户验收</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>运维支持</h3>
                <p>提供持续技术支持，系统维护升级，保障稳定运行</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
