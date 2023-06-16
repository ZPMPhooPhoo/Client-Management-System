import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ContractData {
  contract: string;
  description: string;
  contract_date: string;
  quotation_id: string;
  contract_url: string | null;
}

export const ContractAll: React.FC = () => {
  const [contractData, setContractData] = useState<ContractData[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/contracts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        setContractData(response.data.data);
      })
      .catch((error: any) => {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      });
  }, [token]);

  function handleDownload(url: string, filename: string): void {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      });
  }

  return (
    <div>
      {contractData && contractData.length > 0 ? (
        contractData.map(contract => (
          <div key={contract.contract}>
            <p>Contract Description: {contract.description}</p>
            <p>Contract Date: {contract.contract_date}</p>
            <p>Quotation ID: {contract.quotation_id}</p>
            {contract.contract_url &&
              (contract.contract_url.toLowerCase().endsWith('.jpg') ||
                contract.contract_url.toLowerCase().endsWith('.jpeg') ||
                contract.contract_url.toLowerCase().endsWith('.png')) ? (
              <div>
                <img src={contract.contract_url} alt="Contract" />
                <button onClick={() => handleDownload(contract.contract_url!, contract.contract)}>
                  Download Image
                </button>
              </div>
            ) : (
              <button onClick={() => handleDownload(contract.contract_url!, contract.contract)}>
                Download Contract
              </button>
            )}
            <p className="error-message">{errMsg && errMsg}</p>
          </div>
        ))
      ) : (
        <p>No contracts available.</p>
      )}
    </div>
  );
};