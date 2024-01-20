import { createContext, useState, useEffect } from "react";
import Post from "../Post";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PostLayout from "../PostLayout";
import api from '../api/posts';
import EditPost from "../EditPost";
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
    
    // useEffect(() => {
    //     setPosts(data);
    // },[data])

    let limit=20;

    useEffect(() =>{
      const getPosts = async () => {
        try{
          const response = await api.get(`/posts?_page=1&_limit=${limit}`)
        //   const total = response.headers.get('x-total-count')
        //   setPageCount(Math.ceil(total/limit))
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

    // useEffect(() => {
    //     const filteredResults = posts.filter(post => 
    //     ((post.body).toLowerCase()).includes(search.toLowerCase())
    //     || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    //     setSearchResults(filteredResults)
    //     // setSearchResults(filteredResults.reverse())
    // },[posts,search]) 

    //for lazy-loading scroll

    
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



    //for Pagination 

    // const fetchData = async (currentPage) => {
    //     const response = await api.get(`/posts?_page=${currentPage}&_limit=${limit}`)
    //     return response.data;
    //     console.log('hello');
    // }

    // const handlePageClick = async (data) => {
    //     console.log(data.selected);
    //     let currentPage = data.selected + 1;
    //     const postsFromServer = await fetchData(currentPage)
    //     setPosts(postsFromServer)
    // }

    // Pagination Code ends


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
            fetchMoreData, hasMore}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;