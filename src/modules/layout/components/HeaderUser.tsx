import { FC, useMemo } from 'react';
import { Flex, Text, Stack } from '@chakra-ui/react';

// common
import Avatar from 'modules/common/components/Avatar';
import { useUserInformation } from 'modules/common/hooks/useUserInformation';
import { getUsername, getProfileImage } from 'modules/common/lib/helpers';

type Props = {
  signerAddress: string;
};

const HeaderUser: FC<Props> = ({ signerAddress }) => {
  // constants
  const addresses = useMemo(() => [signerAddress], [signerAddress])

  // custom hooks
  const result = useUserInformation({ addresses });
  const userName = getUsername(result.usersInformation, signerAddress);
  const profileImage = getProfileImage(result.usersInformation, signerAddress);

  return (
    <Stack isInline align="center" spacing={3}>
      <Avatar address={signerAddress} size={10} src={profileImage} />
      <Flex direction="column">
        <Text color="purple.900" textStyle="h6">
          {userName}
        </Text>
        <Text color="gray.500" textStyle="body.regular.sm">
          {signerAddress}
        </Text>
      </Flex>
    </Stack>
  );
};

export default HeaderUser;
