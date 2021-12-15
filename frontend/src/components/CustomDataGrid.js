import React from "react";
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CustomToolbar from "./CustomToolbar";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomDataGrid(props) {
  return (
    <DataGrid
      autoHeight
      rows={props.rows}
      columns={props.columns}
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
      // editMode={"row"}
      loading={props.loading}
    />
  );
}
