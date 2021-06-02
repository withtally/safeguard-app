import { Contract } from "ethers";

// common
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import TOKEN_JSON from "modules/common/lib/abis/Comp.json";
import { useWeb3 } from "modules/common/hooks/useWeb3";

type Values = {
  signedContract?: Contract;
};

export const useSignedTokenContract = (): Values => {
  const { signer } = useWeb3();

  const tokenAddress = CONTRACT_ADDRESSES.token.rinkeby;
  const signedContract = new Contract(tokenAddress, TOKEN_JSON.abi, signer);

  return { signedContract };
};
