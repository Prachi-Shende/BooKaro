import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BooKaroHomepage from './pages/homepage';
import BooKaroAboutUsPage from './pages/aboutus';
import Resources from './pages/resources';
import ConnectWithUs from './pages/contactus';
import Messages from './pages/messages';
import Search from './pages/search';
import ViewCart from './pages/viewcart';
import SellBooksPage from './pages/sellBooks';
import BookDetailed from './pages/detailedPg';
import Wishlist from './pages/wishlist';
import MyProfile from './pages/profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BooKaroHomepage />} />
        <Route path="/about" element={<BooKaroAboutUsPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<ConnectWithUs />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:conversationId" element={<Messages />} />
        <Route path="/search" element={<Search />} />
        <Route path="/view-cart" element={<ViewCart />} /> 
        <Route path="/sell" element={<SellBooksPage />} />
        <Route path="/book/:id" element={<BookDetailed />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<MyProfile/>}/>


      </Routes>
    </Router>
  );
}

export default App;