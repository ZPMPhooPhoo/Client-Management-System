import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const PermissionListContent = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const token = localStorage.getItem('token');
    const [filter,setFilter]=useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
     
    const handleFilterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterValue = event.target.value;
      setFilter(filterValue);
    
      try {
        const response = await axios.get(
         `http://127.0.0.1:8000/api/categoriesByName?searchCategory=${filterValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

          }
        );
        setSearchResults(response.data.data);
      } catch (error:any) {
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
          const response = await axios.get("http://127.0.0.1:8000/api/permissions", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          setIsLoading(false);
        } catch (error:any) {
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [token]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
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
                        <abbr title="ADD NEW CATEGORY">
                            <div className="addnewcategory">
                                    <button className="addcusbtn">
                                        <Link to="/permission-create">
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
                              <th>Permission</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                      {(filter && searchResults.length > 0 ? searchResults: data.data).map((item: any, index: number) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <Link to={`/permission-edit/${item.id}`}>
                                <i className="fa-solid fa-pen-to-square update"></i>
                            </Link>
                            <Link to={`/permission-delete/${item.id}`}>
                              <i className="fa-solid fa-trash delete"></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                    <p className="error-message">{errMsg && errMsg}</p>
                      </tbody>
                    </table>                
                </div>
            </div> 
        </>
    );
}