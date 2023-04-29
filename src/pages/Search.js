import React from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search'
import { getAllGroups } from '../APICalls';
import { styled, createTheme,ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';

function Search() {
    const [searchId, setSearchId] = React.useState("");
    const [searchGroup, setSearchGroup] = React.useState(null);
    const [inputGroupValue, setInputGroupValue] = React.useState('');
    const [groups, setGroups] = useState([]);
    const StyledButton = styled(Button)(`
    text-transform: none;
    `);
    const theme = createTheme( { palette: { primary: { main: '#1d5a7a' } } } );

function getSearchResult(searchValue, type){
  navigate({
    pathname: '/searchresult',
    search: `type=${type}&value=${searchValue}`,
  });
}

    const navigate = useNavigate();

      useEffect(() => {
        getAllGroups().then((res) =>{
         setGroups(res.data);
     
        });
       }, []);

    return (
      <ThemeProvider theme={theme}>

        <div style={{position:'relative'}}>
            
            <div style={{marginTop: '50px', marginLeft: '50px'}}>
            <Typography variant ="h6">Sök efter Personnummer</Typography>   
            <TextField
                sx={{ m: 1,marginLeft:'0px', width:'353px' }}
                id="name"
                label="Personnummer"
                variant="outlined"
                value={searchId}
                onChange={(event) => setSearchId(event.target.value)}
                onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                      getSearchResult(searchId, "personnummer")
                    }
                }}
                />
                <StyledButton style={{ marginTop:"8px", marginLeft:"-8px", height:"56px" }} variant="contained" onClick={() => getSearchResult(searchId, "personnummer")}>
              <SearchIcon />
              </StyledButton> 
        
            </div>

            <div style={{marginTop: '50px', marginLeft: '50px'}}>
            <Typography variant ="h6">Lista alla bokningar som tillhör en grupp</Typography>   

            <Autocomplete
            disablePortal
            id="Group-list"
            options={groups}
            autoHighlight
            
            getOptionLabel={(option) => `${option.groupName} (${option.group}) `}
            style={{width: '353px', m:1, marginLeft:'0px' }}
            
            value={searchGroup}
            onChange={(event, newValue) => {
              setSearchGroup(newValue);

            }}
            inputValue={inputGroupValue}
            onInputChange={(event, newInputValue) => {
                setInputGroupValue(newInputValue);

        }}
          onKeyDown={(event) => {
          if(event.key === 'Enter'  && searchGroup!=null){
            getSearchResult(searchGroup.id, "group")

          }
      }}
      
            renderInput = {(params) => <TextField {...params} 
            helperText = {"Vänligen välj en grupp från listan"} label="Grupp" />}
    />
            <div style={{marginTop:'-70px', marginLeft: '305px'}}>


        <StyledButton style={{ marginTop:"-9px", marginLeft:"48px", height:"56px" }} variant="contained" onClick={() => searchGroup!=null ? getSearchResult(searchGroup.id, "group") : console.log("Error! search value is empty")}>
        <SearchIcon />
        </StyledButton>
      </div>
      </div>

        </div>
        </ThemeProvider>

    )
}

export default Search
