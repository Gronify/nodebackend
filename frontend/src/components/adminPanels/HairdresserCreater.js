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

import AddIcon from "@mui/icons-material/Add";
import HairdresserService from "../../services/HairdresserService";

export default function HairdresserCreater() {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    sex: "",
    salary: 0,
    username: "",
    email: "",
    password: "",
    role: "HAIRDRASSER",
  });
  const [genders, setGenders] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const submitAction = (values) => {
    HairdresserService.createWithUser(
      values.username,
      values.email,
      values.password,
      values.name,
      values.surname,
      values.sex,
      values.salary
    )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
  };

  const refreshData = () => {
    setGenders(gendersList);
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
      <TextField
        id="outlined-basic"
        label="name"
        variant="outlined"
        value={values.name}
        onChange={handleChange("name")}
      />

      <TextField
        id="outlined-basic"
        label="surname"
        variant="outlined"
        value={values.surname}
        onChange={handleChange("surname")}
      />

      <FormControl>
        <InputLabel>Sex</InputLabel>
        <Select
          value={values.sex}
          label="Sex"
          variant="outlined"
          onChange={handleChange("sex")}
        >
          {genders.map((gender, id) => {
            return <MenuItem value={gender.value}>{gender.value}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <TextField
        id="outlined-basic"
        label="salary"
        variant="outlined"
        value={values.salary}
        onChange={handleChange("salary")}
      />

      <TextField
        id="outlined-basic"
        label="username"
        variant="outlined"
        value={values.username}
        onChange={handleChange("username")}
      />

      <TextField
        id="outlined-basic"
        label="email"
        variant="outlined"
        value={values.email}
        onChange={handleChange("email")}
      />

      <TextField
        id="outlined-basic"
        label="password"
        type="password"
        variant="outlined"
        value={values.password}
        onChange={handleChange("password")}
      />

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
