import React from 'react';
import Header from '../../common/header/Header.js';
import './Home.css';
import GridListUpcoming from './UpcomingMoviesGrid.js';
import GridListReleased from './ReleasedMoviesGrid.js';
import MovieFilter from './MovieFilter';
// import moviesData from '../../assets/moviesData';
// import genres from '../../assets/genre';
// import artists from '../../assets/artists'
import {useState, useEffect}from 'react';



export default function Home(props){

    
    //state for upcoming movies
    const [upcomingMovies, setUpcomingMovies] = useState({moviesData: [{
                                                                id: "M1", // for testing only give default value
                                                                poster_url: "",
                                                                title: "",
                                                                release_date: "",
                                                                genres: [],
                                                                artists: [{}]
                                                              }]
                                                           });
    //state for release movies
    const [releaseMovies, setReleaseMovies] = useState({moviesData: [{
                                                            id: "",
                                                            title: "",
                                                            poster_url: "",
                                                            release_date: "",
                                                            genres: [],
                                                            artists: [{}]
                                                        }]
                                                    });
    // After mounting fetch data from server 
    useEffect(()=>{

        var raw = "";

        var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
        };

        //fetch data api from server
        fetch("http://localhost:8085/api/movies?status=RELEASED", requestOptions)
        .then(response => response.text())
        .then((result)=>{
            //set Released Movies Data
           setUpcomingMovies({
            moviesData: result.json()
           })
         })
         .catch(error => console.log('error', error));

       //fetch data api from server
            fetch("http://localhost:8085/api/movies?status=RELEASED", requestOptions)
            .then(response => response.text())
            .then((result)=>{
                //set Released Movies Data
               setReleaseMovies({
                moviesData: result.json()
               })
             })
            .catch(error => console.log('error', error));
    },[])
    
          return (
            <div key={"root-content"}>
                <Header {...props}></Header>

                <div key={"upcoming-header-text"} className="heading">
                    <span>Upcoming Movies</span>
                </div>

                {/*Calling the ImageList component to display upcoming Movies*/}
                <GridListUpcoming id="upcoming-movies-grid-list-root" moviesData={upcomingMovies.moviesData}/>

                <div key={"released-movies-and-filter-container"} className="flex-container">
                    <div id="released-movies-container-root" className="left">
                        {/*Calling the ImageList component to display released Movies*/}
                        <GridListReleased moviesData={releaseMovies.moviesData} />
                    </div>
                    <div  id="filter-container" className="right">
                        {/*for movies filter*/}
                        <MovieFilter moviesData={releaseMovies.moviesData} applyFilters={(filteredMoviesData)=>applyFilters(filteredMoviesData)}
                        />
                    </div>
               </div>
            </div>
          );

          function applyFilters(moviesData){
                //update value of filtered movies in release grid list
                setReleaseMovies([{moviesData: {moviesData}}])
          }
}