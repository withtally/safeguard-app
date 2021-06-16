import { FormikErrors } from "formik";

// admin
import { InitialValuesCreateSafeGuard } from "modules/safeGuard/lib/types";

export const CreateSafeGuardValidationSchema = (
  values: InitialValuesCreateSafeGuard
) => {
  const errors: FormikErrors<InitialValuesCreateSafeGuard> = {};

  if (!values.safeName) {
    errors.safeName = "Required";
  }

  if (!values.delay) {
    errors.safeName = "Required";
  }

  return errors;
};
