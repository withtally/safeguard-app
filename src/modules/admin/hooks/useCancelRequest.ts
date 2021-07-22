import {extend} from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useToast } from '@chakra-ui/react';
import { useParams } from '@reach/router';

// common
import { useSignedContract } from 'modules/common/hooks/useSignedContract';
import { useUserContractRoles } from 'modules/common/hooks/useUserContractRoles';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';

// admin
import { Transaction } from 'modules/admin/lib/types';

extend(advancedFormat);

type Values = {
  cancelTransaction: (transaction: Transaction) => Promise<void>;
};

export const useCancelRequest = (): Values => {
  // router hooks
  const { safeGuardAddress } = useParams();

  // chakra hooks
  const toast = useToast();

  const { signedContract: signedRolContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });
  const { hasCancelerRole } = useUserContractRoles();

  // handlers
  const cancelTransaction = async (transaction: Transaction) => {
    if (!hasCancelerRole) {
      toast({
        title: 'Error',
        description: "You don't have the role needed for this action",
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    try {
      const transferTx = await signedRolContract?.cancelTransaction(
        transaction.target,
        transaction.value,
        transaction.signature,
        transaction.data,
        transaction.eta,
      );
      const receipt = await transferTx.wait();
      toast({
        title: 'Success',
        description: 'Transaction canceled!',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log('🚀 ~ file: useFunds.ts ~ line 37 ~ sendFunds ~ error', error);
    }
  };

  return {
    cancelTransaction,
  };
};
