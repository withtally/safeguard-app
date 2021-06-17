import { useFormik, FormikErrors, FormikTouched } from "formik";
import { useToast } from "@chakra-ui/react";

// common
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import { useWeb3 } from "modules/common/hooks/useWeb3";
import { useUserInfo } from "modules/common/hooks/useUserInfo";
import { useSignedContract } from "modules/common/hooks/useSignedContract";
import { useFundInformation } from "modules/common/hooks/useFundInformation";
import TOKEN_JSON from "modules/common/lib/abis/Comp.json";

// admin
import { InitialValuesSendValues } from "modules/admin/lib/types";
import { ethers } from "ethers";
import { SendFundsValidationSchema } from "modules/admin/lib/validations";

const initialValues: InitialValuesSendValues = {
  amount: "",
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
  // constant
  const tokenAddress =
    CONTRACT_ADDRESSES.token[process.env.REACT_APP_ETHEREUM_NETWORK];

  // chakra hooks
  const toast = useToast();

  // custom hook
  const { timelockAddress, getSafeGuardTokenBalance, fundBalance } =
    useFundInformation();
  const { signedContract: signedTokenContract } = useSignedContract({
    contractAddress: tokenAddress,
    contractAbi: TOKEN_JSON.abi,
  });
  const { web3 } = useWeb3();
  const { hasAdminRole } = useUserInfo();

  // handlers
  const onSubmit = async (
    formValues: InitialValuesSendValues,
    formikInfo: any
  ) => {
    if (!hasAdminRole) {
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

      const transferTx = await signedTokenContract?.transfer(
        timelockAddress,
        ethers.utils.parseEther(formValues.amount)
      );
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);
      await getSafeGuardTokenBalance();
      formikInfo.setSubmitting(false);
      formikInfo.resetForm();
    } catch (error) {
      console.log("🚀 ~ ~ error", error);
    }
  };

  // formik hooks
  const { values, handleChange, submitForm, isSubmitting, errors, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validate: SendFundsValidationSchema,
    });

  return {
    fundBalance,
    values,
    handleChange,
    submitForm,
    isSubmitting,
    errors,
    touched,
  };
};
