import type { NextPage, NextPageWithLayout } from "next";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";

declare module "next" {
  type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement;
  };
}

declare module "next/app" {
  type AppPropsWithLayout<P = Record<string, never>> = AppProps<P> & {
    Component: NextPageWithLayout<P>;
  };
}
