import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function UserAppointment() {
  const [appointments, setAppointments] = useState([]); // Kullanıcının randevuları
  const userId = localStorage.getItem('userId'); // Login sonrası userId alınıyor

  // Kullanıcının randevularını API'den yükleme
  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        // Backend'den sadece bu kullanıcıya ait randevuları çek
        const response = await axios.get(`/api/CwAppointments/byUserOrWorker`, {
          params: { userId: userId },
        });

        // Çalışan bilgilerini randevulara ekle
        const appointmentsWithWorkerNames = await Promise.all(
          response.data.map(async (appointment) => {
            const workerResponse = await axios.get(`/api/CwWorkers/${appointment.workerId}`);
            return {
              ...appointment,
              workerName: workerResponse.data.username, // Çalışan adı
            };
          })
        );

        setAppointments(appointmentsWithWorkerNames);
      } catch (error) {
        console.error("Randevular yüklenirken hata oluştu:", error);
      }
    };

    fetchUserAppointments();
  }, [userId]);

  return (
    <div>
      <h3>Randevularım</h3>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div className="appointment-card" key={appointment.id}>
              <h5>Çalışan: {appointment.workerName}</h5>
              <p>Tarih: {appointment.appointmentDate.split('T')[0]}</p>
              <p>Saat: {appointment.appointmentDate.split('T')[1].slice(0, 5)}</p>
              <p>Durum: <strong>{appointment.status}</strong></p>
            </div>
          ))
        ) : (
          <p>Henüz randevunuz bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}

export default UserAppointment;