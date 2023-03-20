import React, {useState, useContext} from 'react';
import '../Styles/MainTable.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TableBodyItem from '../MiniComponents/TableBodyItem';
import HeaderStickyScroll from './HeaderStickyScroll';
import '../App.scss'
import NavDisplayBtn from '../MiniComponents/NavDisplayBtn';

import {SpotifyContext} from '../Context/SpotifyContext';

export default function MainTable({type}) {
  const [addSticky, setAddSticky] = useState(false);
  
  const {songs, songType, loading} = useContext(SpotifyContext);

  function addStickyHeader(e){
    if (e.target.scrollTop > 275){
      setAddSticky(true);
    } else setAddSticky(false);
  }

  let boxBgClass = '';
  let boxClass = '';
  if (type === 'liked'){
    boxClass = "heart-gradient liked"
    boxBgClass = 'table-top-info liked'
  } else if (type === 'album'){
    boxClass = 'heart-gradient album'
    boxBgClass = 'table-top-info album'
  } else if (type === 'artist'){
    boxClass = 'heart-gradient artist'
    boxBgClass = 'table-top-info artist'
  } else if (type === 'playlist'){
    boxClass = 'heart-gradient playlist'
    boxBgClass = 'table-top-info playlist'
  }

  if (loading){
    return (
      <div className='loading-screen'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <section onScroll={addStickyHeader}>
      <HeaderStickyScroll opacityState={true} />
      <NavDisplayBtn />
      <div className={boxBgClass}>
        <div className={boxClass}>
          <FavoriteIcon fontSize='large' />
        </div>
        <span>
          <h6>Playlist</h6>
          <h1>{type}</h1>
          <h6>Lorem, ipsum dolor.</h6>
        </span>
      </div>
      <div className="table">
        <div className="table-head" style={addSticky ? {background: '#031217'} : {background: 'none'}}>
          <div>
            <h4>#</h4>
          </div>
          <div>
            <h4>Title</h4>          
          </div>
          <div>
           <h4>Preview Mp3</h4>
          </div>
          <div>
            <h4>Duration</h4>
          </div>
          <div className='last-div-flex-end'>
            <h4>Actions</h4>
          </div>
        </div>
        <div className="test">
          {
            (songType === 'artist' || songType === 'album') ? 
            (
              songs.map((item, i) => {
                let imgURL = ''
                try {
                  imgURL = item.album.images[0].url
                } catch (err) {
                  imgURL = ''
                  // console.log('ERROR ITEM AT: ', i)
                }
                return <TableBodyItem
                  linkType={songType} 
                  name={item.name} 
                  artistName={item.artists[0].name} 
                  imageURL={imgURL} 
                  index={i}
                  key={i} 
                  songURL={item.preview_url}
                  songDuration={item.duration_ms} 
                  artistId={item.artists[0].id} 
                  id={item.id}
                />
              })
            ) :
            (
              songs.map((item, i) => {
                let imgURL = ''
                try {
                  imgURL = item.track.album.images[0].url
                } catch (err) {
                  imgURL = ''
                  // console.log('ERROR ITEM AT: ', i)
                }
                return <TableBodyItem
                  linkType={songType} 
                  name={item.track.name} 
                  artistName={item.track.artists[0].name} 
                  imageURL={imgURL} 
                  index={i}
                  key={i} 
                  songURL={item.track.preview_url}
                  songDuration={item.track.duration_ms} 
                  artistId={item.track.artists[0].id} 
                  id={item.track.id}
                />
              })
            )
          }
        </div>
      </div>
    </section>
  )
}
