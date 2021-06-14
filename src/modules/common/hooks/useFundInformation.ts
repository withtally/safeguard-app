import { useState, useEffect, useCallback } from "react";
import { useParams } from "@reach/router";

// common
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import { parseBigNumber, labelNumber } from "modules/common/lib/helpers";
import { useSignedContract } from "modules/common/hooks/useSignedContract";
import ROLMANAGER_JSON from "modules/common/lib/abis/RolManager.json";
import TOKEN_JSON from "modules/common/lib/abis/Comp.json";

export const useFundInformation = () => {
  // router hooks
  const { rolManagerAddress } = useParams();

  // react hooks
  const [fundBalance, setFundBalance] = useState("0");
  const [timelockAddress, setTimelockAddress] = useState("");

  // constant
  const tokenAddress = CONTRACT_ADDRESSES.token.rinkeby;

  // custom hook
  const { signedContract: rolManagerSignedContract } = useSignedContract({
    contractAddress: rolManagerAddress,
    contractAbi: ROLMANAGER_JSON.abi,
  });
  const { signedContract: signedTokenContract } = useSignedContract({
    contractAddress: tokenAddress,
    contractAbi: TOKEN_JSON.abi,
  });

  const getFailSafeTokenBalance = useCallback(async () => {
    // fail safe timelock
    try {
      const timelock = await rolManagerSignedContract?.timelock();
      const bigBalance = await signedTokenContract?.balanceOf(timelock);
      const balance = parseBigNumber(Number(bigBalance.toString()));
      const fundBalanceLabel = labelNumber(balance);
      if (bigBalance) setFundBalance(fundBalanceLabel);
      setTimelockAddress(timelock);
    } catch (e) {
      console.log(
        "🚀 ~ file: useFundInformation.ts ~ line 27 ~ getFailSafeTokenBalance ~ e",
        e
      );
    }
  }, [rolManagerSignedContract, signedTokenContract]);

  useEffect(() => {
    if (signedTokenContract) getFailSafeTokenBalance();
  }, [signedTokenContract, getFailSafeTokenBalance]);

  return {
    fundBalance,
    timelockAddress,
    getFailSafeTokenBalance,
  };
};
