import { FC } from 'react';
import { Tag, TagProps } from '@chakra-ui/react';

// common
import { Role } from 'modules/common/lib/types';

type Props = {
  role: Role;
};

const RoleTag: FC<Props & TagProps> = ({ role, ...tagProps }) => {
  // constants
  const ROLES_STYLES = {
    admin: {
      bg: 'purple.50',
      textColor: 'purple.500',
      text: 'Admin',
    },
    proposer: {
      bg: 'external.twitterLight',
      textColor: 'external.twitter',
      text: 'Proposer',
    },
    executer: {
      bg: 'teal.50',
      textColor: 'teal.600',
      text: 'Executer',
    },
    canceler: {
      bg: 'red.50',
      textColor: 'red.500',
      text: 'Canceler',
    },
    viewer: {
      bg: 'gray.100',
      textColor: 'gray.500',
      text: 'Viewer',
    },
  };

  return (
    <Tag bg={ROLES_STYLES[role].bg} color={ROLES_STYLES[role].textColor} {...tagProps}>
      {ROLES_STYLES[role].text}
    </Tag>
  );
};

export default RoleTag;
