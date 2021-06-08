import { utils } from "ethers";
import { unhashCalldata } from "../helpers";
import dayjs from "dayjs";

type Transaction = {
  txHash: string;
  eta: string;
  transferTo?: string;
  rawAmount?: string;
  date: string;
  signature: string;
  target: string;
  data: string;
  value: string;
  executableTime: number;
  expireDate: string;
  description: string;
};

export const parseTransaction = (
  transaction: utils.Result,
  gracePeriod: number
): Transaction => {
  const decodedInfo = unhashCalldata(transaction.data);

  const executableTime = gracePeriod + Number(transaction.eta.toString());

  return {
    txHash: transaction.txHash,
    signature: transaction.signature,
    target: transaction.target,
    data: transaction.data,
    value: transaction.value,
    eta: transaction.eta.toString(),
    transferTo: decodedInfo?.dst,
    rawAmount: decodedInfo?.rawAmount.toString(),
    description: transaction.description,
    date: dayjs(transaction.eta * 1000).format("MM/DD/YYYY hh:mm:ss A"),
    expireDate: dayjs(executableTime * 1000).format("MM/DD/YYYY hh:mm:ss A"),
    executableTime,
  };
};
