import React from 'react'
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
    <h1>Not Found</h1>
    <nav>
        <Link to="/">Go Home</Link>
    </nav>
</div>
  )
}

export default NotFound