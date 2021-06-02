export const PaymentsFlowSteps = [
  { type: "Step 1", description: "Request a payment from the FailSafe." },
  {
    type: "Step 2",
    description:
      "If the request is not canceled by the admin, wait until the timelock delay has passed to execute.",
  },
  {
    type: "Step 3",
    description: "Execute the payment request to receive the funds.",
  },
];
