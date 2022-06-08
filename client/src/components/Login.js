import React from 'react';
import {AiFillLock} from 'react-icons/ai';
import {FaUserAlt} from 'react-icons/fa';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [userIconHide,setUserIconHide] = useState(true);
    const [passIconHide,setPassIconHide] = useState(true);
    const [username,setUsername] = useState('');
    const[ password,setPassword] = useState('');
    const [error,setError] = useState([]);
    const [loading,setLoading] = useState(false);

    const history = useNavigate();

    const signIn = async () => {

        setLoading(true)

        if(username !== '' || password !== ''){

            try {

                const user = await axios.post('http://localhost:5000/api/user/authuser',{username:username,password:password})

                localStorage.setItem("user",JSON.stringify(user.data));

                setLoading(false)

                history('/home')

        
            } catch (err) {

                if(!error.includes('Unexpected Error')){

                    setError([...error,'Unexpected Error']);

                }

                setLoading(false)      
            }

        }else{

        if(!error.includes('Please fill all the collumns')) {

            setError([...error,'Please fill all the collumns'])

        }

        setLoading(false)

    }

}

const signInUser = async (e) =>{

    if(e.keyCode == 13){

        setLoading(true)

        if(username !== '' || password !== ''){

            try {

                const user = await axios.post('http://localhost:5000/api/user/authuser',{username:username,password:password})

                localStorage.setItem("user",JSON.stringify(user.data));

                history('/home')

                setLoading(false)

        
            } catch (err) {

                if(!error.includes('Unexpected Error')){

                    setError([...error,'Unexpected Error']);

                }

                setLoading(false)
                
            }

        }else{

        if(!error.includes('Please fill all the collumns')) {

            setError([...error,'Please fill all the collumns'])

        }

        setLoading(false)

    }

 }

}
    return ( 

        <div className='w-[100vw] h-[100vh] relative'>
            <div className='absolute top-[50%]
             left-[50%] translate-x-[-50%] 
             translate-y-[-50%]'>
              <div className='flex flex-col justify-center items-center'>
                 <img src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-reddit-circle-512.png'/>
              </div>
              <div className='absolute top-[50%]
             left-[50%] translate-x-[-50%] translate-y-[-50%] w-[350px] h-[700px] bg-white opcaity-20 shadow-lg 
              border border-gray-300 rounded-lg flex flex-col items-center '>
                <img src='https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Reddit_logo_new.svg/2560px-Reddit_logo_new.svg.png' className='w-[200px] h-[70px] mt-10'/>     
              {error.length !== 0 &&<div className='w-full p-2 bg-red-600 mt-10 text-white'>
                   {error.map(e => (
                       <p key={e}>{e}</p>
                   ))}
               </div>}
                <form className='p-6  absolute top-[30%] flex flex-col
                 justify-center items-center mt-5 w-full'>
                     <div className='relative'>
                    <label className=' font-medium text-sm'>Username</label>
                    {username == '' && userIconHide? <FaUserAlt className='absolute top-[60%]'/>:null}
                    <input onKeyDown={signInUser} onFocus={() => setUserIconHide(false)} onBlur={() => setUserIconHide(true)} value={username} onChange={(e) => setUsername(e.target.value)} type='text' className='bg-white border-b border-black/80 p-1 w-[280px] focus:outline-none mt-2'/>
                    </div>
                     <div className='mt-10 relative'>
                    <label className='font-medium text-sm'>Password</label>
                    {password == '' && passIconHide? <AiFillLock className='absolute top-[60%]'/>:null}
                    <input onKeyDown={signInUser} onFocus={() => setPassIconHide(false)} onBlur={() => setPassIconHide(true)} type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-white border-b border-black/80 p-1 w-[280px] focus:outline-none mt-2'/>
                    </div>
                </form>
                <button disabled={loading}  onClick={signIn} className='transition-all duration-300  cursor-pointer w-full absolute bottom-[0%] p-4 
               bg-orange-600 hover:bg-orange-500 font-medium text-md disabled:bg-gray-400 text-white/70 cursor-not-allowed'>
                    Sign In
                </button>
              </div>
            </div>    
        </div>
     );
}
 
export default Login;