"use client";

import { useLayoutEffect } from "react";

export function AboutParity() {
  useLayoutEffect(() => {
    const pageRoot = document.getElementById("aboutPageRoot");
    const navbar = document.getElementById("navbar");
    const heroFeatures = document.getElementById("aboutHeroFeatures");
    const heroBg = document.getElementById("aboutHeroBg");
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
            ".hero-overlay h1, .hero-overlay p, .feature-item p, .about-intro h2, .about-intro .subtitle, .about-intro .intro-text, .info-icon-item span, .stat-circle p, .section-title, .concept-card h3, .concept-card p, .concept-card li, .positioning-card p, .advantage-card h3, .advantage-card p",
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
    <div id="aboutPageRoot">
      <section className="hero">
        <div className="hero-bg" id="aboutHeroBg">
          <div className="hero-overlay">
            <h1>关于我们</h1>
            <p>
              梦启新创 · <span className="dre-part">Dre</span>
              <span className="vortex-blue">vortex</span>
            </p>
          </div>
        </div>
        <div className="hero-features" id="aboutHeroFeatures">
          <div className="feature-item">
            <i className="fas fa-lightbulb" />
            <p>创新驱动发展</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-handshake" />
            <p>诚信合作共赢</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-star" />
            <p>追求卓越品质</p>
          </div>
        </div>
      </section>

      <section className="section about-intro">
        <div className="container">
          <h2>认识仁励</h2>
          <p className="subtitle">ABOUT RENLEE CONSULTING</p>
          <p className="intro-text">
            梦启新创网络科技有限公司，是一家专注于数字化技术服务的创新型企业。我们致力于为客户提供全方位的互联网解决方案，涵盖软件开发、网页制作、小程序开发、品牌设计等多个领域。公司秉承&quot;以梦为启、以创为核、以涡为势&quot;的核心理念，通过技术创新和专业服务，助力企业实现数字化转型。
          </p>

          <div className="info-icons">
            <div className="info-icon-item">
              <i className="fas fa-users" />
              <span>百强服务</span>
            </div>
            <div className="info-icon-item">
              <i className="fas fa-user-tie" />
              <span>人才建设</span>
            </div>
            <div className="info-icon-item">
              <i className="fas fa-award" />
              <span>荣誉资质</span>
            </div>
          </div>

          <div className="stats-circles">
            <div className="stat-circle">
              <div className="circle-number">
                1<span>项</span>
              </div>
              <p>知识资本·十年发展经验积累</p>
            </div>
            <div className="stat-circle">
              <div className="circle-number">
                10<span>年</span>
              </div>
              <p>十年沉淀·深耕发展经验</p>
            </div>
            <div className="stat-circle">
              <div className="circle-number">
                30<span>万</span>
              </div>
              <p>服务客户企业上市工程超过30万</p>
            </div>
            <div className="stat-circle">
              <div className="circle-number">
                300<span>家</span>
              </div>
              <p>超过300家合作企业客户</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section brand-identity">
        <div className="container">
          <h2 className="section-title animate-on-scroll">品牌理念</h2>

          <div className="concept-card animate-on-scroll">
            <h3>中文名称：梦启新创</h3>
            <p>以梦想为起点，以创新为驱动，开启科技与商业的新征程</p>
            <ul>
              <li>梦启：从每一个微小的梦想出发，为用户、行业与未来创造新的可能</li>
              <li>新创：持续创新、勇于突破，用技术与创意重构行业规则</li>
            </ul>
          </div>

          <div className="concept-card animate-on-scroll">
            <h3>
              英文名称：<span className="dre-part">Dre</span>
              <span className="vortex-blue">vortex</span>
            </h3>
            <p>Dream + Vortex，即&quot;梦想的漩涡&quot;，象征能量聚合与科技引力</p>
            <ul>
              <li>Dre：取自&quot;Dream&quot;，传递品牌的人文温度与理想主义</li>
              <li>Vortex：意为&quot;漩涡&quot;，代表技术聚合与创新迭代动力</li>
            </ul>
          </div>

          <div className="concept-card animate-on-scroll">
            <h3>品牌价值</h3>
            <ul>
              <li>以梦为启：始终以用户需求与行业愿景为导向</li>
              <li>以创为核：坚持技术突破与模式创新</li>
              <li>以涡为势：聚合资源、迭代升级，形成持续影响力</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section company-info">
        <div className="container">
          <h2 className="section-title animate-on-scroll">公司定位</h2>
          <div className="positioning-card card animate-on-scroll">
            <p>
              梦启新创网络科技有限公司定位为数字化技术服务企业，致力于通过技术创新为企业提供数字化解决方案，助力客户在数字时代获得竞争优势。
            </p>
            <p>
              我们的团队由一群充满激情与创造力的专业人士组成，拥有丰富的行业经验和技术积累，能够为客户提供从战略咨询到技术实现的全流程服务。
            </p>
          </div>
        </div>
      </section>

      <section className="section advantages">
        <div className="container">
          <h2 className="section-title animate-on-scroll">核心优势</h2>
          <div className="advantages-grid">
            <div className="advantage-card card animate-on-scroll">
              <i className="fas fa-lightbulb" />
              <h3>技术创新能力</h3>
              <p>持续跟踪前沿技术，为客户提供创新解决方案</p>
            </div>
            <div className="advantage-card card animate-on-scroll">
              <i className="fas fa-users" />
              <h3>专业服务团队</h3>
              <p>经验丰富的技术团队，提供专业高效的服务</p>
            </div>
            <div className="advantage-card card animate-on-scroll">
              <i className="fas fa-project-diagram" />
              <h3>全流程解决方案</h3>
              <p>从咨询到实施，提供一站式服务</p>
            </div>
            <div className="advantage-card card animate-on-scroll">
              <i className="fas fa-heart" />
              <h3>客户导向理念</h3>
              <p>以客户需求为核心，提供定制化服务</p>
            </div>
            <div className="advantage-card card animate-on-scroll">
              <i className="fas fa-chart-line" />
              <h3>行业经验丰富</h3>
              <p>深耕多个行业领域，积累丰富实战经验</p>
            </div>
            <div className="advantage-card card animate-on-scroll">
              <i className="fas fa-shield-alt" />
              <h3>质量保障体系</h3>
              <p>完善的质量管理体系，确保项目成功交付</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
