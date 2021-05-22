import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { ethers } from "ethers";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";

// common
import { useSignedTokenContract } from "modules/common/hooks/useSignedTokenContract";
import { useSignedRolManagerContract } from "modules/common/hooks/useSignedRolManagerContract";
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import TOKEN_JSON from "modules/common/lib/abis/Comp.json";
import ROLE_MANAGER_JSON from "modules/common/lib/abis/RolManager.json";
import { useWeb3 } from "modules/common/hooks/useWeb3";

// manager
import { InitialValuesRequestFunds } from "modules/manager/lib/types";
import { getTransactionEta } from "modules/manager/lib/helpers";

const initialValues: InitialValuesRequestFunds = {
  unitType: "",
  amount: "0",
  address: "",
};

type Values = {
  fundBalance: string;
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
  formSubmitting: boolean;
};

export const useRequestFunds = (): Values => {
  // react hooks
  const [fundBalance, setFundBalance] = useState("0");

  // gnosis hooks
  const { sdk } = useSafeAppsSDK();

  // custom hook
  const { signedContract: signedTokenContract } = useSignedTokenContract();
  const { signedContract: signedRolManagerContract } =
    useSignedRolManagerContract();
  const { web3 } = useWeb3();

  const timelockAddress = CONTRACT_ADDRESSES.timelock.rinkeby;
  const tokenAddress = CONTRACT_ADDRESSES.token.rinkeby;
  const romManagerAddress = CONTRACT_ADDRESSES.rolManager.rinkeby;

  useEffect(() => {
    const getFailSafeTokenBalance = async () => {
      // fail safe timelock
      const bigBalance = await signedTokenContract?.balanceOf(timelockAddress);
      if (bigBalance) setFundBalance(bigBalance.toString());
    };
    if (signedTokenContract) getFailSafeTokenBalance();
  }, [timelockAddress, signedTokenContract]);

  // handlers
  const onSubmit = async (
    formValues: InitialValuesRequestFunds,
    formikInfo: any
  ) => {
    try {
      formikInfo.setSubmitting(true);
      const tokenInterface = new ethers.utils.Interface(TOKEN_JSON.abi);
      const roleManagerInterface = new ethers.utils.Interface(
        ROLE_MANAGER_JSON.abi
      );

      //First lets encode the approval
      const value = ethers.utils.parseEther("0");
      const target = tokenAddress;

      let currentETA = await getTransactionEta(300, web3);
      console.log(
        "🚀 ~ file: useRequestFunds.ts ~ line 78 ~ onSubmit ~ currentETA",
        currentETA
      );

      // Now lets queue the transfer
      const transferSignature = "";
      const transferCallData = tokenInterface.encodeFunctionData("transfer", [
        formValues.address,
        formValues.amount,
      ]);

      const queueTransferData = roleManagerInterface.encodeFunctionData(
        "queueTransaction",
        [target, value, transferSignature, transferCallData, currentETA + 320]
      );

      const txs = [
        {
          to: romManagerAddress,
          value: "0",
          data: queueTransferData,
        },
      ];
      const params = {
        safeTxGas: 500000,
      };
      const safeTxs = await sdk.txs.send({ txs, params });

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
  const { values, handleChange, submitForm, isSubmitting } = useFormik({
    initialValues,
    onSubmit,
  });

  return {
    fundBalance,
    values,
    handleChange,
    submitForm,
    formSubmitting: isSubmitting,
  };
};
