import { FC } from "react";
import {
  FormikErrors,
  FormikValues,
  FormikHandlers,
  FormikTouched,
} from "formik";
import {
  FormControl,
  Input,
  FormErrorMessage,
  Flex,
  FlexProps,
  InputProps,
} from "@chakra-ui/react";

// common
import FormLabel from "modules/common/components/FormLabel";

type HandleChange = Pick<FormikHandlers, "handleChange">["handleChange"];

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

const FormInput: FC<Props & FlexProps> = ({
  onChange,
  values,
  errors,
  placeholder,
  name,
  label,
  touched,
  inputProps,
  isDisabled = false,
  ...flexProps
}) => (
  <Flex w="full" {...flexProps}>
    <FormControl isInvalid={Boolean(touched?.[name] && errors?.[name])}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        _focus={{
          boxShadow: "outline",
        }}
        _placeholder={{
          color: "gray.400",
        }}
        border="gray.dark"
        borderColor="auto"
        color="gray.500"
        id={name}
        isDisabled={isDisabled}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={values?.[name]}
        {...inputProps}
      />
      <FormErrorMessage>{errors?.[name]}</FormErrorMessage>
    </FormControl>
  </Flex>
);

export default FormInput;
