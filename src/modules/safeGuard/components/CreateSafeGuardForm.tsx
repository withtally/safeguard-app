import { FC } from "react";
import { Button, HStack, Text, Stack, Flex } from "@chakra-ui/react";
import { Formik, FieldArray, FormikHelpers } from "formik";

// common
import FormInput from "modules/common/components/FormInput";
import FormSelect from "modules/common/components/FormSelect";

// safeGuard
import { InitialValuesCreateSafeGuard } from "modules/safeGuard/lib/types";
import { CreateSafeGuardValidationSchema } from "modules/safeGuard/lib/validations";

// admin
import { ROLES } from "modules/admin/lib/constants";

const emptyRolAssignation = { role: "", address: "" };

type Props = {
  initialValues: InitialValuesCreateSafeGuard;
  formSubmitingFormik: (
    formValues: InitialValuesCreateSafeGuard,
    actions: FormikHelpers<InitialValuesCreateSafeGuard>
  ) => Promise<void>;
};

const CreateSafeGuardForm: FC<Props> = ({
  initialValues,
  formSubmitingFormik,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) =>
        await formSubmitingFormik(values, actions)
      }
      validationSchema={CreateSafeGuardValidationSchema}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form
          id="formTest"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <Stack spacing={4} mb={10} w="full">
            <HStack spacing={4} w="xl" align="center">
              <FormSelect
                id="delay"
                name="delay"
                label="Timelock Delay"
                placeholder="Select delay"
                onChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
                w={52}
                h="6.125rem"
              >
                <option key="1" value="40">
                  1 day
                </option>
                <option key="2" value="60">
                  2 days
                </option>
                <option key="3" value="80">
                  3 days
                </option>
              </FormSelect>
              <FormInput
                name="safeGuardName"
                id="safeGuardName"
                label="SafeGuard name"
                placeholder="Enter a name for the new SafeGuard"
                values={values}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                h="6.125rem"
              />
            </HStack>
            <FieldArray name="rolesAssignations">
              {({ push, remove }) => (
                <Flex direction="column">
                  <HStack spacing={4} w="2xl" align="center" mb={5}>
                    <Text textStyle="h6">Rol assigment list</Text>
                    <Button
                      size="md"
                      variant="secondary"
                      onClick={() => push(emptyRolAssignation)}
                    >
                      Add a new role
                    </Button>
                  </HStack>

                  {values.rolesAssignations.map((_, index) => (
                    <HStack key={index} spacing={4} w="2xl" align="center">
                      <FormSelect
                        id={`rolesAssignations.${index}.role`}
                        name={`rolesAssignations.${index}.role`}
                        label="Role"
                        placeholder="Select role"
                        onChange={handleChange}
                        values={values}
                        errors={errors}
                        touched={touched}
                        w={56}
                        h="6.125rem"
                      >
                        {ROLES.map((rol) => (
                          <option key={rol.id} value={rol.id}>
                            {rol.label}
                          </option>
                        ))}
                      </FormSelect>
                      <FormInput
                        name={`rolesAssignations.${index}.address`}
                        id={`rolesAssignations.${index}.address`}
                        label="Address"
                        placeholder="Enter an ETH address"
                        values={values}
                        errors={errors}
                        touched={touched}
                        onChange={handleChange}
                        h="6.125rem"
                      />
                      <Button
                        size="md"
                        variant="secondary"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </HStack>
                  ))}
                </Flex>
              )}
            </FieldArray>
            <Button size="md" variant="primary" type="submit" maxW={44}>
              Create
            </Button>
            <Text textStyle="body.regular.md">
              {JSON.stringify({ values, errors })}
            </Text>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default CreateSafeGuardForm;
