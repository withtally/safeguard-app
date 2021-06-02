import { useState, useEffect } from "react";

// common
import { useSignedTokenContract } from "modules/common/hooks/useSignedTokenContract";
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import { parseBigNumber, labelNumber } from "modules/common/lib/helpers";

export const useFundInformation = () => {
  // react hooks
  const [fundBalance, setFundBalance] = useState("0");

  // custom hook
  const { signedContract: signedTokenContract } = useSignedTokenContract();

  // constant
  const timelockAddress = CONTRACT_ADDRESSES.timelock.rinkeby;

  useEffect(() => {
    const getFailSafeTokenBalance = async () => {
      // fail safe timelock
      try {
        const bigBalance = await signedTokenContract?.balanceOf(
          timelockAddress
        );
        const balance = parseBigNumber(Number(bigBalance.toString()));
        const fundBalanceLabel = labelNumber(balance);
        if (bigBalance) setFundBalance(fundBalanceLabel);
      } catch (e) {
        console.log(
          "🚀 ~ file: useFundInformation.ts ~ line 27 ~ getFailSafeTokenBalance ~ e",
          e
        );
      }
    };

    if (signedTokenContract) getFailSafeTokenBalance();
  }, [timelockAddress, signedTokenContract]);

  return {
    fundBalance,
    timelockAddress,
  };
};
