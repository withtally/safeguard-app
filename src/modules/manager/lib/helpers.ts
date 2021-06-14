import dayjs from "dayjs";
import { ethers } from "ethers";
import { Transaction } from "modules/admin/lib/types";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { ProposalStatus } from "modules/common/lib/types";

dayjs.extend(advancedFormat);

export const getCurrentBlockTimestamp = async (
  provider: ethers.providers.Web3Provider
): Promise<number> => {
  const currentBlock = await provider.getBlock("latest");
  const currentTimestamp = currentBlock?.timestamp ?? 0;
  return currentTimestamp;
};

export const getTransactionEta = async (
  timelockDelay: number,
  provider: ethers.providers.Web3Provider
): Promise<number> => {
  const currentTimestamp = await getCurrentBlockTimestamp(provider);
  const transactionEta = currentTimestamp + timelockDelay + 50;

  return transactionEta;
};

export const getTransactionStatus = (
  transaction: Transaction
): ProposalStatus => {
  const currentTime = dayjs().format("X");
  const etaMeet = Number(transaction.eta) <= Number(currentTime);

  if (transaction.canceled) {
    return "canceled";
  }

  if (etaMeet && transaction.currentlyQueued && !transaction.stale) {
    return "available";
  }

  if (transaction.stale) {
    return "expired";
  }

  if (transaction.executed) {
    return "executed";
  }

  if (transaction.currentlyQueued) {
    return "pending";
  }

  return "pending";
};
