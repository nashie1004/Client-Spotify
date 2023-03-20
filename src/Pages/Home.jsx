import React from 'react'
import Main from '../Components/Main';
import MainHome from '../Components/MainHome'

export default function Home() {
  return (
    <>
      <Main mainType={<MainHome />} />
    </>
  )
}
