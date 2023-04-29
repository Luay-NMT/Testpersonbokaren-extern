import React from 'react';
import { DataGrid, svSE, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {searchBookingsBasedOnTestpersonId, searchBookingsBasedOnGroup} from '../APICalls'
import { useSearchParams } from 'react-router-dom';


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
  }

export default function SearchResult() {
  const [searchParams] = useSearchParams(); 
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
      

  useEffect(() => {
    const getAllTestperson = async () => {
      try {
        if(searchParams.get('type') === "personnummer"){
          searchBookingsBasedOnTestpersonId(searchParams.get('value')).then((res) =>{
            setRows(res.data);     
          })
          setColumns([
            { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'bookingUserFullName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
           
          ]);
        }
        else if(searchParams.get('type') === "group"){
          searchBookingsBasedOnGroup(searchParams.get('value')).then((res) =>{
            setRows(res.data);

          })
          setColumns([
            { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'bookingUserFullName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' },
           
          ]);
        }
      } catch (err) {
        console.log(err);
      } 
    };
    getAllTestperson(); 
    });
    
  

 const theme = createTheme(
  {
    palette: {
      primary: { main: '#1d5a7a' },
    },
  },
  svSE,  
);


  return (
    <ThemeProvider theme={theme}>
      
     
    <div>
      <DataGrid 
        getRowId={(row) => row.testpersonId}
        rows={rows}
        columns={columns}
        autoHeight={true}

        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}

        checkboxSelection
        disableColumnSelector
  
       
        components={{ Toolbar: CustomToolbar }} 
        />

    </div>
    
    </ThemeProvider>
  );
      }
