import React, {useState, useContext, useEffect} from 'react'
import '../Styles/MainSearch.scss'
import CardBox from '../MiniComponents/CardBox'
import HeaderStickyScroll from './HeaderStickyScroll'
import LeftResultCards from '../MiniComponents/LeftResultCards'
import '../Styles/MainHome.scss'
import CardRowContainer from '../MiniComponents/CardRowContainer'
import {Link} from 'react-router-dom'
import PlayBtn from '../MiniComponents/PlayBtn'
import NavDisplayBtn from '../MiniComponents/NavDisplayBtn'

import { SpotifyContext } from '../Context/SpotifyContext'

const COLORS = [
  '#E13300',
  '#7358FF',
  '#1E3264',
  '#E8115B',
  '#148A08',
  '#8D67AB',
  '#056952',
  '#0D73EC',
  '#E91429',
  '#503750'
]

export default function MainSearch() {
  const [opacity, setOpacity] = useState(false)
  const [emptyInput, setEmptyInput] = useState(true)
  const [searchSong, setSearchSong] = useState('')
  const [resultRight, setResultRight] = useState([])
  const [resultBottom, setResultBottom] = useState([])
  const [loading, setLoading] = useState(false)

  const {fetchFunction} = useContext(SpotifyContext);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setLoading(true);
    async function call(){
      const data = await fetchFunction('/browse/categories', 'GET');
      setCategories(data.categories.items);
      setLoading(false)
    }
    call();
  }, [])

  useEffect(() => {
    if (searchSong !== ''){
      async function call(){
        const data = await fetchFunction(`/search?q=${searchSong}&type=track&limit=12`, 'GET');
        setResultRight(data['tracks']['items'].slice(0, 5))
        setResultBottom(data['tracks']['items'].slice(6, 11))
      }
      call();
    }
  }, [searchSong])

  const scrollHeader = e => e.target.scrollTop > 30 ? setOpacity(true) : setOpacity(false)

  function displaySearchResult(e){
    if (e.target.value === ''){
      setEmptyInput(true);
    } else {
      setSearchSong(e.target.value);
      setEmptyInput(false)
    }
  }

  if (loading){
    return (
      <div className='loading-screen'>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (emptyInput){
    return (
      <section onScroll={scrollHeader}>
        <HeaderStickyScroll opacityState={opacity} child={<input onChange={displaySearchResult} className='search-bar' type='text' placeholder='Search...' /> } />
        <NavDisplayBtn />
        <div className="padding" style={{padding: '1rem', minWidth: '100%'}}>
          <h2>Lorem, ipsum.</h2>
          <div className='card-box-container'>
            {
              categories.map((item, i) => {
                return (
                  <CardBox 
                    key={i}
                    name={item.name}
                    id={item.id}
                    image={item.icons[0].url}
                    color={COLORS[Math.floor(Math.random() * COLORS.length)]} 
                  />
                );
              })
            }
          </div>
        </div>
      </section>
    )
  } 
  else {
    return (
      <section onScroll={scrollHeader}>
        <HeaderStickyScroll opacityState={opacity} child={<input onChange={displaySearchResult} className='search-bar' type='text' placeholder='Search...' /> } />
        <NavDisplayBtn />
        <div className="padding" style={{padding: '1rem', minWidth: '100%'}}>
          <h2>Search Result</h2><br />
          <div className="result-container">
            <div className="result-left">
              {
                resultRight.map((item, i) => {
                  if (i === 0){
                    return (
                      <>
                        <div className="big-img">
                          <img src={item.album.images[0].url} alt="" />
                        </div>
                        <Link to={`/artist/${item.artists[0].id}`}>
                          <h2>{item.name}</h2>
                        </Link>
                        <p>{item.artists[0].name}</p>
                        <PlayBtn 
                          size='regular' 
                          type='big' 
                          footerSongURL={item.preview_url} 
                          footerSongName={item.name} 
                          footerSongArtist={item.artists[0].name} 
                          footerSongImage={item.album.images[0].url}
                        />
                      </>
                    )
                  }
                })
              }
            </div>
            <div className="result-right">
              {
                resultRight.map((item, i) => {
                  if (i !== 0){
                    return (
                      <LeftResultCards
                        image={item.album.images[0].url}
                        artistName={item.artists[0].name}
                        name={item.name}
                        preview_url={item.preview_url}
                        releaseDate={item.release_date}
                        duration={(item.duration_ms / 60000).toString().slice(0, 4).replace('.', ':')}
                        id={item.artists[0].id}
                        key={i}
                      />
                    )
                  }
                })
              }
            </div>
          </div>
          <br />
          <div className="card-row-container">
            {
              resultBottom.map((item, i) => {
                return (
                  <CardRowContainer
                    image={item.album.images[0].url}
                    artistName={item.artists[0].name}
                    name={item.name}
                    preview_url={item.preview_url}
                    releaseDate={item.release_date}
                    id={item.artists[0].id}
                    key={i}
                    linkType={'artist'}
                  />
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }

}
