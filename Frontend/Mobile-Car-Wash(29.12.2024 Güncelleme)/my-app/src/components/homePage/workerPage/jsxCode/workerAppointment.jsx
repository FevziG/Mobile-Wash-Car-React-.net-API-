import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function WorkerAppointment() {
  const [appointments, setAppointments] = useState([]); // Çalışanın randevuları
  const workerId = localStorage.getItem('workerId'); // Login sonrası workerId alınıyor

  useEffect(() => {
    const fetchWorkerAppointments = async () => {
      try {
        console.log("Worker ID:", workerId); // Debug: workerId kontrolü

        // Backend'den sadece bu çalışana ait randevuları çek
        const response = await axios.get(`/api/CwAppointments/byUserOrWorker`, {
          params: { workerId: workerId },
        });

        console.log("Appointments Response:", response.data); // Debug: API'den gelen veri

        // Kullanıcı bilgilerini randevulara ekle
        const appointmentsWithUserNames = await Promise.all(
          response.data.map(async (appointment) => {
            try {
              console.log("Fetching User Info for Appointment:", appointment.userId);
              const userResponse = await axios.get(`/api/CwUsers/${appointment.userId}`);
              return {
                ...appointment,
                userName: userResponse.data.username, // Kullanıcı adı
              };
            } catch (userError) {
              console.error("User Info Fetch Error:", userError);
              return appointment; // Hata durumunda kullanıcı adı olmadan döner
            }
          })
        );

        setAppointments(appointmentsWithUserNames);
      } catch (error) {
        console.error("Randevular yüklenirken hata oluştu:", error);
      }
    };

    fetchWorkerAppointments();
  }, [workerId]);

  return (
    <div>
      <h3>Çalışan Randevularım</h3>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div className="appointment-card" key={appointment.id}>
              <h5>Kullanıcı: {appointment.userName || "Bilinmeyen Kullanıcı"}</h5>
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

export default WorkerAppointment;