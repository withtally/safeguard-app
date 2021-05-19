import { FC } from "react";
import {
  StackProps,
  HStack,
  Text,
  useColorMode,
  IconButton,
  Icon,
  Link,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";

// common
import { useUserInfo } from "modules/common/hooks/useUserInfo";
import { ROUTES } from "modules/common/lib/routes";

const Header: FC<StackProps> = ({ ...stackProps }) => {
  const { userIsAdmin, userIsManager } = useUserInfo();

  return (
    <HStack
      px="2rem"
      py="0.75rem"
      justify="space-between"
      as="nav"
      spacing={5}
      w="full"
      bg="white"
      shadow="md"
      {...stackProps}
    >
      <Box>
        <Link _hover={{ textDecor: "none" }} as={ReachLink} to={ROUTES.home}>
          <Heading size="md">FailSafe</Heading>
        </Link>
      </Box>
      <HStack spacing={4}>
        {userIsAdmin && (
          <>
            <Link
              _hover={{ textDecor: "none" }}
              as={ReachLink}
              to={ROUTES.roles}
            >
              <Heading size="sm">Roles</Heading>
            </Link>
            <Link
              _hover={{ textDecor: "none" }}
              as={ReachLink}
              to={ROUTES.management}
            >
              <Heading size="sm">Manage</Heading>
            </Link>
          </>
        )}
        {userIsManager && (
          <>
            <Link
              _hover={{ textDecor: "none" }}
              as={ReachLink}
              to={ROUTES.manager}
            >
              <Heading size="sm">Payments</Heading>
            </Link>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
