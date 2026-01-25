import MainPageLayout from "../components/MainPageLayout";

export const metadata = {
  title: "Ideas - Web Development Insights by Shiraj Ahmed",
  description: "Explore the latest ideas and articles on React, Next.js, JavaScript, web development best practices, AI, and frontend engineering insights by Shiraj Ahmed.",
  keywords: "web development ideas, React insights, Next.js concepts, JavaScript tips, frontend development, AI in web, programming articles",
};

export default function BlogLayout({ children }) {
  return (
    <MainPageLayout>
      {children}
    </MainPageLayout>
  );
}
