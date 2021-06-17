export type InitialValuesCreateSafeGuard = {
  delay: string;
  safeGuardName: string;
  rolesAssignations: RoleAssgination[];
};

export type SafeGuard = {
  admin: string;
  safeGuardAddress: string;
  safeGuardName: string;
  timelockAddress: string;
};

export type RoleAssgination = {
  role: string;
  address: string;
};
