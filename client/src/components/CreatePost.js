import React from 'react';
import { Link } from 'react-router-dom';
import {BsFillImageFill,BsLink45Deg} from 'react-icons/bs';
import {FcReddit} from 'react-icons/fc';
import {useNavigate} from 'react-router-dom';
import { useData } from '../Context/Context';

const CreatePost = () => {

    const history = useNavigate();
    const {isCommunityPost,setIsCommunityPost,postMode,setPostMode} = useData();

    const redirectToPost = () =>{

      setPostMode("text");

      history('/submit');

    }

    return ( 

        <div className='p-2 w-[400px] md:w-[850px] lg:w-[500px] h-[60px] bg-white flex items-center space-x-5 justify-evenly rounded-md'>
          <FcReddit className='text-4xl'/>
            <input onClick={redirectToPost} className='bg-gray-200 w-full h-full focus:outline-none p-1' placeholder='Create Post...'/>
            <Link to='/submit' onClick={() => setPostMode('image')} className='p-2 rounded-full hover:bg-gray-300 transition-all duration-200'><BsFillImageFill className='text-xl'/></Link>
            <Link to='/submit' onClick={() => setPostMode('link')} className='p-2 rounded-full hover:bg-gray-300 transition-all duration-200'><BsLink45Deg className='text-xl'/></Link>
        </div>
     );
}
 
export default CreatePost;