export type InitialValuesCreateSafeGuard = {
  delay: string;
  safeGuardName: string;
  roles: string[];
  rolesAssignees: string[];
};

export type SafeGuard = {
  admin: string;
  safeGuardAddress: string;
  safeGuardName: string;
  timelockAddress: string;
};
