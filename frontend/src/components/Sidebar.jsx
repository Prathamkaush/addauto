import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, LayoutDashboard, Megaphone, Target, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <div className="sidebar">
      <div className="sidebar-title">AdAutomate</div>
      
      <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={20} />
        Dashboard
      </NavLink>
      
      <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Users size={20} />
        Users
      </NavLink>
      
      <NavLink to="/advertisers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Target size={20} />
        Advertisers
      </NavLink>

      <NavLink to="/campaigns" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Megaphone size={20} />
        Campaigns
      </NavLink>

      <div style={{ marginTop: 'auto' }}>
        <button 
          onClick={logout} 
          className="nav-link" 
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', color: 'var(--danger)' }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
