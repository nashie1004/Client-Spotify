import React, {useState, useContext} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { SpotifyContext } from '../Context/SpotifyContext';

export default function Hamburger() {
  const [styles, setStyles] = useState('none')
  const {fetchFunction, hamburgerOptions} = useContext(SpotifyContext);

  function showBox(){
    if (styles === 'none'){
      setStyles('block')
    } else {
      setStyles('none')
    }
  }

  async function handleOptions(){
    // const data = await fetchFunction(`/playlists/${0}/tracks`, 'POST');
  }

  return (
    <div class='menu-btn'>
      <MenuIcon onClick={showBox} />
      <div className='dropdown' style={{display: styles}}>
        <p onClick={handleOptions} style={{borderBottom: '1px solid #282828'}}>Add To Favorites</p>
        {
          hamburgerOptions.map((playlist, i) => {
            if (playlist.name && playlist.name !== ''){
              return (
                <p onClick={handleOptions}>Add to {playlist.name.slice(0, 15)}...</p>
              )
            }
          })
        }
      </div>
    </div>
  )
}
