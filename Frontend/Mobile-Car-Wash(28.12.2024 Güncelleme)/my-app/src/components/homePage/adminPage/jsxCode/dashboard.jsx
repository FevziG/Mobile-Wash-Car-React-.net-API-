import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [counts, setCounts] = useState({
    user: 0,
    admin: 0,
    worker: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersResponse, adminsResponse, workersResponse] = await Promise.all([
          axios.get('/api/CwUsers'), // Kullanıcı verileri
          axios.get('/api/CwAdmins'), // Admin verileri
          axios.get('/api/CwWorkers'), // Çalışan verileri
        ]);

        const userCount = usersResponse.data.length;
        const adminCount = adminsResponse.data.length;
        const workerCount = workersResponse.data.length;

        setCounts({
          user: userCount,
          admin: adminCount,
          worker: workerCount,
          total: userCount + adminCount + workerCount,
        });
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Toplam Kullanıcı Sayısı (User):</h3>
      <p>{counts.user}</p>
      <br />
      <h3>Toplam Admin Sayısı:</h3>
      <p>{counts.admin}</p>
      <br />
      <h3>Toplam Çalışan Sayısı (Worker):</h3>
      <p>{counts.worker}</p>
      <br />
      <h3>Genel Toplam:</h3>
      <p>{counts.total}</p>
    </div>
  );
}

export default Dashboard;