import { useState, useEffect, useCallback } from 'react';
import { useParams } from '@reach/router';
import {Contract} from 'ethers';

// common
import { CONTRACT_ADDRESSES } from 'modules/common/lib/constants';
import { parseBigNumber, labelNumber } from 'modules/common/lib/helpers';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';
import TOKEN_JSON from 'modules/common/lib/abis/Comp.json';
import { useSignedContract } from 'modules/common/hooks/useSignedContract';

export const useFundInformation = () => {
  // router hooks
  const { safeGuardAddress } = useParams();

  // react hooks
  const [fundBalance, setFundBalance] = useState('0');
  const [timelockAddress, setTimelockAddress] = useState('');

  // constant
  const tokenAddress = CONTRACT_ADDRESSES.token[process.env.REACT_APP_ETHEREUM_NETWORK];

  // custom hooks
  const { signedContract: tokenSignedContract } = useSignedContract({
    contractAddress: tokenAddress,
    contractAbi: TOKEN_JSON.abi,
  });

  const { signedContract: signedRolContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });

  useEffect(() => {
    const getSafeGuardTokenBalance = async () => {
      // SafeGuard timelock
      try {
        const timelock = await signedRolContract?.timelock();
        const bigBalance = await tokenSignedContract?.balanceOf(timelock);
        const balance = parseBigNumber(Number(bigBalance.toString()));
        const fundBalanceLabel = labelNumber(balance);
        if (bigBalance) setFundBalance(fundBalanceLabel);
        setTimelockAddress(timelock);
      } catch (e) {
        console.log('🚀 ~ file: useFundInformation.ts ~ line 27 ~ getSafeGuardTokenBalance ~ e', e);
      }
    };
    
    if (tokenSignedContract) getSafeGuardTokenBalance();
  }, [tokenSignedContract, signedRolContract ]);

  return {
    fundBalance,
    timelockAddress,
  };
};
