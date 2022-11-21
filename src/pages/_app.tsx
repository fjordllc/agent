import type { AppPropsWithLayout } from "next/app";
import "../../styles/globals.css";
import Multi from "../components/layouts/Multi";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  } else {
    return (
      <Multi>
        <Component {...pageProps} />
      </Multi>
    );
  }
}
