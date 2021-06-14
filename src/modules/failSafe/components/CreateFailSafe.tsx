import { FC } from "react";
import { Text, Flex, FlexProps, HStack, Icon } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FormikErrors, FormikTouched } from "formik";

// failsafe
import CreateFailSafeForm from "modules/failSafe/components/CreateFailSafeForm";
import { InitialValuesCreateFailSafe } from "modules/failSafe/lib/types";

type Props = {
  values: InitialValuesCreateFailSafe;
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
  errors: FormikErrors<InitialValuesCreateFailSafe>;
  touched: FormikTouched<InitialValuesCreateFailSafe>;
};

const CreateFailSafe: FC<FlexProps & Props> = ({
  values,
  errors,
  touched,
  handleChange,
  submitForm,
  formSubmitting,
  ...flexProps
}) => {
  return (
    <Flex
      as="article"
      bg="white"
      borderRadius={4}
      direction="column"
      mt={6}
      shadow="gray.card"
      w="full"
      {...flexProps}
    >
      <Flex p={6} direction="column">
        <HStack spacing={1.5} mb={9}>
          <Icon as={IoAddCircleOutline} w={6} h={6} />
          <Text color="gray.800" flex={1} mb={4} textStyle="paragraph">
            Create a new fail safe
          </Text>
        </HStack>
        <CreateFailSafeForm
          values={values}
          errors={errors}
          touched={touched}
          submitForm={submitForm}
          handleChange={handleChange}
          formSubmitting={formSubmitting}
        />
      </Flex>
    </Flex>
  );
};

export default CreateFailSafe;
