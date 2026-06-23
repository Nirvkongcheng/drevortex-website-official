"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site-content";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <nav className="navbar" id="navbar">
      <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
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
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <ThemeToggle />

      <button
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="切换导航菜单"
        aria-expanded={menuOpen}
        type="button"
      >
        <i className="fas fa-bars" />
      </button>
    </nav>
  );
}
