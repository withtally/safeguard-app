import { ComponentMultiStyleConfig } from '@chakra-ui/react';

const parts = ['table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption'];

const table: ComponentMultiStyleConfig = {
  parts,
  baseStyle: {
    th: {
      fontFamily: 'body',
      fontSize: 'md',
      fontWeight: '600',
      lineHeight: '1.125rem',
      color: 'gray.600',
      minWidth: 36,
      textTransform: 'none',
    },
  },
};

export default table;
