import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";

interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}
export const RoleEditContent: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermission, setRolePermission] = useState<number[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [errMsg, setErrMsg] = useState<string>('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { roleId } = useParams();
  useEffect(() => {

    axios
      .get(`http://127.0.0.1:8000/api/roles/${roleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { name } = response.data.data.role;
        setName(name);

        const extractedPermissions = response.data.data.permissions;
        setPermissions(extractedPermissions);

        const rolePermissionData = response.data.data.rolePermission;
        setRolePermission(rolePermissionData);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      });
  }, [roleId, token]);


  const handlePermissionChange = (permissionId: number) => {
    setRolePermission((prevPermissions) => {
      if (prevPermissions.includes(permissionId)) {
        return prevPermissions.filter((id) => id !== permissionId);
      } else {
        return [...prevPermissions, permissionId];
      }
    });
  };

  const handleClientUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let validationErrors: any = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required *";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .patch(
        `http://127.0.0.1:8000/api/roles/${roleId}`,
        {
          name,
          permissions: rolePermission,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate("/role-list");
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

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>EDIT ROLE</h1>
          <div className="form-wrap">
            <form onSubmit={handleClientUpdate}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    id="client_name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Enter Role Name"
                  />
                  <p className="error-message">{errors.name && errors.name}</p>
                </div>
              </div>

              <div className="client_phoneNO">
                <div style={{ height: "300px", width: "280px", overflowY: "scroll", alignItems: 'center', flexDirection: 'row' }}>
                  {permissions.map((item: Permission) => {
                    const isChecked = rolePermission.includes(item.id);
                    return (
                      <div key={item.id} style={{ display: "flex", padding: "15px" }}>
                        <div style={{ justifyContent: "flex-start" }}>
                          <input
                            type="checkbox"
                            name="permissions"
                            id={item.name}
                            checked={isChecked}
                            onChange={() => handlePermissionChange(item.id)}
                          />
                        </div>
                        <div style={{ justifyContent: "flex-end" }}>
                          <label htmlFor={item.name}>{item.name}</label>
                        </div>
                      </div>
                    );
                  })}
                  <p className="error-message">{errors.address && errors.address}</p>
                  <p className="error-message">{errMsg && errMsg}</p>
                </div>
              </div>
              <Button type="submit" className="button" text="Update" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
