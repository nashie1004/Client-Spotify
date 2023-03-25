import React, {useState, useContext, useEffect} from 'react';
import '../Styles/MainTable.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TableBodyItem from '../MiniComponents/TableBodyItem';
import HeaderStickyScroll from './HeaderStickyScroll';
import '../App.scss'
import NavDisplayBtn from '../MiniComponents/NavDisplayBtn';

import {SpotifyContext} from '../Context/SpotifyContext';

export default function MainTable({type}) {
  const [addSticky, setAddSticky] = useState(false);
  const [arr, setArr] = useState([]);
  
  const {songs, songType, loading, songTableCoverImage} = useContext(SpotifyContext);

  useEffect(() => {
    setArr([...songs])
    // console.log(arr)
  }, [])

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
  try {
    return (
      <section onScroll={addStickyHeader}>
        <HeaderStickyScroll opacityState={true} />
        <NavDisplayBtn />
        <div className={boxBgClass}>
          <div className={boxClass}>
            {
              type === 'playlist' || type === 'album'
              ? <img className='cover-image' src={songTableCoverImage.coverIMG} alt="cover-img" />
              : <FavoriteIcon fontSize='large' /> 
            }
          </div>
          <span>
            <h6>{/*type !== 'artist' || type === 'liked' ? type : ''*/}</h6>
            <h1>
              {
                type === 'playlist' || type === 'album' 
                ? (songTableCoverImage.coverName.slice(0, 12) && songTableCoverImage.coverName.slice(0, 12))
                : (type === 'liked' ? 'LIKED' : 'ARTIST')
              }
            </h1>
            <h6>
              {
                type === 'playlist' || type === 'album'
                ? songTableCoverImage.coverOwner
                : ''
              }
            </h6>
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
              <h4>{songType === 'artist' || songType === 'album' ? 'Release' : 'Duration'}</h4>
            </div>
            <div className='last-div-flex-end'>
              <h4>Action</h4>
            </div>
          </div>
          <div className="test">
            {
              (songType === 'artist' || songType === 'album') ? 
              (
                songs.map((item, i) => {
                  let imgURL = ''
                  if (songType === 'artist'){
                    try {
                      imgURL = item.images[0].url
                    } catch (err) {
                      imgURL = ''
                      // console.log('ERROR ITEM AT: ', i)
                    }
                  } else if (songType === 'album') {
                    try {
                      imgURL = songTableCoverImage.coverIMG
                    } catch (err) {
                      imgURL = ''
                      // console.log('ERROR ITEM AT: ', i)
                    }
                  }
                  try{
                    return <TableBodyItem
                      linkType={songType} 
                      name={item.name.slice(0, 25)} 
                      artistName={item.artists[0].name} 
                      imageURL={imgURL} 
                      index={i}
                      key={i} 
                      songURL={item.preview_url}
                      songDuration={songType === 'album' ? (item.duration_ms / 60000).toString().slice(0, 4).replace('.', ':') : item.release_date} 
                      artistId={item.artists[0].id} 
                      id={item.id}
                    />
                  } catch (err){
                    console.log(err)
                  }
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
                  try {
                    return <TableBodyItem
                      linkType={songType} 
                      name={item.track.name} 
                      artistName={item.track.artists[0].name} 
                      imageURL={imgURL} 
                      index={i}
                      key={i} 
                      songURL={item.track.preview_url}
                      songDuration={(item.track.duration_ms / 60000).toString().slice(0, 4).replace('.', ':')} 
                      artistId={item.track.artists[0].id} 
                      id={item.track.id}
                    />
                    //
                  } catch (err){
                    console.log(err)
                  }
                }))
            }
          </div>
        </div>
      </section>
    )
  } catch (err){
    console.log(err)
  }
}
