import React from "react";
import { DataGrid, svSE,  GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import {getAllBookings} from '../APICalls'
import { createTheme, ThemeProvider } from '@mui/material/styles';



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


function Bookings() {


    const [pageSize, setPageSize] = React.useState(10);

    const theme = createTheme( { palette: { primary: { main: '#1d5a7a' } } }, svSE );



    
    const columns = [
      { field: 'testpersonId', headerName: 'Personidentitet', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'ownerName', headerName: 'Bokad åt',  flex: 1, align: 'center', headerAlign: 'center' } ];

    const [rows, setData] = useState([]);


useEffect(() => {

  getAllBookings().then((res) =>{
   setData(res.data);
 
  });
 }, []);



 
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
       components={{ Toolbar: CustomToolbar  }}


     />


            
   </div>
   </ThemeProvider>

 );

}

export default Bookings
