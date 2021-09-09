import React from 'react';
import { Button, Card, CardContent, CardHeader, Checkbox, ListItemText, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Select } from '@material-ui/core'; 
import { FormHelperText } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  cardheader: {
    minWidth: 240,
      maxWidth: 240,
  },
   cardContent: {
      minWidth: 240,
      maxWidth: 240,
      justifyContent: 'center',
    },
    content: {
      
    }
  }));

export default function MovieFilter(props){

    const classes = useStyles();
    const [genreName, setGenreName] = React.useState([]);
    const [artistName, setArtistsName] = React.useState([]);

    var moviesData = props.moviesData.moviesData;

    var filteredMoviesData = {moviesData: []};

    const handleGenreChange = (event)=>{
      setGenreName(event.target.value);
    }

    const handleArtistsChange = (event)=>{
      setArtistsName(event.target.value);
    }
    
        return (
          <Card key={"card-container"} style={{height: 'fit-content', marginTop: '2%', width: '75%'}}>
            {/**Card heading */}
              <CardHeader key={"card-header"} id="card-header" color="primary" className={classes.cardheader} title="FIND MOVIES BY:" />
                
                  {/**Movie Name */}
                  <CardContent key={"movie-name"} className={classes.cardContent}>
                    <FormControl key={"1"}>
                        <InputLabel key={"input-label-1"} htmlFor="movie-name">Movie Name</InputLabel>
                        <Input type="text" id="movie-name" aria-describedby="my-helper-text" style={{width: '240px'}} onChange={handleInputChange} />
                    </FormControl>
                  </CardContent>


                {/**Select Genres */}
                <CardContent key={"movie-genre"} className={classes.cardContent}>
                    <FormControl key={"2"}>
                        <InputLabel key={"input-label-2"} htmlFor="genres">Genres</InputLabel>
                        <Select
                          labelId="genres"
                          id="select-genre"
                          multiple
                          style={{width: '240px'}}
                          value = {genreName}
                          onChange ={handleGenreChange}
                          renderValue={(selected)=> selected.join(', ')}
                        >
                            {props.genres.map((genre)=>(
                              <MenuItem Key={"genre-menu-item-"+genre.id} value={genre.name} >
                                  <Checkbox key={"checkbox-item-"+genre.id} checked={genreName.indexOf(genre.name) > -1}/>
                                <ListItemText key={"genre-list-item-"+genre.id} primary={genre.name} />
                              </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>


                {/**Select Artists */}
                <CardContent key={"movie-artists"} className={classes.cardContent}>
                    <FormControl key={"form-control-3"}>
                        <InputLabel key={"input-label-3"} htmlFor="artists">Artists</InputLabel>
                        <Select
                          labelId="artists"
                          id="select-artists"
                          multiple
                          style={{width: '240px'}}
                          value = {artistName}
                          onChange ={handleArtistsChange}
                          renderValue={(selected) => selected.join(', ')}
                        >
                            {props.artists.map((artist)=>(
                              <MenuItem Key={"menu-item-"+artist["id"]} value={artist["first_name"] + " " + artist["last_name"]} >
                                  <Checkbox key={"check-box-item-"+artist.id} checked={artistName.indexOf(artist["first_name"]+" "+artist["last_name"]) > -1}/>
                                <ListItemText key={"item-"+artist.id} primary={artist["first_name"] + " " + artist["last_name"]} />
                              </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>

                {/**Start date */}
                <CardContent key={"movie-start-date"} className={classes.cardContent}>
                    <FormControl key={"form-control-4"}>
                        <FormHelperText>Release date start</FormHelperText>
                        <InputLabel key={"input-label-4"} htmlFor="start-date"></InputLabel>
                        <Input disabled type="date" id="start-date" aria-describedby="my-helper-text" style={{width: '240px'}} onChange={handleInputChange}/>
                    </FormControl>
                </CardContent>

                {/**End Date */}
                <CardContent key={"movie-end-date"} className={classes.cardContent}>
                    <FormControl key={"form-control-5"}>
                        <FormHelperText>Release date end</FormHelperText>
                        <InputLabel key={"input-label-5"} htmlFor="end-date"></InputLabel>
                        <Input disabled type="date" id="end-date" aria-describedby="my-helper-text" style={{width: '240px'}} onChange={handleInputChange} />
                    </FormControl>
                </CardContent>

              {/**Apply button */}
              <CardContent key={"filter-button"} className={classes.cardContent} style={{justifyContent: 'center'}}>
                    <Button variant='contained' color='primary' style={{width: 240}} onClick={()=>{
                                                                                               applyFilters(filteredMoviesData.moviesData)
                                                                                              }
                                                                                             }>
                      <span style={{color: 'white'}}>Apply</span>
                    </Button>
              </CardContent>
          </Card>
        );

        //---------------------------------------On input change------------------------------//
        function handleInputChange(event){
      
          var id= event.target.id;
          var value = event.target.value;
          document.getElementById(id).value = value;
    
          //update the filtered movies data
            //loop through entire movie data for a match if match update
            let isPresent = false;
            // search by name
              if(id === "movie-name"){
                //check for data from the moviesData for a match{
                  for(let i=0;i<moviesData.length;i++){
                    //comapre the value
                    if(value.toUpperCase() === moviesData[i].title.toUpperCase()){
                      //if equal check if data is already present if filtered data is not empty
                      if(filteredMoviesData.moviesData.length!==0){
                        //iterate and check
                        for(let j=0;j<filteredMoviesData.moviesData.length;j++){
                          // if id is present then set isPresent true and break
                          if(moviesData[i].id === filteredMoviesData[j].id){
                            isPresent = true;
                            break;
                          }
                        }
    
                        //Movie not present push 
                        if(isPresent === false){
                            filteredMoviesData.moviesData.push(moviesData[i]);
                            break;
                        }
                      }else{
                        filteredMoviesData.moviesData.push(moviesData[i]);
                        break;
                      }
    
                    }
    
                  }   
              }else if(id === "select-genre"){
                  //search by genre
                  for(let i=0;i<moviesData.length;i++){
                    for(let j=0;j<moviesData[i].grnres.length;j++){
                      //check if genres are matching
                      if(value.toUpperCase() === moviesData[i].grnres[j].toUpperCase()){
                        //check if movie is present in filtered data
                        if(filteredMoviesData.moviesData.length !== 0){
                          for(let k=0;k<filteredMoviesData.moviesData.length;k++){
                            //if movie id is matching and it is present break
                            if(moviesData[i].id === filteredMoviesData.moviesData[k].id){
                              isPresent = true;
                              break;
                            }
                          }
                          if(isPresent === false){
                            //if movie not present push it
                            isPresent= true;
                            filteredMoviesData.moviesData.push(moviesData[i]);
                            break;
                          }
                        }else{
                          //if filtered data is empty push
                            filteredMoviesData.moviesData.push(moviesData[i]);
                            break;
                        }
                      }
                    }
    
                    if(isPresent === true){
                      break;
                    }
                  }
              }else{
                  // search by artists
                  for(let i=0; i<moviesData.length;i++){
                    //compare with value by iterating the artists array
                    for(let j=0;j<moviesData[i].artists.length;j++){
                      // if equal check if movie is alreadyfiltered
                      if(value.toUpperCase() === moviesData[i].artists[j].toUpperCase()){
                        //if filtered array is nt empty
                        if(filteredMoviesData.moviesData.length !== 0){
                          //iterate through filtered data
                          for(let k=0;k<filteredMoviesData.moviesData.length;k++){
                            //if movie id is present set isPresent to true and break
                            if(moviesData.id === filteredMoviesData.moviesData[k].id){
                              isPresent = true;
                              break;
                            }
                          }
    
                          //if movie is not present push
                          if(isPresent === false){
                            isPresent = true;
                            filteredMoviesData.moviesData.push(moviesData[i]);
                            break;
                          }
                        }else{
                          isPresent = true;
                          filteredMoviesData.moviesData.push(moviesData[i]);
                          break;
                        }
                      }
                    }
    
                    //movie is push;
                    if(isPresent === true){
                      break;
                    }
                  }
              }
        }

        function applyFilters(filteredMoviesData){
          debugger;
          props.applyFilters(filteredMoviesData);
        }
  }