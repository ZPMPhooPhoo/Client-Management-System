import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  category: {
    category: string;
  };
}

export const ClientProjectListContent = () => {
  const [clientproject, setClientproject] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [errMsg, setErrMsg] = useState<string>('');
  const [name, setName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/userproject/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newResponse = await axios.get(
          `http://127.0.0.1:8000/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const clientProjects = response.data.data || [];
        const clientName = newResponse?.data?.data?.name;
        if (clientName === undefined) {
          return navigate("/client-lists")
        }
        setName(clientName);
        setClientproject(clientProjects);
        setIsLoading(false);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  if (isLoading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  let totalItems = clientproject.length == 0 ? 1 : clientproject.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = clientproject.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className="table-wrap" style={{ width: "97%" }}>
        <div className="table-bar">
          <div className="pro_listincliinfo">
            <Link to="/client-lists">
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <span className="material-symbols-outlined">person</span>
            <p> {name} </p>
          </div>
          <div className="add-btn-wrap">
            <Link to={`/add-client-project?id=${id}`}>
              <button className="add-btn">
                <i className="fa-solid fa-plus"></i>ADD NEW PROJECT
              </button>
            </Link>
          </div>
        </div>

        <table className="pj-table">
          <thead>
            <tr className="table-header">
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quotation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientproject.length === 0 ? (
              <tr>
                <td colSpan={5}>No projects found.</td>
              </tr>
            ) : (
              currentItems.map((project: Project, index: number) => (

                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td className="td-category">
                    {project.category && project.category.category ? (
                      <span>{project.category.category}</span>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/quotation-create?id=${id}&projectID=${project.id}`} className="link">
                      Add Quotation
                    </Link>
                  </td>
                  <td>
                    <Link to={`/project-edit?id=${id}&projectID=${project.id}`}>
                      <i className="fa-solid fa-pen-to-square update"></i>
                    </Link>
                    <Link to={`/project-detail?id=${id}&projectID=${project.id}`}>
                      <i className="fa-solid fa-angles-right more"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
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
    </>
  );
};
