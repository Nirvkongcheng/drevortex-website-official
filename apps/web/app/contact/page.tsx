import type { Metadata } from "next";
import { LegacyPageShell } from "@/components/layout/legacy-page-shell";
import { ContactParity } from "@/components/sections/contact-parity";

export const metadata: Metadata = {
  title: "联系我们",
  description: "Drevortex 梦启新创联系我们页面",
};

export default function ContactPage() {
  return (
    <LegacyPageShell>
      <ContactParity />
    </LegacyPageShell>
  );
}
