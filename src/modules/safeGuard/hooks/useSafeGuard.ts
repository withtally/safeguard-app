import { useState, useEffect } from "react";
import { useFormik, FormikErrors, FormikTouched } from "formik";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useToast } from "@chakra-ui/react";

// common
import { useSignedContract } from "modules/common/hooks/useSignedContract";
import { CONTRACT_ADDRESSES } from "modules/common/lib/constants";
import { useWeb3 } from "modules/common/hooks/useWeb3";
import FACTORY_JSON from "modules/common/lib/abis/Factory.json";

// failSafe
import {
  InitialValuesCreateSafeGuard,
  SafeGuard,
} from "modules/safeGuard/lib/types";
import { CreateSafeGuardValidationSchema } from "modules/safeGuard/lib/validations";
import { parseSafeGuardCreations } from "modules/safeGuard/lib/parsers/parseSafeGuardCreations";

dayjs.extend(advancedFormat);

const initialValues: InitialValuesCreateSafeGuard = {
  delay: "",
  safeName: "",
};

type Values = {
  createdSafes?: SafeGuard[];
  values: InitialValuesCreateSafeGuard;
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
  errors: FormikErrors<InitialValuesCreateSafeGuard>;
  touched: FormikTouched<InitialValuesCreateSafeGuard>;
};

export const useSafeGuard = (): Values => {
  // react hooks
  const [registries, setRegistries] = useState<SafeGuard[]>();

  // chakra hooks
  const toast = useToast();

  // constants
  const factoryAddress = CONTRACT_ADDRESSES.factory.rinkeby;

  // custom hook
  const { signedContract: signedFactoryContract } = useSignedContract({
    contractAddress: factoryAddress,
    contractAbi: FACTORY_JSON.abi,
  });
  const { web3 } = useWeb3();

  const getRegistries = async () => {
    try {
      const createdSafesEventFilter =
        await signedFactoryContract?.filters.RolManagerCreated();
      const createdSafes =
        createdSafesEventFilter &&
        (await signedFactoryContract?.queryFilter(createdSafesEventFilter));

      const createdSafesInfo = createdSafes?.map(
        (item) => item.args && parseSafeGuardCreations(item.args)
      );

      const allCreatedSafes = createdSafesInfo?.map((item) => {
        if (item) {
          return {
            ...item,
          };
        }
      }) as SafeGuard[];

      setRegistries(allCreatedSafes);
    } catch (error) {
      console.log("🚀 ~  ~ error", error);
    }
  };

  useEffect(() => {
    if (signedFactoryContract) getRegistries();
  }, []);

  useEffect(() => {
    if (!signedFactoryContract) return;

    signedFactoryContract.on("RolManagerCreated", (event) => {
      getRegistries();
    });

    return () => {
      signedFactoryContract.removeAllListeners("RolManagerCreated");
    };
  });

  const onSubmit = async (
    formValues: InitialValuesCreateSafeGuard,
    formikInfo: any
  ) => {
    try {
      formikInfo.setSubmitting(true);

      const transferTx = await signedFactoryContract?.createSafeGuard(
        formValues.delay,
        formValues.safeName
      );

      const receipt = await web3.waitForTransaction(transferTx.hash, 3);

      formikInfo.setSubmitting(false);
      formikInfo.resetForm();
      toast({
        title: "Success",
        description: "SafeGuard created!",
        status: "success",
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log("🚀 ~  error", error);
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
    validate: CreateSafeGuardValidationSchema,
  });

  return {
    createdSafes: registries,
    values,
    handleChange,
    submitForm,
    formSubmitting,
    errors,
    touched,
  };
};
