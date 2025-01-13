import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssCode/workerManagement.css';
 
function WorkerManagement() {
  const [workers, setWorkers] = useState([]);
  const [editingWorker, setEditingWorker] = useState(null); // Düzenlenecek çalışan bilgileri
 
  useEffect(() => {
    // Çalışan verilerini alma
    const fetchWorkers = async () => {
      try {
        const workersResponse = await axios.get('/api/CwWorkers'); // Çalışan API endpoint
        setWorkers(workersResponse.data);
      } catch (error) {
        console.error('Çalışan verileri alınamadı:', error);
      }
    };
 
    fetchWorkers();
  }, []);
 
  const handleDeleteWorker = async (workerId) => {
    try {
      await axios.delete(`/api/CwWorkers/${workerId}`); // Çalışan silme API endpoint
      setWorkers(workers.filter(worker => worker.id !== workerId));
    } catch (error) {
      console.error('Çalışan silinirken hata oluştu:', error);
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
<h1>Worker Management</h1>
<table className="table table-hover">
<thead>
<tr>
<th scope='col'>Name</th>
<th scope='col'>Email</th>
<th scope='col'>Phone Number</th>
<th scope='col'>Password</th> 
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
<td>{worker.passwordHash}</td>
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
            type='text'
            value={editingWorker.passwordHash}
            onChange={(e) => setEditingWorker({...editingWorker, passwordHash: e.target.value})}
            placeholder='Password'
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
 
export default WorkerManagement;