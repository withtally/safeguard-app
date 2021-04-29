import { FC } from "react";
import { Router } from "@reach/router";

// layout
import Layout from "modules/layout/components/Layout";

// common
import PrivateRoute from "modules/common/lib/router/PrivateRoute";
import PublicRoute from "modules/common/lib/router/PublicRoute";

// home
import Home from "modules/home/Home";

// admin
import Roles from "modules/admin/components/Roles";
import AdministrateFund from "modules/admin/components/AdministrateFund";

// manager
import ManageFund from "modules/manager/components/ManageFund";

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <PublicRoute component={Home} path="/" />
        <PrivateRoute component={Roles} path="/administrator" />
        <PrivateRoute component={AdministrateFund} path="/administrator/fund" />
        <PrivateRoute component={ManageFund} path="/manager" />
      </Router>
    </Layout>
  );
};

export default App;
