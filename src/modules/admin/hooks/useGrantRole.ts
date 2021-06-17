import { useFormik, FormikErrors, FormikTouched } from 'formik';
import { useToast } from '@chakra-ui/react';
import { useParams } from '@reach/router';

// common
import { useSignedContract } from 'modules/common/hooks/useSignedContract';
import { useWeb3 } from 'modules/common/hooks/useWeb3';
import { useUserInfo } from 'modules/common/hooks/useUserInfo';
import SAFEGUARD_JSON from 'modules/common/lib/abis/SafeGuard.json';

// admin
import { InitialValuesRoles } from 'modules/admin/lib/types';
import { GrantRoleValidationSchema } from 'modules/admin/lib/validations';

const initialValues: InitialValuesRoles = {
  role: '',
  address: '',
};

type Values = {
  values: InitialValuesRoles;
  submitForm: () => Promise<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  formSubmitting: boolean;
  errors: FormikErrors<InitialValuesRoles>;
  touched: FormikTouched<InitialValuesRoles>;
};

export const useGrantRole = (): Values => {
  // router hooks
  const { safeGuardAddress } = useParams();

  // chakra hooks
  const toast = useToast();

  // custom hooks
  const { signedContract } = useSignedContract({
    contractAddress: safeGuardAddress,
    contractAbi: SAFEGUARD_JSON.abi,
  });
  const { web3 } = useWeb3();
  const { hasAdminRole } = useUserInfo();

  // handlers
  const onSubmit = async (formValues: InitialValuesRoles, formikInfo: any) => {
    if (!hasAdminRole) {
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
      formikInfo.setSubmitting(true);
      const transferTx = await signedContract?.grantRole(
        formValues.role,
        formValues.address.toLowerCase(),
      );
      const receipt = await web3?.waitForTransaction(transferTx.hash, 2);
      formikInfo.setSubmitting(false);
      formikInfo.resetForm();
      toast({
        title: 'Success',
        description: 'Role granted!',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log('🚀 ~ ~ error', error);
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
    validate: GrantRoleValidationSchema,
  });

  return {
    values,
    handleChange,
    submitForm,
    formSubmitting,
    errors,
    touched,
  };
};
