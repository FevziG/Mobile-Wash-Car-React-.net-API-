import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssCode/userProfile.css';

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [editingUser, setEditingUser] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(5); // Varsayılan olarak 5
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Kullanıcı giriş yapmamış!');
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`/api/CwUsers/${userId}`);
        setUserDetails(userResponse.data);

        const appointmentResponse = await axios.get(`/api/CwAppointments?userId=${userId}`);
        setAppointments(
          appointmentResponse.data.filter(
            (appointment) =>
              appointment.status === 'Reddedildi' || appointment.status === 'Yapıldı'
          )
        );

        const workersResponse = await axios.get('/api/CwWorkers');
        setWorkers(workersResponse.data);
      } catch (error) {
        console.error('Veriler alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditUser = async () => {
    try {
      await axios.put(`/api/CwUsers/${userDetails.id}`, userDetails);
      alert('Profil başarıyla güncellendi!');
      setEditingUser(false);
    } catch (error) {
      console.error('Kullanıcı güncellenirken hata oluştu:', error);
      alert('Güncelleme sırasında bir hata oluştu.');
    }
  };

  const getWorkerName = (workerId) => {
    const worker = workers.find((w) => w.id === workerId);
    return worker ? worker.username : 'Bilinmiyor';
  };

  const handleAddFeedback = async () => {
    if (!feedbackText || !selectedWorkerId || !rating) {
      alert('Lütfen bir yorum ve puan girin.');
      return;
    }

    try {
      const response = await axios.post('/api/CwFeedbacks', {
        userId: userDetails.id,
        workerId: selectedWorkerId,
        feedbackText,
        rating,
        isActive: true,
      });

      alert('Yorum başarıyla eklendi!');
      
      // Yorumları canlı güncellemek için
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.workerId === selectedWorkerId
            ? { ...appointment, feedback: response.data }
            : appointment
        )
      );

      setFeedbackText('');
      setRating(5); // Varsayılan değeri sıfırla
      setSelectedWorkerId(null);
    } catch (error) {
      console.error('Yorum eklenirken hata oluştu:', error);
      alert('Yorum ekleme sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {userDetails ? (
        <div className="user-details">
          {editingUser ? (
            <div>
              <input
                type="text"
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="password"
                value={userDetails.passwordHash}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, passwordHash: e.target.value })
                }
                placeholder="Password"
              />
              <input
                type="text"
                value={userDetails.location}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, location: e.target.value })
                }
                placeholder="Location"
              />
              <button onClick={handleEditUser}>Save</button>
              <button onClick={() => setEditingUser(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>{userDetails.username}</h2>
              <p>Email: {userDetails.email}</p>
              <p>Location: {userDetails.location}</p>
              <p>Password: {userDetails.passwordHash}</p>
              <button onClick={() => setEditingUser(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <h2>Your Appointments</h2>
      {appointments.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Worker</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{getWorkerName(appointment.workerId)}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === 'Yapıldı' && (
                    <button
                      onClick={() => setSelectedWorkerId(appointment.workerId)}
                    >
                      Yorum Yap
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments with status 'Reddedildi' or 'Yapıldı'.</p>
      )}

      {selectedWorkerId && (
        <div className="feedback-form">
          <h2>Yorum Yap</h2>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Yorumunuzu buraya yazın"
          />
          <div>
            <label>Puanlama: </label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddFeedback}>Gönder</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
