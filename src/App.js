import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bookings from './pages/Bookings';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        
      <Route exact path="/" element={<Search/>} />
        <Route exact path="/searchresult" element={<SearchResult/>} />
        <Route exact path="/bookings" element={<Bookings/>} /> 
      </Routes>
    </Router>


  </>
  );
}

export default App;
