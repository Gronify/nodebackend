import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import gendersList from "../../constants/genders";
import HairdresserService from "../../services/HairdresserService";
import AddIcon from "@mui/icons-material/Add";
import ApplicationService from "../../services/ApplicationService";

export default function HairdresserToApplication() {
  const [values, setValues] = useState({
    hairdresser: "",
    application: "",
  });
  const [hairdressers, setHairdressers] = useState([]);
  const [applications, setApplications] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const submitAction = (values) => {
    ApplicationService.connectToHairdresser(
      values.application,
      values.hairdresser
    )
      .then((response) => {})
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
  };

  const refreshData = () => {
    HairdresserService.getAll()
      .then((response) => {
        setHairdressers(response.data);
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
    ApplicationService.getAll()
      .then((response) => {
        setApplications(response.data);
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
  };

  return (
    <Paper
      sx={{
        mb: 3,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        rowGap: "10px",
      }}
    >
      <FormControl>
        <InputLabel>Application</InputLabel>
        <Select
          value={values.application}
          label="Application"
          variant="outlined"
          onChange={handleChange("application")}
        >
          {applications.map((application, id) => {
            return (
              <MenuItem value={application.id}>
                {application.name} {application.surname} - {application.order},{" "}
                {application.price}, {application.sex}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Hairdresser</InputLabel>
        <Select
          value={values.hairdresser}
          label="Hairdresser"
          variant="outlined"
          onChange={handleChange("hairdresser")}
        >
          {hairdressers.map((hairdresser, id) => {
            return (
              <MenuItem value={hairdresser.id}>
                {hairdresser.name} {hairdresser.surname}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={() => {
          submitAction(values);
        }}
      >
        Create
      </Button>
    </Paper>
  );
}
