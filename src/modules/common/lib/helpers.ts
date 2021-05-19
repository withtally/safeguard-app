import { ethers } from "ethers";
import { abbreviate } from '@pqt/abbreviate';
import TOKEN_JSON from "modules/common/lib/abis/Comp.json";

// address
export const shortAddress = (
  address: string,
  initialLength = 6,
  endLength = -4
): string => `${address.slice(0, initialLength)}...${address.slice(endLength)}`;

export const parseBigNumber = (number: number): number => number / 1e18;

export const limitNumberDecimals = (number: number, precision = 2): number => {
  return Number(Number(number).toFixed(precision));
};

export const labelNumber = (number: number): string => {
  if (number > 10000) return abbreviate(number, 2);
  if (number === 0) return String(0);
  if (number > 0.01) return String(limitNumberDecimals(number));

  return '< 0.01';
};


export const unhashCalldata = (
  calldata: string
): ethers.utils.Result | undefined => {
  try {
    const tokenInterface = new ethers.utils.Interface(TOKEN_JSON.abi);

    const decodedData = tokenInterface.decodeFunctionData("transfer", calldata);

    return decodedData;
  } catch (error) {
    console.log("🚀 ~ file: helpers.ts ~ line 45 ~ error");
  }
};

