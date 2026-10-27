import type { Metadata } from "next";
import { TRADING } from "@/lib/trading/content";

export const metadata: Metadata = {
  title: TRADING.vi.meta.title,
  description: TRADING.vi.meta.description,
};

export default function InvestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
