import { ReactElement } from "react";
import Auth from "../components/Auth";
import Single from "../components/layouts/Single";

function Login() {
  return <Auth />;
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Single>{page}</Single>;
};

export default Login;
