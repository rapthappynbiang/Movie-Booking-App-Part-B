import { React, useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Checkbox, ListItemText, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Select } from '@material-ui/core'; 
import { FormHelperText } from '@material-ui/core';
import { makeStyles} from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  cardheader: {
    minWidth: 240,
      maxWidth: 240,
  },
   cardContent: {
      minWidth: 240,
      maxWidth: 240,
      justifyContent: 'center',
    }
  }));

export default function MovieFilter(props){

    const classes = useStyles();

    //artists object and genres object for select menus
    const [artists, setArtists] = useState([{
                                          id: "",
                                          first_name: "",
                                          last_name: ""
                                     }]);
    const [genres, setGenres] = useState([{id: "", name: ""}]);
    //state for selected input fields bu genre and artists respectively
    const [genreName, setGenreName] = React.useState([]);
    const [artistName, setArtistsName] = React.useState([]);

    var moviesData = props.moviesData.moviesData;

    const [filteredMoviesData, setFilteredData] = useState({});

    //After mounting fetch data load the data but currently not using
    useEffect(()=>{
        // fetch  artists data with url from server
        var downloadArtists = loadData("https://localhost:8085/api/artists");
        //fetch genres data from server
        var downloadGenres = loadData("https://localhost:8085/api/genres");

        //updata the data in the state
        setArtists(downloadArtists);
        setGenres(downloadGenres);
    },[])

    //the loadData function for fetching data from server
    function loadData(url){
      fetch(url,{
        method: 'GET', // 'GET', 'PUT', 'PATCH', 'DELETE' all work here
        headers: {
        'Content-Type': 'application/json',
        },
        body: dataShows
    })
    .then((response) =>{ 
        return response.json()
    })
       
      //return the data
      return data;
    }


    //When select by Genre field change
    const handleGenreChange = (event)=>{

      //set value of input for displaying
      setGenreName(event.target.value); 

      var isPresent = false;
        //values maybe multiple like value1, value2, value3,...
        //the value is an array we store those selected values in genres

        var value =  event.target.value
         //set Artists name for displaying as inputs
        setGenreName(value);
        
        var genresList =value[0];
        for(let i=1;i<value.length;i++){
          genresList = genresList + "," + value[i];
        }

        //set FilteredData
        setFilteredData({
          ...filteredMoviesData, genres: genresList
        })
    }

    //when select by Artists field is change
    const handleArtistsChange = (event)=>{
         

         var value =  event.target.value
         //set Artists name for displaying as inputs
        setArtistsName(value);
        
        var artistsList =value[0];
        for(let i=1;i<value.length;i++){
          artistsList = artistsList + "," + value[i];
        }

        //set FilteredData
        setFilteredData({
          ...filteredMoviesData, artists: artistsList
        })
    }
    
        return (
          <Card key={"card-container"} style={{height: 'fit-content', marginTop: '2%', width: '75%'}}>
            {/**Card heading */}
              <CardHeader key={"card-header"} id="card-header" color="primary" className={classes.cardheader} title="FIND MOVIES BY:" />
                
                  {/**Movie Name */}
                  <CardContent key={"movie-name"} className={classes.cardContent}>
                    <FormControl key={"1"}>
                        <InputLabel key={"input-label-1"} htmlFor="movie-name">Movie Name</InputLabel>
                        <Input type="text" id="movie-name" name="title" aria-describedby="my-helper-text" style={{width: '240px'}} onChange={handleInputChange} />
                    </FormControl>
                  </CardContent>


                {/**Select Genres */}
                <CardContent key={"movie-genre"} className={classes.cardContent}>
                    <FormControl key={"2"}>
                        <InputLabel key={"input-label-2"} htmlFor="genres">Genres</InputLabel>
                        <Select
                          labelId="genres"
                          name="genres"
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
                          name="artists"
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
                        <Input disabled type="date" name="start_data" id="release-start-date" aria-describedby="my-helper-text" style={{width: '240px'}} onChange={handleInputChange}/>
                    </FormControl>
                </CardContent>

                {/**End Date */}
                <CardContent key={"movie-end-date"} className={classes.cardContent}>
                    <FormControl key={"form-control-5"}>
                        <FormHelperText>Release date end</FormHelperText>
                        <InputLabel key={"input-label-5"} htmlFor="end-date"></InputLabel>
                        <Input disabled type="date" name="end_data" id="release-end-date" aria-describedby="my-helper-text" style={{width: '240px'}} onChange={handleInputChange} />
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
      
          var name= event.target.id;
          var value = event.target.value;
          document.getElementById(id).value = value;
    
          //update filtered Data
          setFilteredData({
            ...filteredMoviesData, [name]: value
          })

      }

        function applyFilters(filteredMoviesData){


         //fetch the appllied movie Filters
          var raw = "";

          var requestOptions = {
            method: 'GET',
            body: raw,
            redirect: 'follow'
          };

          fetch(`http://localhost:8085/api/movies?status=RELEASED&title=${filteredMoviesData.title}&genres=${filteredMoviesData.genres}&artists=${filteredMoviesData.artists}&start_date=${filteredMoviesData.start_date}&end_date=${filteredMoviesData.end_date}`, requestOptions)
            .then(response => response.text())
            .then(result => props.applyFilters(result))
            .catch(error => console.log('error', error));
        }
  }