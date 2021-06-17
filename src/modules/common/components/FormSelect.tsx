import { FC } from "react";
import {
  FormikErrors,
  FormikValues,
  FormikHandlers,
  FormikTouched,
} from "formik";

import {
  FormControl,
  SelectProps,
  Select,
  FormControlProps,
  FormErrorMessage,
} from "@chakra-ui/react";

// common
import FormLabel from "modules/common/components/FormLabel";

type HandleChange = Pick<FormikHandlers, "handleChange">["handleChange"];

type Props = {
  onChange: HandleChange;
  label: string;
  name: string;
  placeholder: string;
  selectProps?: SelectProps;
  errors?: FormikErrors<FormikValues>;
  touched?: FormikTouched<FormikValues>;
  values?: FormikValues;
};

const FormSelect: FC<Props & FormControlProps> = ({
  label,
  name,
  children,
  placeholder,
  selectProps,
  errors,
  touched,
  values,
  onChange,
  ...formControlProps
}) => (
  <FormControl
    isInvalid={Boolean(touched?.[name] && errors?.[name])}
    {...formControlProps}
  >
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Select
      _focus={{
        boxShadow: "outline",
      }}
      id={name}
      name={name}
      borderRadius="sm"
      placeholder={placeholder}
      value={values?.[name]}
      onChange={onChange}
      {...selectProps}
    >
      {children}
    </Select>
    <FormErrorMessage>{errors?.[name]}</FormErrorMessage>
  </FormControl>
);

export default FormSelect;
