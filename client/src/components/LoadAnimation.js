import React from 'react';
import { useEffect,useState } from 'react';


const LoadAnimation = () => {

    const[ secDot,setSecDot] = useState(false)
    const[ thirdDot,setThirdDot] = useState(false)
    const[ firstDot,setfirstDot] = useState(false)

    useEffect(() => {

         setTimeout(() => {

            setfirstDot(true)
          

        },500)

        setTimeout(() => {

            setSecDot(true)
        

        },1000)

        setTimeout(() => {

            setThirdDot(true)
            
            
        },1200)

    },[])
    return ( 

   <div className='flex flex-col justify-center items-center'>
        <img  src='https://www.redditinc.com/assets/images/site/reddit-logo.png' className='w-20 h-20 mb-6'/>
    <div className='flex justify-center items-center space-x-4'>
        <div className={`p-2 rounded-full bg-black ${firstDot? 'animate-load':''} `}></div>
        <div className={`p-2 rounded-full bg-black ${secDot? 'animate-load':''} `}></div>
        <div className={`p-2 rounded-full bg-black ${thirdDot? 'animate-load':''} `}></div>
    </div>  
</div> 
       
  
     );
}
 
export default LoadAnimation;