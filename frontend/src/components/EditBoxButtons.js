import React from "react";
import { Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default function EditBoxButtons(props) {
  return (
    <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={props.editBox.visible ? <CloseIcon /> : <AddIcon />}
        onClick={() => {
          props.setEditBox((prev) => ({
            row: null,
            visible: !prev.visible,
          }));
        }}
      >
        {props.editBox.visible ? "Close" : "New Record"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<RefreshIcon />}
        onClick={() => {
          props.refreshData();
        }}
      >
        Refresh
      </Button>
    </Box>
  );
}
