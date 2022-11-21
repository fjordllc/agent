import { ReactElement } from "react";
import Dashboard from "../components/Dashboard";
import Multi from "../components/layouts/Multi";
import Single from "../components/layouts/Single";
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
