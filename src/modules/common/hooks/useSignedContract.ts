import { useMemo } from 'react';
import { Contract } from 'ethers';

// common
import { useWeb3 } from 'modules/common/hooks/useWeb3';

type Values = {
  signedContract?: Contract;
};

type Props = {
  contractAddress: string;
  contractAbi: any;
};

export const useSignedContract = ({ contractAddress, contractAbi }: Props): Values => {
  const { signer } = useWeb3();

  const signedContract = useMemo(
    () =>
      contractAddress && signer ? new Contract(contractAddress, contractAbi, signer) : undefined,
    [contractAbi, contractAddress, signer],
  );

  return { signedContract };
};
