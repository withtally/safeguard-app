import { useState, useEffect } from "react";
import { useFormik, FormikErrors, FormikTouched } from "formik";

// common
import { useSignedTokenContract } from "modules/common/hooks/useSignedTokenContract";
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import { useWeb3 } from "modules/common/hooks/useWeb3";

// admin
import { InitialValuesSendValues } from "modules/admin/lib/types";
import { ethers } from "ethers";

const initialValues: InitialValuesSendValues = {
  amount: "0",
  amountType: "",
};

type Values = {
  values: InitialValuesSendValues;
  submitForm: () => Promise<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  isSubmitting: boolean;
  fundBalance: string;
  errors: FormikErrors<InitialValuesSendValues>;
  touched: FormikTouched<InitialValuesSendValues>;
};

export const useManageFunds = (): Values => {
  // react hooks
  const [fundBalance, setFundBalance] = useState("0");

  // custom hook
  const { signedContract: signedTokenContract } = useSignedTokenContract();
  const { web3 } = useWeb3();

  // constant
  const timelockAddress = CONTRACT_ADDRESSES.timelock.rinkeby;

  const getFailSafeTokenBalance = async () => {
    // fail safe timelock
    const bigBalance = await signedTokenContract?.balanceOf(timelockAddress);
    if (bigBalance) setFundBalance(bigBalance.toString());
  };

  // handlers
  const onSubmit = async (
    formValues: InitialValuesSendValues,
    formikInfo: any
  ) => {
    try {
      formikInfo.setSubmitting(true);

      const transferTx = await signedTokenContract?.transfer(
        timelockAddress,
        ethers.utils.parseEther(formValues.amount)
      );
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);
      console.log(
        "🚀 ~ file: useRoles.ts ~ line 39 ~ onSubmit ~ receipt",
        receipt
      );
      await getFailSafeTokenBalance();
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
  const { values, handleChange, submitForm, isSubmitting, errors, touched } = useFormik({
    initialValues,
    onSubmit,
  });

  return {
    fundBalance,
    values,
    handleChange,
    submitForm,
    isSubmitting,
    errors,
    touched
  };
};
