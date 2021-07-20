import { useState, useEffect, useCallback } from 'react';
import { useParams } from '@reach/router';
import {Contract} from 'ethers';

// common
import { CONTRACT_ADDRESSES } from 'modules/common/lib/constants';
import { parseBigNumber, labelNumber } from 'modules/common/lib/helpers';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';
import TOKEN_JSON from 'modules/common/lib/abis/Comp.json';
import {useReadOnlyProvider} from 'modules/common/hooks/useReadOnlyProvider';

export const useFundInformation = () => {
  // router hooks
  const { safeGuardAddress } = useParams();
  // custom hooks
  const {readOnlyProvider} = useReadOnlyProvider();

  // react hooks
  const [fundBalance, setFundBalance] = useState('0');
  const [timelockAddress, setTimelockAddress] = useState('');

  // constant
  const tokenAddress = CONTRACT_ADDRESSES.token[process.env.REACT_APP_ETHEREUM_NETWORK];

  const tokenContract = new Contract(
    tokenAddress,
    TOKEN_JSON.abi,
    readOnlyProvider
  );

  const safeGuardContract = new Contract(
    safeGuardAddress,
    SAFEGUARD_JSON.abi,
    readOnlyProvider
  );

  const getSafeGuardTokenBalance = async () => {
    // SafeGuard timelock
    try {
      const timelock = await safeGuardContract?.timelock();
      const bigBalance = await tokenContract?.balanceOf(timelock);
      const balance = parseBigNumber(Number(bigBalance.toString()));
      const fundBalanceLabel = labelNumber(balance);
      if (bigBalance) setFundBalance(fundBalanceLabel);
      setTimelockAddress(timelock);
    } catch (e) {
      console.log('🚀 ~ file: useFundInformation.ts ~ line 27 ~ getSafeGuardTokenBalance ~ e', e);
    }
  };
  
  useEffect(() => {
    if (tokenContract) getSafeGuardTokenBalance();
  }, []);

  return {
    fundBalance,
    timelockAddress,
    getSafeGuardTokenBalance,
  };
};
