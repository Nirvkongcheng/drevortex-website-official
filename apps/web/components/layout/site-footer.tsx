import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image
                src="/legacy/home/company-icon.png"
                alt="梦启新创"
                width={40}
                height={40}
              />
              <div className="footer-logo-text">
                <span className="footer-logo-en" aria-label="Drevortex"><span className="dre-part">Dre</span><span className="vortex-blue">vortex</span></span>
                <span className="footer-logo-cn">梦启新创</span>
              </div>
            </div>
            <p className="footer-tagline">以梦想为起点，以创新为驱动</p>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-column footer-about">
          <h3>关于我们</h3>
          <p>
            梦启新创网络科技有限公司致力于通过技术创新为企业提供数字化解决方案，助力客户在数字时代获得竞争优势。
          </p>
          <div className="footer-social">
            <a href="#" aria-label="微信">
              <i className="fab fa-weixin" />
            </a>
            <a href="#" aria-label="微博">
              <i className="fab fa-weibo" />
            </a>
            <a href="#" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>快速导航</h3>
          <ul className="footer-links">
            <li>
              <Link href="/">首页</Link>
            </li>
            <li>
              <Link href="/about">关于我们</Link>
            </li>
            <li>
              <Link href="/services">服务业务</Link>
            </li>
            <li>
              <Link href="/cases">案例展示</Link>
            </li>
            <li>
              <Link href="/contact">联系我们</Link>
            </li>
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
              <Link href="/services">Logo商标＆设计</Link>
            </li>
            <li>
              <Link href="/services">互联网咨询</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-contact">
          <h3>联系我们</h3>
          <p>
            <i className="fas fa-envelope" />{" "}
            <a href="mailto:drevortex@163.com">drevortex@163.com</a>
          </p>
          <p>
            <i className="fas fa-clock" /> 周一至周五 9:00 - 18:00
          </p>
          <p>
            <i className="fas fa-globe" />{" "}
            <a href="https://drevortex.com" target="_blank" rel="noreferrer">
              drevortex.com
            </a>
          </p>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <p>© 2026 梦启新创网络科技有限公司 · 保留所有权利</p>
          <p className="copyright-links">
            <a href="#">隐私政策</a>
            <span className="copyright-divider">|</span>
            <a href="#">服务条款</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
