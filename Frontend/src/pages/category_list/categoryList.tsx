import { CategoryListContent } from './categoryListContent'

import { Header } from '../../layout/header.layout'
import { useState } from 'react'
import { Sidebar } from '../../layout/sidebar.layout';

const Category = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);


  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='Category List' /> </div>
          <div className='board-div'><CategoryListContent /></div>
        </div>
      </div>
    </>
  )
}

export default Category;