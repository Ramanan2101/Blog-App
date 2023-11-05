import React from 'react'
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Post Not Found</h2>
      <p>Well, that's disappointing.</p>
      <Link to='/'>Visit Our HomePage</Link>
    </main>
  )
}

export default Missing