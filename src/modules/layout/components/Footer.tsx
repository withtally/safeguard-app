import { FC } from 'react';
import dayjs from 'dayjs';
import { Flex, Stack, StackProps, Link, Box, Text, BoxProps } from '@chakra-ui/react';

const Copyright: FC<BoxProps> = ({ ...boxProps }) => {
  return (
    <Text color="gray.400" textStyle="h6" w="max-content" {...boxProps}>
      Made with ❤ by{' '}
      <Link color="inherit" to="https://withtally.com/">
        Tally
      </Link>{' '}
      {dayjs().format('YYYY')}
      {'.'}
    </Text>
  );
};

const Footer: FC<StackProps> = ({ ...stackProps }) => {
  return (
    <Stack
      align={{ base: 'center' }}
      as="footer"
      borderTop="gray.dark"
      justify="center"
      mt={{ base: 0, lg: 10 }}
      px={{ base: 6, lg: 8 }}
      py={{ base: 8, lg: 5 }}
      spacing={{ base: 0, lg: 12 }}
      w="full"
      {...stackProps}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        mx={{ base: 0, lg: 4 }}
        w={{ base: 'full', lg: 'auto' }}
      >
        <Box mr={{ base: 0, lg: 36 }}>
          <Copyright mt={{ base: 0, lg: 5 }} />
        </Box>
      </Flex>
    </Stack>
  );
};

export default Footer;
