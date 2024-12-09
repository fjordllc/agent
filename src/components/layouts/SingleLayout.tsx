import Header from "@components/Header";
import Footer from "@components/Footer";

export default function SingleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
