import React, { useRef, useState } from 'react';
import axios from 'axios';
import importImg from '../../img/ace_plus_logo.png';
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';

interface Props {
  email: string;
  password: string;
}

export const Login: React.FC<Props> = ({ }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});
  const [errMsg, setErrMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const alertTimerRef = useRef<number | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrMsg('');
    setIsLoading(true);

    let validationErrors: any = {};
    if (email.trim() === '') {
      validationErrors.email = 'Email is required *';
    }
    if (password.trim() === '') {
      validationErrors.password = 'Password is required *';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signin', {
        email,
        password,
      });




      const { token } = response.data;
      const { role_id } = response.data;
      const { name } = response.data;
      const { id } = response.data;
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      localStorage.setItem('role_id', role_id);
      localStorage.setItem("id", id);
      const expirationTime = 1 * 24 * 60 * 60 * 1000;
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("project_id");
        window.location.reload();
        window.location.href = '/';
      }, expirationTime);
      setIsLoading(false);
      window.location.reload();
      const apiSuccessMsg = response.data.message;

      setSuccessMsg(apiSuccessMsg);
      setShowAlert(true);

      if (alertTimerRef.current) {
        window.clearTimeout(alertTimerRef.current);
      }

      alertTimerRef.current = window.setTimeout(() => {
        setShowAlert(false);
        setSuccessMsg(null);
      }, 3000);

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        const apiErrorMessage = error.response.data.message;
        setErrMsg(apiErrorMessage);
      } else {
        setErrMsg('An error has occurred during the API request.');
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="container login-form ">
        <div className="login-form-row">
          <div className="left-col">
            <div className="left-col-content">
              <h1>Client Management System</h1>
            </div>
            <img src={importImg} alt="logo" />
          </div>
          <div className="right-col">
            <div className="right-col-content">
              <div className="from-title">
                <i className="fa-solid fa-user-tie"></i>
                <h1>login</h1>
              </div>
              <div className="form">
                <form onSubmit={handleLogin}>
                  <div className="input-wrap">
                    <Input
                      onChange={(e: any) => setEmail(e.target.value)}
                      type="email"
                      value={email}
                      placeholder="Enter your email!"
                      name=""
                      id=""
                    />
                    <p className="error-message">{errors.email && errors.email}</p>
                    <Input
                      onChange={(e: any) => setPassword(e.target.value)}
                      type="password"
                      value={password}
                      placeholder="Enter your password!"
                      name=""
                      id=""
                    />
                    <p className="error-message">{errors.password && errors.password}</p>

                    <p className="error-message">{errMsg && errMsg}</p>
                  </div>
                  <Button type="submit" className="button" text={isLoading ? 'Loading...' : 'Login'} disabled={isLoading} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};