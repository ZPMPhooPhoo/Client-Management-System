import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import importImg from "../../img/sidebar/logo.png";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { SelectBox } from "../../components/selectbox.component";

interface Role {
  id: number;
  name: string;
}

export const UserEditContent: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [contact_person, setContactPerson] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<any>({});
  const token = localStorage.getItem("token");
  const [options, setOptions] = useState<Role[]>([]);
  const [role_id, setRole] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string>('');

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, rolesResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/user_role", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const user = userResponse.data.data;
        const rolesData = rolesResponse.data.data;
        const mappedOptions: Role[] = rolesData.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));

        setName(user.name);
        setEmail(user.email);
        setPhoneNo(user.phone);
        setAddress(user.address);
        setOptions(mappedOptions);

        const userRole = mappedOptions.find((option) => option.id == user.role_id);
        if (userRole) {
          setRole(userRole.id);
        }
        setIsLoading(false)
      } catch (error:any) {
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
  }, [userId, token]);

  const handleSelectChange = (selectedOption: string, selectedIndex: number) => {
    const selectedRoleId = options[selectedIndex].id;
    setRole(selectedRoleId);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    const validationErrors: any = {};
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!phone.trim()) {
      validationErrors.phone = "Phone number is required";
    }
    if (!address.trim()) {
      validationErrors.address = "Address is required";
    }
    if (!role_id) {
      validationErrors.role = "Role is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/auth/userUpdate/${userId}`,
        {
          name,
          email,
          role_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
        <form onSubmit={handleUpdate}>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            id=""
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            id=""
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <SelectBox
            name="role_id"
            options={options.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            onChange={handleSelectChange}
            value={role_id !== undefined ? role_id.toString() : ""}
          />
          {errors.role && <p className="error-message">{errors.role}</p>}
          <p className="error-message">{errMsg && errMsg}</p>
          <div className="allbtn">
            <Button type="submit" className="button" text={isLoading ? "Loading..." : "UPDATE"}
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
