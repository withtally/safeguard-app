import { FC } from "react";
import { FormLabel as ChakraFormLabel, FormLabelProps } from "@chakra-ui/react";

const FormLabel: FC<FormLabelProps> = ({ children, ...formLabelProps }) => (
  <ChakraFormLabel
    color="gray.darker"
    fontSize="sm"
    fontWeight="semibold"
    {...formLabelProps}
  >
    {children}
  </ChakraFormLabel>
);

export default FormLabel;
