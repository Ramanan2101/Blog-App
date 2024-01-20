import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const {posts, fetchError, isLoading, fetchMoreData, hasMore} = useContext(DataContext);
  

  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ? 
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<h3>End of List</h3>}
          >
            <Feed posts={posts}/>
          </InfiniteScroll>
          :<p className='statusMsg'>No posts to display.</p> )}

    </main>
  )
}

export default Home


