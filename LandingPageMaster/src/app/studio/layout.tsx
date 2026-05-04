import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI42E STUDIO - Nền tảng tạo Video AI tự động",
  description: "Tự động viết kịch bản, tạo video có phụ đề, nhạc nền và hỗ trợ nhiều ngôn ngữ.",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
