import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../cssCode/workerComplete.css';

function WorkerComplete() {
  const [appointments, setAppointments] = useState([]); // Randevular
  const [statusMessage, setStatusMessage] = useState(''); // İşlem durumu mesajı
  const workerId = localStorage.getItem('workerId'); // Login sonrası workerId alınıyor

  useEffect(() => {
    const fetchWorkerAppointments = async () => {
      try {
        // Backend'den sadece bu çalışana ait randevulu olan randevuları çek
        const response = await axios.get(`/api/CwAppointments/byUserOrWorker`, {
          params: { workerId: workerId },
        });

        // Sadece 'Randevulu' olanları filtrele
        const confirmedAppointments = response.data.filter(
          (appointment) => appointment.status === 'Randevulu'
        );

        // Kullanıcı bilgilerini al ve her randevuya kullanıcı adını ekle
        const updatedAppointments = await Promise.all(
          confirmedAppointments.map(async (appointment) => {
            try {
              // userId ile kullanıcı bilgisini alıyoruz
              const userResponse = await axios.get(`/api/CwUsers/${appointment.userId}`);
              return { ...appointment, userName: userResponse.data.username };
            } catch {
              return { ...appointment, userName: 'Bilinmiyor' }; // Hata durumunda
            }
          })
        );

        setAppointments(updatedAppointments);
      } catch (error) {
        console.error('Randevular yüklenirken hata oluştu:', error);
      }
    };

    fetchWorkerAppointments();
  }, [workerId]);

  const markAsCompleted = async (appointmentId) => {
    try {
      // Seçilen randevunun bilgilerini bul
      const appointmentToUpdate = appointments.find(
        (appointment) => appointment.id === appointmentId
      );

      const updatedAppointment = {
        ...appointmentToUpdate,
        status: 'Yapıldı', // Yeni durum bilgisi
      };

      // Backend API çağrısı ile randevu durumunu güncelle
      await axios.put(
        `/api/CwAppointments/${appointmentId}`,
        updatedAppointment,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Durum başarıyla güncellendiğinde UI'yi yenile
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );

      setStatusMessage('Randevu başarıyla "Yapıldı" olarak güncellendi.');
    } catch (error) {
      console.error('Randevu güncellenirken hata oluştu:', error);
      setStatusMessage('Randevu tamamlanamadı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="worker-complete-container">
      <h2>Randevulu Randevularım</h2>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div className="appointment-card" key={appointment.id}>
              <p><b>User:</b> {appointment.userName || 'Bilinmeyen Kullanıcı'}</p>
              <p><b>Date:</b> {appointment.appointmentDate.split('T')[0]}</p>
              <p><b>Time:</b> {appointment.appointmentDate.split('T')[1].slice(0, 5)}</p>
              <p><b>Status:</b> <strong>{appointment.status}</strong></p>
              <button
                className="btn btn-success"
                onClick={() => markAsCompleted(appointment.id)}
              >
                Yapıldı
              </button>
            </div>
          ))
        ) : (
          <p>Şu anda randevulu randevunuz bulunmamaktadır.</p>
        )}
      </div>
      {statusMessage && <div className="alert alert-info mt-3">{statusMessage}</div>}
    </div>
  );
}

export default WorkerComplete;
