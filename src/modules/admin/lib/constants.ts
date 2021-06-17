// common
import { ROLES_HASHES } from "modules/common/lib/constants";

export const ROLES = [
  { id: ROLES_HASHES.proposerRole, label: "Proposer" },
  { id: ROLES_HASHES.executorRole, label: "Executor" },
  { id: ROLES_HASHES.cancelerRole, label: "Canceler" },
];

export const FundManagementSteps = [
  {
    type: "Step 1",
    description: "Review the payments requested to SafeGuard.",
  },
  {
    type: "Step 2",
    description:
      "You can cancel the transaction if doesn't comply to the grant agreement.",
  },
];

export const ROLE_TYPES_INFO = [
  {
    type: "Proposer",
    description:
      "The proposer role is the one that can make payment request to the SafeGuard, this request will be queued in the timelock.",
  },
  {
    type: "Executor",
    description:
      "The executor role is the one that can execute the payment request after the timelock delay has pass to receive the payment.",
  },
  {
    type: "Canceler",
    description:
      "The canceler role is the one that will audit the payments requests made to the SafeGuard. This role can cancel payments request if they are not adequate.",
  },
];
