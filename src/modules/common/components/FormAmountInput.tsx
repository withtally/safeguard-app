import { FC } from 'react';
import { FormikErrors, FormikValues, FormikHandlers, FormikTouched } from 'formik';
import { Text, Flex, FlexProps, HStack, Icon, Stack, Button, InputProps } from '@chakra-ui/react';

// common
import FormInput from 'modules/common/components/FormInput';
import UniswapIcon from 'modules/common/components/icons/UniswapIcon';

type HandleChange = Pick<FormikHandlers, 'handleChange'>['handleChange'];

type Props = {
  onChange: HandleChange;
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  touched: FormikTouched<FormikValues>;
  placeholder: string;
  name: string;
  label: string;
  inputProps?: InputProps;
  isDisabled?: boolean;
};

const FormAmountInput: FC<Props & InputProps> = ({
  values,
  errors,
  touched,
  onChange,
  ...inputProps
}) => {
  return (
    <Flex h="6.125rem" align="center">
      <FormInput
        name="amount"
        id="amount"
        label="Amount"
        placeholder="Enter an UNI amount of tokens"
        values={values}
        errors={errors}
        touched={touched}
        onChange={onChange}
        w={64}
        h="inherit"
      />
      <Stack spacing={2} justify="center" h="inherit">
        <HStack px={2} w="5.188rem" h={10} spacing={1} border="gray.dark" borderLeft="none">
          <UniswapIcon w={5} h={5} />
          <Text textStyle="body.regular.md">UNI</Text>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default FormAmountInput;
