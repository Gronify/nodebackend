import {
  Box,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
function createData(id, name, email) {
  return { id, name, email };
}

const rows = [
  createData(1, "name1", "name1@hotmail.com"),
  createData(2, "name2", "name2@hotmail.com"),
  createData(3, "name3", "name3@hotmail.com"),
  createData(4, "name4", "name4@hotmail.com"),
  createData(5, "name5", "name5@hotmail.com"),
];

export default function Users() {
  return (
    <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "90%", mb: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="Edit" size="large">
                      <Edit fontSize="inherit" color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Fab
        sx={{ position: "absolute", bottom: 50, right: 50 }}
        color="secondary"
        aria-label="add"
      >
        <Add />
      </Fab>
    </Box>
  );
}
