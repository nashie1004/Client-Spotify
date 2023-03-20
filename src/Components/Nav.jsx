import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Nav.scss'

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import { SpotifyContext } from '../Context/SpotifyContext';

export default function Nav() {
  const {fetchFunction, setHamburgerOptions} = useContext(SpotifyContext)
  const [savedPlaylists, setSavedPlaylists] = useState([])

  // FETCH /ME FOR USER_ID THEN /USERS/USER_ID
  useEffect(() => {
    async function call(){
      const user = await fetchFunction('/me', 'GET')
      const data = await fetchFunction(`/users/${user.id}/playlists`, 'GET')
      setSavedPlaylists(data.items);
      setHamburgerOptions(data.items);
    }
    call()
  }, [])

  function handlePlaylist(){
    async function call(){
      alert('TODO');
      // const data = await fetchFunction('/me', 'POST')
    }
    call();
  }

  return (
    <div className='nav'>
      <div className='spotify-logo'>
        <h2>
          <i className="fa-brands fa-spotify"/>
          Spotify 2
        </h2>
      </div>
      <div className='hover'>
        <Link to='/' className='links'>
          <HomeIcon fontSize='medium' /> 
          <p>Home</p>
        </Link>   
      </div>
      <div className='hover'>
        <Link to='/search' className='links'>
          <SearchIcon fontSize='medium' /> 
          <p>Search</p>
        </Link>  
      </div>
      <div className='hover'>
        <Link to='/liked' className='links' >
          <FavoriteIcon fontSize='medium' /> 
          <p>Liked</p>
        </Link>
      </div>
      <div className='nav-actions hover'>
        <AddToPhotosIcon fontSize='medium' /> 
        <p onClick={handlePlaylist}>Create Playlist</p>
      </div>
      <div className="saved-playlists">
        {
          savedPlaylists.map((playlist, i) => {
            return (
              <Link to={'/playlist/' + playlist.id} key={i}>
                <p>{playlist.name}</p>
              </Link>
            )
          })
        }
      </div> 
    </div>
  )
}
