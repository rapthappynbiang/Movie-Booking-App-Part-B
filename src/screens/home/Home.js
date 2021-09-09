import React from 'react';
import Header from '../../common/header/Header.js';
import './Home.css';
import GridListUpcoming from './UpcomingMoviesGrid.js';
import GridListReleased from './ReleasedMoviesGrid.js';
import MovieFilter from './MovieFilter';
import moviesData from '../../assets/moviesData';
import genres from '../../assets/genre';
import artists from '../../assets/artists'
import {useState, useEffect}from 'react';



export default function Home(props){

    const [upcomingMovies, setUpcomingMovies] = useState([{moviesData: moviesData}]);
    const [retleaseMovies, setReleaseMovies] = useState([{moviesData: moviesData}]);
    
          return (
            <div key={"root-content"}>
                <Header {...props}></Header>

                <div key={"upcoming-header-text"} className="heading">
                    <span>Upcoming Movies</span>
                </div>

                {/*Calling the ImageList component to display upcoming Movies*/}
                <GridListUpcoming id="upcoming-movies-grid-list-root" moviesData={upcomingMovies[0].moviesData}/>

                <div key={"released-movies-and-filter-container"} className="flex-container">
                    <div id="released-movies-container-root" className="left">
                        {/*Calling the ImageList component to display released Movies*/}
                        <GridListReleased moviesData={retleaseMovies[0].moviesData} />
                    </div>
                    <div  id="filter-container" className="right">
                        {/*for movies filter*/}
                        <MovieFilter moviesData={moviesData} genres ={genres} artists={artists} applyFilters={(moviesData)=>{
                                                                                             setReleaseMovies([{moviesData: {moviesData}}])
                                                                                            }}
                        />
                    </div>
               </div>
            </div>
          );
}