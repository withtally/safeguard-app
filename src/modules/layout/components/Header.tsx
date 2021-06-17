import { FC } from 'react';
import { HStack, Link, Box, Flex, Text, Button } from '@chakra-ui/react';
import { Link as ReachLink } from '@reach/router';

// common
import { ROUTES } from 'modules/common/lib/routes';
import { useWeb3 } from 'modules/common/hooks/useWeb3';

// layout
import HeaderTopBorder from 'modules/layout/components/HeaderTopBorder';

const Header: FC = () => {
  const { isWeb3Ready, openSelectWallet, signerAddress } = useWeb3();
  const handleConnectWalletClick = async (): Promise<void> => await openSelectWallet();
  return (
    <Flex display="column" border="gray.dark">
      <HeaderTopBorder />
      <HStack px="2rem" py="0.75rem" justify="space-between" as="nav" spacing={5} w="full" h={20}>
        <Box>
          <Link _hover={{ textDecor: 'none' }} as={ReachLink} to={ROUTES.home}>
            <Text textStyle="h4">SafeGuard</Text>
          </Link>
        </Box>
        <HStack spacing={4}>
          <Box mr={isWeb3Ready ? 6 : 2}>
            {isWeb3Ready ? (
              <Text textStyle="bosy.regular.md">{signerAddress}</Text>
            ) : (
              <Button onClick={handleConnectWalletClick} size="lg" variant="secondary">
                Connect wallet
              </Button>
            )}
          </Box>
          <Link _hover={{ textDecor: 'none' }} as={ReachLink} to={ROUTES.safes}>
            <Text textStyle="paragraph">Safe Management</Text>
          </Link>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
