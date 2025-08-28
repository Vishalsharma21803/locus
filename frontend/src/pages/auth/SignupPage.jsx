import React, { useState } from 'react';
import styles from './Auth.module.css';
import { Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    try {
      const response = await authAPI.signup(data);
      console.log("Signup successful:", response);

      if (response.status && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.id,
          name: response.name,
          email: response.email,
          role: response.role
        }));
        window.dispatchEvent(new Event('storage'));

        navigate('/menu');
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  return (
    <section className={styles.authWrapper}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>Sign Up</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange} required />
          <input className={styles.input} type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button className={styles.authButton} type="submit">Sign Up</button>
        </form>
        <p className={styles.switchText}>Already have an account? <a href="/login" className={styles.link}>Login</a></p>
      </div>
    </section>
  );
}

export default SignupPage;