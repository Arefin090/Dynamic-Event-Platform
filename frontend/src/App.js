import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Global/Header';
import Home from './Pages/Home';
import EventList from './components/Event/EventList';
import EventForm from './components/Event/EventForm';
import EventDetail from './components/Event/EventDetail';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
