import React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from 'react-router-dom';

//released movie grid component
export default function ImageListReleased(props){
 
    // movies data array
    const moviesData= props.moviesData
    
    return (
      <div key={"release-movies-Container"} style={{marginLeft: '2%', width: '100%'}}>
         <ImageList key="release-grid-list-main" cols={4} style={{flexWrap: 'wrap', width: '100%'}}>
            {moviesData.map((movie) => (
              
              <ImageListItem key={"movie-item"+movie.id} className="movie-item" style={{width: '19%', height: 350, margin: '2% 1% 0%'}}>
               <Link to = {'/movies/'+ movie.id}>
                <img src={movie.poster_url} alt={movie.title} style={{width: 'fit-content'}} />
                   <ImageListItemBar
                     key={"item-bar-"+movie.id}
                     title={movie.title}
                     subtitle={<span>Released date:{(()=>{
                                                      var releasedDate = movie.release_date.substr(0,10).split("-");
                                                      return releasedDate[2] + "/" + releasedDate[1] + "/" + releasedDate[0];
                                                    })()}
                               </span>}
                    />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
      </div>
    );
}