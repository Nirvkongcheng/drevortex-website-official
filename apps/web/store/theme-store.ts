"use client";

import { create } from "zustand";

export type ThemeMode = "dark" | "light";

type ThemeStore = {
  theme: ThemeMode;
  initialized: boolean;
  initialize: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "theme";

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.body.classList.toggle("dark-mode", theme === "dark");
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  initialized: false,
  initialize: () => {
    if (get().initialized || typeof window === "undefined") {
      return;
    }

    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const preferredTheme = savedTheme ?? "light";

    applyTheme(preferredTheme);

    set({
      theme: preferredTheme,
      initialized: true,
    });
  },
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
    }

    set({ theme, initialized: true });
  },
  toggleTheme: () => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";
    get().setTheme(nextTheme);
  },
}));
