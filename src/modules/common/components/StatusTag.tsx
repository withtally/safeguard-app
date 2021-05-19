import { FC } from "react";
import { Tag, TagProps } from "@chakra-ui/react";

// common
import { ProposalStatus } from "modules/common/lib/types";

type Props = {
  status: ProposalStatus;
};

const StatusTag: FC<Props & TagProps> = ({ status, ...tagProps }) => {
  // constants
  const STATUSES_STYLES = {
    pending: {
      bg: "purple.100",
      textColor: "purple.500",
      text: "Pending",
    },
    expired: {
      bg: "gray.100",
      textColor: "gray.500",
      text: "Expired",
    },
    available: {
      bg: "teal.50",
      textColor: "teal.500",
      text: "Available",
    },
    canceled: {
      bg: "red.100",
      textColor: "red.500",
      text: "Canceled",
    },
    executed: {
      bg: "teal.50",
      textColor: "teal.600",
      text: "Executed",
    },
  };

  return (
    <Tag
      bg={STATUSES_STYLES[status].bg}
      color={STATUSES_STYLES[status].textColor}
      {...tagProps}
    >
      {STATUSES_STYLES[status].text}
    </Tag>
  );
};

export default StatusTag;
