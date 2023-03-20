import React from 'react'
import '../App.scss'
import AddIcon from '@mui/icons-material/Add';
export default function NavDisplayBtn() {
  
  function func(){
    let nav = document.querySelector('.nav');
    if (nav.style.display === 'none' && true){
      nav.style.display = 'grid'
    } else {
      nav.style.display = 'none'
    }
  }
  
  return (
    <div className='display-nav-btn' onClick={func}>
        <AddIcon />
    </div>
  )
}
