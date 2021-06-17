import { FC } from "react";
import { Flex } from "@chakra-ui/react";

// common
import PageHeader from "modules/common/components/PageHeader";

// safeGuard
import SafeGuardList from "modules/safeGuard/components/SafeGuardList";
import CreateSafeGuard from "modules/safeGuard/components/CreateSafeGuard";
import { useSafeGuard } from "modules/safeGuard/hooks/useSafeGuard";

const SafeGuard: FC = () => {
  // custom hooks
  const { createdSafes, initialValues, formSubmit } = useSafeGuard();

  return (
    <Flex direction="column" w="full">
      <PageHeader title="Created SafeGuards" />
      <CreateSafeGuard initialValues={initialValues} formSubmit={formSubmit} />
      <SafeGuardList safeList={createdSafes} />
    </Flex>
  );
};

export default SafeGuard;
