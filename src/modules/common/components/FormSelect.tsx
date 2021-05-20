import { FC } from "react";
import { FormikHandlers } from "formik";

import {
  FormControl,
  SelectProps,
  Select,
  FormControlProps,
} from "@chakra-ui/react";

// common
import FormLabel from "modules/common/components/FormLabel";

type HandleChange = Pick<FormikHandlers, "handleChange">["handleChange"];

type Props = {
  onChange: HandleChange;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  selectProps?: SelectProps;
};

const FormSelect: FC<Props & FormControlProps> = ({
  label,
  name,
  children,
  placeholder,
  value,
  selectProps,
  onChange,
  ...formControlProps
}) => (
  <FormControl {...formControlProps}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Select
      _focus={{
        boxShadow: "outline",
      }}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...selectProps}
    >
      {children}
    </Select>
  </FormControl>
);

export default FormSelect;
