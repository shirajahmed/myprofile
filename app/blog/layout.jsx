import MainPageLayout from "../components/MainPageLayout";

export const metadata = {
  title: "Blog - Web Development Insights by Shiraj Ahmed",
  description: "Read the latest articles on React, Next.js, JavaScript, web development best practices, and frontend engineering insights by Shiraj Ahmed.",
  keywords: "web development blog, React tutorials, Next.js guides, JavaScript tips, frontend development, programming articles",
};

export default function BlogLayout({ children }) {
  return (
    <MainPageLayout>
      {children}
    </MainPageLayout>
  );
}
