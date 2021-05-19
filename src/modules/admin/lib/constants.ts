// common
import { ROLES_HASHES } from "modules/common/lib/constants";

export const ROLES = [
    { id: ROLES_HASHES.proposerRole, label: 'Proposer', },
    { id: ROLES_HASHES.executorRole, label: 'Executor' },
    { id: ROLES_HASHES.cancelerRole, label: 'Canceler' },
  ];

  export const FundManagementSteps = [
    'Review the payments requested to FailSafe.',
    "You can cancel the transaction if doesn't comply to the grant agreement."
  ];