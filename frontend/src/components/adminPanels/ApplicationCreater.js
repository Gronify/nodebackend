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
import ServicesService from "../../services/ServicesService";
import AddIcon from "@mui/icons-material/Add";

export default function ApplicationCreater() {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    order: 0,
    price: 0,
    status: "",
  });
  const [services, setServices] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    ServicesService.getAll()
      .then((response) => {
        setServices(response.data);
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
        <InputLabel>Order</InputLabel>
        <Select
          value={values.order}
          label="Order"
          variant="outlined"
          onChange={handleChange("order")}
        >
          <MenuItem value={0}>No order</MenuItem>
          {services.map((service, id) => {
            return (
              <MenuItem value={service.id}>
                {service.sex}, {service.name}, {service.description},{" "}
                {service.price}$
              </MenuItem>
            );
          })}
          <MenuItem value={""}>Extra</MenuItem>
        </Select>
      </FormControl>

      {typeof values.order == "string" ? (
        <TextField
          id="outlined-basic"
          label="order"
          variant="outlined"
          value={values.order}
          onChange={handleChange("order")}
        />
      ) : null}

      {typeof values.order == "string" ? (
        <TextField
          id="outlined-basic"
          label="price"
          variant="outlined"
          value={values.price}
          onChange={handleChange("price")}
        />
      ) : null}

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          value={values.status}
          label="Status"
          variant="outlined"
          onChange={handleChange("status")}
        >
          <MenuItem value={"Not confirmed"}>Not confirmed</MenuItem>
          <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
          <MenuItem value={"Ready"}>Ready</MenuItem>
        </Select>
      </FormControl>

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