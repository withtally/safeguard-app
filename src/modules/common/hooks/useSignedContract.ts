import { Contract } from "ethers";

// common
import { useWeb3 } from "modules/common/hooks/useWeb3";

type Values = {
  signedContract?: Contract;
};

type Props = {
  contractAddress: string;
  contractAbi: any;
};

export const useSignedContract = ({
  contractAddress,
  contractAbi,
}: Props): Values => {
  const { signer } = useWeb3();

  const signedContract = contractAddress
    ? new Contract(contractAddress, contractAbi, signer)
    : undefined;

  return { signedContract };
};
