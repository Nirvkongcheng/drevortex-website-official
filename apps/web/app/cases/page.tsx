import type { Metadata } from "next";
import { LegacyPageShell } from "@/components/layout/legacy-page-shell";
import { CasesParity } from "@/components/sections/cases-parity";

export const metadata: Metadata = {
  title: "案例展示",
  description: "Drevortex 梦启新创案例展示页面",
};

export default function CasesPage() {
  return (
    <LegacyPageShell>
      <CasesParity />
    </LegacyPageShell>
  );
}
