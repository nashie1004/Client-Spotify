import React, {useContext, useEffect} from 'react'
import Main from '../Components/Main';
import MainTable from '../Components/MainTable';
import { useLocation } from "react-router-dom";

import {SpotifyContext} from '../Context/SpotifyContext';

export default function Table({type}) {

  const {fetchFunction, setSongs, setSongType, setLoading, setSongTableCoverImage} = useContext(SpotifyContext);
  
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
        
        const coverIMG = data.images[0].url;
        const coverName = data.name;
        const coverOwner = data.owner.display_name;
        const coverDescription = data.description;
        setSongTableCoverImage({ coverName, coverIMG, coverDescription, coverOwner })
        
      } else if (linkType === 'album'){
        const data = await fetchFunction(`/albums/${ID}`, 'GET')
        setSongs(data.tracks.items)
        setLoading(false)
        
        const coverIMG = data.images[0].url;
        const coverName = data.name;
        const coverOwner = data.artists[0].name;
        const coverDescription = data.release_date;
        setSongTableCoverImage({ coverName, coverIMG, coverDescription, coverOwner })
        
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