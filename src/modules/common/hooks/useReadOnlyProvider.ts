import { useMemo } from 'react';
import { ethers, providers } from 'ethers';

type Values = {
  readOnlyProvider: providers.AlchemyProvider;
};

export const useReadOnlyProvider = (): Values => {
  // constants
  const apiKey = process.env.REACT_APP_INFURA_ID;

  const readOnlyProvider = useMemo(
    () => new ethers.providers.InfuraProvider('rinkeby', apiKey),
    [apiKey],
  );

  return { readOnlyProvider };
};
