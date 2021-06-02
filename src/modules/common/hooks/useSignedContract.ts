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

export const useSignedContract = ({ contractAddress, contractAbi }: Props) => {
  const { signer } = useWeb3();

  const signedContract = new Contract(contractAddress, contractAbi, signer);

  return { signedContract };
};
