import type { Metadata } from "next";
import { LegalPage } from "@/components/brand/LegalPage";
import { LEGAL } from "@/lib/brand/legal";

const { title, description } = LEGAL.vi.terms.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title, description, url: "https://ai42e.com/terms", siteName: "AI42E", type: "website" },
};

export default function TermsPage() {
  return <LegalPage doc="terms" />;
}
