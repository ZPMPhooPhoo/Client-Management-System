import { UserListContent } from './userListContent'
import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState, useEffect } from 'react'

export const UserList = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='User List' /> </div>
          <div className='board-div'><UserListContent /></div>
        </div>

      </div>
    </>
  )
}