import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Homepage from './pages/Homepage';
import TaskList from './components/TaskList/TaskList';
import CreateTask from './components/CreateTask/CreateTask';
import Archive from './components/Archive/Archive';
import Login from './pages/Login';
import Register from './pages/Register';
import MobileNav from './components/MobileNav/MobileNav'; 

function App() {
  const sections = [
    { name: 'homepage', label: 'Homepage' },
    { name: 'task-list', label: 'Task List' },
    { name: 'create', label: 'Create Task' },
    { name: 'archive', label: 'Archive' },
  ];

  const handleSectionSelect = (sectionName) => {
    window.location.href = `/taskify/${sectionName}`; // 👈 updated path for subfolder
  };

  return (
    <AuthProvider>
      <BrowserRouter basename="/taskify"> {/* 👈 FIXED HERE */}
        <MobileNav sections={sections} onSectionSelect={handleSectionSelect} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
