import { ethers } from 'ethers';
import { abbreviate } from '@pqt/abbreviate';
import { isAddress } from 'ethers/lib/utils';
import isEmpty from 'lodash.isempty';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';

// common
import { UsersInformation } from 'modules/common/hooks/useUserInformation';

// address
export const shortAddress = (address: string, initialLength = 6, endLength = -4): string =>
  `${address.slice(0, initialLength)}...${address.slice(endLength)}`;

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
  calldata: string,
  abi: any,
  funcName: string,
): ethers.utils.Result | undefined => {
  try {
    const contractInterface = new ethers.utils.Interface(abi);

    const decodedData = contractInterface.decodeFunctionData(funcName, calldata);

    return decodedData;
  } catch (error) {
    console.log('🚀 ~ file: helpers.ts ~ line 45 ~ error');
  }
};

export const getProfileImage = (
  usersInformation: UsersInformation,
  address?: string,
): string | null => {
  return address ? usersInformation?.[address]?.avatarUrl : null;
};

export const getUsername = (
  usersInformation: UsersInformation,
  address?: string | null,
  isTruncated = true,
): string | null => {
  if (!address) {
    return null;
  }

  // methods
  const applyTruncation = (address: string): string => {
    return isTruncated ? shortAddress(address) : address;
  };

  // constants
  const noUsersInformation = isEmpty(usersInformation);

  if (noUsersInformation) {
    return applyTruncation(address);
  }

  // constants
  const displayName = usersInformation[address]?.displayName ?? '';
  const username = displayName ? displayName : address;

  return isAddress(username) ? applyTruncation(username) : username;
};
