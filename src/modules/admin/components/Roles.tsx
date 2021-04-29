import { FC, useState } from "react";
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
  FormControl,
  InputLabel,
} from "@material-ui/core";

// admin
import { ROLES } from "modules/admin/lib/constants";

const Roles: FC = () => {
  const [activeItemId, setActiveItemId] = useState("");
  const [value, setValue] = useState<string>("");

  // TODO: replace with actual values
  const headerCells: TableHeader[] = [
    { id: "address", label: "Address" },
    { id: "role", label: "Role" },
    { id: "action", label: "Action" },
  ];
  const rows: TableRow[] = [
    {
      id: "1",
      cells: [
        { content: "address 1" },
        { content: "role 1" },
        { content: "action 1" },
      ],
    },
    {
      id: "1",
      cells: [
        { content: "address 2" },
        { content: "role 2" },
        { content: "action 1" },
      ],
    },
  ];

  return (
    <Box>
      <Title size="md">Manage Roles</Title>
      <Card>
        <Accordion>
          <AccordionSummary>
            <IconText
              iconSize="sm"
              textSize="xl"
              iconType="add"
              text="Grant Roles"
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "column" }}>
            <Text size="lg">Grant roles to addresses for the FailSafe</Text>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <FormControl style={{ maxWidth: "300px", marginRight: "10px" }}>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Select
                  id="role"
                  items={ROLES}
                  activeItemId={activeItemId}
                  onItemClick={(id) => {
                    setActiveItemId(id);
                  }}
                />
              </FormControl>
              <FormControl style={{ maxWidth: "600px", marginRight: "10px" }}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <TextField
                  id="address"
                  label="Address"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </FormControl>
              <Button color="primary" size="lg" variant="contained">
                Grant role
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <IconText
              iconSize="sm"
              textSize="xl"
              iconType="settingsTool"
              text="Manage granted roles"
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: "column" }}>
            <Text size="lg">Visualize granted roles and manage them</Text>
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

export default Roles;
