import { useState, useEffect } from "react";
import axios from "axios";

interface Role {
  id: number;
  name: string;
}

export const UserProfileContent = () => {
  const [userProfile, setUserProfile] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [role, setRole] = useState<any>();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem("id");

  const [error, setError] = useState(null);
  const [options, setOptions] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/roles", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setName(usersResponse.data.data.name);
        setEmail(usersResponse.data.data.email);
        setAddress(usersResponse.data.data.address);
        setPhone(usersResponse.data.data.phone);
        setRole(usersResponse.data.data.role_id);
        const rolesData = rolesResponse.data.data;
        const mappedOptions: { [key: number]: string } = {};
        rolesData.forEach((item: Role) => {
          mappedOptions[item.id] = item.name;
        });

        setOptions(mappedOptions);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, [token, id]);

  console.log(userProfile);

  return (
    <>

      <div className="main_userprofile">
        <div className="left_userprofile">
          <div className="profile_icon">
            <i className="fa-solid fa-user-tie usericon_prof"></i>
            <h1>{name}</h1>
          </div>
          <div className="user_contact">
            <div className="profile_text">
              <div className="my_profile">
                <h5>Email</h5>
                <p>{email}</p>
              </div>
              <div className="my_profile">
                <h5>Phone</h5>
                <p> {phone}</p>
              </div>
              <div className="my_profile">
                <h5>Address</h5>
                <p>{address}</p>
              </div>
              <div className="my_profile">
                <h5>role</h5>
                <p>{options[role] || ""}</p>
              </div>


            </div>
            <div className="user_contact_icon">

              <a href="https://www.gmail.com" target="_blank"><i className="fa-solid fa-envelope user_mail"></i></a>
              <a href="https://www.facebook.com" target="_blank"><i className="fa-brands fa-facebook-f user_facebook"></i></a>
              <a href="https://www.linkedin.com" target="_blank"><i className="fa-brands fa-linkedin-in user_linkedin"></i></a>
              <a href="https://www.viber.com" target="_blank"><i className="fa-brands fa-viber user_viber"></i></a>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}