import type { Metadata } from "next";
import { LegacyPageShell } from "@/components/layout/legacy-page-shell";
import { ContactPortfolio } from "@/components/contact/contact-portfolio";
import "../contact-portfolio.css";

export const metadata: Metadata = {
  title: "联系我们",
  description: "Drevortex 梦启新创联系我们页面",
};

export default function ContactPage() {
  return (
    <LegacyPageShell>
      <div className="contact-portfolio-root">
        <ContactPortfolio />
      </div>
    </LegacyPageShell>
  );
}
