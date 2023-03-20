import React from 'react'
import '../Styles/MainSearch.scss'
import {Link} from 'react-router-dom'
import PlayBtn from '../MiniComponents/PlayBtn'
import Hamburger from '../MiniComponents/Hamburger'

export default function LeftResultCards(props) {
  const {image, name, artistName, id, duration, preview_url} = props;

  return (
    <div className="result-cards">
      <div style={{position: 'relative'}}>
        <PlayBtn 
          size='results'
          footerSongURL={preview_url} 
          footerSongName={name} 
          footerSongArtist={artistName} 
          footerSongImage={image}
        />
        <img src={image} alt="right-search" />
      </div>
      <span>
        <Link to={'/artist/' + id}>
          <h4>{name}</h4>
        </Link>
        <p>{artistName}</p>
      </span>
      <p>{duration}</p>
      <Hamburger />
    </div>
  )
}
