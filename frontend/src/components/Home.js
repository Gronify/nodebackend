import { Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import Applications from "./Tables/Applications";
import Users from "./Tables/Users";

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper
        square
        // sx={{
        //   flexGrow: 1,
        //   bgcolor: "background.paper",
        //   display: "flex",
        //   height: 224,
        // }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          // orientation="vertical"
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
