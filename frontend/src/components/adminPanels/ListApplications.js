import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ServicesService from "../../services/ServicesService";
import ApplicationService from "../../services/ApplicationService";
import { Button } from "@mui/material";

export default function ListApplications() {
  const [rows, setRows] = useState([]);

  //   function createData(name, calories, fat, carbs, protein) {
  //     return { name, calories, fat, carbs, protein };
  //   }

  //   const rows = [
  //     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   ];

  const [values, setValues] = useState({
    name: "",
    surname: "",
    order: 0,
    price: 0,
    status: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function edit(params) {
    ApplicationService.put(
      params.id,
      params.name,
      params.surname,
      params.order,
      params.price,
      params.status
    )
      .then((response) => {
        refreshData();
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });

    ApplicationService.connectToHairdresserByUser(params.id)
      .then((response) => {
        refreshData();
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
  }

  useEffect(() => {
    refreshData();
  }, []);

  const submitAction = (values) => {};

  const refreshData = () => {
    ApplicationService.getNotReady()
      .then((response) => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Surname</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Hairdresser</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.surname}</TableCell>
              <TableCell align="right">{row.order}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                {row.hairdresser?.name} {row.hairdresser?.surname}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    edit({
                      id: row.id,
                      name: row.name,
                      surname: row.surname,
                      order: row.order,
                      price: row.price,
                      status: "Confirmed",
                    });
                  }}
                >
                  Confirmed
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  onClick={() => {
                    edit({
                      id: row.id,
                      name: row.name,
                      surname: row.surname,
                      order: row.order,
                      price: row.price,
                      status: "Ready",
                    });
                  }}
                >
                  Ready
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
