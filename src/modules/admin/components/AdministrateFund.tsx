import { FC } from "react";
import {
  Card,
  IconText,
  Text,
  Select,
  TextField,
  Button,
  Table,
  TableRow,
  TableHeader,
  Title,
} from "@gnosis.pm/safe-react-components";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@material-ui/core";

const AdministrateFund: FC = () => {
  // TODO: replace with actual values
  const headerCells: TableHeader[] = [
    { id: "to", label: "Transfer to" },
    { id: "amount", label: "Amount" },
    { id: "date", label: "Date" },
  ];
  const rows: TableRow[] = [
    {
      id: "1",
      cells: [
        { content: "0xfeF621869b404a2240C5B10783477cA459B2a4b1" },
        { content: "500 UNI" },
        { content: "20/03.2021" },
      ],
    },
    {
      id: "1",
      cells: [
        { content: "0xfeF621869b404a2240C5B10783477cA459B2a4b1" },
        { content: "200 UNI" },
        { content: "10/04/2021" },
      ],
    },
  ];

  return (
    <Box>
      <Title size="sm">Manage Fund</Title>
      <Card>
        <Accordion>
          <AccordionSummary>
            <IconText
              iconSize="sm"
              textSize="xl"
              iconType="info"
              text="Fund information"
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "column" }}>
            <Text size="lg">Fund Information</Text>
            <Box
              style={{
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  maxWidth: "29rem",
                }}
              >
                <Text size="md" strong>
                  Fund manager:
                </Text>
                <Text size="md">
                  0xfeF621869b404a2240C5B10783477cA459B2a4b1
                </Text>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  maxWidth: "15rem",
                }}
              >
                <Text size="md" strong>
                  Fund balance:
                </Text>
                <Text size="md">1000 UNI</Text>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  maxWidth: "15rem",
                }}
              >
                <Text size="md" strong>
                  Fund active since block:
                </Text>
                <Text size="md">2334398</Text>
              </Box>
              <Button color="error" size="lg" variant="contained">
                Revoke funds
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <IconText
              iconSize="sm"
              textSize="xl"
              iconType="collectibles"
              text="Fund Transactions"
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "column" }}>
            <Text size="lg">Fund Transaction Logs</Text>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Table headers={headerCells} rows={rows} />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  );
};

export default AdministrateFund;
