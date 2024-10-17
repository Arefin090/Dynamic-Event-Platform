import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Global/Header';
import Footer from './Global/Footer';
import Home from './Pages/Home';
import EventList from './components/Event/EventList';
import EventForm from './components/Event/EventForm';
import EventDetail from './components/Event/EventDetail';
import EventEditForm from './components/Event/EventEditForm';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/:id/edit" element={<EventEditForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
      <Analytics />
    </Router>
  );
}

export default App;
