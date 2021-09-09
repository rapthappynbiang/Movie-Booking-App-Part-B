import React from 'react';
import { Component } from "react";
import moviesData from '../../common/moviesData';
import Header from '../../common/header/Header.js';
import './Home.css';
import GridListUpcoming from './UpcomingMoviesGrid.js';
import GridListReleased from './ReleasedMoviesGrid.js';
import MovieFilter from './MovieFilter';
import genres from './genre';
import artists from './artists'



export default class Home extends Component{
    constructor(){
        super();
        this.state={upcoming: {moviesData}, release: {moviesData}}
    }
    render(){
          return (
            <div key={"root-content"}>
                <Header page="Home" ></Header>

                <div key={"upcoming-header-text"} className="heading">
                    <span>Upcoming Movies</span>
                </div>

                {/*Calling the ImageList component to display upcoming Movies*/}
                <GridListUpcoming id="upcoming-movies-grid-list-root" moviesData={this.state.upcoming.moviesData}/>

                <div key={"released-movies-and-filter-container"} className="flex-container">
                    <div id="released-movies-container-root" className="left">
                        {/*Calling the ImageList component to display released Movies*/}
                        <GridListReleased moviesData={this.state.release.moviesData} />
                    </div>
                    <div  id="filter-container" className="right">
                        {/*for movies filter*/}
                        <MovieFilter moviesData={moviesData} genres ={genres} artists={artists} applyFilters={(moviesData)=>{
                                                                                             this.setState({release: this.state.release = {moviesData}})
                                                                                            }}
                        />
                    </div>
               </div>
            </div>
          )
    };
}