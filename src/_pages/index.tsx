import { ReactElement } from "react";
import Dashboard from "../components/Dashboard";
import Multi from "../components/layouts/MulitLayout";
import Single from "../components/layouts/SingleLayout";
import Welcome from "../components/Welcome";
import useSession from "../hooks/useSession";

function Home() {
  const [session] = useSession();
  const Component = session ? Dashboard : Welcome;
  return <Component />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  const [session] = useSession();
  const Layout = session ? Multi: Single;
  return <Layout>{page}</Layout>;
};

export default Home;
