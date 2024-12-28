import React, { useState, useEffect } from 'react';
import '../cssCode/workerHomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function WorkerHomePage() {
  const [appointments, setAppointments] = useState([]); // Randevu talepleri
  const [statusMessage, setStatusMessage] = useState(''); // Onay veya reddetme durum mesajı

  const workerId = localStorage.getItem('workerId');
  // Randevu taleplerini API'den yükleme
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/CwAppointments/byUserOrWorker', {
          params: { workerId: workerId }, // Sadece bu çalışanın randevularını çek
        });

        const appointmentsWithUsers = await Promise.all(
          response.data
            .filter(appointment => appointment.status === 'Beklemede') // Sadece "Beklemede" olanları filtrele
            .map(async (appointment) => {
              const userResponse = await axios.get(`/api/CwUsers/${appointment.userId}`);
              return {
                ...appointment,
                userName: userResponse.data.username,
                userLocation: userResponse.data.location,
              };
            })
        );
        setAppointments(appointmentsWithUsers);
      } catch (error) {
        console.error("Randevular yüklenirken hata oluştu:", error);
      }
    };

    fetchAppointments();
  }, [workerId]);
  // Randevu onaylama işlemi
  const approveAppointment = async (appointmentId) => {
    try {
      const appointmentToUpdate = appointments.find(appt => appt.id === appointmentId);
      const updatedAppointment = {
        ...appointmentToUpdate,
        status: 'Randevulu', // Yeni durum bilgisi
        isActive: true,
      };

      await axios.put(`/api/CwAppointments/${appointmentId}`, updatedAppointment, {
        headers: { 'Content-Type': 'application/json' },
      });

      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === appointmentId
            ? { ...appointment, status: 'Randevulu' }
            : appointment
        )
      );
      setStatusMessage('Randevu Onaylandı ve durum Randevulu olarak güncellendi.');
    } catch (error) {
      console.error("Randevu onaylanırken hata oluştu:", error);
      setStatusMessage('Randevu onaylanamadı.');
    }
  };

  // Randevu reddetme işlemi
  const rejectAppointment = async (appointmentId) => {
    try {
      const appointmentToUpdate = appointments.find(appt => appt.id === appointmentId);
      const updatedAppointment = {
        ...appointmentToUpdate,
        status: 'Reddedildi', // Yeni durum bilgisi
        isActive: false,
      };

      await axios.put(`/api/CwAppointments/${appointmentId}`, updatedAppointment, {
        headers: { 'Content-Type': 'application/json' },
      });

      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === appointmentId
            ? { ...appointment, status: 'Reddedildi' }
            : appointment
        )
      );
      setStatusMessage('Randevu Reddedildi.');
    } catch (error) {
      console.error("Randevu reddedilirken hata oluştu:", error);
      setStatusMessage('Randevu reddedilemedi.');
    }
  };

  return (
    <div>
      <h3>Randevu Talepleri</h3>
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h5>{appointment.userName}</h5>
            <p>Konum: {appointment.userLocation}</p>
            <p>Tarih: {appointment.appointmentDate.split('T')[0]}</p>
            <p>Saat: {appointment.appointmentDate.split('T')[1].slice(0, 5)}</p>
            <p>Status: <strong>{appointment.status}</strong></p>
            <div className="button-group">
              {appointment.status === 'Beklemede' && (
                <>
                  <button className="btn btn-success" onClick={() => approveAppointment(appointment.id)}>
                    Onayla
                  </button>
                  <button className="btn btn-danger" onClick={() => rejectAppointment(appointment.id)}>
                    Reddet
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {statusMessage && <div className="alert alert-info mt-3">{statusMessage}</div>}
    </div>
  );
}

export default WorkerHomePage;


// import React, { useState, useEffect } from 'react';
// import '../cssCode/workerHomePage.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// function WorkerHomePage() {
//   const [appointments, setAppointments] = useState([]); // Randevu talepleri
//   const [statusMessage, setStatusMessage] = useState(''); // Onay veya reddetme durum mesajı

//   // Randevu taleplerini API'den yükleme
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get('/api/CwAppointments'); // Backend'den randevuları çek
//         const appointmentsWithUsers = await Promise.all(
//           response.data.map(async (appointment) => {
//             const userResponse = await axios.get(`/api/CwUsers/${appointment.userId}`);
//             return {
//               ...appointment,
//               userName: userResponse.data.username,
//               userLocation: userResponse.data.location,
//             };
//           })
//         );
//         setAppointments(appointmentsWithUsers);
//       } catch (error) {
//         console.error("Randevular yüklenirken hata oluştu:", error);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   // Randevu onaylama işlemi
//   const approveAppointment = async (appointmentId) => {
//     try {
//       const appointmentToUpdate = appointments.find(appt => appt.id === appointmentId);
//       const updatedAppointment = {
//         ...appointmentToUpdate,
//         status: 'Randevulu', // Yeni durum bilgisi
//         isActive: true,
//       };

//       await axios.put(`/api/CwAppointments/${appointmentId}`, updatedAppointment, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       setAppointments(prevAppointments =>
//         prevAppointments.map(appointment =>
//           appointment.id === appointmentId
//             ? { ...appointment, status: 'Randevulu' }
//             : appointment
//         )
//       );
//       setStatusMessage('Randevu Onaylandı ve durum Randevulu olarak güncellendi.');
//     } catch (error) {
//       console.error("Randevu onaylanırken hata oluştu:", error);
//       setStatusMessage('Randevu onaylanamadı.');
//     }
//   };

//   // Randevu reddetme işlemi
//   const rejectAppointment = async (appointmentId) => {
//     try {
//       const appointmentToUpdate = appointments.find(appt => appt.id === appointmentId);
//       const updatedAppointment = {
//         ...appointmentToUpdate,
//         status: 'Reddedildi', // Yeni durum bilgisi
//         isActive: false,
//       };

//       await axios.put(`/api/CwAppointments/${appointmentId}`, updatedAppointment, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       setAppointments(prevAppointments =>
//         prevAppointments.map(appointment =>
//           appointment.id === appointmentId
//             ? { ...appointment, status: 'Reddedildi' }
//             : appointment
//         )
//       );
//       setStatusMessage('Randevu Reddedildi.');
//     } catch (error) {
//       console.error("Randevu reddedilirken hata oluştu:", error);
//       setStatusMessage('Randevu reddedilemedi.');
//     }
//   };

//   return (
//     <div>
//       <h3>Randevu Talepleri</h3>
//       <div className="appointments-list">
//         {appointments.map((appointment) => (
//           <div className="appointment-card" key={appointment.id}>
//             <h5>{appointment.userName}</h5>
//             <p>Konum: {appointment.userLocation}</p>
//             <p>Tarih: {appointment.appointmentDate.split('T')[0]}</p>
//             <p>Saat: {appointment.appointmentDate.split('T')[1].slice(0, 5)}</p>
//             <p>Status: <strong>{appointment.status}</strong></p>
//             <div className="button-group">
//               {appointment.status === 'Beklemede' && (
//                 <>
//                   <button className="btn btn-success" onClick={() => approveAppointment(appointment.id)}>
//                     Onayla
//                   </button>
//                   <button className="btn btn-danger" onClick={() => rejectAppointment(appointment.id)}>
//                     Reddet
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {statusMessage && <div className="alert alert-info mt-3">{statusMessage}</div>}
//     </div>
//   );
// }

// export default WorkerHomePage;
