import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import LoadingSpinner from "../components/LoadingSpinner";



export const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="auth">
      {showLogin ? (
        <Login switchToRegister={() => setShowLogin(false)} />
      ) : (
        <Register switchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
};

const Login = ({ switchToRegister }) => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://mernreceipebackend.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
        <p>
          Don't have an account?{" "}
          <button type="button" onClick={switchToRegister}>
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

const Register = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("https://mernreceipebackend.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
      switchToLogin(); // Switch to login form after registration
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Sign Up"}
        </button>
        <p>
          Already have an account?{" "}
          <button type="button" onClick={switchToLogin}>
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};
