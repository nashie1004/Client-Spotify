import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Nav.scss'

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import { SpotifyContext } from '../Context/SpotifyContext';

export default function Nav() {
  const {
    fetchFunction, 
    setHamburgerOptions, 
    savedPlaylists,
    setSavedPlaylists, PORT
  } = useContext(SpotifyContext)

  // FETCH /ME FOR USER_ID THEN /USERS/USER_ID
  useEffect(() => {
    async function call(){
      const user = await fetchFunction('/me', 'GET')
      const data = await fetchFunction(`/users/${user.id}/playlists`, 'GET')
      console.log('nav call user playlist:', data)
      setSavedPlaylists(data.items);
      setHamburgerOptions(data.items);
    }
    call()
  }, [])

  function handlePlaylist(){
    async function call(){
      const BASE_URL = 'https://api.spotify.com/v1'
      let access_token = null;
      const token = await fetch(PORT + '/get_access_token');
      const objToken = await token.json();
      access_token = objToken.access_token;

      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify({
          'name': 'New Playlist!',
          'description': 'New playlist description',
          'public': false
        })
      }

      try {
        const me = await fetchFunction('/me', 'GET')
        const result = await fetch(BASE_URL + `/users/${me.id}/playlists`, options)
        const data = await fetchFunction(`/users/${me.id}/playlists`, 'GET')
        console.log('nav: ', data, result)
        setSavedPlaylists(data.items);
        setHamburgerOptions(data.items);
      } catch (err){
        console.log('nav:', err)
      }

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
      <div className='nav-actions hover' style={{cursor: 'pointer'}}>
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
