import React from 'react';
import { RouteComponentProps } from '@reach/router';

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
const PublicRoute = ({ component: Component, path, ...rest }: Props): any => {
  return <Component path={path} {...rest} />;
};

export default PublicRoute;
