
import React, { useState } from 'react'
import '../cssCode/adminPage.css'
import UserManagement from'./userManagement.jsx'
import Dashboard from './dashboard.jsx'
import AuthorityManagement from './authorityManagement.jsx'
import Settings from './settings.jsx'
import Support from './support.jsx'

function AdminPage() {


  const [activePage, setActivePage] = useState('home'); // Başlangıçta 'giris' sayfasını göster

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <h2>Giriş Sayfası</h2>;
      case 'UserManagement':
        return <UserManagement/>;
      case 'Dashboard':
        return <Dashboard/>;
      case 'AuthorityManagement':
        return <AuthorityManagement/>;
      case 'Settings':
        return <Settings/>;
      case 'Support':
        return <Support/>;
    }
  };


  return (
    <div className="d-flex">
      <div className="bg-dark text-white" style={{ width: '250px', height: '100vh' }}>
        <div className="sidebar-header p-3">

          <h4 className='fs-2 font-monospace' >Admin Panel</h4>
        </div>
        
        <ul className="nav flex-column">
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('home')}>Home</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('UserManagement')}>User Management</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('Dashboard')}>Dashboard</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('AuthorityManagement')}>Authority Management</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('Settings')}>Settings</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('Support')}>Support</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3">
        {renderContent()}
              
      </div>
    </div>

  )
}

export default AdminPage
