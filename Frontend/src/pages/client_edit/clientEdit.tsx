import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'
import { ClientEditContent } from './clientEditContent';

export const ClientEdit = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='Client Edit' /> </div>
          <div className='board-div'><ClientEditContent /></div>
        </div>
      </div>
    </>
  )
}