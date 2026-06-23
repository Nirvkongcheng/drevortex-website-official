"use client";

import { useThemeStore } from "@/store/theme-store";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="切换主题"
    >
      <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"} />
    </button>
  );
}
