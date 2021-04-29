import { FC, useState } from "react";
import {
  Card,
  IconText,
  Text,
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
  FormControl,
  InputLabel,
} from "@material-ui/core";

const ManageFund: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [adress, setAddress] = useState<string>("");
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
        </Box>
      </Card>
      <Card>
        <Accordion>
          <AccordionSummary>
            <IconText
              iconSize="sm"
              textSize="xl"
              iconType="info"
              text="Fund request"
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "column" }}>
            <Text size="lg">Request funds from the safe</Text>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <FormControl style={{ maxWidth: "600px", marginRight: "10px" }}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <TextField
                  id="address"
                  label="Address to receive the funds"
                  value={adress}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl style={{ maxWidth: "600px", marginRight: "10px" }}>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <TextField
                  id="amount"
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <Button color="secondary" size="lg" variant="contained">
                Make fund request
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

export default ManageFund;
