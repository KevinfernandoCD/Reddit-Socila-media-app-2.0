import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useData } from '../Context/Context';
import Community from './Community';
import Feed from './Feed';
import SideBar from './SideBar';

const Main = () => {

    const {isModalOpen,setIsModalOpen} = useData();
    
    return ( 

        <>
        <div className='flex flex-col lg:flex-row justify-center mt-10'>
            <ToastContainer/>
            <Feed/>
            <SideBar/>     
        </div>
          {isModalOpen && <Community/>}
        </>
     );
}
 
export default Main;