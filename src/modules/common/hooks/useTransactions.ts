import { useState, useEffect } from "react";
import { useFormik, FormikErrors, FormikTouched } from "formik";
import dayjs from "dayjs";
import { ethers } from "ethers";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useToast } from "@chakra-ui/react";

// common
import { useSignedRolManagerContract } from "modules/common/hooks/useSignedRolManagerContract";
import { useSignedContract } from "modules/common/hooks/useSignedContract";
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import TIMELOCK_JSON from "modules/common/lib/abis/Timelock.json";
import { useWeb3 } from "modules/common/hooks/useWeb3";
import { parseTransaction } from "modules/common/lib/parsers/parseTransaction";
import TOKEN_JSON from "modules/common/lib/abis/Comp.json";
import { useUserInfo } from "modules/common/hooks/useUserInfo";
import { RequestPaymentValidationSchema } from "modules/common/lib/validations";

// manager
import { InitialValuesRequestFunds } from "modules/manager/lib/types";
import { getTransactionEta } from "modules/manager/lib/helpers";

// admin
import { Transaction } from "modules/admin/lib/types";

dayjs.extend(advancedFormat);

const initialValues: InitialValuesRequestFunds = {
  unitType: "",
  amount: "",
  address: "",
};

type Values = {
  transactions?: Transaction[];
  cancelTransaction: (transaction: Transaction) => Promise<void>;
  executeTransaction: (transaction: Transaction) => Promise<void>;
  isSubmitting: boolean;
  values: InitialValuesRequestFunds;
  submitForm: () => Promise<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: FormikErrors<InitialValuesRequestFunds>;
  touched: FormikTouched<InitialValuesRequestFunds>;
};

export const useTransactions = (): Values => {
  // react hooks
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isSubmitting, setSubmitting] = useState(false);

  // chakra hooks
  const toast = useToast();

  // constants
  const timelockAddress = CONTRACT_ADDRESSES.timelock.rinkeby;
  const tokenAddress = CONTRACT_ADDRESSES.token.rinkeby;

  // custom hook
  const { signedContract: signedTimelockContract } = useSignedContract({
    contractAddress: timelockAddress,
    contractAbi: TIMELOCK_JSON.abi,
  });
  const { signedContract: signedRolContract } = useSignedRolManagerContract();
  const { web3 } = useWeb3();
  const { hasCancelerRole, hasExecutorRole, hasProposerRole } = useUserInfo();

  const getTimelockEvents = async () => {
    try {
      const queuedEventFilter =
        await signedTimelockContract?.filters.QueueTransaction();
      const queuedTransactions = await signedTimelockContract?.queryFilter(
        queuedEventFilter
      );

      const canceledEventFilter =
        await signedTimelockContract?.filters.CancelTransaction();
      const canceledTransactions = await signedTimelockContract?.queryFilter(
        canceledEventFilter
      );

      const executedEventFilter =
        await signedTimelockContract?.filters.ExecuteTransaction();
      const executedTransactions = await signedTimelockContract?.queryFilter(
        executedEventFilter
      );

      const gracePeriodLabel = await signedTimelockContract?.GRACE_PERIOD();
      const gracePeriod = Number(gracePeriodLabel.toString());
      const currentTimestamp = Number(dayjs().format("X"));

      const transactionInfo = queuedTransactions?.map(
        (item) => item.args && parseTransaction(item.args, gracePeriod)
      );

      const allTransactions = (await Promise.all(
        transactionInfo.map(async (item) => {
          if (item) {
            return {
              ...item,
              currentlyQueued: await signedTimelockContract?.queuedTransactions(
                item.txHash
              ),
              canceled: canceledTransactions.some(
                (canceled) => canceled.args?.txHash === item.txHash
              ),
              executed: executedTransactions.some(
                (executed) => executed.args?.txHash === item.txHash
              ),
              stale:
                !executedTransactions.some(
                  (executed) => executed.args?.txHash === item.txHash
                ) && item.executableTime <= currentTimestamp,
            };
          }
        })
      )) as Transaction[];

      const sortedTransactions = allTransactions.sort(
        (a, b) => b.executableTime - a.executableTime
      );

      setTransactions(sortedTransactions);
    } catch (error) {
      console.log(
        "🚀 ~ file: useTransactions.ts ~ line 120 ~ getTimelockEvents ~ error",
        error
      );
    }
  };

  useEffect(() => {
    if (signedTimelockContract) getTimelockEvents();
  }, []);

  useEffect(() => {
    if (!signedTimelockContract) return;

    signedTimelockContract.on("QueueTransaction", (event) => {
      getTimelockEvents();
    });

    signedTimelockContract.on("ExecuteTransaction", (event) => {
      getTimelockEvents();
    });

    signedTimelockContract.on("CancelTransaction", (event) => {
      getTimelockEvents();
    });

    return () => {
      signedTimelockContract.removeAllListeners("QueueTransaction");
      signedTimelockContract.removeAllListeners("ExecuteTransaction");
      signedTimelockContract.removeAllListeners("CancelTransaction");
    };
  });

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
      setSubmitting(true);
      const transferTx = await signedRolContract?.cancelTransaction(
        transaction.target,
        transaction.value,
        transaction.signature,
        transaction.data,
        transaction.eta
      );
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);
      setSubmitting(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: useFunds.ts ~ line 37 ~ sendFunds ~ error",
        error
      );
    }
  };

  const executeTransaction = async (transaction: Transaction) => {
    if (!hasExecutorRole) {
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
      setSubmitting(true);
      const transferTx = await signedRolContract?.executeTransaction(
        transaction.target,
        transaction.value,
        transaction.signature,
        transaction.data,
        transaction.eta
      );
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);

      setSubmitting(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: useFunds.ts ~ line 37 ~ sendFunds ~ error",
        error
      );
    }
  };

  const onSubmit = async (
    formValues: InitialValuesRequestFunds,
    formikInfo: any
  ) => {
    if (!hasProposerRole) {
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
      formikInfo.setSubmitting(true);
      const tokenInterface = new ethers.utils.Interface(TOKEN_JSON.abi);

      const value = ethers.utils.parseEther("0");
      const target = tokenAddress;

      let currentETA = await getTransactionEta(300, web3);

      const transferSignature = "";
      const transferCallData = tokenInterface.encodeFunctionData("transfer", [
        formValues.address,
        ethers.utils.parseEther(formValues.amount),
      ]);

      const transferTx = await signedRolContract?.queueTransaction(
        target,
        value,
        transferSignature,
        transferCallData,
        currentETA
      );

      const receipt = await web3.waitForTransaction(transferTx.hash, 3);

      formikInfo.setSubmitting(false);
      formikInfo.resetForm();
    } catch (error) {
      console.log(
        "🚀 ~ file: useFunds.ts ~ line 37 ~ sendFunds ~ error",
        error
      );
    }
  };

  // formik hooks
  const {
    values,
    handleChange,
    submitForm,
    isSubmitting: formSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues,
    onSubmit,
    validate: RequestPaymentValidationSchema,
  });

  return {
    transactions,
    cancelTransaction,
    executeTransaction,
    values,
    handleChange,
    submitForm,
    isSubmitting: isSubmitting || formSubmitting,
    errors,
    touched,
  };
};
