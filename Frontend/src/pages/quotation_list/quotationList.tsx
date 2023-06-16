import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'
import { QuotationListContent } from './quotationListContent';

export const QuotationList = () => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const handleBurgerClick = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <>
            <div className='pj-container'>
                <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
                <div className='content'>
                    <div> <Header clickHandler={handleBurgerClick} text="Projects" /> </div>
                    <div className='board-div'><QuotationListContent /></div>
                </div>
            </div>
        </>
    )
}