import { FC } from 'react';
import { Button, ButtonProps, Icon, IconProps } from '@chakra-ui/react';
import { IoCopySharp } from 'react-icons/io5';

type Props = {
  size: number;
  iconProps?: IconProps;
};

type ButtonPropsChakra = Omit<ButtonProps, 'size'>;

const CopyButton: FC<ButtonPropsChakra & Props> = ({ size, iconProps, ...buttonProps }) => (
  <Button
    alignItems="center"
    bg="transparent"
    border="gray.dark"
    display="flex"
    h={size}
    justifyContent="center"
    minW={size}
    rounded="full"
    w={size}
    {...buttonProps}
  >
    <Icon as={IoCopySharp} color="gray.400" h={3} w={3} {...iconProps} />
  </Button>
);

export default CopyButton;
