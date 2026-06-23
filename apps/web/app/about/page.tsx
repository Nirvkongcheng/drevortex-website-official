import type { Metadata } from "next";
import { LegacyPageShell } from "@/components/layout/legacy-page-shell";
import { AboutParity } from "@/components/sections/about-parity";

export const metadata: Metadata = {
  title: "关于我们",
  description: "Drevortex 梦启新创关于我们页面",
};

export default function AboutPage() {
  return (
    <LegacyPageShell>
      <AboutParity />
    </LegacyPageShell>
  );
}
