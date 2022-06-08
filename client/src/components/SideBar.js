import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useData} from '../Context/Context';

const SideBar = () => {

    const history = useNavigate();

    const {setIsModalOpen,communities,setCommunities,setSelectedCommunityObj,setSelectedCom} = useData();

    const userlogged = JSON.parse(localStorage.getItem("user"));

    return (

        <div className='hidden lg:inline bg-transparent w-[300px] ml-10 rounded-half'>
            <div className='w-full bg-white shadow-lg'>
                <div className=''>
                    <img className='' src='https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2019/06/whats-reddit-premium.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5'/>
                    <h2 className=' font-medium ml-2 text-md top-[100%] text-gray-800'>Top Communities</h2>
                </div>
                {communities && communities !== 'No communities available'? communities.map(com => <div onClick={() => setSelectedCom(com._id)} className='flex w-full p-3 font-medium hover:bg-gray-300 cursor-pointer justify-start items-center'><img className='w-8 h-8 mr-4 rounded-full' src='https://www.redditinc.com/assets/images/site/brand_header_mobile@3x.png'/>{com.comname} {com.members.includes(userlogged.id)?<div className='border border-blue-500 rounded-md text-blue-500 ml-4 px-3 py-1'>Joined</div>:null}</div>):null}
            </div>     
            <div className='mt-10 flex flex-col justify-center items-center'>
                <div className='flex justify-center items-center bg-white rounded-sm shadow-lg px-4 py-2'>
                    <img className='w-10 h-10 rounded-full' src='https://preview.redd.it/veuemg4c8q171.jpg?width=960&crop=smart&auto=webp&s=e8485920611945005ef404cbee4ba18c725a4535'/>
                    <div className='flex flex-col justify-start ml-2'>
                        <h1 className='text-xs font-medium'>Reddit Premium</h1>
                        <p className='text-xs'>The best Reddit experience, with monthly Coins</p>
                    </div>    
                </div>
                <button className='p-2 w-full font-medium bg-orange-500 hover:bg-orange-600'>Try Now</button>
            </div>
            <div className='mt-10 bg-white w-full flex flex-col shadow-lg'>
                <div className='w-full  relative bg-white'>
                    <div className='relative w-full h-[50px] bg-white'>
                        <img className='z-[0] absolute h-full w-full object-cover' src='https://img.freepik.com/free-vector/planets-outer-space-with-satellites-meteors-illustration_33099-2352.jpg?t=st=1654265821~exp=1654266421~hmac=cb4aa220f28e132353d622d834db2a501417eeaa87bd9693b2deacfa68b5ca08&w=1380'/>
                    </div>
                    <div className='flex'>
                        <img className='w-14 h-14 -mt-3 z-[1]' src='https://styles.redditmedia.com/t5_4hb2c3/styles/profileIcon_loomzi2oh9171.png?width=256&height=256&crop=256:256,smart&s=65f2ff3a63079738badebd4c63b579798c5ec71e'/>
                          <h4 className='text-black text-lg mt-4'>Home</h4>
                    </div>
                    <p className='p-3 text-gray-600 text-sm'>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
                <div className='flex flex-col w-full justify-center items-center'>
                    <button className='w-full bg-blue-600 p-2 text-white font-medium hover:bg-blue-800' onClick={() => history('/submit')}>Create Post</button>
                    <button className='w-full bg-gray-200 p-2 font-medium hover:bg-gray-300' onClick={() => setIsModalOpen(true)}>Create Community</button>
                </div>           
                </div>
            </div>
            <div className='w-full bg-white flex flex-col justify-center items-center  shadow-lg mt-10'>
                <div className='w-[280px] grid grid-cols-2 p-3  mt-10 border-b border-gray-400'>         
                    <div className='flex flex-col justify-start px-5'>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Help</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Rediit Coins</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Reddit Premium</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Communities</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Topics</p>
                    </div>
                   <div className='flex flex-col justify-start px-6'>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>About</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Careers</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Press</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Advertise</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Blog</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Terms</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Content Policy</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Privacy Policy</p>
                        <p className='text-xs cursor-pointer text-gray-500 mt-3'>Mod Policy</p>
                    </div>
                </div>
                <div className='flex space-x-16 p-5 border-b border-gray-500 w-[280]'>
                    <p className='text-xs text-black'>USA/Global</p>
                    <p className='text-xs text-black'>Deutsch</p>
                </div>
                 <div className='flex space-x-16 p-5  w-[280]'>
                    <p className='text-xs text-black'>Reddit Inc © 2022. All rights reserved</p>     
                </div>
            </div>
        </div>
     );
}
 
export default SideBar;