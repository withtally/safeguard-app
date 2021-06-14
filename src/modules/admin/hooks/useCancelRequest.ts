import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useToast } from "@chakra-ui/react";
import { useParams } from "@reach/router";

// common
import { useSignedContract } from "modules/common/hooks/useSignedContract";
import { useWeb3 } from "modules/common/hooks/useWeb3";

import { useUserInfo } from "modules/common/hooks/useUserInfo";

import ROLMANAGER_JSON from "modules/common/lib/abis/RolManager.json";

// admin
import { Transaction } from "modules/admin/lib/types";

dayjs.extend(advancedFormat);

type Values = {
  cancelTransaction: (transaction: Transaction) => Promise<void>;
};

export const useCancelRequest = (): Values => {
  // router hooks
  const { rolManagerAddress } = useParams();

  // chakra hooks
  const toast = useToast();

  const { signedContract: signedRolContract } = useSignedContract({
    contractAddress: rolManagerAddress,
    contractAbi: ROLMANAGER_JSON.abi,
  });
  const { web3 } = useWeb3();
  const { hasCancelerRole } = useUserInfo();

  // handlers
  const cancelTransaction = async (transaction: Transaction) => {
    if (!hasCancelerRole) {
      toast({
        title: "Error",
        description: "You don't have the role needed for this action",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const transferTx = await signedRolContract?.cancelTransaction(
        transaction.target,
        transaction.value,
        transaction.signature,
        transaction.data,
        transaction.eta
      );
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);
      toast({
        title: "Success",
        description: "Transaction canceled!",
        status: "success",
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: useFunds.ts ~ line 37 ~ sendFunds ~ error",
        error
      );
    }
  };

  return {
    cancelTransaction,
  };
};
