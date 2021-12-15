import React, { useEffect, useRef, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, Collapse, List, Paper, TextField } from "@mui/material";

import { TransitionGroup } from "react-transition-group";
import CustomDataGrid from "../CustomDataGrid";
import UserService from "../../services/UserService";
import EditBoxButtons from "../EditBoxButtons";
import AuthService from "../../services/AuthService";

export default function Users() {
  const scrollToTopRef = useRef(null);
  const executeScroll = () => scrollToTopRef.current.scrollIntoView();

  const [dataGridLoading, setDataGridLoading] = useState(false);
  const [editBox, setEditBox] = useState({ row: null, visible: false });
  const [dataRows, setDataRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "username", width: 200 },
    { field: "email", headerName: "email", width: 200 },
    { field: "role", headerName: "role", width: 100 },
    { field: "password", headerName: "password", width: 150 },
    { field: "createdAt", headerName: "createdAt", type: "date", width: 200 },
    { field: "updatedAt", headerName: "updatedAt", type: "date", width: 200 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setEditBox((prev) => ({
              row: params.row,
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

  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {
    setDataGridLoading(true);
    UserService.getUsers()
      .then((response) => {
        setDataRows(response.data);
        setDataGridLoading(false);
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
        setDataGridLoading(false);
      });
  }

  function EditBox(props) {
    const [values, setValues] = useState({
      id: props.row?.id,
      username: "",
      email: "",
      role: "",
      password: "",
    });
    useEffect(() => {
      console.log(props.row);
      setValues({
        id: props.row?.id,
        username: props.row?.username,
        email: props.row?.email,
        role: props.row?.role,
        password: props.row?.password,
      });
    }, [props.row]);
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    function editUser(params) {
      UserService.putUser(
        params.id,
        params.username,
        params.email,
        params.password,
        params.role
      )
        .then((response) => {
          refreshData();
          setEditBox((prev) => ({
            row: null,
            visible: false,
          }));
        })
        .catch((e) => {
          console.log(e.response?.data?.message);
        });
    }

    function createUser(params) {
      UserService.createUser(
        params.id,
        params.username,
        params.email,
        params.password,
        params.role
      )
        .then((response) => {
          refreshData();
          setEditBox((prev) => ({
            row: null,
            visible: false,
          }));
        })
        .catch((e) => {
          console.log(e.response?.data?.message);
        });
    }

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
          value={values.id ? values.id : "id will be created"}
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
          label="role"
          variant="outlined"
          value={values.role}
          onChange={handleChange("role")}
        />

        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange("password")}
        />

        {values.id ? (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => {
              editUser(values);
            }}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => {
              createUser(values);
            }}
          >
            Create
          </Button>
        )}
      </Paper>
    );
  }

  return (
    <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "90%", mb: 3, p: 2 }} ref={scrollToTopRef}>
        <List>
          <TransitionGroup>
            <Collapse>
              <EditBoxButtons
                editBox={editBox}
                setEditBox={setEditBox}
                refreshData={refreshData}
              ></EditBoxButtons>
            </Collapse>
            {editBox.visible ? (
              <Collapse>
                <EditBox row={editBox.row}></EditBox>
              </Collapse>
            ) : null}
            <Collapse>
              <CustomDataGrid
                columns={columns}
                rows={dataRows}
                loading={dataGridLoading}
              ></CustomDataGrid>
            </Collapse>
          </TransitionGroup>
        </List>
      </Paper>
    </Box>
  );
}
