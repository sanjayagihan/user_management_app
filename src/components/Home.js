import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to the User Management App</h1>
      <p className="mb-4">Please log in to manage users effectively.</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
