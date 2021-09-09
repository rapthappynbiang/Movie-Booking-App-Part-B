import {React, Fragment} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import StarBorderIcon from '@material-ui/icons/StarBorder'; 
import YouTube from 'react-youtube';
import {useState, useEffect} from 'react';
import Header from '../../common/header/Header'
import './Details.css';
import moviesData from '../../common/moviesData'


export  default function Details(props){
    
    const movieId = useParams();
    var movieData;

    for(let i=0;i<moviesData.length;i++){
        if(moviesData[i].id == movieId.id){
            movieData = moviesData[i];
            break;
        }
    }


    const [movie, setMovie] = useState([{
        title: movieData.title, 
        genres: movieData.genres,
        duration: movieData.duration,
        release_date: movieData.release_date,
        rating: movieData.critics_rating,
        poster_url: movieData.poster_url,
        wiki_url: movieData.wiki_url,
        trailer_url: movieData.trailer_url,
        story_line: movieData.storyline,
        artists: movieData.artists
    }]);

        useEffect(()=>{
            
        },[movie])
         //for YouTube video tag
        const opts = {
            height: '390',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
            },
          };
         return(
            <Fragment>
                 <Header />
                 <div id="content-main-container">
                    <div>
                        <Typography className="back-home-btn" variant="button" style={{margin: '8px 0px 0px 24px', height: '24px'}}>
                            <Link to="/" >&lt; Back to home</Link>
                        </Typography>            
                    </div>
                    <div id="movie-details-container">

                        {/**-------------Movie Image ---------------------*/}
                        <div id="left">
                            <img src={movie[0].poster_url}  alt={movie[0].title} style={{width: '80%'}}/>
                        </div>

                        {/**-------------Movie details with trailer---------------------*/}
                        <div id="middle">
                            <Typography variant="h2" style={{display: 'block'}}>
                            {movie[0].title}
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Genres:</b> {(()=>{
                                let genresStr = movie[0].genres[0];
                                for(let i=1;i<movie[0].genres.length;i++){
                                    if(i=== movie[0].genres.length-1){
                                        //last element in genres array
                                        genresStr = genresStr + ", " + movie[0].genres[i];
                                    }else{
                                        genresStr = genresStr + ", " + movie[0].genres[i];
                                    }
                                }
                                return genresStr;
                            })()} 
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Duration:</b> {movie[0].duration}  
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Release Date:</b> {formatDateString(movie[0].release_date)}
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Rating:</b> {movie[0].rating}
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block', marginTop: '16px'}}>
                            <b>Plot:</b> <a href={movie[0].wiki_url} target="_blank" style={{textDecorationLine: 'none'}}>(Wiki link)</a> {movie[0].story_line}
                            </Typography>
                            
                            <Typography variant="h5" style={{display: 'block', marginTop: '16px'}}>
                            <b>Trailer:</b>
                            </Typography>
                            
                            <div className="video-container">
                            <YouTube videoId={movie[0].trailer_url.split('=')[1]} style={{width: '90%'}} opts={opts} onReady={(event)=>_onReady(event)}/>
                            </div>
                        </div>

                        {/**-------------Movie[0] Rating and artists---------------------*/}
                        <div id="right">
                            <div id="right-inner-container">
                                <Typography variant="subtitle1">
                                   <b>Rate this movie:</b> 
                                </Typography>
                                {/**THE STARS RATINGS */}
                                <Typography variant="button" className="star-icon" onClick={()=>{setStarRatings(1)}}>
                                    <StarBorderIcon  />
                                </Typography >
                                <Typography variant="button" className="star-icon" onClick={()=>{setStarRatings(2)}}>
                                    <StarBorderIcon  />
                                </Typography >
                                <Typography variant="button" className="star-icon" onClick={()=>{setStarRatings(3)}}>
                                    <StarBorderIcon  />
                                </Typography >
                                <Typography variant="button" className="star-icon" onClick={()=>{setStarRatings(4)}}>
                                    <StarBorderIcon  />
                                </Typography >
                                <Typography variant="button" className="star-icon" onClick={()=>{setStarRatings(5)}}>
                                    <StarBorderIcon  />
                                </Typography >
                                <input id="star-rating-value" type="number" value={0} style={{display: 'none'}}/>

                                {/**-------------Artists Images---------------------*/}
                                <div id="artists-container">
                                    <Typography variant="subtitle1">
                                        <b>Artists:</b>
                                    </Typography>
                                    <ImageList cols={2}>
                                        {movie[0].artists.map((artist)=>(
                                            <ImageListItem key={artist.id}>
                                                <img id={"image-"+artist.id} src={artist.profile_url} alt={artist.firs_name}/>
                                                <ImageListItemBar key={"artist-name-"+artist.id} title={artist.first_name + " " + artist.last_name} />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
         );

    function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

     function formatDateString(release_date){
        var releasedDate = release_date.substr(0,10).split("-");
        return releasedDate[2] + "/" + releasedDate[1] + "/" + releasedDate[0];
    }

     function setStarRatings(value){
          //set input value as value for submitting rating value
       document.getElementById('star-rating-value').value = value;
        var starIconsList = document.getElementsByClassName("star-icon");

        //set the color of stars selected
        for(let i=0;i<5;i++){
            if(i<value){
                //color orange for the number of stars selected
                starIconsList[i].style.color = "orange";
            }else{
                //make the rest black
                starIconsList[i].style.color = "black";
            }
        }
}
}