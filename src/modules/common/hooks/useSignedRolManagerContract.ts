import { useEffect, useState } from "react";
import { Contract } from "ethers";

// common
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import ROLE_MANAGER_JSON from "modules/common/lib/abis/RolManager.json";
import { useWeb3 } from "modules/common/hooks/useWeb3";

type Values = {
  signedContract?: Contract;
};

export const useSignedRolManagerContract = (): Values => {
  const { signer } = useWeb3();

  const rolManagerAddress = CONTRACT_ADDRESSES.rolManager.rinkeby;
  const signedContract = new Contract(
    rolManagerAddress,
    ROLE_MANAGER_JSON.abi,
    signer
  );

  return { signedContract };
};
