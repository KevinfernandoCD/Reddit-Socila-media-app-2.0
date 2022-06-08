import React from 'react';
import Header from './Header';
import Main from './Main';
import { ToastContainer } from 'react-toastify';
import { useData } from '../Context/Context';


const Home = () => {

    const {isModalOpen} = useData();

    return ( <div className={`${isModalOpen?'h-[100vh] overflow-hidden scroll-y-none':''}`}>
         <ToastContainer/>
        <Header/>
        <Main/>
    </div>);
}
 
export default Home;