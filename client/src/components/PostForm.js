import React from 'react';
import Header from './Header';
import {MdPostAdd} from 'react-icons/md';
import {BsCardImage,BsLink45Deg,BsFillMicFill} from 'react-icons/bs';
import {BiPoll} from 'react-icons/bi';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useData } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TailSpin} from 'react-loader-spinner';


const PostForm = () => {

    
    const [previewSrc,setPreviewSrc] = useState();
    const [communityId,setCommunityId] = useState();
    const[post,setPost] = useState('');
    const[title,setTitle] = useState('');
    const [postLink,setPostLink] = useState('');
    const {isCommunityPost,setIsCommunityPost,postMode,setPostMode,communities,setCommunities,setSelectedCom} = useData();
    const history = useNavigate(); 
    const [strongLang,setStrongLang] = useState(false);
    const [loading,setLoading] = useState(false);


    useEffect(() => {

        setValues()

    },[communityId])
  
    /*IMAGE UPLOADING FUNCTION USING CLOUDUNARY API*/
     const postImage = async (pic) => {
    
     if((pic.type === "image/jpeg") || (pic.type === "image/png")) {

        setLoading(true)

  try {

    const data = new FormData();
    data.append("file",pic);
    data.append("upload_preset","ClickLab")
    data.append("cloud_name",'wqfda-sdfsafafafaeadqwewqwe')

     fetch("https://api.cloudinary.com/v1_1/wqfda-sdfsafafafaeadqwewqwe/image/upload",{method:"post",body:data})

    .then(res => res.json())

     .then(data => {

      setPreviewSrc(data.url.toString());

      setLoading(false)

      return

     });

    }catch(err) {

      console.log(err.message);

      setLoading(false);

    }

  }
    
}

     const submitPost = async() => {

    //-------------------POST TEXT MODE---------------------------------
    if(postMode == 'text'){

        if(title !== '' && post !== '') {

        setLoading(true)

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        if(isCommunityPost){

            try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',
            {posttitle:title,post:post,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},
            config)
             

            setIsCommunityPost(false);

                 toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            setLoading(false)

            history('/home')

                
            } catch (error) {


                    toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
            setLoading(false)
          
            }
           

        }else{

            try {

                 const newPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:post,posttype:postMode,iscommunitypost:isCommunityPost,uploadtime:new Date(),createdby:userlogged.id,votes:0},config) 
            

                 setIsCommunityPost(false);

                    toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

                 history('/home');


            } catch (error) {


                   toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
                
            }

        }

        }else{

           toast.error('Make sure to fill all the columns', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

        }
    }

    //---------------------POST IMAGE MODE------------------------------
    if(postMode == 'image'){

        if(title !== '' && previewSrc) {

            setLoading(true)

              const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        if(isCommunityPost){

             try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:previewSrc,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)

            setIsCommunityPost(false);

               toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

            history('/home')

                
            } catch (error) {


                     toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
                
            }
           

        }else{

            try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:previewSrc,posttype:postMode,iscommunitypost:isCommunityPost,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)
             

            setIsCommunityPost(false);

               toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

            history('/home')

                
            } catch (error) {


                  toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
                
            }
           
        }

      }else{

        toast.error('Make sure to fill all the columns', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

      }
   }

   //--------------------------POST LNIK--------------------------------
   if(postMode == 'link'){



    if(title !== '' && postLink !== ''){

        setLoading(true)

           const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

    if(isCommunityPost) {


        try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:postLink,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)
             

            setIsCommunityPost(false);

               toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

            history('/home')


            
        } catch (error) {

                 toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
            
        }

    }else{

        const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:postLink,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)
             

        setIsCommunityPost(false);

           toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

        history('/home')

    }

    }else{

        toast.error('Make sure to fill all the columns', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
                setLoading(false)
    }

    }

 }

 const enterPost = async(e) => {


    if(e.keyCode == 13) {

    if(postMode == 'text'){

        if(title !== '' && post !== '') {

            setLoading(true)

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        if(isCommunityPost){

            try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',
            {posttitle:title,post:post,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},
            config)
             

            setIsCommunityPost(false);

                 toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            setLoading(false)

            history('/home')

                
            } catch (error) {


                    toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
            setLoading(false)
          
            }
           

        }else{

            try {

                 const newPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:post,posttype:postMode,iscommunitypost:isCommunityPost,uploadtime:new Date(),createdby:userlogged.id,votes:0},config) 
                

                 setIsCommunityPost(false);

                    toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

                 history('/home');


            } catch (error) {


                   toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
                
            }

        }

        }else{

           toast.error('Make sure to fill all the columns', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

        }
    }

    //---------------------POST IMAGE MODE------------------------------
    if(postMode == 'image'){

        if(title !== '' && previewSrc) {

            setLoading(true)

              const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

        if(isCommunityPost){

             try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:previewSrc,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)
             

            setIsCommunityPost(false);

               toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

            history('/home')

                
            } catch (error) {


                     toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
                
            }
           

        }else{

            try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:previewSrc,posttype:postMode,iscommunitypost:isCommunityPost,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)
             

            setIsCommunityPost(false);

               toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

            history('/home')

                
            } catch (error) {


                  toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
                
            }
           
        }

      }else{

        toast.error('Make sure to fill all the columns', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

      }
   }

   //--------------------------POST LNIK--------------------------------
   if(postMode == 'link'){



    if(title !== '' || postLink !== ''){

        setLoading(true)

           const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.accessToken}`,

            },
        }

    if(isCommunityPost) {


        try {

            const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:postLink,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)
             

            setIsCommunityPost(false);

               toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

            history('/home')


            
        } catch (error) {

                 toast.error('Unexpected Error', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)
            
        }

    }else{

        const newComPost = await axios.post('http://localhost:5000/api/post/newpost',{posttitle:title,post:postLink,posttype:postMode,iscommunitypost:isCommunityPost,communityId:communityId,uploadtime:new Date(),createdby:userlogged.id,votes:0},config)
             

        setIsCommunityPost(false);

           toast.success('Post Updated', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

                setLoading(false)

        history('/home')

    }

    }else{

        toast.error('Make sure to fill all the columns', {
               position: "top-left",
               autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
                setLoading(false)
    }

    }

    }
 }

const censored = (e) => {
  
const censour = ['fuck','shit','ass','cunt']

const value = e.target.value.split(" ")

//const res = censour.map(c => sen.includes(c)? sen.filter(w => w !== c):null)

const res = value.map(w => censour.find(c => w == c)? w.split("")[0] + w.split("").slice(1).toString().replaceAll(',',"").replace(/[a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]/g,"*"):w)

//console.log(res[0].toString().replaceAll(','," "))

console.log(res.toString().replaceAll(','," "))

setPost(res.toString().replaceAll(','," "))

}

const setValues = () => {


    if(communityId == 'all' || communityId == undefined){


        setIsCommunityPost(false);
    
    }else{

        setIsCommunityPost(true);
    }

}


const userlogged = JSON.parse(localStorage.getItem("user"));
    return ( 
        <>
        <Header/>
         <ToastContainer/>
        <div className='flex flex-col items-center justify-center mt-6'>
            <div className='flex justify-between items-center flex-col md:flex-row'><h1 className='font-medium text-lg w-full p-4 border-b border-white md:w-[800px]'>Create a post</h1> <button className='font-medium text-blue-400 hover:bg-black/50 p-2 mt-6 md:mt-0 rounded-md'>DRAFTS</button></div>
            <div className='bg-transparent mt-6 md:w-[860px] p-2 flex'><select onChange={(e) => setCommunityId(e.target.value)} className='p-2 flex justify-between w-[350px] cursor-pointer text-sm font-medium focus:outline-none rounded-sm'><option></option><option className='font-medium' value="all">Public</option>{communities && communities !== 'No communities available'? 
            communities?.map(c => c.members.includes(userlogged.id)?<option value={c._id} className='font-medium'>{c.comname}</option>:null):null}</select></div>

            <div className='md:w-[850px] mt-6'>
                <div className='bg-white flex flex-col md:flex-row justify-evenly rounded-md'>
                    <div onClick={() => setPostMode('text')} className={`flex md:w-[180px] cursor-pointer p-3 h-full justify-center font-medium items-center text-sm border-r border-b border-gray-400 ${postMode == 'text'? 'bg-blue-200 text-blue-700 border-b-4 border-blue-700':''}`}><MdPostAdd className='text-2xl mr-1'/>Post</div>
                    <div onClick={() => setPostMode('image')} className={`flex md:w-[180px] cursor-pointer p-3 h-full justify-center font-medium items-center border-r border-b border-gray-400 ${postMode == 'image'? 'bg-blue-200 text-blue-700 border-b-4 border-blue-700':''}`}><BsCardImage className='text-2xl mr-1'/>Images</div>
                    <div onClick={() => setPostMode('link')} className={`flex md:w-[180px] cursor-pointer p-3 h-full justify-center font-medium items-center  border-r border-b border-gray-400 ${postMode == 'link'? 'bg-blue-200 text-blue-700 border-b-4 border-blue-700':''}`}><BsLink45Deg className='text-2xl mr-1'/>Link</div>
                    <div  className={`flex md:w-[180px] cursor-pointer p-3 h-full justify-center font-medium items-center text-sm border-r border-b border-gray-400 ${postMode == 'poll'? 'bg-blue-200 text-blue-700 border-b-4 border-blue-700':''} opacity-40 cursor-not-allowed`}><BiPoll className='text-2xl mr-1'/>Poll</div>
                    <div  className={`flex md:w-[180px] cursor-pointer p-3 h-full justify-center font-medium items-center  text-sm border-b border-gray-400 ${postMode == 'talk'? 'bg-blue-200 text-blue-700 border-b-4 border-blue-700':''} opacity-40 cursor-not-allowed`}><BsFillMicFill className='text-2xl mr-1'/>Talk</div>
                </div>

                <div className='w-full bg-white p-4'>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' className='bg-gray-200 p-2 rounded-sm w-full h-[45px] focus:outline-none text-md font-medium' placeholder='Title...'/>
                </div>

                {postMode == 'text' && <div className='bg-white w-full p-4 h-[400px]'>
                    <textarea onKeyDown={enterPost} value={post} onChange={strongLang?censored:(e) => setPost(e.target.value)} className='bg-gray-200 w-full h-full border border-black rounded-sm p-2' placeholder='Write a post....'/> 
                </div>}

                {postMode == 'image' && 
                <div className='bg-white w-full p-4'>
                    <div className='bg-gray-200 w-full h-[350px] relative'>
                        {!previewSrc?<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm md:text-5xl text-gray-800 font-medium'>{loading?<TailSpin color='black'/>:'Upload an image'}</div>:<img className='w-full h-full object-cover' src={previewSrc}/>}
                    </div>

                    <div className='mt-6 w-full flex justify-center items-center '>
                        <input disabled={loading} onChange={(e) => postImage(e.target.files[0])} type='file' id='image' className='hidden'/>
                         <label htmlFor='image' className='px-10 py-1 border border-gray-600 rounded-full cursor-pointer hover:bg-black/30 transition-all duration-300'>Upload Image</label>
                    </div>
                </div>}

                {postMode == 'link' && <div className='bg-white w-full p-4'> 
                    <input type='text' className='bg-gray-200 w-full p-4 focus:outline-none' value={postLink} onChange={(e) => setPostLink(e.target.value)} placeholder='Add URL'/>    
                    </div>}

                <div className='bg-white w-full flex items-center p-4'>
                    <button className={`bg-gray-300 p-2 rounded-full mr-6 font-medium hover:bg-gray-400 focus:outline-none`}>Save to drafts</button>
                    {loading?<TailSpin width={40} color='black'/>:<button className={`p-2 bg-blue-500 rounded-full font-medium px-8 hover:bg-blue-600 focus:outline-none`} disabled={loading} onClick={submitPost}>Post</button>}
                    {postMode == 'text'?<div className='flex flex-col justify-center items-center'><img className='w-10 h-10' src='https://cdn-icons-png.flaticon.com/512/5039/5039034.png'/> <div onClick={() => setStrongLang(!strongLang)} className={`transition-all duration-300 relative flex w-[48px] cursor-pointer h-[20px]  ml-6 rounded-full ${strongLang?'bg-gray-800':'bg-gray-400'} `}><div className={`rounded-full absolute w-[20px] h-[20px] bg-white transition-all duration-300 border border-black ${strongLang?'translate-x-[140%]':'translate-x-[0%]'}`}></div></div> </div> :null}

                </div>
            </div>
        </div>       
    </>

    );
}
 
export default PostForm;