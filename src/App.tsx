import { FC } from "react";
import { Router } from "@reach/router";

// layout
import Layout from "modules/layout/components/Layout";

// common
import PublicRoute from "modules/common/lib/router/PublicRoute";

// home
import Home from "modules/home/components/Home";

// admin
import Roles from "modules/admin/components/Roles";
import Manage from "modules/admin/components/Manage";

// manager
import Payments from "modules/manager/components/Payments";

// failSafe
import FailSafe from "modules/failSafe/components/FailSafe";

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <PublicRoute component={Home} path="/" />
        <PublicRoute component={Roles} path="/roles" />
        <PublicRoute component={Manage} path="/manage" />
        <PublicRoute component={Payments} path="/payments" />
        <PublicRoute component={FailSafe} path="/safes" />
      </Router>
    </Layout>
  );
};

export default App;
