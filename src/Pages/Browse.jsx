import React from 'react'
import Main from '../Components/Main';
import MainBrowse from '../Components/MainBrowse'

export default function Browse() {
  return (
    <>
      <Main mainType={<MainBrowse />} />
    </>
  )
}
