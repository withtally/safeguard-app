import { FC } from 'react';
import { HStack, Link, Box, Flex, Text, Button } from '@chakra-ui/react';
import { Link as ReachLink } from '@reach/router';

// common
import { ROUTES } from 'modules/common/lib/routes';
import { useWeb3 } from 'modules/common/hooks/useWeb3';

// layout
import HeaderTopBorder from 'modules/layout/components/HeaderTopBorder';
import HeaderUser from 'modules/layout/components/HeaderUser';

const Header: FC = () => {
  // custom hooks
  const { isWeb3Ready, openSelectWallet, signerAddress } = useWeb3();

  // handlers
  const handleConnectWalletClick = async (): Promise<void> => await openSelectWallet();

  return (
    <Flex display="column" border="gray.dark" align="center">
      <HeaderTopBorder />
      <HStack
        px="2rem"
        py="0.75rem"
        justify="space-between"
        as="nav"
        spacing={5}
        w="full"
        h={20}
        align="center"
      >
        <Box>
          <Link _hover={{ textDecor: 'none' }} as={ReachLink} to={ROUTES.home}>
            <Text textStyle="h4">SafeGuard</Text>
          </Link>
        </Box>
        <HStack spacing={4} align="center">
          {isWeb3Ready ? (
            <HStack spacing={4} align="center">
              <Link
                _hover={{ textDecor: 'none' }}
                mr={isWeb3Ready ? 4 : 2}
                as={ReachLink}
                to={ROUTES.safes}
              >
                <Button size="lg" variant="secondary">
                  <Text textStyle="paragraph">Safe Management</Text>
                </Button>
              </Link>

              <HeaderUser signerAddress={signerAddress} />
            </HStack>
          ) : (
            <Button onClick={handleConnectWalletClick} size="lg" variant="secondary">
              Connect wallet
            </Button>
          )}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
