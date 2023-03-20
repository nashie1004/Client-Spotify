import React from 'react'
import '../Styles/MainHome.scss'
import {Link} from 'react-router-dom'
import PlayBtn from './PlayBtn';

export default function CardCol(props) {
  const {image, name, id} = props;
  
  return (
    <div className='card-col'>
        <img src={image} alt="" />
        <Link to={'/album/' + id}>
          <h4>{name}</h4>
        </Link>
        <PlayBtn 
        type='col' 
        size='regular' 
        footerSongURL={null} 
        footerSongName={name} 
        footerSongArtist={null} 
        footerSongImage={image}
        />
    </div>
  )
}
