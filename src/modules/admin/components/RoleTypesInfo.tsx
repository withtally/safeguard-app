import { FC } from "react";
import {
  Text,
  FlexProps,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";

// admin
import RoleType from "modules/admin/components/RoleType";
import { ROLE_TYPES_INFO } from "modules/admin/lib/constants";

const RoleTypesInfo: FC<FlexProps> = ({ ...flexProps }) => {
  return (
    <Accordion allowToggle w="full">
      <AccordionItem>
        <h2>
          <AccordionButton justifyContent="space-between">
            <HStack spacing={2} pl={2} py={3.5}>
              <Icon as={IoSettingsOutline} w={5} h={5} />
              <Text textStyle="body.bold.lg">Types of Roles</Text>
            </HStack>
            <AccordionIcon w={6} h={6} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={6} px={6}>
          <Stack spacing={5}>
            {ROLE_TYPES_INFO.map(({ type, description }) => (
              <RoleType type={type} description={description} />
            ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default RoleTypesInfo;
