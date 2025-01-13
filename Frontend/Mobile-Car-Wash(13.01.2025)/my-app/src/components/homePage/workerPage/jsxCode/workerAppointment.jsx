import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../cssCode/workerAppointment.css';
 
function WorkerAppointment() {
  const [appointments, setAppointments] = useState([]); // Çalışanın randevuları
  const workerId = localStorage.getItem('workerId'); // Login sonrası workerId alınıyor
 
  useEffect(() => {
    const fetchWorkerAppointments = async () => {
      try {
        console.log('Worker ID:', workerId); // Debug: workerId kontrolü
 
        // Backend'den sadece bu çalışana ait randevuları çek
        const response = await axios.get(`/api/CwAppointments/byUserOrWorker`, {
          params: { workerId: workerId },
        });
 
        console.log('Appointments Response:', response.data); // Debug: API'den gelen veri
 
        // Kullanıcı bilgilerini randevulara ekle
        const appointmentsWithUserNames = await Promise.all(
          response.data.map(async (appointment) => {
            try {
              console.log(
                'Fetching User Info for Appointment:',
                appointment.userId
              );
              const userResponse = await axios.get(
                `/api/CwUsers/${appointment.userId}`
              );
              return {
                ...appointment,
                userName: userResponse.data.username, // Kullanıcı adı
              };
            } catch (userError) {
              console.error('User Info Fetch Error:', userError);
              return appointment; // Hata durumunda kullanıcı adı olmadan döner
            }
          })
        );
 
        setAppointments(appointmentsWithUserNames);
      } catch (error) {
        console.error('Randevular yüklenirken hata oluştu:', error);
      }
    };
 
    fetchWorkerAppointments();
  }, [workerId]);
 
  // Randevuları filtreleme
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === 'Beklemede'
  );
  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === 'Randevulu'
  );
 
  return (
<div className="worker-appointment-container">
 
      {/* Randevulu Randevular */}
<div className="appointments-section">
<h2>Randevulu</h2>
        {confirmedAppointments.length > 0 ? (
          confirmedAppointments.map((appointment) => (
<div className="appointment-card" key={appointment.id}>
<p><b>User:</b> {appointment.userName || 'Bilinmeyen Kullanıcı'}</p>
<p><b>Date:</b> {appointment.appointmentDate.split('T')[0]}</p>
<p><b>Time:</b> {appointment.appointmentDate.split('T')[1].slice(0, 5)}</p>
<p>
<b>Status:</b> <strong>{appointment.status}</strong>
</p>
</div>
          ))
        ) : (
<p>Randevulu randevunuz bulunmamaktadır.</p>
        )}
</div>
 
      {/* Beklemede Randevular */}
<div className="appointments-section">
<h2>Beklemede</h2>
        {pendingAppointments.length > 0 ? (
          pendingAppointments.map((appointment) => (
<div className="appointment-card" key={appointment.id}>
<p><b>User:</b> {appointment.userName || 'Bilinmeyen Kullanıcı'}</p>
<p><b>Date:</b> {appointment.appointmentDate.split('T')[0]}</p>
<p><b>Time:</b> {appointment.appointmentDate.split('T')[1].slice(0, 5)}</p>
<p>
<b>Status:</b> <strong>{appointment.status}</strong>
</p>
</div>
          ))
        ) : (
<p>Beklemede randevunuz bulunmamaktadır.</p>
        )}
</div>
</div>
  );
}
 
export default WorkerAppointment;