import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssCode/workerProfile.css';

function WorkerProfile() {
  const [workerDetails, setWorkerDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]); // Çalışan yorumları
  const [editingWorker, setEditingWorker] = useState(false);

  useEffect(() => {
    const workerId = localStorage.getItem('workerId');
    if (!workerId) {
      alert('Çalışan giriş yapmamış!');
      return;
    }

    const fetchData = async () => {
      try {
        // Çalışan bilgilerini al
        const workerResponse = await axios.get(`/api/CwWorkers/${workerId}`);
        setWorkerDetails(workerResponse.data);

        // Çalışanın randevularını al
        const appointmentResponse = await axios.get(`/api/CwAppointments?workerId=${workerId}`);
        const appointments = appointmentResponse.data.filter(
          (appointment) => appointment.status === 'Reddedildi' || appointment.status === 'Yapıldı'
        );

        // Kullanıcı bilgilerini al ve her randevuya kullanıcı adını ekle
        const updatedAppointments = await Promise.all(
          appointments.map(async (appointment) => {
            try {
              const userResponse = await axios.get(`/api/CwUsers/${appointment.userId}`);
              return { ...appointment, userName: userResponse.data.username };
            } catch {
              return { ...appointment, userName: 'Bilinmiyor' }; // Hata durumunda
            }
          })
        );

        setAppointments(updatedAppointments);

        // Çalışanın yorumlarını al
        const feedbackResponse = await axios.get(`/api/CwFeedbacks/worker/${workerId}`);
        const updatedFeedbacks = await Promise.all(
          feedbackResponse.data.map(async (feedback) => {
            try {
              const userResponse = await axios.get(`/api/CwUsers/${feedback.userId}`);
              return { ...feedback, userName: userResponse.data.username };
            } catch {
              return { ...feedback, userName: 'Bilinmiyor' }; // Hata durumunda
            }
          })
        );
        setFeedbacks(updatedFeedbacks);
      } catch (error) {
        console.error('Veriler alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditWorker = async () => {
    try {
      await axios.put(`/api/CwWorkers/${workerDetails.id}`, workerDetails);
      alert('Profil başarıyla güncellendi!');
      setEditingWorker(false);
    } catch (error) {
      console.error('Çalışan güncellenirken hata oluştu:', error);
      alert('Güncelleme sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="worker-profile-container">
      <h1>Worker Profile</h1>
      {workerDetails ? (
        <div className="worker-details">
          {editingWorker ? (
            <div>
              <input
                type="text"
                value={workerDetails.username}
                onChange={(e) =>
                  setWorkerDetails({ ...workerDetails, username: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="email"
                value={workerDetails.email}
                onChange={(e) =>
                  setWorkerDetails({ ...workerDetails, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="password"
                value={workerDetails.passwordHash}
                onChange={(e) =>
                  setWorkerDetails({ ...workerDetails, passwordHash: e.target.value })
                }
                placeholder="Password"
              />
              <input
                type="text"
                value={workerDetails.location}
                onChange={(e) =>
                  setWorkerDetails({ ...workerDetails, location: e.target.value })
                }
                placeholder="Location"
              />
              <button onClick={handleEditWorker}>Save</button>
              <button onClick={() => setEditingWorker(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>{workerDetails.username}</h2>
              <p>Email: {workerDetails.email}</p>
              <p>Location: {workerDetails.location}</p>
              <p>Password: {workerDetails.passwordHash}</p>
              <button onClick={() => setEditingWorker(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading worker details...</p>
      )}

      <h1>Assigned Appointments</h1>
      {appointments.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.userName}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments with status 'Reddedildi' or 'Yapıldı'.</p>
      )}

      <h1>Your Feedbacks</h1>
      {feedbacks.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Rating</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.userName}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.feedbackText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No feedbacks available.</p>
      )}
    </div>
  );
}

export default WorkerProfile;
