import WelcomeHeader from "@/components/WelcomeHeader";
import WelcomeFooter from "@/components/WelcomeFooter";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="WelcomeLayout" className="flex flex-col min-h-screen">
      <div className="flex-1">
        <WelcomeHeader />
        {children}
      </div>
      <WelcomeFooter />
    </div>
  );
}
