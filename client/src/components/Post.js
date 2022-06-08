import React from 'react';
import TimeAgo from 'react-timeago';
import {FaTrashAlt} from 'react-icons/fa';
import {BsFillArrowUpCircleFill,BsFillArrowDownCircleFill} from 'react-icons/bs';
import axios from 'axios';
import {toast} from 'react-toastify';
import {BiCommentDetail} from 'react-icons/bi';
import {FaShareAlt} from 'react-icons/fa';
import { useState } from 'react';
import {useData} from '../Context/Context';
import Comment from './Comment';

const Post = ({post,getPosts}) => {

    const [commentBar,setCommentBar] = useState(false)

    const {selectedPost,setSelectedPost} = useData();

    const [comment,setComment] = useState('');

    const userlogged = JSON.parse(localStorage.getItem("user"));

    const deletePost = async(postid) => {

     const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        try {
        const deletedPost = await axios.put(`http://localhost:5000/api/post/deletepost/${postid}`,config);

        toast.success('Post Removed', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            getPosts();
            
        } catch (error) {

            console.log(error)
            
        }
    }

    const voteup = async(postid) => {

        const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        try {

        const vote = await axios.post(`http://localhost:5000/api/post/voteup/${postid}`,{userid:userlogged.id},config)

        let updateUser = JSON.parse(localStorage.getItem("user"))

        updateUser.likedposts.push(postid)

        localStorage.setItem("user",JSON.stringify(updateUser))

        getPosts();
            
        } catch(error) {

            console.log(error)

        }     

    }

    const voteDown = async(postid) => {

         const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        try {

        const vote = await axios.post(`http://localhost:5000/api/post/votedown/${postid}`,{userid:userlogged.id},config)

        let updateUser = JSON.parse(localStorage.getItem("user"))

        updateUser = {...updateUser,likedposts:updateUser.likedposts.filter(id => id !== postid)}    

        localStorage.setItem("user",JSON.stringify(updateUser))

        getPosts();
            
        } catch(error) {

            console.log(error)

        }     

    }

    const postComment = async(e,postid) => {

        if(e.keyCode == 13){

            if(comment !== ''){

            const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

            try {

            const commentObj = {comment:comment,user:userlogged.username,postedat:new Date(),likes:0}   

            const postcomment = await axios.post(`http://localhost:5000/api/post/createcomment/${postid}`,{commentObj},config);

            console.log(postcomment.data)

            getPosts();

            setComment('');

             toast.success('Comment added', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
                
            } catch (error) {

                console.log(error)
                
            }
   
        }


        }
      
    }

    return ( 

        <div className='bg-white shadow-lg rounded-md w-[400px] md:w-[850px] lg:w-[500px] mt-6'>
            <div className='bg-gray-200 w-full  p-2'>
                <div className='flex justify-between w-full items-center'>
                <h2 className='font-medium text-lg'>{post?.posttitle}</h2>
                <p className='text-gray-600 text-sm'>Votes {post?.votes}</p>
            </div>
            <h3 className='text-gray-600 text-sm font-thin cursor-pointer hover:underline'>Created by {post?.createdby?._id === userlogged?.id? 'You':post?.createdby?.username}</h3>
            <p className='text-gray-600 text-xs font-thin cursor-pointer'><TimeAgo date={post.uploadtime}/></p>
            {post?.posttype == 'text' && <div className='text-sm mt-2 font-medium'>{post?.post}</div>}
            {post?.posttype == 'image' && <img className='mt-2 rounded-sm' src={post?.post}/>}
            {post?.posttype == 'link' && <a className='text-blue-500 mt-2 hover:underline' href={post?.post}>{post?.post}</a>}
        
        <div className='flex justify-evenly items-center'>{post?.createdby?._id === userlogged?.id?
            
            <><button onClick={() => deletePost(post?._id)} className='px-6 mt-3 py-2 font-medium hover:bg-red-300 transition-all duration-300 rounded-sm focus:outline-none  border-r w-full border-gray-400 flex justify-center items-center'><FaTrashAlt className='mr-2'/> Delete</button>   
            
            {userlogged.likedposts.includes(post._id)?<button onClick={() => voteDown(post._id)} className='px-6 mt-3 py-2 font-medium bg-orange-600 transition-all duration-300 focus:outline-none rounded-sm w-full  border-r flex justify-center items-center'><BsFillArrowDownCircleFill className='mr-2'/> Vote Down</button>
            :<button onClick={() => voteup(post._id)} className='px-6 mt-3 py-2 font-medium hover:bg-blue-600  transition-all duration-300  rounded-sm w-full focus:outline-none  border-r border-gray-400 flex justify-center items-center'><BsFillArrowUpCircleFill className='mr-2'/> Vote</button>}    
            <button onClick={() => setCommentBar(!commentBar)} className='px-6 mt-3 py-2 font-medium rounded-sm w-full focus:outline-none hover:bg-gray-600 transition-all duration-300 flex justify-center items-center'><BiCommentDetail className='mr-2'/> Comment</button></>: 
            
            <><button className='px-6 mt-3 py-2 w-full rounded-sm  border-r focus:outline-none border-gray-600 transition-all duration-300 flex justify-center items-center hover:bg-black hover:text-white'><FaShareAlt className='mr-2'/>Share</button>
           {userlogged.likedposts.includes(post._id)?<button onClick={() => voteDown(post._id)} className='px-6 mt-3 py-2 font-medium focus:outline-none bg-orange-600 transition-all duration-300  rounded-sm w-full  border-r flex justify-center items-center'><BsFillArrowDownCircleFill className='mr-2'/> Vote Down</button>
            :<button onClick={() => voteup(post._id)} className='px-6 mt-3 py-2 font-medium focus:outline-none hover:bg-blue-600 transition-all duration-300  rounded-sm w-full  border-r border-gray-400 flex justify-center items-center'><BsFillArrowUpCircleFill className='mr-2'/> Vote</button>}    
            <button onClick={() => setCommentBar(!commentBar)} className='px-6 mt-3 py-2 font-medium rounded-sm w-full focus:outline-none hover:bg-gray-600 transition-all duration-300 flex justify-center items-center'><BiCommentDetail className='mr-2'/> Comment</button></>}</div>
        </div>

          {commentBar && <div className='w-full p-2 bg-white'>

              <div>
                  <h4 className='font-medium text-lg'>Comments</h4>
                <div className='flex justify-start items-center space-x-3 mt-4'>
                  <img src='https://cdns.iconmonstr.com/wp-content/releases/preview/2016/240/iconmonstr-reddit-4.png' className='w-10 h-10'/>
                  <input value={comment} onKeyDown={(e) => postComment(e,post._id)} type='text' onChange={(e) => setComment(e.target.value)} className='bg-gray-200 w-full p-2 rounded-sm focus:outline-none' placeholder='Add a comment...'/>
                </div> 
                {post.comments && post.comments.length !== 0? post.comments.map(c => <Comment comment={c}/> ):<div className='font-medium mt-4'>No Comments yet</div>}            
              </div>
        </div>} 
    </div>
    
     );
}
 
export default Post;