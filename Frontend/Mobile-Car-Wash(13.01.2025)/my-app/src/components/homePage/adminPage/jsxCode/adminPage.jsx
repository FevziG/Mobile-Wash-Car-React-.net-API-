
import React, { useState } from 'react'
import '../cssCode/adminPage.css'
import UserManagement from'./userManagement.jsx'
import Dashboard from './dashboard.jsx'
import WorkerManagement from './workerManagement.jsx'
import Services from './services.jsx'
import Support from './support.jsx'

function AdminPage() {


  const [activePage, setActivePage] = useState('home'); // Başlangıçta 'giris' sayfasını göster


  // Logout işlemi
  const handleLogout = () => {
    localStorage.clear(); // Local storage temizlenir
    window.location.href = '/'; // Ana sayfaya yönlendirilir
  };


  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <UserManagement/>;
      case 'Dashboard':
        return <Dashboard/>;
      case 'WorkerManagement':
        return <WorkerManagement/>;
      case 'Services':
        return <Services/>;
      // case 'Support':
      //   return <Support/>;
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
          <button className='nav-button font-monospace' onClick={() => setActivePage('home')}>User Management</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('WorkerManagement')}>Worker Management</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('Services')}>Service Management</button>
          </li>
          <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('Dashboard')}>Dashboard</button>
          </li>
          <li className="nav-item">
          <button
                  className="nav-button font-monospace logout-button"
                  onClick={handleLogout}
                  >
                  Logout
                  </button>
          </li>
          {/* <li className="nav-item">
          <button className='nav-button font-monospace' onClick={() => setActivePage('Support')}>Support</button>
          </li> */}
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
