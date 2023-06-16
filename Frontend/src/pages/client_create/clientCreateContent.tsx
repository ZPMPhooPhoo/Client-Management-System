import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { Link } from "react-router-dom";

export const ClientCreateContent: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact_person, setContactPerson] = useState<string>("");
  const [position, setClientPosition] = useState<string>("");
  const [role_id] = useState<number>(5);
  const [password] = useState<string>("0000000000");
  const [password_confirmation] = useState<string>("0000000000");
  const [errors, setErrors] = useState<any>({});
  const [errMsg, setErrMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClientCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let validationErrors: any = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required *";
    }
    if (email.trim() === "") {
      validationErrors.email = "Email is required *";
    }
    if (phone.trim() === "") {
      validationErrors.phoneNumber = "Phone number is required *";
    }
    if (contact_person.trim() === "") {
      validationErrors.contactPerson = "Client contact is required *";
    }
    if (position.trim() === "") {
      validationErrors.clientPosition = "Client position is required *";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post("http://127.0.0.1:8000/api/users", {
        name,
        email,
        password,
        password_confirmation,
        phone,
        address,
        contact_person,
        position,
        role_id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/client-lists");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      }).finally(() => {

      });
  };
  // if (isLoading) {
  //   return <div className="l-width"><p className="loading"></p></div>
  // }

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A CLIENT</h1>
          <div className="form-wrap">
            <form onSubmit={handleClientCreate}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    id="client_name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                  />
                  <p className="error-message">{errors.name && errors.name}</p>
                </div>

              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                  />
                  <p className="error-message">{errors.email && errors.email}</p>
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="phone_number"
                    name="phone"
                    type="tel"
                    value={phone}
                    placeholder="Enter Phone Number"
                  />
                  <p className="error-message">{errors.phoneNumber && errors.phoneNumber}</p>
                </div>

              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    placeholder="Address"
                  />
                  <p className="error-message">{errors.address && errors.address}</p>
                </div>

              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setContactPerson(e.target.value)}
                    id="contact_person"
                    name="contact_person"
                    type="text"
                    value={contact_person}
                    placeholder="Contact Person"
                  />
                  <p className="error-message">{errors.contactPerson && errors.contactPerson}</p>
                </div>

              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setClientPosition(e.target.value)}
                    id="client_position"
                    name="position"
                    type="text"
                    value={position}
                    placeholder="Client Position"
                  />
                  <p className="error-message">{errors.clientPosition && errors.clientPosition}</p>
                  <p className="error-message">{errMsg && errMsg}</p>
                </div>
              </div>
              <div className="allbtn">
                <Button type="submit" className="button" text={isLoading ? "Loading..." : "ADD"}
                  disabled={isLoading} />
                <Link to={`/client-lists`}>
                  <Button type="button" className="button" text="BACK"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
