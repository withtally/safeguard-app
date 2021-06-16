import { FC, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Link,
  HStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link as ReachLink } from "@reach/router";

// common
import { ROUTES } from "modules/common/lib/routes";
import Avatar from "modules/common/components/Avatar";
import { useUserInformation } from "modules/common/hooks/useUserInformation";
import { getUsername, getProfileImage } from "modules/common/lib/helpers";

// failSafe
import { SafeGuard } from "modules/safeGuard/lib/types";

dayjs.extend(advancedFormat);

type Props = {
  safeList: SafeGuard[];
};

const SafeGuardTable: FC<Props> = ({ safeList }) => {
  // constants
  const addresses = useMemo(
    () => safeList.map((safe) => safe.safeGuardAddress),
    [safeList]
  );
  const hasRows = Boolean(safeList.length);

  // custom hooks
  const { usersInformation } = useUserInformation({
    addresses,
  });
  return (
    <Flex align="stretch" direction="column" w="full">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>SafeGuard Name</Th>
            <Th>SafeGuard Address</Th>
            <Th>Admin Address</Th>
            <Th>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {safeList.map((safe: SafeGuard, index: number) => {
            const profileImage = getProfileImage(usersInformation, safe.admin);
            const username = getUsername(usersInformation, safe.admin, false);

            return (
              <Tr key={`${index}-${safe.safeGuardAddress}`}>
                <Td>
                  <Text color="gray.500" textStyle="body.regular.md">
                    {safe.safeGuardName}
                  </Text>
                </Td>
                <Td>
                  <Text color="gray.500" textStyle="body.regular.md">
                    {safe.safeGuardAddress}
                  </Text>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Avatar address={safe.admin} src={profileImage} />
                    <Text color="gray.500" textStyle="body.regular.md">
                      {username}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <Link
                    _hover={{ textDecor: "none" }}
                    as={ReachLink}
                    to={ROUTES.viewSafe(safe.safeGuardAddress)}
                  >
                    <Text textStyle="body.regular.md">view safe</Text>
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {!hasRows ? (
        <Flex align="center" bg="gray.50" h={16} justify="center" w="full">
          <Text color="gray.600" textStyle="body.bold.sm">
            No rows to show
          </Text>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default SafeGuardTable;
