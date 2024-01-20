import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/posts';
import useWindowSize from "../hooks/useWindowSize";


const DataContext = createContext({})

export const DataProvider = ({children}) =>{
    const [posts, setPosts] =useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [fetchError,setFetchError] = useState(null);
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate();
    const {width} = useWindowSize();
    const [pageCount,setPageCount] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    

    let limit=20;

    useEffect(() =>{
      const getPosts = async () => {
        try{
          const response = await api.get(`/posts?_page=1&_limit=${limit}`)
          setPosts(response.data);
          setFetchError(null)
        } catch (err) {
          console.log(`Error: ${err.message}`);
        } finally{
            setIsLoading(false)
        }
      }
      getPosts();
    },[])
    
    const fetchPosts = async () => {
        const response = await api.get(`posts?_page=${pageCount}&_limit=${limit}`);
        return response.data;
      };
    

    const fetchMoreData = async () =>{
        console.log('fetching more data');
        const postsFromServer = await fetchPosts();
        setPosts([...posts,...postsFromServer])
        setPageCount(pageCount+1)
        if (postsFromServer.length === 0 || postsFromServer.length < `${limit}`) 
        {setHasMore(false)}
    }


    const handleSubmit =async (e) =>{
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const newPost = {id, title: postTitle, body: postBody};
        try{
            const response = await api.post('/posts', newPost)
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/');
        } catch(err){
            console.log(`Error: ${err.message}`);
        }
    }

    const handleEdit = async (id) =>{
        const updatedPost = {id, title: editTitle, body: editBody};
        try{
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? {...response.data} : post));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch(err){
            console.log(`Error: ${err.message}`);
        }
    }

    const handleDelete = async (id) =>{
        try{
            await api.delete(`/posts/${id}`)
            const postList = posts.filter(post => post.id !== id);
            setPosts(postList);
            navigate('/')
        } catch(err){
            console.log(`Error: ${err.message}`);
        }
    }
    return(
        <DataContext.Provider value={{width, search, setSearch, searchResults, fetchError, isLoading, 
            handleSubmit, postBody, setPostBody, postTitle, setPostTitle, posts, 
            handleEdit, editTitle, setEditTitle, editBody, setEditBody, handleDelete, pageCount, hasMore, setHasMore,
            fetchMoreData}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;