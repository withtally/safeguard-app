import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

// common
import WavesBackground from 'modules/common/components/WavesBackground';

type Props = {
  title: string;
};

const PageHeader: FC<Props> = ({ title }) => (
  <Flex
    h="6.375rem"
    w="full"
    pos="absolute"
    px="2rem"
    top="5.375rem"
    right={0}
    justify="space-between"
    align="center"
  >
    <Text textStyle="h3">{title}</Text>
    <WavesBackground />
  </Flex>
);

export default PageHeader;
