import React from "react";
import { Redirect, RouteComponentProps } from "@reach/router";

// common
import { ROUTES } from "modules/common/lib/routes";
import { ALLOWED_PATH_BY_ROLE } from "modules/common/lib/constants";
import { useUserInfo } from "modules/common/hooks/useUserInfo";

type Prop = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type Props = {
  component: React.FC<RouteComponentProps<{}>>;
  path: string;
  rest?: Prop;
};

// TODO: Type return type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ component: Component, path, ...rest }: Props): any => {
  const { userRole } = useUserInfo();

  const isAllowedPath =
    userRole &&
    ALLOWED_PATH_BY_ROLE[userRole].some((allowedPath) => allowedPath === path);

  if (isAllowedPath) return <Component path={path} {...rest} />;

  if (!isAllowedPath) return <Redirect noThrow to={ROUTES.home} />;

  return null;
};

export default PrivateRoute;
