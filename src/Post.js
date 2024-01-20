import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

const Post = ({post}) => {

  return (
    <article className='post'>
      <p>{post.id}</p>
      <Link to={`/post/${post.id}`}>
        <h2>{(post.title).length <=25 ? post.title : `${(post.title).slice(0,50)}.....`}</h2>
      </Link>
      <p className='postBody'>
        {(post.body).length <=25 ? post.body : `${(post.body).slice(0,250)}.....`}
      </p>
    </article>
  )
}

export default Post