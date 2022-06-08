import React from 'react';
import { createContext,useContext,useState } from 'react';

const DataContext = createContext();

const  DataProvider = ({children}) => {

    const [selectedCom,setSelectedCom] = useState('all');
    const [postMode,setPostMode] = useState('text');
    const [isCommunityPost,setIsCommunityPost] = useState(false);
    const [publicPosts,setPublicPosts] = useState([]);
    const [selectedPost,setSelectedPost] = useState();
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [communities,setCommunities] = useState([]);
    const [comHandler,setComHandler] = useState(false);
    const [selectedCommunityObj,setSelectedComunityObj] = useState();

    return ( 
        <DataContext.Provider value={{selectedCommunityObj,setSelectedComunityObj,comHandler,setComHandler,selectedCom,setSelectedCom,isCommunityPost,setIsCommunityPost,postMode,setPostMode,publicPosts,setPublicPosts,selectedPost,setSelectedPost,isModalOpen,setIsModalOpen,communities,setCommunities}}>
            {children}
        </DataContext.Provider>
     );
}
 
export default  DataProvider;

export const useData = () => {

    return useContext(DataContext)

}