import { CardProps } from "../pages/dashboard/interface/types"
export const Card = ({ className, title, number, rate, info, type, logoname }: CardProps) => {
    return (
        <>
            <div className="dashboard-container">
                <div className="card-container">
                    <div className="client-card">
                        <div className="client-card-header">
                            <div className={`client-card-logo ${className}`}>
                                <i className={`logo-col ${logoname} `}></i>
                            </div>
                            <div className="client-card-title">
                                <h2>{title}</h2>
                                <h3>{number}</h3>
                            </div>
                        </div>
                        <div className="client-card-footer">
                            <h3> {info} <span> {rate} {type} </span>  </h3>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}