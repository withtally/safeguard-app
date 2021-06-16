import { useState, useEffect, useCallback } from "react";
import { useParams } from "@reach/router";

// common
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import { parseBigNumber, labelNumber } from "modules/common/lib/helpers";
import { useSignedContract } from "modules/common/hooks/useSignedContract";
import SAFEGUARD_JSON from "modules/common/lib/abis/SafeGuard.json";
import TOKEN_JSON from "modules/common/lib/abis/Comp.json";

export const useFundInformation = () => {
  // router hooks
  const { safeGuardAddress } = useParams();

  // react hooks
  const [fundBalance, setFundBalance] = useState("0");
  const [timelockAddress, setTimelockAddress] = useState("");

  // constant
  const tokenAddress = CONTRACT_ADDRESSES.token.rinkeby;

  // custom hook
  const { signedContract: safeGuardSignedContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });
  const { signedContract: signedTokenContract } = useSignedContract({
    contractAddress: tokenAddress,
    contractAbi: TOKEN_JSON.abi,
  });

  const getSafeGuardTokenBalance = useCallback(async () => {
    // SafeGuard timelock
    try {
      const timelock = await safeGuardSignedContract?.timelock();
      const bigBalance = await signedTokenContract?.balanceOf(timelock);
      const balance = parseBigNumber(Number(bigBalance.toString()));
      const fundBalanceLabel = labelNumber(balance);
      if (bigBalance) setFundBalance(fundBalanceLabel);
      setTimelockAddress(timelock);
    } catch (e) {
      console.log(
        "🚀 ~ file: useFundInformation.ts ~ line 27 ~ getSafeGuardTokenBalance ~ e",
        e
      );
    }
  }, [safeGuardSignedContract, signedTokenContract]);

  useEffect(() => {
    if (signedTokenContract) getSafeGuardTokenBalance();
  }, [signedTokenContract, getSafeGuardTokenBalance]);

  return {
    fundBalance,
    timelockAddress,
    getSafeGuardTokenBalance,
  };
};
