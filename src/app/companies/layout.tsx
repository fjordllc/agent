import { Zen_Maru_Gothic, M_PLUS_Rounded_1c } from "next/font/google";
import MultiLayout from "@components/layouts/MulitLayout";

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-zen-maru",
});

const mPlus = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-mplus-rounded",
});

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${zenMaru.variable} ${mPlus.variable}`}>
      <MultiLayout>{children}</MultiLayout>
    </div>
  );
}
