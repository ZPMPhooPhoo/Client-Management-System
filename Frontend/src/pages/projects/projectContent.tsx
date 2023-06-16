import { useState, useEffect } from 'react';
import { Checkbox } from '../../components/checkbox';
import axios from 'axios';

export const ProjectContent = () => {
  const [activeChecked, setActiveChecked] = useState<boolean>(false);
  const [unactiveChecked, setUnactiveChecked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const handleActiveChange = (checked: boolean) => {
    setActiveChecked(checked);
  };

  const handleUnactiveChange = (checked: boolean) => {
    setUnactiveChecked(checked);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.data);
        setLoading(false);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  let totalItems = projects.length == 0 ? 1 : projects.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
      <div className="table-wrap" style={{ width: '97%' }}>
        <div className="table-bar">
          <div className="pro_listincliinfo">
            <span className="material-symbols-outlined">
              folder_open
            </span>
            <p>All Projects</p>
          </div>
        </div>

        <table className="pj-table">
          <thead className="table-header">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Maintenance Active</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5}>No Projects Found</td>
              </tr>
            ) :
              (Array.isArray(projects) &&
                currentItems.map((project, index) => {
                  const rowNumber = (currentPage - 1) * perPage + index + 1;
                  return (
                    <tr key={project.id}>
                      <td>{rowNumber}</td>
                      <td>{project.title}</td>
                      <td className="td-category">
                        {project.category.category}
                      </td>
                      <td>{project.status}</td>
                      <td>
                        {project.maintenance_active
                          ? 'Under Maintenance'
                          : 'No More Active'}
                      </td>
                    </tr>
                  );
                })
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
