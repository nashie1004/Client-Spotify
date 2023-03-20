import './App.scss';
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Search from './Pages/Search';
import Table from './Pages/Table';
import Browse from './Pages/Browse';
import {SpotifyProvider} from './Context/SpotifyContext';

import Nav from './Components/Nav';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <SpotifyProvider>
        <BrowserRouter>
          <Nav /> 
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/liked' element={<Table type={'liked'} />} />
              <Route path='/genre/:id' element={<Browse />} />

              <Route path='/album/:id' element={<Table type={'album'} />} />
              <Route path='/playlist/:id' element={<Table type={'playlist'} />} />
              <Route path='/artist/:id' element={<Table type={'artist'} />} />
            </Routes>
          <Footer />
        </BrowserRouter>
      </SpotifyProvider>
    </div>
  );
}

export default App;
