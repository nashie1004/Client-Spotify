import React from 'react'
import '../Styles/MainHome.scss'
import {Link} from 'react-router-dom'
import PlayBtn from './PlayBtn'

export default function CardRowContainer(props) {
  const {preview_url, linkType, image, name, id, releaseDate, artistName} = props;
  
  return (
    <div className='card-row'>
      <img src={image} alt="card-row-img" />
      <div className='card-row-info'>
        <Link to={`/${linkType}/${id}`}>
          <h4>{name}</h4>
        </Link>
        <p>{artistName ? artistName : releaseDate}</p>
        <PlayBtn 
          type={'row'} 
          size='regular' 
          footerSongURL={preview_url} 
          footerSongName={name} 
          footerSongArtist={artistName} 
          footerSongImage={image}
        />
      </div>
    </div>
  )
}
