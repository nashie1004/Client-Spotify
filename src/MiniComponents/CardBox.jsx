import React from 'react'
import '../Styles/MainSearch.scss'
import {Link} from 'react-router-dom'

export default function CardBox(props) {
  const {name, id, image, color} = props;

  return (
    <div className="card-box" style={{background: color}}>
        <img src={image} alt="skew" />
        <Link to={'/genre/' + id}>
          <h3>{name}</h3>
        </Link>
    </div>
  )
}
