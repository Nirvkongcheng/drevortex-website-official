"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/theme-store";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我们" },
  { href: "/services", label: "服务业务" },
  { href: "/cases", label: "案例展示" },
  { href: "/contact", label: "联系我们" },
];

const HOME_SKIP_INTRO_KEY = "home-skip-intro-once";

export function LegacyPageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const markSkipHomeIntro = (href: string) => {
    setMenuOpen(false);
    if (href === "/" && pathname !== "/") {
      window.sessionStorage.setItem(HOME_SKIP_INTRO_KEY, "true");
      document.documentElement.setAttribute("data-home-skip-intro", "true");
    }
  };

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  // 统一导航栏动画：淡入 + 滚动收缩（首页由 HomeParity 接管，此处跳过）
  useEffect(() => {
    if (isHome) return;
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    // 初始隐藏 → 渐现
    navbar.style.opacity = "0";
    navbar.style.transform = "translateY(-12px)";
    navbar.style.transition = "opacity 0.8s cubic-bezier(0.22,0.61,0.36,1), transform 0.8s cubic-bezier(0.22,0.61,0.36,1)";
    const fadeInTimer = window.setTimeout(() => {
      navbar.style.opacity = "1";
      navbar.style.transform = "translateY(0)";
    }, 120);

    // 滚动收缩
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 清理 transition 避免影响后续 hover
    const cleanupTimer = window.setTimeout(() => {
      navbar.style.transition = "";
    }, 1000);

    return () => {
      window.clearTimeout(fadeInTimer);
      window.clearTimeout(cleanupTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  return (
    <>
      <nav className="navbar" id="navbar">
        <Link href="/" className="logo" onClick={() => markSkipHomeIntro("/")}>
          <span>
            <span className="dre-white">Dre</span>
            <span className="vortex-blue">vortex</span>
          </span>
        </Link>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? "active" : ""}
                onClick={() => markSkipHomeIntro(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="theme-toggle"
          aria-label="切换主题"
          type="button"
          onClick={toggleTheme}
        >
          <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"} />
        </button>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <i className="fas fa-bars" />
        </button>
      </nav>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column footer-about">
            <h3 className="footer-brand-title">
              <Image
                src="/legacy/home/company-icon.png"
                alt="梦启新创 Logo"
                width={28}
                height={28}
                className="footer-brand-logo"
              />
              <span>
                梦启新创 · <span className="wordmark-joined" aria-label="Drevortex"><span className="dre-part">Dre</span><span className="vortex-blue">vortex</span></span>
              </span>
            </h3>
            <p>
              梦启新创网络科技有限公司致力于通过技术创新为企业提供数字化解决方案，助力客户在数字时代获得竞争优势。
            </p>
            <p>
              官方域名：
              <a href="https://drevortex.com" target="_blank" rel="noreferrer">
                drevortex.com
              </a>
            </p>
          </div>

          <div className="footer-column">
            <h3>快速导航</h3>
            <ul className="footer-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => markSkipHomeIntro(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>核心业务</h3>
            <ul className="footer-links">
              <li>
                <Link href="/services">软件开发</Link>
              </li>
              <li>
                <Link href="/services">网页制作</Link>
              </li>
              <li>
                <Link href="/services">微信小程序开发</Link>
              </li>
              <li>
                <Link href="/services">Logo商标＆商用图片设计</Link>
              </li>
              <li>
                <Link href="/services">互联网咨询</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <h3>联系我们</h3>
            <p>
              <i className="fas fa-map-marker-alt" /> XXX
            </p>
            <p>
              <i className="fas fa-phone" /> XXX
            </p>
            <p>
              <i className="fas fa-envelope" />{" "}
              <a href="mailto:drevortex@163.com">drevortex@163.com</a>
            </p>
            <p>
              <i className="fas fa-clock" /> 周一至周五 9:00 - 18:00
            </p>
          </div>
        </div>
        <div className="copyright">
          <p>
            © 2026 梦启新创网络科技有限公司 ·{" "}
            <a href="https://drevortex.com" target="_blank" rel="noreferrer">
              drevortex.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
