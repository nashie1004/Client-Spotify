import React, {useState, useEffect, useContext} from 'react'
import CardCol from '../MiniComponents/CardCol'
import CardRowContainer from '../MiniComponents/CardRowContainer'
import '../Styles/MainHome.scss'
import HeaderStickyScroll from './HeaderStickyScroll'
import NavDisplayBtn from '../MiniComponents/NavDisplayBtn'

import {SpotifyContext} from '../Context/SpotifyContext'
import { padding, width } from '@mui/system'

export default function MainHome() {
  const [opacity, setOpacity] = useState(false)

  const {fetchFunction} = useContext(SpotifyContext);
  const [cardColItems, setCardColItems] = useState([]);
  const [cardRowItems, setCardRowItems] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    async function call(){
      const data = await fetchFunction('/browse/new-releases?&limit=20', 'GET')
      setCardColItems(data['albums']['items'].slice(0, 6))
      setCardRowItems(data['albums']['items'].slice(7, 17))
      setLoading(false)
    }
    call()
  }, [])

  function scrollHeader(e){
    if (e.target.scrollTop > 30){
      setOpacity(true)
    } else setOpacity(false)
  }
  
  if (loading){
    return (
      <div className='loading-screen'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <section onScroll={scrollHeader}>
      <HeaderStickyScroll opacityState={opacity} />
      <NavDisplayBtn />
      <div className="padding" style={{padding: '1rem', minWidth: '100%'}}>
        <h2>Newly Released</h2>
        <br />
        <div className='card-col-container'>
          {
            cardColItems.map((item, i) => {
              return (
                <CardCol
                  image={item.images[0].url}
                  name={item.name}
                  isPlayable={item.is_playable}
                  id={item.id}
                  key={i}
                />
              )
            })
          }
        </div>
        <br />
        <div className="card-row-container">
          {
            cardRowItems.map((item, i) => {
              return (
                <CardRowContainer
                  image={item.images[0].url}
                  artistName={null}
                  name={item.name}
                  releaseDate={item.release_date}
                  id={item.id}
                  preview_url={null}
                  key={i}
                  linkType={'album'}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
