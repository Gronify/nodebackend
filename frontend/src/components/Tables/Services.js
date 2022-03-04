import React, { useEffect, useRef, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, Collapse, List, Paper, TextField } from "@mui/material";

import { TransitionGroup } from "react-transition-group";
import CustomDataGrid from "../CustomDataGrid";
import EditBoxButtons from "../EditBoxButtons";

import moment from "moment";
import ServicesService from "../../services/ServicesService";

export default function Services() {
  const scrollToTopRef = useRef(null);
  const executeScroll = () => scrollToTopRef.current.scrollIntoView();

  const [dataGridLoading, setDataGridLoading] = useState(false);
  const [editBox, setEditBox] = useState({ row: null, visible: false });
  const [dataRows, setDataRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "name", width: 200 },
    { field: "description", headerName: "description", width: 200 },
    { field: "sex", headerName: "sex", width: 200 },
    { field: "price", headerName: "price", width: 200 },
    {
      field: "createdAt",
      headerName: "createdAt",
      type: "date",
      width: 200,
      valueFormatter: (params) => {
        return moment(params.value).format("DD.MM.yyyy HH:mm:ss Z");
      },
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      type: "date",
      width: 200,
      valueFormatter: (params) => {
        return moment(params.value).format("DD.MM.yyyy HH:mm:ss Z");
      },
    },
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

  const refreshData = () => {
    setDataGridLoading(true);

    ServicesService.getAll()
      .then((response) => {
        setDataRows(response.data);
        setDataGridLoading(false);
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
        setDataGridLoading(false);
      });
  };

  const EditBox = (props) => {
    const [values, setValues] = useState({
      id: props.row?.id,
      name: "",
      description: "",
      sex: "",
      price: "",
    });
    useEffect(() => {
      console.log(props.row);
      setValues({
        id: props.row?.id,
        name: props.row?.name,
        description: props.row?.description,
        sex: props.row?.sex,
        price: props.row?.price,
      });
    }, [props.row]);

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    function edit(params) {
      ServicesService.put(
        params.id,
        params.name,
        params.description,
        params.sex,
        params.price
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

    function create(params) {
      ServicesService.create(
        params.id,
        params.name,
        params.description,
        params.sex,
        params.price
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
        <TextField
          id="outlined-basic"
          label="sex"
          variant="outlined"
          value={values.sex}
          onChange={handleChange("sex")}
        />
        <TextField
          id="outlined-basic"
          label="price"
          variant="outlined"
          value={values.price}
          onChange={handleChange("price")}
        />

        {values.id ? (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => {
              edit(values);
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
              create(values);
            }}
          >
            Create
          </Button>
        )}
      </Paper>
    );
  };

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
