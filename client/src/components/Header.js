import React from 'react';
import { AiFillHome,AiOutlineGlobal,AiOutlineReddit} from 'react-icons/ai';
import {BsChevronDown,BsMailbox2,BsArrowUpRightCircleFill,BsFillCameraVideoFill,BsFillChatDotsFill,BsBellFill,BsSearch,BsFillCaretDownFill} from 'react-icons/bs';
import {GrAdd} from 'react-icons/gr';
import { useState,useEffect,useRef } from 'react';
import {FaMailBulk} from 'react-icons/fa';
import {RiCommunityFill} from 'react-icons/ri';
import {MdAddModerator} from 'react-icons/md';
import {FcAdvertising} from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import CommunityHeader from './CommunityHeader';
import { useData } from '../Context/Context';

const Header = () => {

   const [openDropDown,setOpenDropDown] = useState(false);
   const [loggedUser,setLoggedUser] = useState();
   const [moderator,setModerator] = useState(false);

   const {selectedCom,setSelectedCom,setIsModalOpen,communities} = useData();

   const history = useNavigate();

   useEffect(() => {

      const user = JSON.parse(localStorage.getItem("user"));

      if(!user){

         history('/login')

      }else{

         setLoggedUser(user);
      }

   },[localStorage]);

   useEffect(() => {

      if(communities !== 'No communities available' && communities) {

         communities.map(community => community.moderator == userlogged.id? setModerator(true):null)

      }

   },[communities])

   const logout = () => {

      localStorage.removeItem("user");

      history('/login')
   }

   const reset = () => {

      history('/home');
      setSelectedCom("all");
   }

   const userlogged = JSON.parse(localStorage.getItem("user"));

    return ( 
       <>
        <header className='w-full h-[50px] bg-white  relative px-3 pt-2 dark:text-white absolute z-1'>
           <div className='flex '>
            <img onClick={reset} className=' w-[100px] h-[35px] cursor-pointer' src='https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Reddit_logo_new.svg/2560px-Reddit_logo_new.svg.png'/>
            <div className={`ml-3 px-5 py-2  w-[250px]  flex flex-col z-1 transition-all duration-300 ${openDropDown? 'shadow-lg bg-white':''}`}>
            <button onClick={() => setOpenDropDown(!openDropDown)} className=' flex  focus:outline-none  space-x-10 rounded-sm h-[35px]'><AiFillHome className='-mt-[3px] text-2xl'/><p className='hidden md:text-sm md:font-medium md:inline'>Home</p><BsChevronDown className='text-sm mt-1 font-medium'/></button> 
           {openDropDown && <input type='text' placeholder='Filter'  className='bg-gray-200 focus:outline-none w-[220px] p-1 mt-4 hover:bg-white hover:border hover:border-blue-500 text-sm focus:border focus:border-blue-500 focus:bg-white'/>}
           {/*MODERATING SECTION*/}

         {openDropDown && moderator? <div>
           <p className='text-[10px] text-gray-500 p-2'>MODERATING</p> 
           <div className='flex items-center cursor-pointer hover:bg-gray-100 py-2 w-full px-2 text-sm'><FaMailBulk className='mr-2 text-lg'/>Mod Queue</div>
            <div className='flex items-center cursor-pointer hover:bg-gray-100 py-2 w-full px-2 text-sm'><BsMailbox2 className='mr-2 text-lg'/>Modmail</div>
            <div className='flex items-center cursor-pointer hover:bg-gray-100 py-2 w-full px-2 text-sm'><FaMailBulk className='mr-2 text-lg'/>r/Mod</div>
           </div>:null}

           {openDropDown && moderator? communities.map(c => c.moderator == userlogged.id?  <div onClick={() => setSelectedCom(c._id)} className='flex items-center cursor-pointer hover:bg-gray-100 py-2 w-full px-2 text-sm font-medium'><img src='https://www.redditinc.com/assets/images/site/brand_header_mobile@3x.png' className='w-8 h-8 rounded-full border border-black mr-3'/>{c.comname}</div>:null):null}
          
            
          {/*CREATE COMMUNITY AND NAV LINK SECTION */}  
          {openDropDown && <><small className='text-[10px] text-gray-500 mt-3 px-2'>MY COMMUNITIES</small>
            <button onClick={() => setIsModalOpen(true)} className='mt-3 text-sm flex items-center hover:bg-gray-100  w-full py-2 px-1'><GrAdd className='mr-2'/>Create Community</button></>}
            {openDropDown && communities !== 'No communities available' && communities? communities.map(com => com.members.includes(userlogged.id)? <div onClick={() => setSelectedCom(com._id)} className='flex items-center cursor-pointer hover:bg-gray-100 py-2 w-full px-2 text-sm font-medium'><img src='https://www.redditinc.com/assets/images/site/brand_header_mobile@3x.png' className='w-8 h-8 rounded-full border border-black mr-3'/>{com.comname}</div>:null):null}

           {openDropDown && <><p className='text-[10px] text-gray-500 p-2'>FEED</p>
            <button  onClick={reset} className='p-2 flex items-center hover:bg-gray-100 w-full'><AiFillHome className='mr-2 text-lg'/>Home</button>
             <button className='p-2 flex items-center hover:bg-gray-100'><BsArrowUpRightCircleFill className='mr-2 text-lg'/>Popular</button>
              <button className='p-2 flex items-center hover:bg-gray-100'><AiOutlineGlobal className='mr-2 text-lg'/>All</button>
               <button className='p-2 flex items-center hover:bg-gray-100'><BsFillCameraVideoFill className='mr-2 text-lg'/>Reddit Live <div className='bg-red-600 rounded-full p-1 ml-3 mt-1'></div></button></>}
               {openDropDown && <>
               <p className='text-[10px] text-gray-500 p-2'>OTHER</p>
               <button className='p-2 flex items-center hover:bg-gray-100 w-full' onClick={() => history('/submit')}><GrAdd className='mr-2 text-lg'/>Create Post</button>
               <button className='p-2 flex items-center hover:bg-gray-100 w-full'><RiCommunityFill className='mr-2 text-lg'/>Top Communities</button>
               <button className='p-2 flex items-center hover:bg-gray-100 w-full'><AiOutlineReddit className='mr-2 text-lg'/>User Settings</button>
               <button className='p-2 flex items-center hover:bg-gray-100 w-full'><BsFillChatDotsFill className='mr-2 text-lg'/>Messages</button>
               <button className='p-2 flex items-center hover:bg-gray-100 w-full'><BsBellFill className='mr-2 text-lg'/>Notifications</button>
               </>}
            </div>
            <div className='flex items-center bg-gray-100 w-[150px] md:w-[300px] lg:w-[600px] h-[38px] rounded-sm border border-gray-300 focus-within:border focus-within:border-blue-400'>
               <BsSearch className='ml-2 text-gray-400'/>
                <input type='text' placeholder='Search Reddit' className='bg-gray-100 w-full ml-2 text-sm focus:outline-none '/>
            </div>
            <div className='hidden  lg:flex border-r h-[38px] space-x-6 px-5'>
            <div className='flex flex-col items-center ml-4 cursor-pointer px-2 '><BsArrowUpRightCircleFill className='text-3xl'/><p className='text-xs font-medium'>Popular</p></div>
            <div className='flex flex-col items-center ml-4 cursor-pointer px-2 '><AiOutlineGlobal className='text-3xl'/><p className='text-xs font-medium'>All</p></div>
            <div className='flex flex-col items-center ml-4 cursor-pointer px-2 '><BsFillCameraVideoFill className='text-3xl'/><p className='text-xs font-medium'>Live</p></div>
           </div>
           <div className='hidden  lg:flex border-r h-[38px] space-x-6 px-5'>
              <div className='flex flex-col items-center ml-4 cursor-pointer px-2 '><MdAddModerator className='text-3xl'/><p className='text-xs font-medium'>Moderator</p></div>
              <div className='flex flex-col items-center ml-4 cursor-pointer px-2 '><BsFillChatDotsFill className='text-3xl'/><p className='text-xs font-medium'>Chat</p></div>
              <div className='flex flex-col items-center ml-4 cursor-pointer px-2 '><BsBellFill className='text-3xl'/><p className='text-xs font-medium'>Notifications</p></div>
              <div className='flex flex-col items-center ml-4 cursor-pointer px-2 ' onClick={() => history('/submit')}><GrAdd className='text-3xl'/><p className='text-xs font-medium'>Create Post</p></div>
              <div className='flex flex-col items-center ml-4 cursor-pointer px-2 '><FcAdvertising className='text-3xl'/><p className='text-xs font-medium'>Advertise</p></div>
           </div>
           <div className='flex border border-gray-400 w-[150px] ml-5 rounded-md h-[45px] py-2 cursor-pointer hover:bg-black/20 transition-all duration-300 justify-center' onClick={logout}>
              <img className='w-10 h-10' src='https://styles.redditmedia.com/t5_4hb2c3/styles/profileIcon_loomzi2oh9171.png?width=256&height=256&crop=256:256,smart&s=65f2ff3a63079738badebd4c63b579798c5ec71e'/>
              <p className='hidden md:inline text-gray-500 text-sm mt-1 text-center'>{loggedUser?.username}</p>
              <div className='bg-green-600  rounded-full w-2 h-2 mt-2 ml-2'></div>
           </div>
           </div>                   
        </header>
        {selectedCom == "all"?null:<CommunityHeader/>}  
        </>
     );
}
 
export default Header;