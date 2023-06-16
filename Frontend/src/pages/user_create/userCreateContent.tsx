import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import importImg from '../../img/sidebar/logo.png';
import axios from "axios";
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';

interface Role {
  id: number;
  name: string;
}

export const UserCreateContent: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [errMsg, setErrMsg] = useState<string>('');
  const token = localStorage.getItem('token');
  const [options, setOptions] = useState<Role[]>([]);
  const [role_id, setRole] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_role', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        const mappedOptions: Role[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));

        setOptions(mappedOptions);
        setIsLoading(false)
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
        setIsLoading(false)
      }
    };

    fetchData();
  }, [token]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let validationErrors: any = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required *";
    }
    if (email.trim() === "") {
      validationErrors.email = "Email is required *";
    }
    if (password.trim() === "") {
      validationErrors.password = "Password is required *";
    }
    if (password_confirmation.trim() === "") {
      validationErrors.confirmPassword = "Confirm Password is required *";
    }
    if (password_confirmation.trim() !== password.trim()) {
      validationErrors.confirmPassword = "Password does not match *";
    }
    if (!role_id) {
      validationErrors.role = "Role is required *";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/auth/signup", {
        name,
        email,
        password,
        password_confirmation,
        role_id
      })
      .then((response) => {
        navigate("/users");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      });
  };

  if (isLoading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  return (
    <div className="">
      <div className="registerBox">
        <div className="registerHeader">
          <img src={importImg} alt="logo" className="resize" />
        </div>
        <form onSubmit={handleSignup}>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            id={""}
          />
          <p className="error-message">{errors.name && errors.name}</p>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            id={""}
          />
          <p className="error-message">{errors.email && errors.email}</p>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            id={""}
          />
          <p className="error-message">{errors.password && errors.password}</p>
          <Input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            name="password_confirmation"
            type="password"
            value={password_confirmation}
            placeholder="Confirm Password"
            id={""}
          />
          <p className="error-message">{errors.confirmPassword && errors.confirmPassword}</p>

          <select name="role_id" id="" className="selectbox"
            onChange={(event) => {
              if (options[event.target.selectedIndex - 1]) {
                setRole(options[event.target.selectedIndex - 1].id);
              } else {
                setRole(undefined);
              }
            }}
          >
            <option value="__default">Choose Role</option>
            {options.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <p className="error-message">{errors.role && errors.role}</p>
          <p className="error-message">{errMsg && errMsg}</p>
          <div className="allbtn">
            <Button type="submit" className="button" text={isLoading ? "Loading..." : "ADD"}
              disabled={isLoading} />
            <Link to={`/users`}>
              <Button type="button" className="button" text="BACK"
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
