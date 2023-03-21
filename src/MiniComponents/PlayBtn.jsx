import React, {useContext} from 'react'
import '../Styles/MainHome.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SpotifyContext } from '../Context/SpotifyContext';

export default function PlayBtn({type, size, footerSongIndex, footerSongURL, footerSongName, footerSongArtist, footerSongImage}) {
    const {setCurrentPlayingSong} = useContext(SpotifyContext);
    
    let stylingClass = ''
    if (type === 'row'){
        stylingClass = 'play-btn row'
    } else if (type === 'col'){
        stylingClass = 'play-btn col'
    } else if (type === 'big'){
        stylingClass = 'play-btn big'
    }

    function handleSong(){
        setCurrentPlayingSong({footerSongIndex, footerSongURL, footerSongName, footerSongArtist, footerSongImage})
    }

    if (size === 'regular'){
        return (
            <div className={stylingClass}>
                <PlayArrowIcon color="action" onClick={handleSong}/>
            </div>
        )
    } else if (size === 'liked') {
        return (
            <div className='liked-btn'>
              <PlayArrowIcon color="action" onClick={handleSong}/>
            </div>
        )
    } else if (size === 'results'){
        return (
            <div className='results-btn'>
              <PlayArrowIcon color="action" onClick={handleSong}/>
            </div>
        )
    }
}
