export type Dict = Record<string, any>;

export type Routes = {
    admin: string[];
    manager: string[];
}

export type ProposalStatus =
  | 'canceled'
  | 'expired'
  | 'executed'
  | 'pending'
  | 'available';