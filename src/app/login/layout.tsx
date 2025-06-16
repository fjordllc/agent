import WelcomeLayout from "@components/layouts/WelcomeLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return WelcomeLayout({ children });
}
