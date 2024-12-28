import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssCode/userManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]); // Workers listesi için state
  const [editingUser, setEditingUser] = useState(null); // Düzenlenecek kullanıcı bilgileri
  const [editingWorker, setEditingWorker] = useState(null); // Düzenlenecek çalışan bilgileri

  useEffect(() => {
    // Kullanıcı ve çalışan verilerini alma
    const fetchUsersAndWorkers = async () => {
      try {
        const usersResponse = await axios.get('/api/CwUsers'); // Kullanıcı API endpoint
        const workersResponse = await axios.get('/api/CwWorkers'); // Çalışan API endpoint

        setUsers(usersResponse.data);
        setWorkers(workersResponse.data);
      } catch (error) {
        console.error('Veriler alınamadı:', error);
      }
    };

    fetchUsersAndWorkers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/CwUsers/${userId}`); // Kullanıcı silme API endpoint
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Kullanıcı silinirken hata oluştu:', error);
    }
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      await axios.delete(`/api/CwWorkers/${workerId}`); // Çalışan silme API endpoint
      setWorkers(workers.filter(worker => worker.id !== workerId));
    } catch (error) {
      console.error('Çalışan silinirken hata oluştu:', error);
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(`/api/CwUsers/${editingUser.id}`, editingUser); // Kullanıcı güncelleme API endpoint
      const updatedUsers = await axios.get('/api/CwUsers'); // Güncellenmiş listeyi çek
      setUsers(updatedUsers.data);
      setEditingUser(null); // Düzenleme işlemini sonlandır
    } catch (error) {
      console.error('Kullanıcı güncellenirken hata oluştu:', error);
    }
  };

  const handleEditWorker = async () => {
    try {
      await axios.put(`/api/CwWorkers/${editingWorker.id}`, editingWorker); // Çalışan güncelleme API endpoint
      const updatedWorkers = await axios.get('/api/CwWorkers'); // Güncellenmiş listeyi çek
      setWorkers(updatedWorkers.data);
      setEditingWorker(null); // Düzenleme işlemini sonlandır
    } catch (error) {
      console.error('Çalışan güncellenirken hata oluştu:', error);
    }
  };

  return (
    <div>
      <h1>User and Worker Management</h1>

      <h2>Users List</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Password</th>
            <th scope='col'>Role</th>
            <th scope='col'>Active</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.passwordHash}</td>
              <td>User</td>
              <td>{user.isActive ? 'Yes' : 'No'}</td>
              <td>
                <button className='delete-button' onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <button className='edit-button' onClick={() => setEditingUser(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Workers List</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone Number</th>
            <th scope='col'>Location</th>
            <th scope='col'>Active</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(worker => (
            <tr key={worker.id}>
              <td>{worker.username}</td>
              <td>{worker.email}</td>
              <td>{worker.phoneNumber}</td>
              <td>{worker.location}</td>
              <td>{worker.isActive ? 'Yes' : 'No'}</td>
              <td>
                <button className='delete-button' onClick={() => handleDeleteWorker(worker.id)}>Delete</button>
                <button className='edit-button' onClick={() => setEditingWorker(worker)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <input
            className='input-group mb-3'
            type="text"
            value={editingUser.username}
            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
            placeholder="Name"
          />
          <input
            className='input-group mb-3'
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className='input-group mb-3'
            type="text"
            value={editingUser.passwordHash}
            onChange={(e) => setEditingUser({ ...editingUser, passwordHash: e.target.value })}
            placeholder="Password"
          />
          <button className='save-button' onClick={handleEditUser}>Save Changes</button>
        </div>
      )}

      {editingWorker && (
        <div>
          <h2>Edit Worker</h2>
          <input
            className='input-group mb-3'
            type="text"
            value={editingWorker.username}
            onChange={(e) => setEditingWorker({ ...editingWorker, username: e.target.value })}
            placeholder="Name"
          />
          <input
            className='input-group mb-3'
            type="email"
            value={editingWorker.email}
            onChange={(e) => setEditingWorker({ ...editingWorker, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className='input-group mb-3'
            type="text"
            value={editingWorker.phoneNumber}
            onChange={(e) => setEditingWorker({ ...editingWorker, phoneNumber: e.target.value })}
            placeholder="Phone Number"
          />
          <input
            className='input-group mb-3'
            type="text"
            value={editingWorker.location}
            onChange={(e) => setEditingWorker({ ...editingWorker, location: e.target.value })}
            placeholder="Location"
          />
          <button className='save-button' onClick={handleEditWorker}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default UserManagement;

