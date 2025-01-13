import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../cssCode/userManagement.css';
 
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Düzenlenecek kullanıcı bilgileri
 
  useEffect(() => {
    // Kullanıcı verilerini alma
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get('/api/CwUsers'); // Kullanıcı API endpoint
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Kullanıcı verileri alınamadı:', error);
      }
    };
 
    fetchUsers();
  }, []);
 
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/CwUsers/${userId}`); // Kullanıcı silme API endpoint
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Kullanıcı silinirken hata oluştu:', error);
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
 
  return (
<div>
<h1>User Management</h1>
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
</div>
  );
}
 
export default UserManagement;