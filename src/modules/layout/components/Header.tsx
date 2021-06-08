import { FC } from "react";
import { HStack, Link, Box, Flex, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";

// common
import { ROUTES } from "modules/common/lib/routes";

// layout
import HeaderTopBorder from "modules/layout/components/HeaderTopBorder";

const Header: FC = () => {
  return (
    <Flex display="column" border="gray.dark">
      <HeaderTopBorder />
      <HStack
        px="2rem"
        py="0.75rem"
        justify="space-between"
        as="nav"
        spacing={5}
        w="full"
        h={20}
      >
        <Box>
          <Link _hover={{ textDecor: "none" }} as={ReachLink} to={ROUTES.home}>
            <Text textStyle="h4">FailSafe</Text>
          </Link>
        </Box>
        <HStack spacing={4}>
          <Link _hover={{ textDecor: "none" }} as={ReachLink} to={ROUTES.safes}>
            <Text textStyle="paragraph">Safe Management</Text>
          </Link>
          <Link _hover={{ textDecor: "none" }} as={ReachLink} to={ROUTES.roles}>
            <Text textStyle="paragraph">Roles</Text>
          </Link>
          <Link
            _hover={{ textDecor: "none" }}
            as={ReachLink}
            to={ROUTES.manage}
          >
            <Text textStyle="paragraph">Manage</Text>
          </Link>
          <Link
            _hover={{ textDecor: "none" }}
            as={ReachLink}
            to={ROUTES.payments}
          >
            <Text textStyle="paragraph">Payments</Text>
          </Link>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
