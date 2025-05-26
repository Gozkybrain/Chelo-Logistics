import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyFlight from './pages/MyFlight';
import PayNow from './pages/PayNow';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import AddTicket from './admin/AddTicket';
import AllTickets from './admin/AllTickets';
import AddPackage from './admin/AddPackage';
import AllPackages from './admin/AllPackages';
import FlightTicket from './pages/FlightTicket';
import NotFound from './pages/NotFound';
import './App.css';
import Header from './components/Header';
import MyShipment from './pages/MyShipment';
import Footer from './components/Footer';
import Track from './pages/Track';

const App = () => {
  return (
    // Routes for App Navigation
    <div>
      <Header />
      <div className='head-box'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/all-tickets" element={<AllTickets />} />
          <Route path="/all-packages" element={<AllPackages />} />
          <Route path="/track-package" element={<Track />} />
          <Route path="/track-flight" element={<Home />} />
          <Route path="/my-flight" element={<MyFlight />} />
          <Route path="/add-ticket" element={<AddTicket />} />
          <Route path="/add-package" element={<AddPackage />} />
          <Route path="/pay-now" element={<PayNow />} />
          <Route path="/flight-ticket" element={<FlightTicket />} />
          <Route path="/track-shipment" element={<MyShipment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
