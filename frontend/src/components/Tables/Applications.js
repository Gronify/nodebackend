import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";

import { Button, Collapse, List, Paper, TextField } from "@mui/material";
import CustomLoadingOverlay from "../CustomLoadingOverlay";
import CustomToolbar from "../CustomToolbar";
import { TransitionGroup } from "react-transition-group";

function EditBox(props) {
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
        label="id"
        variant="outlined"
        disabled={true}
        value={props.id ? props.id : "id will be created"}
      />
      <TextField id="outlined-basic" label="firstName" variant="outlined" />
      <TextField id="outlined-basic" label="lastName" variant="outlined" />
      <TextField id="outlined-basic" label="age" variant="outlined" />
      {props.id ? (
        <Button variant="outlined" color="secondary" startIcon={<AddIcon />}>
          Edit
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" startIcon={<AddIcon />}>
          Create
        </Button>
      )}
    </Paper>
  );
}
export default function Applications() {
  const scrollToTopRef = React.useRef(null);
  const executeScroll = () => scrollToTopRef.current.scrollIntoView();

  const [selectionModel, setSelectionModel] = React.useState([]);
  const [dataGridLoading, setDataGridLoading] = React.useState(false);
  const [editBox, setEditBox] = React.useState({ id: null, visible: false });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "First name" },
    { field: "lastName", headerName: "Last name" },
    { field: "age", headerName: "Age", type: "number" },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setEditBox((prev) => ({
              id: params.id,
              visible: true,
            }));
            executeScroll();
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {}}
          showInMenu
        />,
      ],
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "90%", mb: 3, p: 2 }} ref={scrollToTopRef}>
        <List>
          <TransitionGroup>
            <Collapse>
              <Box
                sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={editBox.visible ? <CloseIcon /> : <AddIcon />}
                  onClick={() => {
                    setEditBox((prev) => ({
                      id: null,
                      visible: !prev.visible,
                    }));
                  }}
                >
                  {editBox.visible ? "Close" : "New Application"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<RefreshIcon />}
                >
                  Refresh
                </Button>
              </Box>
            </Collapse>
            {editBox.visible ? (
              <Collapse>
                <EditBox id={editBox.id}></EditBox>
              </Collapse>
            ) : null}

            <Collapse>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                components={{
                  Toolbar: CustomToolbar,
                  LoadingOverlay: CustomLoadingOverlay,
                }}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                disableSelectionOnClick
                filterMode={"client"}
                paginationMode={"client"}
                sortingMode={"client"}
                density={"standard"}
                editMode={"row"}
                loading={dataGridLoading}
              />
            </Collapse>
          </TransitionGroup>
        </List>
      </Paper>
    </Box>
  );
}
