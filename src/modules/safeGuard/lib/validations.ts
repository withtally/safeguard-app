import { FormikErrors } from "formik";

// admin
import { InitialValuesCreateSafeGuard } from "modules/safeGuard/lib/types";

export const CreateSafeGuardValidationSchema = (
  values: InitialValuesCreateSafeGuard
) => {
  const errors: FormikErrors<InitialValuesCreateSafeGuard> = {};

  if (!values.safeGuardName) {
    errors.safeGuardName = "Required";
  }

  if (!values.delay) {
    errors.safeGuardName = "Required";
  }

  return errors;
};
