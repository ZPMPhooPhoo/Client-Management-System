import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "../../components/input.component";
import { Checkbox } from "../../components/checkbox";
import { Button } from "../../components/button.component";
import Category from "../category_list/categoryList";
// import Checkbox from "../../components/checkbox.component";

interface Category {
  id: number;
  category: string;
}
interface User {
  id: number;
  name: string;
  isChecked: boolean;
}

export const ProjectEditContent: React.FC = () => {
  const [errors, setErrors] = useState<any>({});
  const [errMsg, setErrMsg] = useState<string>('');
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const status_options = ['Complete', 'Progress', 'Cancel'];
  const [status, setStatus] = useState<any>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [maintenance_active, setMaintenance] = useState<boolean>(false);
  const [category_id, setCategory] = useState<number | undefined>(undefined);
  const [categoryValue, setCategoryValue] = useState<string | undefined>('');
  const [categories_options, setCategoriesOptions] = useState<Category[]>([]);
  const [users_option, setUserOption] = useState<User[]>([]);
  const [assignedDev, setAssignedDev] = useState<User[]>([]);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const searchID = new URLSearchParams(location.search);
  const projectID = searchID.get("projectID");
  const userID = searchID.get("id");

  let num_id = 0;
  if (userID != null) {
    num_id = parseInt(userID);
  } else {
    num_id = 0;
  }

  const [users, setUsers] = useState<number[]>([num_id]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const projectResponse = await axios.get(`http://127.0.0.1:8000/api/projects/${projectID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      const categoriesResponse = await axios.get(`http://127.0.0.1:8000/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      const developersResponse = await axios.get("http://127.0.0.1:8000/api/developers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      const assignedDevResponse = await axios.get(`http://127.0.0.1:8000/api/developerproject/${projectID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setUserOption(developersResponse.data.data);
      const mappedOptions: Category[] = categoriesResponse.data.data.map((item: any) => ({
        id: item.id,
        category: item.category,
      }));
      setCategoriesOptions(mappedOptions);
      setTitle(projectResponse.data.data.title);
      setDescription(projectResponse.data.data.description);
      setStatus(projectResponse.data.data.status);
      setCategoryValue(projectResponse.data.data.category.category);
      setCategory(projectResponse.data.data.category.id);
      setMaintenance(projectResponse.data.data.maintenance_active);
      setAssignedDev(assignedDevResponse.data.data);
    }
    fetchData();
  }, [token]);

  const devID = assignedDev.filter((asDev: any) => asDev.role_id !== '5').map((dev: any) => Number(dev.id));

  useEffect(() => {
    const devIDs = assignedDev
      .filter((asDev: any) => asDev.role_id !== '5')
      .map((dev: any) => Number(dev.id));
    setUsers((prevUsers) => [...prevUsers, ...devIDs]);
  }, [assignedDev]);

  const handleDevChange = (userId: number) => {
    const is_devchecked = users.includes(userId);

    if (is_devchecked) {
      const updatedUsers = users.filter((user) => user !== userId);
      setUsers(updatedUsers);
    } else {
      const updatedUsers = [...users, userId];
      setUsers(updatedUsers);
    }
  };

  const handleProjectUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    let validationErrors: any = {};
    if (title.trim() === "") {
      validationErrors.title = "Title is required *";
    }
    if (description.trim() === "") {
      validationErrors.description = "Description is required *";
    }
    if (!status) {
      validationErrors.status = "Status is required *";
    }
    if (!category_id) {
      validationErrors.category = "Category is required *";
    }
    // if (users.length === 1 || users.length < 1) {
    //   validationErrors.dev = "Please choose at least one developer *";
    // }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.patch(`http://127.0.0.1:8000/api/projects/${projectID}`, {
      title,
      description,
      status,
      category_id,
      maintenance_active,
      users,
      num_id
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      navigate(`/client-project-lists?id=${userID}`);
    })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      })
  };
  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>EDIT A PROJECT</h1>
          <div className="form-wrap">
            <form onSubmit={handleProjectUpdate} >
              <div className="box">
                <div className="left">
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <Input
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        type="text"
                        value={title}
                        placeholder="Enter Title"
                      />
                      <p className="error-message">{errors.title && errors.title}</p>
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                    <textarea className="textarea"
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        value={description}
                        placeholder="Enter Description"
                      />
                      {/* <Input
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        type="text"
                        value={description}
                        placeholder="Enter Description"
                      /> */}
                      <p className="error-message">{errors.description && errors.description}</p>
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <select name="status" id="" className="selectbox"
                        onChange={(event) => {
                          setStatus(status_options[event.target.selectedIndex - 1]);
                        }}
                        value={status}
                      >
                        <option value="__default"> Choose Status</option>
                        {status_options.map((option, index) => (
                          <option key={index} value={option} >
                            {option}
                          </option>
                        ))}
                      </select>
                      <p className="error-message">{errors.status && errors.status}</p>
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <select name="catogory_id" id="" className="selectbox"
                        onChange={(event) => {
                          if (categories_options[event.target.selectedIndex - 1]) {
                            setCategory(categories_options[event.target.selectedIndex - 1].id);
                            setCategoryValue(categories_options[event.target.selectedIndex - 1].category);
                          } else {
                            setCategory(undefined);
                            setCategoryValue(undefined)
                          }
                        }}
                        value={categoryValue}
                      >
                        <option value="__default">Choose Category</option>
                        {categories_options.map((option, index) => (
                          <option key={index} value={option.category}>
                            {option.category}
                          </option>
                        ))}
                      </select>
                      <p className="error-message">{errors.category && errors.category}</p>
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <Checkbox
                        checked={maintenance_active}
                        label="Under Maintenance?"
                        className="maintenence"
                        name="maintenance_active"
                        onChange={(checked: boolean) => {
                          setIsChecked(!isChecked);
                          setMaintenance(isChecked);
                        }}
                      />
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div style={{ height: "100px", overflowY: "scroll", display: 'flex', flexDirection: 'column', marginBottom: "10px"}}>
                      <label> Please select assigned developers. </label>
                      {
                        users_option.map((item: any) => {
                          return (
                            <div key={item.id} style={{ display:"flex", padding: "15px" }}>
                              <div style={{ justifyContent: "flex-start" }}>
                              <input type="checkbox" name="users" id={item.name} onChange={() => handleDevChange(item.id)} checked={users.includes(item.id)} />
                              </div>
                              <div style={{ justifyContent: "flex-end" }}>
                              <label htmlFor={item.name}>{item.name}</label>
                              </div>
                            </div>
                          )
                        })
                      }
                      {/* <p className="error-message dev">{errors.dev && errors.dev}</p> */}
                      <p className="error-message">{errMsg && errMsg}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="allbtn">
                <Button type="submit" className="button" text="UPDATE" />
                <Link to={`/client-project-lists?id=${userID}`}>
                  <Button type="button" className="button" text="BACK" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};