import React, {useContext, useState, useRef} from 'react'
import '../Styles/Footer.scss'

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReplayIcon from '@mui/icons-material/Replay';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Slider from '@mui/material/Slider';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

import { SpotifyContext } from '../Context/SpotifyContext';

export default function Footer() {
  const {currentPlayingSong} = useContext(SpotifyContext);
  const audio = useRef(null);
  
  let IMG = '';
  let SONGNAME = '';
  let ARTISTNAME = '';

  if (Object.keys(currentPlayingSong).length !== 0 && currentPlayingSong.footerSongURL !== null){
    audio.current.src = currentPlayingSong.footerSongURL
    IMG = currentPlayingSong.footerSongImage
    SONGNAME = currentPlayingSong.footerSongName
    ARTISTNAME = currentPlayingSong.footerSongArtist
    audio.current.play()
    audio.current.volume = 0.3
  }

  function playAudio(){
    if (audio){
      if (audio.current.paused){
        audio.current.play()
      } else {
        audio.current.pause()
      }
    }
  }

  function adjustVolume(e){
    audio.current.volume = e.target.value / 100
  }

  return (
    <div className='footer'>
      <div className='left-footer'>
        <img src={IMG} alt=''/>
        <span>
          <h4>{SONGNAME !== '' || SONGNAME ? SONGNAME : 'Preview Not Available'}</h4>
          <p>{ARTISTNAME !== '' || ARTISTNAME ? ARTISTNAME : 'Preview Not Available'}</p>
        </span>
      </div>
      <div className='mid-footer'>
        <ShuffleIcon fontSize='large' />
        <SkipPreviousIcon fontSize='large' />
        <PlayCircleIcon fontSize='large' onClick={playAudio} />
        <SkipNextIcon fontSize='large' />
        <ReplayIcon fontSize='large' />
        <audio ref={audio} src=''>
          {/* <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton> */}
        </audio>
      </div>
      <div className='right-footer'>
        <VolumeDownIcon fontSize='large' />
        <audio src={''} id='vol' />
        <div className='volume-container'>
          <Slider 
            defaultValue={10} 
            aria-label="Default" 
            valueLabelDisplay="auto" 
            onChange={adjustVolume}
          />      
        </div>
      </div>
    </div>
  )
}
