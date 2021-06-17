import { FC } from "react";
import { Text, Flex, FlexProps, HStack, Icon } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FormikHelpers } from "formik";

// safeGuard
import CreateSafeGuardForm from "modules/safeGuard/components/CreateSafeGuardForm";
import { InitialValuesCreateSafeGuard } from "modules/safeGuard/lib/types";

type Props = {
  initialValues: InitialValuesCreateSafeGuard;
  formSubmit: (
    formValues: InitialValuesCreateSafeGuard,
    actions: FormikHelpers<InitialValuesCreateSafeGuard>
  ) => Promise<void>;
};

const CreateSafeGuard: FC<FlexProps & Props> = ({
  initialValues,

  formSubmit,
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
            Create a new SafeGuard
          </Text>
        </HStack>
        <CreateSafeGuardForm
          initialValues={initialValues}
          formSubmit={formSubmit}
        />
      </Flex>
    </Flex>
  );
};

export default CreateSafeGuard;
