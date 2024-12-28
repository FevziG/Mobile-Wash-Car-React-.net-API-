import React, { useState, useEffect } from 'react';
import '../cssCode/userPage.css';
import UserAboutUs from './userAboutUs';
import UserSupport from './userSupport';
import UserHomePage from './userHomePage';
import UserAppointment from './userAppointment';
import axios from 'axios';

function UserPage() {
  const [activePage, setActivePage] = useState('home'); // Aktif sayfa state
  const [username, setUsername] = useState('Kullanıcı'); // Varsayılan kullanıcı adı

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Kullanıcı ID'si alınır
        if (userId) {
          const response = await axios.get(`/api/CwUsers/${userId}`); // API çağrısı
          setUsername(response.data.username); // Kullanıcı adı güncellenir
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
      }
    };

    fetchUsername();
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <UserHomePage />;
      case 'aboutUs':
        return <UserAboutUs />;
      case 'support':
        return <UserSupport />;
      case 'appointment':
        return <UserAppointment />;
      default:
        return null;
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {username}
          </a> {/* Dinamik olarak kullanıcı adı burada gösteriliyor */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse nav justify-content-end nav-underline"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-button font-monospace"
                  onClick={() => setActivePage('home')}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-button font-monospace"
                  onClick={() => setActivePage('aboutUs')}
                >
                  About Us
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-button font-monospace"
                  onClick={() => setActivePage('support')}
                >
                  Support
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-button font-monospace"
                  onClick={() => setActivePage('appointment')}
                >
                  Appointment
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex-grow-1 p-3">{renderContent()}</div>
    </>
  );
}

export default UserPage;