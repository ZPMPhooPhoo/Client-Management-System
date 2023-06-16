import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

export const UserListContent = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string>('');
  const token = localStorage.getItem('token');
  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [options, setOptions] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/users", {
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

        setData(usersResponse.data);
        setIsLoading(false);

        const rolesData = rolesResponse.data.data;
        const mappedOptions: { [key: number]: string } = {};
        rolesData.forEach((item: Role) => {
          mappedOptions[item.id] = item.name;
        });

        setOptions(mappedOptions);
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

    fetchData();
  }, [token]);

  const handleFilterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setFilter(filterValue);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/userAdminWithName?searchuser=${filterValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data.data);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        const apiErrorMessage = error.response.data.message;
        setErrMsg(apiErrorMessage);
      } else {
        setErrMsg('An error has occurred during the API request.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);
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

    fetchData();
  }, [token]);

  if (isLoading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>Data is not available</div>;
  }

  let totalItems = data.data.length;
  if (searchResults.length > 0) {
    totalItems = searchResults.length
  }
  const totalPages = Math.ceil(totalItems / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = data.data.slice(indexOfFirstItem, indexOfLastItem);
  const currentSearchItems = searchResults?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div style={{ width: '100%' }}>
        <div className="table-wrap">
          <div className="client-title">
            <div>

              <input
                type="text"
                placeholder="Search by name..."
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
            <abbr title="ADD NEW USER">
              <div className="addnewcustomer">
                <button className="addcusbtn">
                  <Link to="/user-create">
                    <span className="material-symbols-outlined">add</span>
                  </Link>
                </button>
              </div>
            </abbr>
          </div>

          <table className='pj-table'>

            <thead>
              <tr className="table-header">
                <th>No</th>
                <th className="client-name">Name</th>
                <th>Contact Mail</th>
                <th>Contact Phone</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                (filter && currentSearchItems.length > 0
                  ? currentSearchItems
                  : currentItems
                ).map((item: any, index: number) => {
                  const rowNumber = (currentPage - 1) * perPage + index + 1;
                  return (
                    <tr key={index}>
                      <td>{rowNumber}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td className="td-category">
                        {options[item.role_id] || ""}
                      </td>
                      <td>
                        <Link to={`/user-edit/${item.id}`}>
                          <i className="fa-solid fa-pen-to-square update"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}