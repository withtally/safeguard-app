export type InitialValuesRoles = {
  role: string;
  address: string;
};

export type InitialValuesSendValues = {
  amount: string;
  amountType: string;
}

export type GrantedRole = {
  address: string;
  roleId: string;
}


export type Transaction = {
  txHash: string;
  eta: string;
  transferTo?: string;
  rawAmount?: string;
  date: string;
  signature: string;
  target: string;
  data: string;
  value: string;
  currentlyQueued: boolean;
  canceled: boolean;
  executed: boolean;
  stale: boolean;
  executableTime: number;
  expireDate: string;
};