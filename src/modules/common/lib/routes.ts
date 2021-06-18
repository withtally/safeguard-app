export const ROUTES = {
  home: `/`,
  roles: `/roles`,
  manage: `/manage`,
  payments: '/payments',
  safes: '/safes',
  viewSafe: (address: string) => `/view/${address}`,
};
