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

import AddIcon from "@mui/icons-material/Add";
import gendersList from "../../constants/genders";
import ServicesService from "../../services/ServicesService";

export default function ServiceCreater() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    sex: "",
    price: 0,
  });
  const [genders, setGenders] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const submitAction = (values) => {
    ServicesService.create(
      values.id,
      values.name,
      values.description,
      values.sex,
      values.price
    )
      .then((response) => {})
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
        label="description"
        variant="outlined"
        value={values.description}
        onChange={handleChange("description")}
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
        label="price"
        variant="outlined"
        value={values.price}
        onChange={handleChange("price")}
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
