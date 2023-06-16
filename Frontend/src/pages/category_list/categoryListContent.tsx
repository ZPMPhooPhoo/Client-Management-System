import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const CategoryListContent = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState<string>('');
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

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
        const response = await axios.get("http://127.0.0.1:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  let totalItems = data.data.length == 0 ? 1 : data.data.length;
  if (searchResults.length > 0) {
    totalItems = searchResults.length;
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
            <abbr title="ADD NEW CATEGORY">
              <div className="addnewcategory">
                <button className="addcusbtn">
                  <Link to="/category-create">
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
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.data.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No Categories Found</td>
                  </tr>
                ) :
                  (filter && currentSearchItems.length > 0 ? currentSearchItems : currentItems).map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.category}</td>
                        <td>
                          <Link to={`/category-edit/${item.id}`}>
                            <i className="fa-solid fa-pen-to-square update"></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}