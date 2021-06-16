import { FC } from "react";
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
} from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link as ReachLink } from "@reach/router";

// common
import { ROUTES } from "modules/common/lib/routes";

// failSafe
import { SafeGuard } from "modules/safeGuard/lib/types";

dayjs.extend(advancedFormat);

type Props = {
  safeList: SafeGuard[];
};

const SafeGuardTable: FC<Props> = ({ safeList }) => {
  const hasRows = Boolean(safeList.length);
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
          {safeList.map((safe: SafeGuard, index: number) => (
            <Tr key={`${index}-${safe.rolManagerAddress}`}>
              <Td>{safe.safeName}</Td>
              <Td>{safe.rolManagerAddress}</Td>
              <Td>{safe.admin}</Td>
              <Td>
                <Link
                  _hover={{ textDecor: "none" }}
                  as={ReachLink}
                  to={ROUTES.viewSafe(safe.rolManagerAddress)}
                >
                  <Text textStyle="body.regular.md">view safe</Text>
                </Link>
              </Td>
            </Tr>
          ))}
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
