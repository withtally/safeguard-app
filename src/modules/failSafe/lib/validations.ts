import { FormikErrors } from "formik";

// admin
import { InitialValuesCreateFailSafe } from "modules/failSafe/lib/types";

export const CreateFailSafeValidationSchema = (
  values: InitialValuesCreateFailSafe
) => {
  const errors: FormikErrors<InitialValuesCreateFailSafe> = {};

  if (!values.safeName) {
    errors.safeName = "Required";
  }

  if (!values.delay) {
    errors.safeName = "Required";
  }

  return errors;
};
