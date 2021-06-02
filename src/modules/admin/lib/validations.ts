import { FormikErrors } from "formik";
import { utils } from "ethers";

// admin
import {
  InitialValuesRoles,
  InitialValuesSendValues,
} from "modules/admin/lib/types";

export const GrantRoleValidationSchema = (values: InitialValuesRoles) => {
  const errors: FormikErrors<InitialValuesRoles> = {};

  if (!values.role || values.role === "Select role") {
    errors.role = "Required";
  }

  if (!values.address) {
    errors.address = "Required";
  } else if (!utils.isAddress(values.address)) {
    errors.address = "Must be a valid ETH address";
  }

  return errors;
};

export const SendFundsValidationSchema = (values: InitialValuesSendValues) => {
  const errors: FormikErrors<InitialValuesSendValues> = {};
  const parsedAmount = parseInt(values?.amount);

  if (!values.amount) {
    errors.amount = "Required";
  } else if (isNaN(parsedAmount)) {
    errors.amount = "Must be a number";
  }

  return errors;
};
