import { FC } from "react";
import { Router } from "@reach/router";

// layout
import Layout from "modules/layout/components/Layout";

// common
import PublicRoute from "modules/common/lib/router/PublicRoute";

// home
import Home from "modules/home/components/Home";

// failSafe
import SafeGuard from "modules/safeGuard/components/SafeGuard";
import SafeGuardView from "modules/safeGuard/components/SafeGuardView";

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <PublicRoute component={Home} path="/" />
        <PublicRoute component={SafeGuard} path="/safes" />
        <PublicRoute component={SafeGuardView} path="/view/:safeGuardAddress" />
      </Router>
    </Layout>
  );
};

export default App;
