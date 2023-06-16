interface prjdataProps {
    category: string,
    status: string,
    description: string,
}
export const ProjectCard: React.FC<prjdataProps> = ({ category, status, description }) => {

    return (
        <>
            <div className="maincard_pro">
                <h1 className="pro_title_swit">
                    <span> CATEGORY --&gt; {category} &nbsp;</span>
                    <span className="cate_inproli">{status}</span>
                </h1>
                <p>{description}</p>
            </div>
            <hr />
        </>
    )
}