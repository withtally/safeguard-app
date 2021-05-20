import { extendTheme } from '@chakra-ui/react';

// styles
import styles from 'modules/common/theme/styles';

// foundations
import colors from 'modules/common/theme/foundations/colors';
import fonts from 'modules/common/theme/foundations/fonts';
import borders from 'modules/common/theme/foundations/borders';
import spacing from 'modules/common/theme/foundations/spacing';
import textStyles from 'modules/common/theme/foundations/textStyles';
import layerStyles from 'modules/common/theme/foundations/layerStyles';
import shadows from 'modules/common/theme/foundations/shadows';

// components
import Button from 'modules/common/theme/components/button';
import Tag from 'modules/common/theme/components/tag';
import Avatar from 'modules/common/theme/components/avatar';
import Skeleton from 'modules/common/theme/components/skeleton';
import Input from 'modules/common/theme/components/input';
import Table from 'modules/common/theme/components/table';
import Link from 'modules/common/theme/components/link';
import Modal from 'modules/common/theme/components/modal';
import Code from 'modules/common/theme/components/code';
import Tabs from 'modules/common/theme/components/tabs';

const overrides = {
  styles,
  fonts,
  space: spacing,
  colors,
  borders,
  textStyles,
  layerStyles,
  shadows,
  components: {
    Button,
    Avatar,
    Skeleton,
    Link,
    Input,
    Tag,
    Code,
    Modal,
    Tabs,
    Table,
  },
};

export default extendTheme(overrides);
