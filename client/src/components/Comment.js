import React from 'react';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import axios from 'axios';
import { useState } from 'react';


const Comment = ({comment}) => {

  const [likeHandler,setLikeHandler] = useState(false)

    const userlogged = JSON.parse(localStorage.getItem("user"));

    const likeComment = async(comid) => {


      if(!userlogged.likedcomments.includes(comid)) {

        try {

        const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

      const liked = await axios.post(`http://localhost:5000/api/post/likecomment/${userlogged.id}`,{type:'add',comid:comid},config)

      let userLikes = JSON.parse(localStorage.getItem("user"));

      setLikeHandler(!likeHandler)

      userLikes.likedcomments.push(comid)

      localStorage.setItem("user",JSON.stringify(userLikes));

      console.log(liked)

        
      } catch (error) {

        console.log(error)
        
      }

      }else{

         try {

        const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

      const liked = await axios.post(`http://localhost:5000/api/post/likecomment/${userlogged.id}`,{type:'remove',comid:comid},config)

      setLikeHandler(!likeHandler)

      let userLikes = JSON.parse(localStorage.getItem("user"));

      userLikes = {...userLikes,likedcomments:userLikes.likedcomments.filter(c => c !== comid)}

      localStorage.setItem("user",JSON.stringify(userLikes));

      console.log(liked)

        
      } catch (error) {

        console.log(error)
        
      }

      }

    }


    return ( <div onDoubleClick={() => likeComment(comment._id)} className='mt-5 text-white bg-gray-800 w-[300px] rounded-lg flex justify-between p-2 cursor-pointer'>
<div className='flex justify-start items-center'>
  <img className='w-8 h-8 bg-white rounded-full' src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'/>
<div className='flex flex-col justify-start ml-3'>
 <h4 className=' font-medium'>{comment.user == userlogged.username?"You":comment.user}</h4>
 <p className='text-gray-300 text-sm'>{comment.comment}</p>
  </div>
</div>

 {userlogged.likedcomments && userlogged.likedcomments.includes(comment._id)?<AiFillHeart className='text-red-500 cursor-pointer animate-liking'/>:<AiOutlineHeart className='text-white cursor-pointer'/>}
      
       
    </div> );
}
 
export default Comment;