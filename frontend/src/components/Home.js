import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ApplicationCreater from "./adminPanels/ApplicationCreater";
import ServiceCreater from "./adminPanels/ServiceCreater";
import AdminCreater from "./adminPanels/AdminCreater";
import HairdresserCreater from "./adminPanels/HairdresserCreater";
import HairdresserToApplication from "./adminPanels/HairdresserToApplication";

export default function Home() {
  const [role, setRole] = useState("USER");
  useEffect(() => {
    setRole(localStorage.role);
  }, []);

  return (
    <Box sx={{ mx: "auto", p: 1, m: 2 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Create new application</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ApplicationCreater />
        </AccordionDetails>
      </Accordion>
      {role == "ADMIN" || role == "HAIRDRESSER" ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Create Service</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ServiceCreater />
          </AccordionDetails>
        </Accordion>
      ) : null}
      {role == "ADMIN" ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Create Admin</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdminCreater />
          </AccordionDetails>
        </Accordion>
      ) : null}
      {role == "ADMIN" ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Create Hairdresser</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HairdresserCreater />
          </AccordionDetails>
        </Accordion>
      ) : null}
      {role == "ADMIN" ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Hairdresser to application</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HairdresserToApplication />
          </AccordionDetails>
        </Accordion>
      ) : null}
    </Box>
  );
}
