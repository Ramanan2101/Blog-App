import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import Post from "./Post";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PostLayout from "./PostLayout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import api from './api/posts';
import useWindowSize from "./hooks/useWindowSize";
import { DataProvider } from "./context/DataContext";
import Pagination from "./Pagination";

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Routes className='contents'>
          <Route path="/" element={<Home/>}/>
          <Route path="/post" element={<NewPost/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="*" element={<Missing />}/>
        </Routes>
        {/* <Footer/> */}
      </DataProvider>
      
      
      
    </div>
  );
}

export default App;
