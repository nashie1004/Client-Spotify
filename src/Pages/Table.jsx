import React, {useContext, useEffect} from 'react'
import Main from '../Components/Main';
import MainTable from '../Components/MainTable';
import { useLocation } from "react-router-dom";

import {SpotifyContext} from '../Context/SpotifyContext';

export default function Table({type}) {

  const {fetchFunction, setSongs, setSongType, setLoading} = useContext(SpotifyContext);
  
  const currentURL = useLocation()
  const linkType = currentURL.pathname.split('/')[1];
  const ID = currentURL.pathname.split('/')[2];

  useEffect(() => {
    setLoading(true);
    async function call(){
      if (linkType === 'liked'){
        const data = await fetchFunction('/me/tracks?&limit=50', 'GET')
        setSongs(data.items)
        setLoading(false)

      } else if (linkType === 'playlist'){
        const data = await fetchFunction(`/playlists/${ID}`, 'GET')
        setSongs(data.tracks.items)
        setLoading(false)
        
      } else if (linkType === 'album'){
        const data = await fetchFunction(`/albums/${ID}`, 'GET')
        setSongs(data.tracks.items)
        setLoading(false)
        
      } else if (linkType === 'artist'){
        const artist = await fetchFunction(`/artists/${ID}`, 'GET')
        const data = await fetchFunction(`/artists/${artist.id}/albums`, 'GET')
        setSongs(data.items)
        setLoading(false)
      }
      setSongType(linkType);
    }
    call();

  }, [currentURL])

  return (
    <>
      <Main mainType={<MainTable type={type} />} />
    </>
  )
}




/*
async function call(){
    switch (type){

      case 'artist':
        const artist = await fetchFunction(`/artists/${ID}`, 'GET')
        const artistAlbums = await fetchFunction(`/artists/${artist.id}/albums`, 'GET')
        artistAlbums['items'].map((item, i) => {
          const obj = {
            name: item.name
          }
          insert(obj)
        })
        break;

      case 'playlist':
        const playlists = await fetchFunction(`/playlists/${ID}`, 'GET')
        playlists['tracks']['items'].map((item, i) => {
          //
        })
        break;

      case 'album':
        const albums = await fetchFunction(`/albums/${ID}`, 'GET')
        albums['tracks']['items'].map((item, i) => {
          //
        })
        break;

      default:
        const likedSongs = await fetchFunction('/me/tracks?&limit=50', 'GET')
        likedSongs['items'].map((item, i) => {
          //document.location.href
        })
        break;

    }
  }
  call();
*/