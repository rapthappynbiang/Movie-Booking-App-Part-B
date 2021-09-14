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
                                                                id: "",
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
       var upcomingMoviesData = await  loadData("http://localhost:8085/api/movies?status=PUBLISHED");
       var releaseMoviesData = await loadData("http://localhost:8085/api/movies?status=RELEASED");
       // set the upcoming MovieData
       setUpcomingMovies({
           moviesData: upcomingMoviesData
       });

       //set Released Movies Data
       setReleaseMovies({
           moviesData: releaseMoviesData
       })
    },[])
    


    //to load the data from server
     async function loadData(url){

            //fetch data api from server
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
    }
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
                        <MovieFilter moviesData={releaseMovies.moviesData} genres ={genres} artists={artists} applyFilters={(filteredMoviesData)=>applyFilters(filteredMoviesData)}
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