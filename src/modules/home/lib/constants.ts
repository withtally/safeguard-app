// home
import { StateInfo } from "modules/home/lib/types";

export const ROLES_INFORMATION = [
  {
    role: "Administrator",
    description:
      "The general manager of all the roles in the SafeGuard has the power to grant or revoke any role in the app.",
    assignmentTime:
      "This role can only be assigned when we deploy the SafeGuard contract.",
  },
  {
    role: "Proposer",
    description:
      "This role is can make payment request to the SafeGuard, the request will be queued in the timelock.",
    assignmentTime: "Anytime if we have the Administrator role",
  },
  {
    role: "Executor",
    description:
      "This role can execute the payment request after the timelock delay has pass to receive the payment.",
    assignmentTime: "Anytime if we have the Administrator role",
  },
  {
    role: "Canceler",
    description:
      "This role is can audit the payments requests made to the SafeGuard. It can cancel payments request if they are not adequate.",
    assignmentTime: "Anytime if we have the Administrator role",
  },
];

export const STATES_INFORMATION: StateInfo[] = [
  {
    state: "pending",
    description:
      "This is the initial state of a payment request. Literally means that is waiting for the timelock delay to be pass.",
  },
  {
    state: "available",
    description:
      "After the timelock delay passes the payment request is in this state. It means that the request can be executed to received the payment.",
  },
  {
    state: "executed",
    description:
      " After an available payment request is executed, it gets this state. This completes the happy path flow and the funds are sent to the specified address and the request is closed.",
  },
  {
    state: "expired",
    description:
      "When a payment request passes the timelock delay, it has an defined execution period. If the request is not executed within this period is automatically set to this state, the request is closed.",
  },
  {
    state: "canceled",
    description:
      " When a payment request is canceled it arrives to this state and closes the payment request.",
  },
];
