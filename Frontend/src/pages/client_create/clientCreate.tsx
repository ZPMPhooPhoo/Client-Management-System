import { ClientCreateContent } from './clientCreateContent'
import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useEffect, useState } from 'react'

export const ClientCreate = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }
  if (isLoading) {
    return <div className="c-width"><p className="loading"></p></div>
  }
  return (
    <>
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='Client Create' /> </div>
          <div className='board-div'><ClientCreateContent /></div>
        </div>
      </div>
    </>
  )
}