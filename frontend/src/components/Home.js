import { Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Applications from "./Tables/Applications";
import Users from "./Tables/Users";

export default function Home() {
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
        </Tabs>
      </Paper>
      {value === 0 ? <Applications /> : null}
      {value === 1 ? <Users /> : null}
    </div>
  );
}
