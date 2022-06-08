import React from 'react';
import { useEffect } from 'react';
import CreatePost from './CreatePost';
import axios from 'axios';
import { useData } from '../Context/Context';
import {toast} from 'react-toastify';
import Post from './Post';
import { useState } from 'react';
import LoadAnimation from './LoadAnimation';


const Feed = () => {

    const {publicPosts,setPublicPosts,selectedCom,setSelectedCom,communities,setCommunities,comHandler,setSelectedComunityObj,selectedCommunityObj} = useData();

    const [postLoad,setPostLoad] = useState(false);

    useEffect(() => {

        getPublicPosts();
        setSelectedCommunity();

    },[selectedCom]);

    useEffect(() => {

        getComs();

    },[comHandler]);

    const getComs = async() => {

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

             try {

            const allcommunities = await axios.get('http://localhost:5000/api/community/allcommunities',config);

            setCommunities(allcommunities.data)
            
        } catch (error) {

            console.log(error)
            
        }

       
    }
    
    const getPublicPosts = async() => {

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        if(selectedCom == 'all'){

             setPostLoad(true)

            
        try {

            const pubPosts = await axios.get('http://localhost:5000/api/post/publicPosts',config);

            setPublicPosts(pubPosts.data)

            setPostLoad(false)

        } catch (error) {   

              toast.error('Failed to retreive posts', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            setPostLoad(false)
           
        }


        }else{
            
        try {

            const comPosts = await axios.post(`http://localhost:5000/api/post/communityposts/${selectedCom}`,config);

            setPublicPosts(comPosts.data)

            setPostLoad(false)

        } catch (error) {   

              toast.error('Failed to retreive posts', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            setPostLoad(false)
           
        }
    }


    }

    const setSelectedCommunity = async() => {

        if(selectedCom !== 'all') {

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        try {

            const comm = await axios.get(`http://localhost:5000/api/community/${selectedCom}`,config)

            setSelectedComunityObj(comm.data)
            
        } catch (error) {


            console.log(error)
            
        }      
    }

}

console.log(selectedCommunityObj,selectedCom)

    return ( 

        <div className={`${!postLoad?'flex flex-col justify-start items-center':''}`}>
            {!postLoad && <CreatePost/>}
            {!postLoad? <div className='flex flex-col justify-center items-center lg:items-start'>{publicPosts !== 'No posts available'? publicPosts?.map(post => <Post key={post._id} post={post} getPosts={getPublicPosts}/>):<div className='text-4xl font-medium text-gray-700 flex flex-col justify-center items-center  mt-10'>No Posts Available</div>}</div>:<div className='absolute top-[50%] left-[45%] md:left-[45%] lg:left-[20%]'><LoadAnimation/></div>}
        </div>
        
    );
}
 
export default Feed;