import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { Checkbox } from "../../components/checkbox.component";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  category: string;
}
interface User {
  id: number;
  name: string;
  isChecked: boolean;
}

export const ProjectCreateContent: React.FC = () => {
  const [errMsg, setErrMsg] = useState<string>('');
  const location = useLocation();
  const searchID = new URLSearchParams(location.search);
  const id = searchID.get("id");
  let num_id = 0;
  if (id != null) {
    num_id = parseInt(id);
  } else {
    num_id = 0;
  }
  const [errors, setErrors] = useState<any>({});
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [maintenance_active, setMaintenance] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [categories_options, setCategoriesOptions] = useState<Category[]>([]);
  const [category_id, setCategory] = useState<number | undefined>(undefined);
  const [users, setUsers] = useState<number[]>([num_id]);
  const [users_option, setUserOption] = useState<User[]>([]);
  const token = localStorage.getItem('token');
  const status_options = ['Complete', 'Progress', 'Cancel'];

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchCategoriesData();
    }
  }, []);

  const fetchCategoriesData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      const mappedOptions: Category[] = data.map((item: any) => ({
        id: item.id,
        category: item.category,
      }));
      setCategoriesOptions(mappedOptions);
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

  useEffect(() => {
    if (token) {
      fetchDevelopersData();
    }
  }, []);

  const fetchDevelopersData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/developers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserOption(response.data.data);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        const apiErrorMessage = error.response.data.message;
        setErrMsg(apiErrorMessage);
      } else {
        setErrMsg('An error has occurred during the API request.');
      }
    }
  };

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


  const handleProjectCreate = (e: React.FormEvent) => {
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

    const token = localStorage.getItem("token");

    axios.post("http://127.0.0.1:8000/api/projects", {
      title,
      description,
      status,
      category_id,
      maintenance_active,
      users,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      navigate(`/client-project-lists?id=${id}`);
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
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A PROJECT</h1>
          <div className="form-wrap">
            <form onSubmit={handleProjectCreate}>
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
                      <p className="error-message">{errors.description && errors.description}</p>
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <select name="status" id="" className="selectbox"
                        onChange={(event) => {
                          setStatus(status_options[event.target.selectedIndex - 1]);
                        }}
                      >
                        <option value="__default">Choose Status</option>
                        {status_options.map((option, index) => (
                          <option key={index} value={option}>
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
                          } else {
                            setCategory(undefined);
                          }
                        }}
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
                      <Checkbox label="Under Maintenance?" className="maintenence" name="maintenance_active" onChange={(checked: boolean) => {
                        setIsChecked(!isChecked);
                        setMaintenance(isChecked);
                      }} />
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div style={{ height: "100px", overflowY: "scroll", display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label> Please select assigned developers. </label>
                      {
                        users_option.map((item: any) => {
                          return (
                            <div key={item.id} style={{ display: 'flex', padding: "15px" }}>
                              <div style={{ justifyContent: "flex-start" }}>
                                <input type="checkbox" name="users" id={item.name} onChange={() => handleDevChange(item.id)} />
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
                <Button type="submit" className="button" text="ADD" />
                <Link to={`/client-project-lists?id=${id}`}>
                  <Button type="button" className="button" text="BACK" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
