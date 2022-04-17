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

export default function AdminCreater() {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    sex: "",
    salary: 0,
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });
  const [genders, setGenders] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    refreshData();
  }, []);

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
          // create(values);
        }}
      >
        Create
      </Button>
    </Paper>
  );
}
