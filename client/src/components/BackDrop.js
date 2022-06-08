import React from 'react';
import { useData } from '../Context/Context';


const BackDrop = ({children}) => {

    const {setIsModalOpen} = useData();

    const setTarget = (e) => {

        if(e.target.className.includes('modal')){

            setIsModalOpen(true)

        }else{

            if(e.target.className.includes('close')){

                 setIsModalOpen(false)

            }else{

                setIsModalOpen(false)
            }

           
        }
    }

    
    return ( 
        <div onClick={setTarget} className='bg-black/75  absolute top-[0%] z-[1] w-[100vw] h-[100vh] overscroll-contain overflow-y-hidden'>

            {children}

        </div>
     );
}
 
export default BackDrop;