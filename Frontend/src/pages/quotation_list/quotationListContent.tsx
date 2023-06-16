import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';
import { Checkbox } from '../../components/checkbox';

export const QuotationListContent: React.FC = () => {
  const [errMsg, setErrMsg] = useState<string>('');
  const [quotation, setQuotation] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [is_agree, setIsAgree] = useState(false);
  const [quotation_date, setQuotationDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckbox, setIsCheckbox] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const location = useLocation();
  const searchID = new URLSearchParams(location.search);
  const customerID = searchID.get("id");
  const id = searchID.get("projectID")?.toString();
  let pj_id = 0;
  if (id !== undefined) {
    pj_id = parseInt(id);
  } else {
    pj_id = 0;
  }
  const [project_id, setProjectId] = useState<number>(pj_id);

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    if (!quotation) {
      errors.quotation = 'Please select a file.*';
    }

    if (!description) {
      errors.description = 'Please enter a description.*';
    }

    if (!quotation_date) {
      errors.quotation_date = 'Please select a date.*';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const token = localStorage.getItem("token");

    const quotationFormData = new FormData();
    quotationFormData.append("quotation", quotation as File);
    quotationFormData.append("description", description);
    quotationFormData.append("is_agree", String(is_agree));
    quotationFormData.append("quotation_date", quotation_date);
    quotationFormData.append("project_id", String(project_id));

    axios.post("http://127.0.0.1:8000/api/quotations", quotationFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        const Q_ID = response.data.data;
        if (isCheckbox) {
          localStorage.setItem("project_id", `${project_id}`);
          navigate(`/contract-create?id=${customerID}&quotation_ID=${Q_ID}`)
        } else {
          navigate(`/client-project-lists?id=${customerID}`)
        }
      })
      .catch((error: any) => {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setQuotation(file || null);
  };

  if (isLoading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A QUOTATION</h1>
          <div className="form-wrap">
            <form onSubmit={handleSubmit}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <input type="file" onChange={handleFileChange} />
                  {validationErrors.quotation && (
                    <p className="error">{validationErrors.quotation}</p>
                  )}
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e: any) => setDescription(e.target.value)}
                    id="description"
                    name="description"
                    type="textarea"
                    value={description}
                    placeholder="Enter Quotation Description"
                  />
                  {validationErrors.description && (
                    <p className="error">{validationErrors.description}</p>
                  )}
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <input
                    type="date"
                    id="quotation_date"
                    value={quotation_date}
                    onChange={(e: any) => setQuotationDate(e.target.value)}
                  />
                  {validationErrors.quotation_date && (
                    <p className="error">{validationErrors.quotation_date}</p>
                  )}
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <div style={{paddingLeft:"25px", fontWeight:"500", margin:"10px"}}>
                    <Checkbox
                      checked={isCheckbox}
                      label="Is Agree?"
                      className="maintenence"
                      name="checkbox"
                      onChange={setIsCheckbox}
                    />
                    {/* <Checkbox className="maintenence" name="checkbox" checked={isCheckbox} onChange={setIsCheckbox} label={""} />
                  <Label htmlFor="checkbox" text="Is Agree?" /> */}
                  </div>
                  
                </div>
                <p className="error-message">{errMsg && errMsg}</p>
              </div>
              <div className="allbtn">
                <Button type="submit" className="button" text="ADD" />
                <Link to={`/client-project-lists?id=${customerID}`}>
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