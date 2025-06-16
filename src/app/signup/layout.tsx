import WelcomeLayout from "@components/layouts/WelcomeLayout";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return WelcomeLayout({ children });
}
