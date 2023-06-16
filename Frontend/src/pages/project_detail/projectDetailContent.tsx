import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { ProjectCard } from "./projectCard"
import { useLocation } from "react-router-dom";
import axios from "axios";
interface Pjdata {
    [x: string]: any;
    id: number,
    title: string
}

interface pj_pass_data {
    category: string,
    status: string,
    description: string,
    developer_names: []
}

export const ProjectDetailContent: React.FC<pj_pass_data> = ({ }) => {
    const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);
    const [showContractModal, setShowContractModal] = useState<boolean>(false);
    const [isQuotationsEmpty, setIsQuotationsEmpty] = useState<boolean>(false);
    const [isContractsEmpty, setContractsEmpty] = useState<boolean>(false);
    const [QuotationData, setQuotationData] = useState<any[]>([]);
    const [ContractAllData, setContractAllData] = useState<any[]>([]);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [error, setError] = useState<string | undefined>();
    const [errMsg, setErrMsg] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pjdata, setPjdata] = useState<Pjdata>();
    const [devData, setDevData] = useState<[]>([]);
    const token = localStorage.getItem("token");
    const location = useLocation();
    const searchID = new URLSearchParams(location.search);
    const id = searchID.get("id");
    const projectID = searchID.get("projectID");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/projects/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const newResponse = await axios.get(
                    `http://127.0.0.1:8000/api/developerproject/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const quotationResponse = await axios.get(`
                    http://127.0.0.1:8000/api/quotations/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const contractResponse = await axios.get(`
                    http://127.0.0.1:8000/api/contract-quotations/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );
                if (contractResponse.data.data.length === 0) {
                    setContractsEmpty(true)
                } else {
                    setContractAllData(contractResponse.data.data)
                }
                if (quotationResponse.data.data.length === 0) {
                    setIsQuotationsEmpty(true);
                } else {
                    setQuotationData(quotationResponse.data.data);
                }
                setPjdata(response.data.data)
                setDevData(newResponse.data.data)
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
        return <div>We are having trouble when fetching data. Please try again later.</div>;
    }
    QuotationData.map((item: any) => {

    })
    const handleQModalClose = () => {
        setShowQuotationModal(false);
    };

    const handleQModalOpen = () => {
        setShowQuotationModal(true);
    };
    const handleCModalClose = () => {
        setShowContractModal(false);
    };

    const handleCModalOpen = () => {
        setShowContractModal(true);
    };


    const toggleAccordion = (index: number) => {
        if (index === expandedIndex) {
            setExpandedIndex(-1);
        } else {
            setExpandedIndex(index);
        }
    };
    let Cusname = "";
    devData.map((cus: any) => {
        if (cus.role_id == 5) {
            Cusname = cus.name;
        }
    });

    const category = pjdata?.category.category;
    const status = pjdata?.status;
    const description = pjdata?.description;

    const handleDownload = async (url: string, fileName: string) => {
        try {
            const response = await axios.get(url, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', fileName);
            link.click();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    const filteredAllContracts = ContractAllData.filter((contract: any) => contract.contract_url !== null);
    const filteredContracts = filteredAllContracts.map((c: any) => c.contract);
    const assignedDev = devData.filter((dev: any) => dev.role_id !== '5');
    return (

        <>
            <div className="mainclientls" >
                <div className="clils">
                    <div className="maincliproli">
                        <div className="Addproject">
                            <div className="pro_listincliinfo">
                                <Link to={`/client-project-lists?id=${id}`}><i className="fa-solid fa-chevron-left"></i></Link>
                                <span className="material-symbols-outlined">
                                    person
                                </span>
                                <p>{Cusname} / &nbsp; </p>
                                <p>{pjdata && pjdata.title}</p>
                            </div>
                        </div>
                        <div className="procard">

                            <div className="leftcard_pro">
                                <ProjectCard category={category} status={status} description={description} />
                                <div className="assigned-dev">
                                    <h3>ASSIGNED DEVELOPERS FOR THIS PROJECT</h3>
                                    <ul>
                                        {
                                            assignedDev.map((devName: any) =>
                                                <li key={devName.id}> {devName.name} </li>
                                            )
                                        }
                                    </ul>

                                </div>
                                <div className="modal-btn">
                                    <button onClick={handleQModalOpen}>Quotations </button>
                                    <button onClick={handleCModalOpen}>Contracts </button>
                                </div>
                            </div>
                            <div className="right_card_category">
                                <div className="category_list">
                                    <h1>Report</h1>
                                    <h2> {pjdata && pjdata.title} </h2>
                                    <h3>Number Of Quotations:  <span>{QuotationData.length}</span> </h3>
                                    <h3>Number Of Contracts:  <span>{filteredAllContracts.length}</span> </h3>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showQuotationModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            {isQuotationsEmpty ? (
                                <div>No quotations are added for this project.</div>
                            ) : (
                                <div className="accordion">
                                    {QuotationData.map((quotation: any, index: number) => (
                                        <div className="accordion-item" key={index}>
                                            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                                <h3> Quotation_{index + 1} </h3>
                                                <span className={expandedIndex === index ? "accordion-icon expanded" : "accordion-icon"}>
                                                    {expandedIndex === index ? "\u25BC" : "\u25B6"}
                                                </span>
                                            </div>
                                            {expandedIndex === index && (
                                                <div className="accordion-content">
                                                    <small>{quotation.quotation_date}</small>
                                                    <p>{quotation.description}</p>
                                                    <div>
                                                        {quotation.quotation_url &&
                                                            (quotation.quotation_url.toLowerCase().endsWith('.jpg') ||
                                                                quotation.quotation_url.toLowerCase().endsWith('.jpeg') ||
                                                                quotation.quotation_url.toLowerCase().endsWith('.png')) ? (
                                                            <div>

                                                                <button className="down-btn" onClick={() => handleDownload(quotation.quotation_url!, quotation.quotation)}>
                                                                    <i className="fa-solid fa-file-arrow-down download"></i>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button className="down-btn" onClick={() => handleDownload(quotation.quotation_url!, quotation.quotation)}>
                                                                <i className="fa-solid fa-file-arrow-down download"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="btn-gp">
                                <button onClick={handleQModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showContractModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            {isContractsEmpty ? (
                                <div>No contracts are added for this project.</div>
                            ) : (
                                <div className="accordion">
                                    {filteredAllContracts.map((contract: any, index: number) => (
                                        <div className="accordion-item" key={index}>
                                            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                                <h3> Contract_{index + 1} </h3>
                                                <span className={expandedIndex === index ? "accordion-icon expanded" : "accordion-icon"}>
                                                    {expandedIndex === index ? "\u25BC" : "\u25B6"}
                                                </span>
                                            </div>
                                            {expandedIndex === index && (
                                                <div className="accordion-content">
                                                    <small>{contract.contract.contract_date}</small>
                                                    <p>{contract.contract.description}</p>
                                                    <div>
                                                        {contract.contract_url &&
                                                            (contract.contract_url.toLowerCase().endsWith('.jpg') ||
                                                                contract.contract_url.toLowerCase().endsWith('.jpeg') ||
                                                                contract.contract_url.toLowerCase().endsWith('.png')) ? (
                                                            <div>

                                                                <button className="down-btn" onClick={() => handleDownload(contract.contract_url!, contract.contract.contract)}>
                                                                    <i className="fa-solid fa-file-arrow-down download"></i>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button className="down-btn" onClick={() => handleDownload(contract.contract_url!, contract.contract.contract)}>
                                                                <i className="fa-solid fa-file-arrow-down download"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="btn-gp">
                                <button onClick={handleCModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}




        </>
    )
}
