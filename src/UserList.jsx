import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://new-task-server-rosy.vercel.app/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch {
      setMessage('Failed to load users');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('User deleted');
      fetchUsers();
    } catch {
      setMessage('Error deleting user');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/admin/users/${editUser._id}`,
        {
          username: editUser.username,
          email: editUser.email,
          status: editUser.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('User updated');
      setEditUser(null);
      fetchUsers();
    } catch {
      setMessage('Error updating user');
    }
  };

  const handleInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setEditUser(u)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <form onSubmit={handleEditSubmit} className="mt-4">
          <h4>Edit User</h4>
          <div className="mb-2">
            <input
              className="form-control"
              name="username"
              value={editUser.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              name="email"
              type="email"
              value={editUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <select
              className="form-select"
              name="status"
              value={editUser.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserList;

