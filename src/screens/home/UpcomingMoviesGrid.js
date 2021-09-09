import React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

//upcoming movies grid component
  export default function ImageListUpcoming(props) {
  
    //movies data array;
    const moviesData = props.moviesData;

    return (
      <div>
        <ImageList key="upcoming-grid-List-main" cols={5} style={{flexWrap: 'nowrap'}}>
          {moviesData.map((movie) => (
            <ImageListItem key={movie.id} id={movie.id} style={{height: 250}}>
              <img src={movie.poster_url} alt={movie.title} />
              <ImageListItemBar
                key={"u-item-bar-"+movie.id}
                title={movie.title}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
