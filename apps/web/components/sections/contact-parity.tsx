"use client";

import { useLayoutEffect } from "react";

export function ContactParity() {
  useLayoutEffect(() => {
    const pageRoot = document.getElementById("contactPageRoot");
    const navbar = document.getElementById("navbar");
    const heroFeatures = document.getElementById("contactHeroFeatures");
    const heroBg = document.getElementById("contactHeroBg");
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
            ".hero-overlay h1, .hero-overlay p, .feature-item p, .contact-info h2, .info-item h3, .info-item p, .contact-form h2, .verify-hint",
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

    const contactForm = pageRoot?.querySelector<HTMLFormElement>(".contact-form form") ?? null;
    const phoneInput = document.getElementById("phoneNumber") as HTMLInputElement | null;
    const getCodeBtn = document.getElementById("getCodeBtn") as HTMLButtonElement | null;
    const verifyCodeInput = document.getElementById("verifyCode") as HTMLInputElement | null;
    const phoneErrorEl = document.getElementById("phoneError");
    const verifyHintEl = document.getElementById("verifyHint");
    let cooldownTimer: number | null = null;
    let cooldownLeft = 60;

    const setPhoneError = (message: string) => {
      if (phoneErrorEl) {
        phoneErrorEl.textContent = message;
      }
    };

    const setVerifyHint = (message: string) => {
      if (verifyHintEl) {
        verifyHintEl.textContent = message;
      }
    };

    const normalizePhone = (value: string) => value.replace(/\s+/g, "");
    const isValidChinaMobile = (phone: string) => /^1[3-9]\d{9}$/.test(phone);

    const stopCooldown = () => {
      if (cooldownTimer !== null) {
        window.clearInterval(cooldownTimer);
        cooldownTimer = null;
      }
    };

    const startCooldown = (seconds: number) => {
      cooldownLeft = seconds;
      if (getCodeBtn) {
        getCodeBtn.disabled = true;
        getCodeBtn.textContent = `${cooldownLeft}秒后重试`;
      }
      setVerifyHint("验证码已发送（前端模拟），请填写收到的6位数字。");

      cooldownTimer = window.setInterval(() => {
        cooldownLeft -= 1;
        if (getCodeBtn) {
          getCodeBtn.textContent = `${cooldownLeft}秒后重试`;
        }

        if (cooldownLeft <= 0) {
          stopCooldown();
          if (getCodeBtn) {
            getCodeBtn.disabled = false;
            getCodeBtn.textContent = "获取验证码";
          }
          setVerifyHint('你可以再次点击"获取验证码"。');
        }
      }, 1000);
    };

    const handleGetCode = () => {
      if (!phoneInput) {
        return;
      }

      const phone = normalizePhone(phoneInput.value);
      setPhoneError("");

      if (!isValidChinaMobile(phone)) {
        setPhoneError("请输入正确的手机号（例如：1XXXXXXXXXX）。");
        phoneInput.focus();
        return;
      }

      if (cooldownTimer !== null) {
        return;
      }

      startCooldown(60);
      verifyCodeInput?.focus();
    };

    const handleSubmit = (event: Event) => {
      event.preventDefault();
      const phone = normalizePhone(phoneInput?.value ?? "");
      const code = (verifyCodeInput?.value ?? "").trim();
      setPhoneError("");

      if (!isValidChinaMobile(phone)) {
        setPhoneError("请输入正确的手机号后再提交。");
        phoneInput?.focus();
        return;
      }

      if (!code) {
        setVerifyHint("请先获取验证码并填写验证码。");
        verifyCodeInput?.focus();
        return;
      }

      setVerifyHint("咨询内容已记录，正式 API 接入后将走真实提交链路。");
    };

    getCodeBtn?.addEventListener("click", handleGetCode);
    contactForm?.addEventListener("submit", handleSubmit);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(timer);
      stopCooldown();
      if (revealFrame) {
        window.cancelAnimationFrame(revealFrame);
      }
      getCodeBtn?.removeEventListener("click", handleGetCode);
      contactForm?.removeEventListener("submit", handleSubmit);
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div id="contactPageRoot">
      <section className="hero">
        <div className="hero-bg" id="contactHeroBg">
          <div className="hero-overlay">
            <h1>联系我们</h1>
            <p>期待与您合作</p>
          </div>
        </div>
        <div className="hero-features" id="contactHeroFeatures">
          <div className="feature-item">
            <i className="fas fa-comments" />
            <p>在线咨询服务</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-phone-alt" />
            <p>电话快速响应</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-envelope-open-text" />
            <p>邮件详细沟通</p>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>联系方式</h2>
              <div className="info-item">
                <i className="fas fa-map-marker-alt" />
                <div>
                  <h3>地址</h3>
                  <p>XXX</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone" />
                <div>
                  <h3>电话</h3>
                  <p>XXX</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope" />
                <div>
                  <h3>邮箱</h3>
                  <p>
                    <a href="mailto:drevortex@163.com">drevortex@163.com</a>
                  </p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock" />
                <div>
                  <h3>工作时间</h3>
                  <p>周一至周五 9:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="contact-form card">
              <h2>在线咨询</h2>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="您的姓名" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="您的邮箱" required />
                </div>
                <div className="form-group">
                  <div className="phone-verify-row">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phone"
                      placeholder="您的手机号"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    <button type="button" id="getCodeBtn" className="get-code-btn">
                      获取验证码
                    </button>
                  </div>
                  <div id="phoneError" className="form-error" aria-live="polite" />
                  <input
                    type="text"
                    id="verifyCode"
                    name="code"
                    placeholder="验证码"
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                  <div id="verifyHint" className="verify-hint" aria-live="polite">
                    点击“获取验证码”，我们将为你在此手机号发送验证码进行验证
                  </div>
                </div>
                <div className="form-group">
                  <textarea placeholder="留言内容" rows={5} required />
                </div>
                <button type="submit" className="btn">
                  提交咨询
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
