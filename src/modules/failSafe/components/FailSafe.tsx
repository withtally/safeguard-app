import { FC } from "react";
import { Flex } from "@chakra-ui/react";

// common
import PageHeader from "modules/common/components/PageHeader";

// failSafe
import FailSafeList from "modules/failSafe/components/FailSafeList";
import CreateFailSafe from "modules/failSafe/components/CreateFailSafe";
import { useFailSafe } from "modules/failSafe/hooks/useFailSafe";

const FailSafe: FC = () => {
  // custom hooks
  const {
    createdSafes,
    handleChange,
    values,
    submitForm,
    formSubmitting,
    errors,
    touched,
  } = useFailSafe();
  return (
    <Flex direction="column" w="full">
      <PageHeader title="Created FailSafes" />
      <CreateFailSafe
        values={values}
        errors={errors}
        touched={touched}
        submitForm={submitForm}
        handleChange={handleChange}
        formSubmitting={formSubmitting}
      />
      <FailSafeList safeList={createdSafes} />
    </Flex>
  );
};

export default FailSafe;
