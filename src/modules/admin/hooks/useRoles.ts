import { useState, useEffect } from "react";
import { useFormik, FormikErrors, FormikTouched } from "formik";
import { ethers } from "ethers";

// common
import { useSignedRolManagerContract } from "modules/common/hooks/useSignedRolManagerContract";
import { ROLES_HASHES } from "modules/common/lib/constants";
import { useWeb3 } from "modules/common/hooks/useWeb3";

// admin
import { InitialValuesRoles, GrantedRole } from "modules/admin/lib/types";

const initialValues: InitialValuesRoles = {
  role: "",
  address: "",
};

type Values = {
  values: InitialValuesRoles;
  submitForm: () => Promise<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  grantedRoles: GrantedRole[] | undefined;
  revokeRole: (role: string, address: string) => Promise<void>;
  formSubmitting: boolean;
  errors: FormikErrors<InitialValuesRoles>;
  touched: FormikTouched<InitialValuesRoles>;
};

export const useRoles = (): Values => {
  // react hooks
  const [grantedRoles, setGrantedRoles] = useState<GrantedRole[]>();
  const [revokingRole, setRevokingRole] = useState(false);
  // custom hooks
  const { signedContract } = useSignedRolManagerContract();
  const { web3 } = useWeb3();

  const getGrantedRoles = async () => {
    const { proposerRole, executorRole, cancelerRole } = ROLES_HASHES;
    const proposersCount = await signedContract?.getRoleMemberCount(
      proposerRole
    );
    const executersCount = await signedContract?.getRoleMemberCount(
      executorRole
    );

    const cancelersCount = await signedContract?.getRoleMemberCount(
      cancelerRole
    );

    const members = [];
    for (let i = 0; i < proposersCount; ++i) {
      const proposerAddress = await signedContract?.getRoleMember(
        proposerRole,
        i
      );
      members.push({ address: proposerAddress, roleId: proposerRole });
    }

    for (let i = 0; i < executersCount; ++i) {
      const executerAddress = await signedContract?.getRoleMember(
        executorRole,
        i
      );
      members.push({ address: executerAddress, roleId: executorRole });
    }

    for (let i = 0; i < cancelersCount; ++i) {
      const cancelerAddress = await signedContract?.getRoleMember(
        executorRole,
        i
      );
      members.push({ address: cancelerAddress, roleId: cancelerRole });
    }

    setGrantedRoles(members);
  };

  useEffect(() => {
    if (signedContract) getGrantedRoles();
  }, []);

  // handlers
  const onSubmit = async (formValues: InitialValuesRoles, formikInfo: any) => {
    try {
      formikInfo.setSubmitting(true);
      const transferTx = await signedContract?.grantRole(
        formValues.role,
        formValues.address
      );
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);
      await getGrantedRoles();
      formikInfo.setSubmitting(false);
      formikInfo.resetForm();
    } catch (error) {
      console.log(
        "🚀 ~ file: useFunds.ts ~ line 37 ~ sendFunds ~ error",
        error
      );
    }
  };

  const revokeRole = async (role: string, address: string) => {
    try {
      setRevokingRole(true);
      const transferTx = await signedContract?.revokeRole(role, address);
      const receipt = await web3.waitForTransaction(transferTx.hash, 3);
      await getGrantedRoles();
      setRevokingRole(false);
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
    grantedRoles,
    values,
    handleChange,
    submitForm,
    revokeRole,
    formSubmitting: isSubmitting || revokingRole,
    errors,
    touched
  };
};
