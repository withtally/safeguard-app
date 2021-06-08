import { FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { FailSafe } from "modules/failSafe/lib/types";

dayjs.extend(advancedFormat);

type Props = {
  safeList: FailSafe[];
};

const FailSafeTable: FC<Props> = ({ safeList }) => {
  const hasRows = Boolean(safeList.length);
  return (
    <Flex align="stretch" direction="column" w="full">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Safe Name</Th>
            <Th>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {safeList.map((safe: FailSafe, index: number) => (
            <Tr key={`${index}-${safe.rolManagerAddress}`}>
              <Td>{safe.safeName}</Td>
              <Td>{safe.rolManagerAddress}</Td>
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

export default FailSafeTable;
