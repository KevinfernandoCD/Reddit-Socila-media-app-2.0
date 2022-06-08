import React from 'react';
import {useData} from '../Context/Context';
import axios from 'axios';


const CommunityHeader = () => {

   const {selectedCommunityObj} = useData();

   const userlogged = JSON.parse(localStorage.getItem("user"));

   const addtoCommunity = async(id) => {

   const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

      try {

         const addtocomm = await axios.post(`http://localhost:5000/api/community/addtocommunity/${id}`,{userId:userlogged.id},config)

           
      } catch (error) {

         console.log(error)
           
      }

   }
    const leaveCommunity = async(id) => {

   const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

      try {

         const addtocomm = await axios.post(`http://localhost:5000/api/community/removefromcommunity/${id}`,{userId:userlogged.id},config)

           
      } catch (error) {

         console.log(error)
           
      }

   }

    return ( 

        <div className='bg-blue-500 w-full h-40 relative z-[-1]'>
            <div className='w-full h-20 bg-white absolute bottom-0 '>
         <div className='rounded-full bg-white p-2  w-[70px] h-[70px]  absolute -top-10 left-[0%] lg:left-[20%] ml-2'>
            <img className='w-full h-full rounded-full border border-black' src='https://www.redditinc.com/assets/images/site/brand_header_mobile@3x.png'/>
         </div>
         <div className='absolute lg:left-[25%] top-6 pl-2 lg:top-0'>
         <h1 className='text-2xl  font-medium'>{selectedCommunityObj?.comname}</h1>
         <p className='text-sm text-gray-600'>r/{selectedCommunityObj?.comname}</p>
        </div>
        <div className='p-1 mt-3 bg-blue-500 absolute ml-40 md:ml-0 left-[25%] top-[30%] lg:top-0 lg:left-[40%] rounded-full w-[100px] flex items-center justify-center cursor-pointer hover:bg-blue-900'>
           {selectedCommunityObj?.members.includes(userlogged.id)?
           <button className='font-medium hover:bg-blue-900 cursor-pointer'onClick={() => leaveCommunity(selectedCommunityObj?._id)}>Leave</button>
          :<button className='font-medium hover:bg-blue-900 cursor-pointer'onClick={() => addtoCommunity(selectedCommunityObj?._id)}>Join</button>}
        </div>
        </div>       
      </div>
     );
}
 
export default CommunityHeader;