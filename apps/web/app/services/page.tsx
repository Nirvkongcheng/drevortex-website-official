import type { Metadata } from "next";
import { LegacyPageShell } from "@/components/layout/legacy-page-shell";
import { ServicesParity } from "@/components/sections/services-parity";

export const metadata: Metadata = {
  title: "服务业务",
  description: "Drevortex 梦启新创服务业务页面",
};

export default function ServicesPage() {
  return (
    <LegacyPageShell>
      <ServicesParity />
    </LegacyPageShell>
  );
}
