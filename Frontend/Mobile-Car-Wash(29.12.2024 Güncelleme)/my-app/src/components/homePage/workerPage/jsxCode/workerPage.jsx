import React, { useState, useEffect } from 'react';
import WorkerSupport from './workerSupport';
import WorkerHomePage from './workerHomePage';
import WorkerAboutUs from './workerAboutUs';
import WorkerAppointment from './workerAppointment';
import axios from 'axios';

function WorkerPage() {
  const [activePage, setActivePage] = useState('home'); // Aktif sayfa state
  const [workerName, setWorkerName] = useState('Çalışan'); // Varsayılan çalışan adı

  useEffect(() => {
    const fetchWorkerName = async () => {
      try {
        const workerId = localStorage.getItem('workerId'); // Worker ID'si alınır
        if (workerId) {
          const response = await axios.get(`/api/CwWorkers/${workerId}`); // API çağrısı
          setWorkerName(response.data.username); // Çalışan adı güncellenir
        }
      } catch (error) {
        console.error('Çalışan bilgileri alınırken hata oluştu:', error);
      }
    };

    fetchWorkerName();
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <WorkerHomePage />;
      case 'aboutUs':
        return <WorkerAboutUs />;
      case 'support':
        return <WorkerSupport />;
      case 'appointment':
        return <WorkerAppointment />;
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
            {workerName}
          </a> {/* Dinamik olarak çalışan adı burada gösteriliyor */}
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

export default WorkerPage;