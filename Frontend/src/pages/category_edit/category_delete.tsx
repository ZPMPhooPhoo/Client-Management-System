import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const CategoryDelete = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [errors, setErrors] = useState<any>({});
  const [errMsg, setErrMsg] = useState<string>('');
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const deleteCategory = async () => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        }), navigate("/services");
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      }
    };

    deleteCategory();
  }, [categoryId, token]);

  return (
    <>
    </>
  );
};