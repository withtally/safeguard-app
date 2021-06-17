import { object, string, array } from "yup";
import { utils } from "ethers";

export const CreateSafeGuardValidationSchema = object({
  delay: string().required("This field is required."),
  safeGuardName: string().required("This field is required."),
  rolesAssignations: array(
    object({
      role: string().required("This field is required."),
      address: string()
        .required("This field is required")
        .test("isAddress", "Must be a valid ETH address", (value) =>
          utils.isAddress(value || "")
        ),
    })
  ).max(10, "Max 10 role assignments"),
});
