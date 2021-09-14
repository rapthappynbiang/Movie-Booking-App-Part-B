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


export  default function Details(props){
    
    var movieId = props.match.params.id;

    //for testing purpose since no server is setup yet
    if(movieId===null){
         movieId = "M1"
    }
    const [movieData, setMovie] = useState([{
                                        id: movieId,
                                        title: "",
                                        poster_url:"",
                                        trailer_url: "",
                                        wiki_url: "",
                                        genres: [],
                                        artists: [],
                                        story_line: "",
                                        release_date: "yyyy-mm-ddT.....",
                                        duration: "",
                                        critics_ratings: null,

    }]);

        useEffect(()=>{
            //load data from server
            const url = "https://localhost:8085/movies/" + movieId;
            
            var requestOptions = {
            method: 'GET',
            redirect: 'follow'
            };

            fetch(url, requestOptions)
            .then(response => response.json())
            .then(result =>{
                //set movieData
                setMovie(result)
            })
            .catch(error => console.log('error', error));
            
        },[]);

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
                 <Header {...props}/>
                 <div id="content-main-container">
                    <div>
                        <Typography className="back-home-btn" variant="button" style={{margin: '8px 0px 0px 24px', height: '24px'}}>
                            <Link to="/" >&lt; Back to home</Link>
                        </Typography>            
                    </div>
                    <div id="movie-details-container">

                        {/**-------------Movie Image ---------------------*/}
                        <div id="left">
                            <img src={movieData[0].poster_url}  alt={movieData[0].title} style={{width: '80%'}}/>
                        </div>

                        {/**-------------Movie details with trailer---------------------*/}
                        <div id="middle">
                            <Typography variant="h2" style={{display: 'block'}}>
                            {movieData[0].title}
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Genres:</b> {(()=>{
                                let genresStr = movieData[0].genres[0];
                                for(let i=1;i<movieData[0].genres.length;i++){
                                    if(i=== movieData[0].genres.length-1){
                                        //last element in genres array
                                        genresStr = genresStr + ", " + movieData[0].genres[i];
                                    }else{
                                        genresStr = genresStr + ", " + movieData[0].genres[i];
                                    }
                                }
                                return genresStr;
                            })()} 
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Duration:</b> {movieData[0].duration}  
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Release Date:</b> {formatDateString(movieData[0].release_date)}
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block'}}>
                            <b>Rating:</b> {movieData[0].rating}
                            </Typography>
                            
                            <Typography variant="subtitle1" style={{display: 'block', marginTop: '16px'}}>
                            <b>Plot:</b> <a href={movieData[0].wiki_url} target="_blank" style={{textDecorationLine: 'none'}}>(Wiki link)</a> {movieData[0].story_line}
                            </Typography>
                            
                            <Typography variant="h5" style={{display: 'block', marginTop: '16px'}}>
                            <b>Trailer:</b>
                            </Typography>
                            
                            <div className="video-container">
                            <YouTube videoId={movieData[0].trailer_url.split('=')[1]} style={{width: '90%'}} opts={opts} onReady={(event)=>_onReady(event)}/>
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
                                <input id="star-rating-value" type="number" value={0} style={{display: 'none'}} onChange={submitRatingsValue}/>

                                {/**-------------Artists Images---------------------*/}
                                <div id="artists-container">
                                    <Typography variant="subtitle1">
                                        <b>Artists:</b>
                                    </Typography>
                                    <ImageList cols={2}>
                                        {movieData[0].artists.map((artist)=>(
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

        //set input value as value for submitting rating value
       document.getElementById('star-rating-value').value = value;
     }

     function submitRatingsValue(event){
         //set some data to be submitted
         var ratings = event.target.value;
     }
}