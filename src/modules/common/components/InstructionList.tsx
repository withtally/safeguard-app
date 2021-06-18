import { FC } from 'react';
import {
  Text,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';

// common
import { Instruction } from 'modules/common/lib/types';

// admin
import InstructionElement from 'modules/common/components/InstructionElement';

type Props = {
  title: string;
  instructions: Instruction[];
};

const InstructionList: FC<Props> = ({ title, instructions }) => {
  return (
    <Accordion allowToggle w="full">
      <AccordionItem>
        <h2>
          <AccordionButton justifyContent="space-between">
            <HStack spacing={2} pl={2} py={3.5}>
              <Icon as={IoInformationCircleOutline} w={5} h={5} />
              <Text textStyle="body.bold.lg">{title}</Text>
            </HStack>
            <AccordionIcon w={6} h={6} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={6} px={6}>
          <Stack spacing={5}>
            {instructions.map(({ type, description }) => (
              <InstructionElement key={type} type={type} description={description} />
            ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default InstructionList;
