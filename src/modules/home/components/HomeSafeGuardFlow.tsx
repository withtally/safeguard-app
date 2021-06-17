import { FC } from 'react';
import { Flex, Image } from '@chakra-ui/react';

// assets
import SafeGuardFlow from 'assets/images/safeGuard-flow.png';

const HomeSafeGuardFlow: FC = () => {
  return (
    <Flex shadow="gray.card" align="center" justify="center" w="full" px={6} py={7}>
      <Image src={SafeGuardFlow} />
    </Flex>
  );
};

export default HomeSafeGuardFlow;
