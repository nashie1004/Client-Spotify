import React, {useContext, useRef} from 'react'
import '../Styles/Footer.scss'

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReplayIcon from '@mui/icons-material/Replay';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Slider from '@mui/material/Slider';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

import { SpotifyContext } from '../Context/SpotifyContext';

export default function Footer() {
  const {currentPlayingSong, setCurrentPlayingSong, songs} = useContext(SpotifyContext);
  const audio = useRef(null);

  let IMG = '';
  let SONGNAME = '';
  let ARTISTNAME = '';
  let CURRENTINDEX = null;

  let randomize = false;

  if (Object.keys(currentPlayingSong).length !== 0 && currentPlayingSong.footerSongURL){
    audio.current.src = currentPlayingSong.footerSongURL
    IMG = currentPlayingSong.footerSongImage
    SONGNAME = currentPlayingSong.footerSongName
    ARTISTNAME = currentPlayingSong.footerSongArtist
    CURRENTINDEX = currentPlayingSong.footerSongIndex
    audio.current.volume = 0.3
  } 
  else if (currentPlayingSong.footerSongURL === null) {
    audio.current.src = '';
    IMG = ''
    SONGNAME = ''
    ARTISTNAME = ''
    CURRENTINDEX = '';
    CURRENTINDEX = currentPlayingSong.footerSongIndex
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
  function moveBtn(num){
    let idx = null;
    if (randomize === false){
      if (CURRENTINDEX + num > songs.length - 1){
        CURRENTINDEX = 0;
      } else if (CURRENTINDEX + num < 0){
        CURRENTINDEX = songs.length;
      }
      idx = CURRENTINDEX + num;
    } else {
      idx = Math.floor(Math.random() * songs.length);
    }
    setCurrentPlayingSong({
      footerSongIndex: idx, 
      footerSongURL: songs[idx].track.preview_url, 
      footerSongName: songs[idx].track.name, 
      footerSongArtist: songs[idx].track.artists[0].name, 
      footerSongImage: songs[idx].track.album.images[0].url
    })
  }
  function shuffle(){
    randomize = !randomize;
    console.log('shuffle status:', randomize);
  }
  function replay(){
    audio.current.loop = !audio.current.loop;
    console.log('loop status:', audio.current.loop)
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
        <ShuffleIcon fontSize='large' onClick={shuffle}/>
        <SkipPreviousIcon fontSize='large' onClick={() => moveBtn(-1)} />
        {
          audio ? 
          <PauseCircleIcon fontSize='large' onClick={playAudio} />
          :
          <PlayCircleIcon fontSize='large' onClick={playAudio} />
        }
        <SkipNextIcon fontSize='large' onClick={() => moveBtn(1)}/>
        <ReplayIcon fontSize='large' onClick={replay}/>
        <audio ref={audio} src=''>
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
