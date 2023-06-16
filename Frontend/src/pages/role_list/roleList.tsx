import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'
import { RoleListContent } from './roleListContent'

export const Role = () => {

  const [sidebarOpen , setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <> 
     <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '': 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick}  text='Role List'/> </div>
          <div className='board-div'><RoleListContent /></div>
        </div>
     </div>
    </>
  )
}