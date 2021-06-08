import { FormikErrors } from "formik";
import { utils } from "ethers";

// manager
import { InitialValuesRequestFunds } from "modules/manager/lib/types";

export const RequestPaymentValidationSchema = (
  values: InitialValuesRequestFunds
) => {
  const errors: FormikErrors<InitialValuesRequestFunds> = {};
  const parsedAmount = parseInt(values?.amount);

  if (!values.address) {
    errors.address = "Required";
  } else if (!utils.isAddress(values.address)) {
    errors.address = "Must be a valid ETH address";
  }

  if (!values.amount) {
    errors.amount = "Required";
  } else if (isNaN(parsedAmount)) {
    errors.amount = "Must be a number";
  }

  if (!values.description) {
    errors.amount = "Required";
  }

  return errors;
};
