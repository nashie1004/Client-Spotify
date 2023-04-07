import React, {useEffect, useState, useContext} from 'react'
import HeaderStickyScroll from './HeaderStickyScroll'
import '../Styles/MainBrowse.scss'
import CardRowContainer from '../MiniComponents/CardRowContainer'
import '../Styles/MainHome.scss'
import NavDisplayBtn from '../MiniComponents/NavDisplayBtn'

import { SpotifyContext } from '../Context/SpotifyContext'

export default function MainBrowse() {
  const [opacity, setOpacity] = useState(false)
  const [playlists, setPlaylists] = useState([]) 

  function scrollHeader(e){
    if (e.target.scrollTop > 30){
      setOpacity(true)
    } else setOpacity(false)
  }

  const {fetchFunction} = useContext(SpotifyContext);
  const pathname = new URL(window.location.href).pathname;
  const paramsID = pathname.split('/')[2];

  useEffect(() => {
    async function call(){
      const data = await fetchFunction(`/browse/categories/${paramsID}/playlists`, 'GET');
      console.log(data)
      setPlaylists(data.playlists.items)
    }
    call()
  }, [])

  return (
    <section onScroll={scrollHeader}>
      <HeaderStickyScroll opacityState={opacity} />
      <NavDisplayBtn />
      <div className="padding" style={{padding: '1rem', minWidth: '100%'}}>
        <div className="card-row-container">
        {
          playlists.map((item, i) => {
            return (
                <CardRowContainer
                image={item.images[0].url}
                artistName={null}
                name={item.name}
                releaseDate={item.description}
                id={item.id}
                key={i}
                linkType={'playlist'}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
