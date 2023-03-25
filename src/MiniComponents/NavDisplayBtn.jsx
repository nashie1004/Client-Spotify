import React from 'react'
import '../App.scss'
import AddIcon from '@mui/icons-material/Add';
export default function NavDisplayBtn() {
  let nav = document.querySelector('.nav');
  
  function func(){
    if (window.innerWidth < 1000){
      if (nav.style.display === 'none'){ 
        nav.style.display = 'grid'
      } else{
        nav.style.display = 'none'
      }
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000){
      if (nav.style.display === 'none'){
        nav.style.display = 'grid'
      }
    }
  })
  
  return (
    <div className='display-nav-btn' onClick={func}>
        <AddIcon />
    </div>
  )
}
