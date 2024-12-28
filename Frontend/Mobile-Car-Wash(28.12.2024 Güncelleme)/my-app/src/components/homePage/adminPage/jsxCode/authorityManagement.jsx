import React, { useState } from 'react';

function AuthorityManagement() {
  const people = [
    { username: 'f1', role: 'user' },
    { username: 'f2', role: 'admin' },
    { username: 'f3', role: 'worker' },
    { username: 'f4', role: 'user' },
    { username: 'f5', role: 'user' },
    { username: 'f6', role: 'admin' },
    { username: 'f7', role: 'worker' },
  ];

  const [users, setUsers] = useState(people);

  const handleRoleChange = (username, newRole) => {
    const updatedUsers = users.map(user =>
      user.username === username ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Authority Management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td> {/* Kullanıcı adı buraya gelmeli */}
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.username, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="worker">Worker</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorityManagement;
