import React from 'react'
import '../Styles/MainTable.scss'
import {Link} from 'react-router-dom'
import PlayBtn from '../MiniComponents/PlayBtn'
import Hamburger from './Hamburger'

export default function TableBodyItem(props) {
    const {linkType, name, artistName, imageURL, index, songURL, songDuration, artistId, id} = props;
    
    let redirectNameH4 = `/`;
    if (linkType === 'artist'){
        redirectNameH4 = `/album/${id}`
    } else if (true){
        redirectNameH4 = `/artist/${artistId}`
    }
    
    // NOTE: LINKTYPE AND ID (FOR TRACK) NOT THE SAME
    let redirectArtistP = `/artist/${artistId}`;

    return (
    <div className='table-body'>
        <div className='count'>
            <h3>{index + 1}</h3>
        </div>
        <div className='song-info-span'>
            <PlayBtn 
                footerSongURL={songURL} 
                footerSongName={name} 
                footerSongArtist={artistName} 
                footerSongImage={imageURL}
                footerSongIndex={index}
                size='liked' 
            />
            <img src={imageURL} alt="profile" />
            <span>
                <Link to={redirectNameH4}> 
                    <p>{name}</p>
                </Link>
                <p>
                    <Link to={redirectArtistP}>
                        {artistName}
                    </Link>
                </p>
            </span>
        </div>
        <div className='extra-info'>
            <p>{songURL ? 'Available' : 'Not Available'}</p>
        </div>
        <div className='duration'>
            <p>{songDuration}</p>
        </div>
        <div className='other-actions last-div-flex-end'>
            <Hamburger />
        </div>
    </div>
  )
}
