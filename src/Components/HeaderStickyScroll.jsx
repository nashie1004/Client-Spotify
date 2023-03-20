import React, {useContext, useEffect, useState} from 'react'
import '../Styles/MainHome.scss'
import {SpotifyContext} from '../Context/SpotifyContext'

export default function HeaderStickyScroll({opacityState, child}) {
  const [img, setImg] = useState('');
  const {fetchFunction} = useContext(SpotifyContext);

  useEffect(() => {
    async function call(){
      const data = await fetchFunction('/me', 'GET')
      setImg(data.images[0].url)
    }  
    call()
  }, [])

  return (
    <div className={opacityState ? 'top-bar fadeIn' : 'top-bar'}>
        {child}
        <div className="profile">
          <img src={img} alt='pfp' />
        </div>
    </div>
  )
}
