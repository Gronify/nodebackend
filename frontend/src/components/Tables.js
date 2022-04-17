import { Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Applications from "./Tables/Applications";
import Hairdresser from "./Tables/Hairdresser";
import Services from "./Tables/Services";
import Users from "./Tables/Users";

export default function Tables() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          centered
        >
          <Tab label="Applications" />
          <Tab label="Users" />
          <Tab label="Hairdresser" />
          <Tab label="Services" />
        </Tabs>
      </Paper>
      {value === 0 ? <Applications /> : null}
      {value === 1 ? <Users /> : null}
      {value === 2 ? <Hairdresser /> : null}
      {value === 3 ? <Services /> : null}
    </div>
  );
}
