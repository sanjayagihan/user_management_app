import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers } from '../redux/usersSlice';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const token = useSelector((state) => state.auth.token);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // State to track the user to delete

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users', { headers });
        dispatch(setUsers(response.data));
      } catch (error) {
        alert('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [dispatch, token]);

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/users',
        { firstName, lastName },
        { headers }
      );
      dispatch(setUsers([...users, response.data]));
      setFirstName('');
      setLastName('');
    } catch (error) {
      alert('Failed to add user');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${editingUser.id}`,
        { firstName, lastName },
        { headers }
      );
      dispatch(
        setUsers(users.map((u) => (u.id === editingUser.id ? response.data : u)))
      );
      setEditingUser(null);
      setFirstName('');
      setLastName('');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, { headers });
      dispatch(setUsers(users.filter((u) => u.id !== id)));
      setConfirmDeleteId(null); // Close the confirmation popup
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Users List</h2>
      <div className="mb-4">
        <div className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            {editingUser ? (
              <button className="btn btn-warning w-100" onClick={handleUpdateUser}>
                Update User
              </button>
            ) : (
              <button className="btn btn-primary w-100" onClick={handleAddUser}>
                Add User
              </button>
            )}
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary me-2"
                  onClick={() => {
                    setEditingUser(user);
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => setConfirmDeleteId(user.id)} // Show confirmation popup
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Popup */}
      {confirmDeleteId && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setConfirmDeleteId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setConfirmDeleteId(null)} // Cancel delete
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(confirmDeleteId)} // Proceed with delete
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
