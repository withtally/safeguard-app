import { FC } from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Flex, Icon, Image, FlexProps, Tooltip } from "@chakra-ui/react";

// common
import TwitterIcon from "modules/common/components/icons/TwitterIcon";
import { FiCheck } from "react-icons/fi";

type Props = {
  address: string;
  size?: number;
  isVerifiedByTally?: boolean;
  isVerifiedByTwitter?: boolean;
  src?: string | null;
};

const Avatar: FC<Props & FlexProps> = ({
  src,
  address,
  size = 8,
  isVerifiedByTally = false,
  isVerifiedByTwitter = false,
  ...flexProps
}) => {
  // constants
  const hasImage = Boolean(src);
  const srcToUse = hasImage && typeof src === "string" ? src : undefined;

  const isVerifiedByBoth = isVerifiedByTally && isVerifiedByTwitter;

  return (
    <Flex
      align="center"
      bg="white"
      h={size}
      justify="center"
      minW={size}
      pos="relative"
      rounded="full"
      w={size}
      {...flexProps}
    >
      <Image
        h={size}
        objectFit="cover"
        rounded="full"
        src={hasImage ? srcToUse : makeBlockie(address)}
        w={size}
      />
      {isVerifiedByTally ? (
        <Tooltip
          hasArrow
          aria-label="Verified by Tally"
          label="This user is verified by Tally"
          placement="top"
        >
          <Flex
            align="center"
            bottom={0}
            h={4}
            justify="center"
            pos="absolute"
            right={0}
            w={4}
            zIndex={3}
          >
            <Icon
              as={FiCheck}
              bg="purple.500"
              color="white"
              p={0.5}
              rounded="full"
              size={6}
            />
          </Flex>
        </Tooltip>
      ) : null}
      {isVerifiedByTwitter ? (
        <Tooltip
          hasArrow
          aria-label="Verified by Twitter"
          label="This user has verified his identity with his Twitter account"
          placement="top"
        >
          <Flex
            align="center"
            bottom={0}
            h={4}
            justify="center"
            pos="absolute"
            right={isVerifiedByBoth ? -2 : 0}
            w={4}
            zIndex={2}
          >
            <TwitterIcon
              bg="external.twitter"
              color="white"
              p={0.5}
              rounded="full"
              size={6}
            />
          </Flex>
        </Tooltip>
      ) : null}
    </Flex>
  );
};

export default Avatar;
