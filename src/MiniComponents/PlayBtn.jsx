import React, {useContext} from 'react'
import '../Styles/MainHome.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SpotifyContext } from '../Context/SpotifyContext';

export default function PlayBtn({type, size, footerSongURL, footerSongName, footerSongArtist, footerSongImage}) {
    const {setCurrentPlayingSong} = useContext(SpotifyContext);
    
    let class0 = ''
    if (type === 'row'){
        class0 = 'play-btn row'
    } else if (type === 'col'){
        class0 = 'play-btn col'
    } else if (type === 'big'){
        class0 = 'play-btn big'
    }

    function handleSong(){
        setCurrentPlayingSong({footerSongURL, footerSongName, footerSongArtist, footerSongImage})
    }

    if (size === 'regular'){
        return (
            <div className={class0}>
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
