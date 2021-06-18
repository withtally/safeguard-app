import { FC } from 'react';
import { Text, Stack } from '@chakra-ui/react';

type Props = {
  type: string;
  description: string;
};

const InstructionElement: FC<Props> = ({ type, description }) => {
  return (
    <Stack spacing={1}>
      <Text color="purple.500" textStyle="body.bold.md">
        {type}:
      </Text>
      <Text color="gray.600" textStyle="body.regular.md">
        {description}
      </Text>
    </Stack>
  );
};

export default InstructionElement;
