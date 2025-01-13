import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../cssCode/userAppointment.css';
 
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
 
        // Çalışan bilgilerini randevulara ekle ve sadece "Bekleme" durumundaki randevuları filtrele
        const filteredAppointments = await Promise.all(
          response.data
            .filter((appointment) => appointment.status === 'Beklemede')
            .map(async (appointment) => {
              const workerResponse = await axios.get(`/api/CwWorkers/${appointment.workerId}`);
              return {
                ...appointment,
                workerName: workerResponse.data.username, // Çalışan adı
              };
            })
        );
 
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Randevular yüklenirken hata oluştu:', error);
      }
    };
 
    fetchUserAppointments();
  }, [userId]);
 
  return (
<div className="user-appointment-container">
<h3 className="title">Bekleyen Randevularım</h3>
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
<p>Henüz bekleyen bir randevunuz bulunmamaktadır.</p>
        )}
</div>
</div>
  );
}
 
export default UserAppointment;