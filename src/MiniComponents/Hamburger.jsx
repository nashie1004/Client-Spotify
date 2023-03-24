import React, {useState, useContext} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { SpotifyContext } from '../Context/SpotifyContext';

export default function Hamburger({optionType, toAddId}) {
  const [styles, setStyles] = useState('none')
  const {hamburgerOptions, fetchFunction} = useContext(SpotifyContext);

  function showBox(){
    if (styles === 'none'){
      setStyles('block')
    } else {
      setStyles('none')
    }
  }

  //CAN BE TRACK ID OR ALBUM
  const tableBodyItemName = toAddId.name 
  const tableBodyItemId = toAddId.id 

  async function call(string, toAddOnPlaylistId){
    
    console.log(string)
    let result = null;

    try {
      switch(string){
        case 'ADD_TO_LIKED':
          result = await fetchFunction(`/me/tracks?ids=${tableBodyItemId}`, 'PUT')
          break;
        case 'REMOVE_FROM_LIKED':
          result = await fetchFunction(`/me/tracks?ids=${tableBodyItemId}`, 'DELETE')
          break;
        case 'ADD_TO_PLAYLIST':
          result = await fetchFunction(`/playlists/${toAddOnPlaylistId}/tracks?uris=spotify:track:${tableBodyItemId}`, 'POST')
          break;
        //---------BELOW ARE NOT WORKING---------
        case 'REMOVE_FROM_PLAYLIST':
          result = await fetchFunction(`/playlists/${toAddOnPlaylistId}/tracks?uris=spotify:track:${tableBodyItemId}`, 'DELETE')
          break;
        case 'ADD_ALBUM_TO_SAVED':
          result = await fetchFunction(`/me/albums?ids=${tableBodyItemId}`, 'PUT')
          break;
        case 'REMOVE_ALBUM_FROM_SAVED':
          result = await fetchFunction(`/me/albums?ids=${tableBodyItemId}`, 'DELETE')
          break;
      }
    } catch (err){
      console.log('ERR: ', err);
    }

    console.log('RES: ', result)
  }

  if (optionType === 'addToATrack'){
    return (
      <div class='menu-btn'>
        <MenuIcon onClick={showBox} />
        <div className='dropdown' style={{display: styles}}>
          <div className="add">
            <p>Add</p>
            <div className="addOptions">

              <p onClick={() => call('ADD_TO_LIKED')}>Liked Songs</p>
              {
                hamburgerOptions.map((playlist, i) => {
                  if (playlist.name && playlist.name !== ''){
                    return (
                      <p onClick={() => call('ADD_TO_PLAYLIST', playlist.id)}>
                        {playlist.name.slice(0, 15)}...
                      </p>
                    )
                  }
                })
              }

            </div>
          </div>
          <div className="remove">
            <p>Remove</p>
            <div className="removeOptions">

              <p onClick={() => call('REMOVE_FROM_LIKED')}>Liked Songs</p>
              {/*
                hamburgerOptions.map((playlist, i) => {
                  if (playlist.name && playlist.name !== ''){
                    return (
                      <p onClick={() => call('REMOVE_FROM_PLAYLIST', playlist.id)}>
                        {playlist.name.slice(0, 15)}...
                      </p>
                    )
                  }
                })
              */}

            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div class='menu-btn'>
        <MenuIcon onClick={showBox} />
        <div className='dropdown' style={{display: styles}}>
          <p>No Available Actions</p>
        </div>
      </div>
    )
  }
  /*
    <div className="add">
      <p onClick={() => call('ADD_ALBUM_TO_SAVED')}>Add Album</p>
    </div>
    <div className="remove">
      <p onClick={() => call('REMOVE_ALBUM_FROM_SAVED')}>Remove from Saved</p>
    </div>
  */
}



//   async function handleOptions(string, playlistID){
//     console.log(playlistID, string, toAddId.id, toAddId.name)
    
//     let result = '';

//     if (string === 'ADD_TRACK_TO_LIKED'){
//       result = await fetchFunction('/me/track?ids=' + toAddId.id, 'PUT');
//     } 
//     else if (string === 'ADD_TRACK_TO_PLAYLIST') {
//       result = await fetchFunction(`/playlists/${playlistID}/tracks`, 'POST');
//     } 
//     else if (string === 'ADD_ALBUM'){
//       result = await fetchFunction(`/me/albums?ids=${playlistID}`, 'PUT');
//     }

//     else if (string === 'REMO'){
//       //
//     }

//     console.log('RES:', result)
//   }
//   return (
//     <div class='menu-btn'>
//       <MenuIcon onClick={showBox} />
//       <div className='dropdown' style={{display: styles}}>
//         {
//           optionType === 'addToATrack' 
//           ?
//           (
//             <>
//               <div className="add-dropdown">
//                 <p className='p-hover-show-options'>
//                   Add
//                   <div className="options-display-none">
//                     <p onClick={() => handleOptions('ADD_TRACK_TO_LIKED')} style={{borderBottom: '1px solid #282828'}}>Add To Favorites</p>
//                     {
//                       optionType === 'addToATrack' &&
//                       (hamburgerOptions.map((playlist, i) => {
//                         if (playlist.name && playlist.name !== ''){
//                           return (
//                             <p onClick={() => handleOptions('ADD_TRACK_TO_PLAYLIST', playlist.id)}>Add to {playlist.name.slice(0, 11)}...</p>
//                           )
//                         }
//                       }))
//                     }
//                   </div>
//                 </p>
//               </div>
//               <div className="remove-dropdown">
//                 <p className='p-hover-show-options'>
//                   Remove
//                   <div className="options-display-none">
//                     <p onClick={() => handleOptions('REMOVE_TRACK_FROM_LIKED')} style={{borderBottom: '1px solid #282828'}}>Remove from Favorites</p>
//                     {
//                       optionType === 'addToATrack' &&
//                       (hamburgerOptions.map((playlist, i) => {
//                         if (playlist.name && playlist.name !== ''){
//                           return (
//                             <p onClick={() => handleOptions('REMOVE_TRACK_FROM_PLAYLIST', playlist.id)}>Remove from {playlist.name.slice(0, 13)}...</p>
//                           )
//                         }
//                       }))
//                     }
//                   </div>
//                 </p>
//               </div>
//             </>
//           )
//           :
//           (
//             <>
//               <div className="add-dropdown">
//                 <p>Add to Album</p>
//               </div>
//               <div className="remove-dropdown">
//                 <p>Remove from Album</p>
//               </div>
//             </>
//           )
//         }
//       </div>
//     </div>
//   )
// }
