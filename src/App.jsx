import './App.scss';
import React from 'react'
import {BrowserRouter, Route, Routes, useParams} from 'react-router-dom'
import Home from './Pages/Home';
import Search from './Pages/Search';
import Table from './Pages/Table';
import Browse from './Pages/Browse';
import Login from './Pages/Login';
import {SpotifyProvider} from './Context/SpotifyContext';

import Nav from './Components/Nav';
import Footer from './Components/Footer';

function App() {
  let links = useParams()
  console.log('useParams:', links)
  return (
    <SpotifyProvider>
        <BrowserRouter>
        {
          Object.keys(links).length === 0 ? (
            <Routes>
              <Route exact path='/' element={<Login />} />
            </Routes>
          ) : (
            <div className="App">
              <Nav />
              <Routes>

                <Route path='/home' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/liked' element={<Table type={'liked'} />} />
                <Route path='/genre/:id' element={<Browse />} />

                <Route path='/album/:id' element={<Table type={'album'} />} />
                <Route path='/playlist/:id' element={<Table type={'playlist'} />} />
                <Route path='/artist/:id' element={<Table type={'artist'} />} />

              </Routes>
              <Footer />
            </div>
          )
        }
        </BrowserRouter>
      </SpotifyProvider>
  );
}

export default App;
