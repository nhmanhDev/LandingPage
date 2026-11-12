import type { Metadata } from "next";
import { LegalPage } from "@/components/brand/LegalPage";
import { LEGAL } from "@/lib/brand/legal";

const { title, description } = LEGAL.vi.privacy.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title, description, url: "https://ai42e.com/privacy", siteName: "AI42E", type: "website" },
};

export default function PrivacyPage() {
  return <LegalPage doc="privacy" />;
}
