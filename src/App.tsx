import { FC } from "react";
import { Router } from "@reach/router";

// layout
import Layout from "modules/layout/components/Layout";

// common
import PublicRoute from "modules/common/lib/router/PublicRoute";

// home
import Home from "modules/home/components/Home";

// failSafe
import FailSafe from "modules/failSafe/components/FailSafe";
import FailSafeView from "modules/failSafe/components/FailSafeView";

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <PublicRoute component={Home} path="/" />
        <PublicRoute component={FailSafe} path="/safes" />
        <PublicRoute component={FailSafeView} path="/view/:rolManagerAddress" />
      </Router>
    </Layout>
  );
};

export default App;
