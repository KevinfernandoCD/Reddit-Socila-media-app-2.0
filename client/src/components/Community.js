import React from 'react';
import BackDrop from './BackDrop';
import {AiFillCloseCircle,AiFillLock} from 'react-icons/ai';
import {useData} from '../Context/Context';
import {useState} from 'react';
import {FaUserAlt,FaRegEyeSlash} from 'react-icons/fa';
import {TiTick} from 'react-icons/ti';
import LoadAnimation from './LoadAnimation';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';


const Community = () => {

    const {setIsModalOpen,comHandler,setComHandler} = useData();

    const [communityMode,setCommunityMode] = useState('Public')

    const [name,setName] = useState('');

    const [adultMode,setAdultMode] = useState(false);

    const[loading,setLoading] = useState(false);

    const createCommunity = async() => {

        const userlogged = JSON.parse(localStorage.getItem("user"));

          const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        if(name !== '') {

            setLoading(true)

            try {

            const newCommunity =  await axios.post('http://localhost:5000/api/community/newcommunity',{comname:`r/${name}`,comtype:communityMode,adultmode:adultMode,userid:userlogged.id},config);

            console.log(newCommunity)

            setLoading(false);

             toast.success(`"${name}" new community has been created`, {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            setComHandler(!comHandler)

            setIsModalOpen(false)

            } catch (error) {

                console.log(error);

                setLoading(false)
                
            }
  
        }else{

             toast.error('Please give a community name', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            setLoading(false);

        }

    }

    return ( 
 
    <BackDrop>
    <ToastContainer/>
    <div className={`flex flex-col justify-start w-[550px] ${loading? 'h-[400px]':''}  p-1 bg-white rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2] modal animate-modalopen`}>
        {loading? <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'><LoadAnimation/></div>:<><div className='w-[500px] h-[40px] ml-4 py-2 border-b border-gray-300 flex justify-between modal'>
          <h4 className='text-md text-black modal'>Create Community</h4>
          <AiFillCloseCircle onClick={() => setIsModalOpen(false)} className='text-2xl cursor-pointer text-red-600 close'/>
       </div>

       <div className='w-full p-4 modal'>
           <h4 className='text-md text-gray-600 modal'>Name</h4>
           <p className='text-xs text-gray-400 modal'>Community names including capitalization cannot be changed.</p>
           <input maxLength={21} onChange={(e) => setName(e.target.value)} value={name} type='text' className='bg-gray-200 w-full p-2 rounded-md mt-5 modal' placeholder='r/'/>
            <p className='text-xs text-gray-400 mt-4 modal'>{21 - name.length} Characters remaining</p>
       <p className='text-xs text-red-500 mt-2 modal'>A community name is required</p>
       </div>
       <div className='flex flex-col justify-start p-3 space-y-3 modal'>
           <div className='flex justify-start space-x-3 modal'>
                <div onClick={() => setCommunityMode('Public')}  className={`${communityMode === 'Public'? 'bg-blue-500':'bg-white'} cursor-pointer border border-gray-400  rounded-full w-5 h-5 relative modal`}><div className='bg-white rounded-full w-2 h-2  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] modal'></div></div>
           <FaUserAlt className='text-gray-400 modal'/>
           <p className='font-medium text-gray-400 text-sm'>Public</p>
           <p className='text-xs text-gray-400 modal'>Anyone can view, post, and comment to this community</p>
           </div>
             <div className='flex justify-start space-x-3 modal'>
                <div onClick={() => setCommunityMode('Restricted')} className={`${communityMode === 'Restricted'? 'bg-blue-500':'bg-white'} cursor-pointer border border-gray-400  rounded-full w-5 h-5 relative modal`}><div className='bg-white rounded-full w-2 h-2  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] modal'></div></div>
           <FaRegEyeSlash  className='text-gray-400 modal'/>
              <p className='font-medium text-gray-400 text-sm modal'>Restricted</p>
             <p className='text-xs text-gray-400 modal'>Anyone can view this community, but only approved users can post</p>
           </div>
             <div className='flex justify-start space-x-3 modal'>
                <div onClick={() => setCommunityMode('Private')} className={`${communityMode === 'Private'? 'bg-blue-500':'bg-white'} cursor-pointer border border-gray-400  rounded-full w-5 h-5 relative modal`}><div className='bg-white rounded-full w-2 h-2  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] modal'></div></div>
           <AiFillLock  className='text-gray-400 modal'/>
           <p className='font-medium text-sm text-gray-400 modal'>Private</p>
           <p className='text-xs text-gray-400 modal'>Only approved users can view and submit to this community</p>
           </div>       
       </div>
       <div className='p-4 modal'>
           <h4 className='text-md font-medium modal'>Adult Content</h4>
           <div className='flex justify-start  space-x-3 modal  mt-3 modal'>
               <div onClick={() => setAdultMode(!adultMode)} className={`w-5 ${adultMode?'bg-blue-500':''} mt-[4px] relative bg-white border border-gray-400 h-5 rounded-sm modal cursor-pointer`}><TiTick className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white modal'/></div>
               <div  onClick={() => setAdultMode(!adultMode)} className='bg-red-500 p-1 rounded-sm text-white font-medium text-sm modal cursor-pointer modal'>NSFW</div>
               <p  onClick={() => setAdultMode(!adultMode)} className='modal font-medium cursor-pointer modal'>18+ year old community</p>
           </div>
       </div>
       <div className='bg-gray-300 w-full p-3 space-x-4 flex justify-end modal'>
           <button onClick={() => setIsModalOpen(false)} className='px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded-full border text-white font-medium'>Cancel</button>
           <button className='px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded-full border  text-white font-medium modal' onClick={createCommunity}>Create Community</button>
       </div></>}
    </div>
</BackDrop>


     );
}
 
export default Community ;