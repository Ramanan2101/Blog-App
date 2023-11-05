import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import Footer from "./Footer";
import About from "./About";
import Post from "./Post";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from './api/posts';
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { DataProvider } from "./context/DataContext";

function App() {
  

  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/post" element={<NewPost/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="*" element={<Missing />}/>
        </Routes>
        <Footer/>
      </DataProvider>
      
      
      
    </div>
  );
}

export default App;
