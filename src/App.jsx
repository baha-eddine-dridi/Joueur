import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Players from './components/Players';
import AddPlayer from './components/AddPlayer';
import PlayerDetails from './components/PlayerDetails';
import NavigationBar from './components/NavigationBar';
import './App.css';

function App() {
  return (
    <div>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Players/>} />
      <Route path="/add-player" element={<AddPlayer />} />
      <Route path="/details/:id" element={<PlayerDetails/>} />


    </Routes>
    </div>
  );
}
 
export default App;